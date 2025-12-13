# Firebase Queries Explanation

This document explains the exact Firebase queries used for fetching products and categories.

## 📋 Table of Contents

1. [Getting All Products](#getting-all-products)
2. [Getting Products for a Single Category](#getting-products-for-a-single-category)
3. [Getting All Categories](#getting-all-categories)

---

## 1. Getting All Products

### Purpose
Fetch all products from ALL category collections and aggregate them into a single array.

### Implementation Location
`lib/firebase/products.ts` - `getAllProducts()` function

### Query Steps

#### Step 1: Get All Categories
```typescript
const categories = await getAllCategories();
// Returns array of Category objects, each with:
// - id: "electronics"
// - name: "Electronics"
// - collectionName: "Electronics"
```

#### Step 2: Extract Collection Names
```typescript
const collectionNames = categories.map(cat => cat.collectionName || cat.name);
// Example: ["Electronics", "Sweets", "Beverage"]
```

#### Step 3: Fetch from Each Collection (Parallel)
For each collection name, we execute:

```typescript
// Query 1: Try with orderBy (preferred)
const productsRef = collection(db, collectionName); // e.g., "Electronics"
const q = query(productsRef, orderBy('createdAt', 'desc'));
const querySnapshot = await getDocs(q);

// Query 2: Fallback without orderBy (if index missing or permission denied)
const querySnapshot = await getDocs(productsRef); // Simple query
```

#### Step 4: Process Each Product Document
```typescript
querySnapshot.forEach((doc) => {
  const data = doc.data();
  const category = categories.find(cat => 
    (cat.collectionName || cat.name) === collectionName
  );
  
  products.push({
    id: doc.id,                    // Document ID
    categoryId: category?.id,      // Set from category object
    ...data,                       // All other product fields
  } as Product);
});
```

#### Step 5: Aggregate All Products
```typescript
// Wait for all parallel fetches to complete
const results = await Promise.all(fetchPromises);

// Flatten into single array
results.forEach(products => {
  allProducts.push(...products);
});

// Sort by createdAt (newest first)
allProducts.sort((a, b) => {
  const aDate = a.createdAt?.toMillis?.() || 0;
  const bDate = b.createdAt?.toMillis?.() || 0;
  return bDate - aDate;
});
```

### Example Firestore Structure
```
Firestore Database
├── _categories (collection)
│   ├── electronics (document)
│   │   ├── name: "Electronics"
│   │   ├── collectionName: "Electronics"
│   │   └── ...
│   └── sweets (document)
│       ├── name: "Sweets"
│       ├── collectionName: "Sweets"
│       └── ...
├── Electronics (collection) ← Products stored here
│   ├── product1 (document)
│   ├── product2 (document)
│   └── ...
├── Sweets (collection) ← Products stored here
│   ├── product1 (document)
│   └── ...
└── Beverage (collection) ← Products stored here
    └── ...
```

### Complete Query Code
```typescript
export async function getAllProducts(): Promise<Product[]> {
  // 1. Get categories to know which collections to fetch
  const categories = await getAllCategories();
  const collectionNames = categories.map(cat => cat.collectionName || cat.name);
  
  // 2. Fetch from each collection in parallel
  const fetchPromises = collectionNames.map(async (collectionName) => {
    const productsRef = collection(db, collectionName);
    
    // Try with orderBy first
    try {
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      // Process products...
    } catch (error) {
      // Fallback: fetch without orderBy
      const querySnapshot = await getDocs(productsRef);
      // Process products...
    }
  });
  
  // 3. Wait for all and aggregate
  const results = await Promise.all(fetchPromises);
  return allProducts;
}
```

---

## 2. Getting Products for a Single Category

### Purpose
**Note**: After the refactor, this is now done client-side! Products are filtered from `allProducts` array.

### Implementation Location
`lib/firebase/products.ts` - `applyCategoryFilter()` function

### Client-Side Filtering (Current Approach)
```typescript
export function applyCategoryFilter(
  allProducts: Product[],
  selectedCategory: string,
  categories: Category[]
): Product[] {
  if (selectedCategory === 'all') {
    return allProducts; // Return all products
  }
  
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  
  // Filter products that match the category
  return allProducts.filter(product => {
    const productCategoryId = product.categoryId || 
                              (product as any).category;
    
    return productCategoryId === selectedCategory;
  });
}
```

### Previous Approach (Before Refactor)
If you need to fetch directly from Firebase for a single category:

```typescript
// Query for single category collection
const collectionName = category.collectionName || category.name; // e.g., "Electronics"
const productsRef = collection(db, collectionName);

// Try with orderBy
const q = query(productsRef, orderBy('createdAt', 'desc'));
const querySnapshot = await getDocs(q);

// Or without orderBy (fallback)
const querySnapshot = await getDocs(productsRef);
```

---

## 3. Getting All Categories

### Purpose
Fetch all category definitions from the `_categories` collection in Firestore.

### Implementation Location
`lib/firebase/products.ts` - `getAllCategories()` → `getCategoriesFromFirestore()`

### Query Steps

#### Step 1: Query _categories Collection
```typescript
const categoriesRef = collection(db, '_categories');
const categoriesQuery = query(categoriesRef); // Simple query, no filters
const querySnapshot = await getDocs(categoriesQuery);
```

#### Step 2: Process Each Category Document
```typescript
querySnapshot.forEach((doc) => {
  const data = doc.data();
  
  // Extract category information
  const categoryName = data.name || data.categoryName || doc.id;
  const collectionName = data.collectionName || data.collection || categoryName;
  const categoryId = data.id || createCategoryId(categoryName);
  
  // Create Category object
  const category: Category = {
    id: categoryId,
    name: categoryName,
    collectionName: collectionName,
    icon: data.icon || '📦',
    gradient: data.gradient || getDefaultGradient(categoryName),
    description: data.description,
    order: data.order || 999,
  };
  
  categories.push(category);
});
```

#### Step 3: Sort by Order
```typescript
categories.sort((a, b) => (a.order || 999) - (b.order || 999));
```

### Example Firestore Structure
```
Firestore Database
└── _categories (collection)
    ├── electronics (document)
    │   ├── name: "Electronics"
    │   ├── collectionName: "Electronics"
    │   ├── icon: "🔌"
    │   ├── gradient: "from-gray-900 to-black"
    │   ├── order: 1
    │   └── description: "..."
    ├── sweets (document)
    │   ├── name: "Sweets"
    │   ├── collectionName: "Sweets"
    │   └── ...
    └── beverage (document)
        └── ...
```

### Complete Query Code
```typescript
async function getCategoriesFromFirestore(): Promise<Category[]> {
  const categoriesRef = collection(db, '_categories');
  const categoriesQuery = query(categoriesRef);
  const querySnapshot = await getDocs(categoriesQuery);
  
  const categories: Category[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // Process and create Category object...
    categories.push(category);
  });
  
  categories.sort((a, b) => (a.order || 999) - (b.order || 999));
  return categories;
}
```

---

## 🔍 Query Patterns Used

### Pattern 1: Simple Collection Query
```typescript
const ref = collection(db, 'collectionName');
const snapshot = await getDocs(ref);
```

### Pattern 2: Query with Ordering
```typescript
const ref = collection(db, 'collectionName');
const q = query(ref, orderBy('fieldName', 'desc'));
const snapshot = await getDocs(q);
```

### Pattern 3: Parallel Queries (Promise.all)
```typescript
const promises = collectionNames.map(async (name) => {
  const ref = collection(db, name);
  return await getDocs(ref);
});
const results = await Promise.all(promises);
```

### Pattern 4: Error Handling with Fallback
```typescript
try {
  // Try with orderBy
  const q = query(ref, orderBy('createdAt', 'desc'));
  return await getDocs(q);
} catch (error) {
  // Fallback: simple query
  return await getDocs(ref);
}
```

---

## 📊 Performance Considerations

1. **Parallel Fetching**: All category collections are fetched simultaneously using `Promise.all()`
2. **Client-Side Filtering**: No Firebase calls when changing categories (uses cached `allProducts`)
3. **Error Resilience**: Continues fetching other collections if one fails
4. **Index Management**: Falls back to simple query if index is missing

---

## 🔐 Security Rules Compatibility

All queries work with public read access rules:
```javascript
match /{category}/{product} {
  allow read: if true; // Public read access
  allow write: if request.auth != null; // Auth required for writes
}

match /_categories/{document} {
  allow read: if true; // Public read access
  allow write: if request.auth != null; // Auth required for writes
}
```

---

**Summary**: Products are stored in category-specific collections (e.g., "Electronics", "Sweets"), and we aggregate them by fetching from all collections in parallel. Categories are stored in a `_categories` metadata collection. After initial fetch, all filtering is done client-side for better performance.


