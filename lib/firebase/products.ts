import { 
  collection, 
  getDocs, 
  getDoc,
  doc,
  query, 
  where, 
  orderBy,
  DocumentData,
  QuerySnapshot,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { db } from './config';
import { collectionNamesToCheck, createCategoryFromCollectionName } from './categories-config';
import { cache, CACHE_KEYS } from './cache';

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  imageUrl?: string;
  price?: number;
  inStock?: boolean;
  createdAt?: any;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  description?: string; // Optional description for category
  order?: number; // Optional order field for sorting
  collectionName?: string; // Name of the Firestore collection for this category (e.g., "Electronics")
}

/**
 * Check if error is a permission denied error
 */
function isPermissionError(error: any): boolean {
  return error?.code === 'permission-denied' || 
         error?.code === 7 || 
         error?.message?.toLowerCase().includes('permission') ||
         error?.message?.toLowerCase().includes('missing or insufficient');
}

/**
 * Fetch all products from all category collections in Firestore
 * This aggregates products from all category-specific collections (e.g., "Electronics", "Sweets", etc.)
 * 
 * FIX: "All Products not showing all items" - This function now properly aggregates products
 * from all category collections instead of looking for a single 'products' collection
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    // OPTIMIZATION: Check cache first to prevent expensive Firebase queries
    const cached = cache.get<Product[]>(CACHE_KEYS.allProducts);
    if (cached) {
      return cached;
    }
    
    // First, get all categories to know which collections to fetch from
    const categories = await getAllCategories();
    
    if (categories.length === 0) {

      return [];
    }
    
    const allProducts: Product[] = [];
    const collectionNames = categories.map(cat => cat.collectionName || cat.name);
    
    // Fetch products from each category collection in parallel
    const fetchPromises = collectionNames.map(async (collectionName) => {
      try {

        const productsRef = collection(db, collectionName);
        
        // Try to fetch with orderBy first
        try {
    const q = query(productsRef, orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          
          const categoryProducts: Product[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Ensure categoryId is set from the collection name or category ID
            const category = categories.find(cat => 
              (cat.collectionName || cat.name) === collectionName
            );
            
            categoryProducts.push({
              id: doc.id,
              categoryId: category?.id || collectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              ...data,
            } as Product);
          });
          

          return categoryProducts;
        } catch (orderByError: any) {
          // If orderBy fails, try without it
          if (orderByError?.code === 'failed-precondition' || isPermissionError(orderByError)) {
            const querySnapshot = await getDocs(productsRef);
            
            const categoryProducts: Product[] = [];
    querySnapshot.forEach((doc) => {
              const data = doc.data();
              const category = categories.find(cat => 
                (cat.collectionName || cat.name) === collectionName
              );
              
              categoryProducts.push({
        id: doc.id,
                categoryId: category?.id || collectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                ...data,
      } as Product);
    });
    
            // Sort client-side
            categoryProducts.sort((a, b) => {
              const aDate = a.createdAt?.toMillis?.() || 0;
              const bDate = b.createdAt?.toMillis?.() || 0;
              return bDate - aDate;
            });
            
            return categoryProducts;
          }
          throw orderByError;
        }
      } catch (error: any) {
        if (isPermissionError(error)) {
          return [];
        }
        return []; // Return empty array for this collection, continue with others
      }
    });
    
    // Wait for all collections to be fetched
    const results = await Promise.all(fetchPromises);
    
    // Track which collections had products and which didn't
    const collectionSummary: Array<{ name: string; productCount: number }> = [];
    
    // Flatten all products into a single array
    results.forEach((products, index) => {
      const collectionName = collectionNames[index];
      collectionSummary.push({
        name: collectionName,
        productCount: products.length
      });
      allProducts.push(...products);
    });
    
    // Sort all products by createdAt (newest first)
    allProducts.sort((a, b) => {
      const aDate = a.createdAt?.toMillis?.() || 0;
      const bDate = b.createdAt?.toMillis?.() || 0;
      return bDate - aDate;
    });
    
    // Log detailed summary



    collectionSummary.forEach(summary => {
      if (summary.productCount === 0) {
        // Suppress warning - empty collections are expected
      } else {

      }
    });
    
    // Check for collections with zero products
    const emptyCollections = collectionSummary.filter(s => s.productCount === 0);
    if (emptyCollections.length > 0) {
      // Suppress warning - empty collections are expected
      emptyCollections.forEach(col => {




        // Suppress warnings
      });
    }
    

    // OPTIMIZATION: Cache results for 3 minutes to reduce CPU usage
    // Cache is invalidated by real-time listeners when data changes
    cache.set(CACHE_KEYS.allProducts, allProducts, 3 * 60 * 1000);
    
    return allProducts;
  } catch (error: any) {

    if (isPermissionError(error)) {
      return [];
    }
    return [];
  }
}

/**
 * Fetch products by category
 * Works with Firestore security rules - handles permission errors and query restrictions
 * If category has collectionName, fetches from that collection. Otherwise uses categoryId.
 */
export async function getProductsByCategory(categoryId: string, categoryCollectionName?: string): Promise<Product[]> {
  try {
    if (categoryId === 'all') {
      return await getAllProducts();
    }
    
    // OPTIMIZATION: Check cache first
    const cacheKey = CACHE_KEYS.productsByCategory(categoryId);
    const cached = cache.get<Product[]>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Use collectionName if provided, otherwise default to 'products' collection with categoryId filter
    const collectionName = categoryCollectionName || 'products';
    const productsRef = collection(db, collectionName);
    




    
    if (!categoryCollectionName) {
      // Using default 'products' collection
    }
    
    // Try with orderBy first (if rules allow it and we're using a dedicated collection)
    try {
      const q = categoryCollectionName 
        ? query(productsRef, orderBy('createdAt', 'desc'))
        : query(
      productsRef, 
      where('categoryId', '==', categoryId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
          categoryId: categoryId, // Ensure categoryId is set
          ...doc.data(),
        } as Product);
      });
      
      // Cache results for 3 minutes
      cache.set(cacheKey, products, 3 * 60 * 1000);
      
      if (products.length === 0) {






      }
      
      return products;
    } catch (orderByError: any) {
      // If orderBy fails, try without it
      if (orderByError?.code === 'failed-precondition' || isPermissionError(orderByError)) {
        try {
          const q = categoryCollectionName
            ? query(productsRef)
            : query(productsRef, where('categoryId', '==', categoryId));
          const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
          
          const products: Product[] = [];
          querySnapshot.forEach((doc) => {
            products.push({
              id: doc.id,
              categoryId: categoryId,
        ...doc.data(),
      } as Product);
    });
          
          // Sort client-side as fallback
          products.sort((a, b) => {
            const aDate = a.createdAt?.toMillis?.() || 0;
            const bDate = b.createdAt?.toMillis?.() || 0;
            return bDate - aDate;
          });
          
          // Cache results
          cache.set(cacheKey, products, 3 * 60 * 1000);
          
          if (products.length === 0) {






          }
    
    return products;
        } catch (fallbackError: any) {

          if (isPermissionError(fallbackError)) {
            return [];
          }
          throw fallbackError;
        }
      }
      throw orderByError;
    }
  } catch (error: any) {
    if (isPermissionError(error)) {
      return [];
    }

    return [];
  }
}

/**
 * Fetch a single product by ID
 * Works with Firestore security rules - handles permission errors
 */
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      return null;
    }
    
    return {
      id: productSnap.id,
      ...productSnap.data(),
    } as Product;
  } catch (error: any) {
    if (isPermissionError(error)) {
      // Permission denied - return null gracefully
      return null;
    }

    return null;
  }
}

/**
 * Fetch categories directly from _categories collection in Firestore
 * This reads category documents with all their metadata (name, icon, gradient, etc.)
 */
async function getCategoriesFromFirestore(): Promise<Category[]> {
  // Declare categories outside try block so it's accessible in catch
  const categories: Category[] = [];
  const skippedDocs: string[] = [];
  
  try {

    const categoriesRef = collection(db, '_categories');
    
    // Query without orderBy first to avoid index issues - we'll sort client-side
    const categoriesQuery = query(categoriesRef);
    const querySnapshot = await getDocs(categoriesQuery);
    

    
    // Process each document - use regular loop for better error handling
    const docs = querySnapshot.docs;
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      try {
        const data = doc.data();
        
        // Create category from document data
        // Support various field name formats - be flexible
        let categoryName = data.name || data.categoryName || data.title || data.collectionName || doc.id;
        
        // Convert to string and trim
        if (typeof categoryName !== 'string') {
          categoryName = String(categoryName || doc.id);
        }
        categoryName = categoryName.trim();
        
        // Final fallback to document ID if name is empty
        const finalCategoryName = categoryName || doc.id;
        
        // Collection name can be separate or same as category name
        // IMPORTANT: This must match the exact Firestore collection name
        // FIX: Use document ID as collection name when collectionName is missing
        // This handles cases where collection name has underscores (Integrated_Circuits) 
        // but category name has spaces (Integrated Circuits)
        const hasExplicitCollectionName = !!(data.collectionName || data.collection);
        
        // Priority: explicit collectionName > document ID > category name
        // Document ID often matches the actual collection name in Firestore
        // FIX: When no explicit collectionName, prefer document ID over category name
        // because document IDs usually match collection names (e.g., "Integrated_Circuits")
        let finalCollectionName: string;
        if (data.collectionName || data.collection) {
          finalCollectionName = data.collectionName || data.collection || '';
        } else {
          // No explicit collectionName - use document ID as it typically matches the collection name
          finalCollectionName = doc.id || finalCategoryName;
        }
        
        if (!hasExplicitCollectionName) {
          // Document ID used as collection name
        }
        
        // Only skip if we truly have no name at all
        if (!finalCategoryName || finalCategoryName.trim() === '') {
          skippedDocs.push(doc.id);
          continue;
        }
        
        // Create category ID from name (URL-friendly)
        const categoryId = data.id || finalCategoryName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        // Get gradient with error handling
        let gradient = 'from-gray-900 to-black'; // Default gradient
        if (data.gradient) {
          gradient = data.gradient;
        } else {
          try {
            gradient = getCategoryDefaults(finalCategoryName).gradient;
          } catch (gradientError) {
            // Use default gradient
          }
        }
        
        // Create category object - use data from document or smart defaults
        const category: Category = {
          id: categoryId,
          name: finalCategoryName,
          collectionName: finalCollectionName,
          icon: data.icon || '📦', // Default icon if not provided
          gradient: gradient,
          description: data.description || `Explore our ${finalCategoryName.toLowerCase()} collection`,
          order: typeof data.order === 'number' ? data.order : 999,
        };
        
        categories.push(category);
      } catch (docError: any) {
        skippedDocs.push(doc.id);
        // Continue processing other documents
      }
    }
    
    // Log summary
    try {



      if (skippedDocs.length > 0) {

      }
    } catch (logError) {

    }
    
    // Sort by order (client-side) - wrap in try-catch to ensure we return categories even if sorting fails
    try {
      if (categories.length > 0) {
        categories.sort((a, b) => (a.order || 999) - (b.order || 999));
      }
    } catch (sortError) {

    }
    
    // FIX: Validate and filter out categories whose collections don't exist or are empty
    if (categories.length > 0) {
      // Validate each category's collection
      const validationResults = await Promise.all(
        categories.map(async (category) => {
          const collectionName = category.collectionName || category.name;
          const hasProducts = await validateCategoryCollection(collectionName);
          
          return {
            category,
            valid: hasProducts,
            collectionName
          };
        })
      );
      
      // Separate validated and invalid categories
      const validatedCategories: Category[] = [];
      const invalidCategories: Array<{ name: string; collectionName: string; reason: string }> = [];
      
      validationResults.forEach(result => {
        if (result.valid) {
          validatedCategories.push(result.category);
        } else {
          invalidCategories.push({
            name: result.category.name,
            collectionName: result.collectionName,
            reason: 'Collection does not exist or is empty'
          });
        }
      });
      
      if (validatedCategories.length > 0) {
        return validatedCategories;
      } else {
        return [];
      }
    }
    

    return [];
  } catch (error: any) {
    // Log error details in a readable format
    const errorMessage = error?.message || String(error) || 'Unknown error';
    const errorCode = error?.code || 'NO_CODE';
    const errorName = error?.name || 'Error';
    




    if (error?.stack) {

    }
    
    if (isPermissionError(error)) {

    } else {

    }
    
    // Return any categories that were successfully processed before the error
    if (categories.length > 0) {
      // Try to sort them before returning
      try {
        categories.sort((a, b) => (a.order || 999) - (b.order || 999));
      } catch (sortError) {

      }
    return categories;
    }
    
    return [];
  }
}


/**
 * Validate if a category's collection exists and has at least one product
 * Returns true if collection exists and has products, false otherwise
 */
async function validateCategoryCollection(collectionName: string): Promise<boolean> {
  try {
    const productsRef = collection(db, collectionName);
    // Try to fetch at least one document to check if collection exists and has products
    const querySnapshot = await getDocs(query(productsRef));
    const hasProducts = querySnapshot.size > 0;
    
    return hasProducts;
  } catch (error: any) {
    // Collection doesn't exist or permission denied
    return false;
  }
}

/**
 * Get smart defaults for category (for fallback)
 */
function getCategoryDefaults(collectionName: string): { gradient: string } {
  const gradients = [
    'from-gray-900 to-black',
    'from-black to-gray-900',
    'from-gray-800 to-black',
    'from-gray-900 to-gray-800',
    'from-black to-gray-800',
    'from-gray-800 to-gray-900',
    'from-gray-700 to-black',
    'from-black to-gray-700',
  ];
  
  const hash = collectionName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradient = gradients[hash % gradients.length];
  
  return { gradient };
}

/**
 * Automatically fetch categories from _categories collection in Firestore
 * 
 * Detection method priority:
 * 1. First tries to read from '_categories' collection (automatic from database)
 * 2. Falls back to checking collections listed in categories-config.ts
 * 
 * Categories are fetched directly from the _categories collection - all categories listed there will show up!
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    // OPTIMIZATION: Check cache first
    const cached = cache.get<Category[]>(CACHE_KEYS.allCategories);
    if (cached) {
      return cached;
    }
    
    // Method 1: Try to get categories directly from _categories collection (automatic from database)

    const firestoreCategories = await getCategoriesFromFirestore();
    

    
    if (firestoreCategories.length > 0) {
      // Cache categories for 5 minutes (they change less frequently)
      cache.set(CACHE_KEYS.allCategories, firestoreCategories, 5 * 60 * 1000);
      return firestoreCategories;
    }
    
    // Method 2: Fallback to config file approach (for backward compatibility)
    
    const collectionNamesToCheckList = collectionNamesToCheck;
    
    if (collectionNamesToCheckList.length === 0) {



      return [];
    }
    

    
    const detectedCategories: Category[] = [];
    
    // Check each collection name to see if it exists and has documents
    for (let i = 0; i < collectionNamesToCheckList.length; i++) {
      const collectionName = collectionNamesToCheckList[i];
      
      try {
        // Try to read from the collection (limit to 1 document for efficiency)
        const collectionRef = collection(db, collectionName);
        const testQuery = query(collectionRef);
        const querySnapshot = await getDocs(testQuery);
        
        // If collection exists and has at least one document, create a category
        if (querySnapshot.size > 0) {
          const category = createCategoryFromCollectionName(collectionName, i + 1);
          detectedCategories.push(category);
          // Collection detected successfully
        } else {

        }
      } catch (error: any) {
        if (isPermissionError(error)) {

          // Still create category - might work when fetching products
          const category = createCategoryFromCollectionName(collectionName, i + 1);
          detectedCategories.push(category);
        } else {
          // Collection doesn't exist or other error - skip it

        }
      }
    }
    


    if (detectedCategories.length > 0) {
      // Categories detected successfully
    } else {




    }
    
    // Cache even if empty to prevent repeated queries
    if (detectedCategories.length > 0) {
      cache.set(CACHE_KEYS.allCategories, detectedCategories, 5 * 60 * 1000);
    }
    
    return detectedCategories;
    
  } catch (error: any) {

    return [];
  }
}

/**
 * Apply category filter to products array (client-side filtering)
 * 
 * FIX: "All Products not showing all items" and "Category shows no products"
 * This function ensures clean filtering logic that works correctly
 * 
 * @param allProducts - Complete list of all products
 * @param selectedCategory - Category ID to filter by, or 'all' for all products
 * @param categories - Array of category objects to resolve categoryId from collectionName
 * @returns Filtered products array
 */
export function applyCategoryFilter(
  allProducts: Product[],
  selectedCategory: string,
  categories: Category[]
): Product[] {
  // FIX: "All Products not showing all items" - If "all" is selected, return all products
  if (selectedCategory === 'all') {
    return allProducts;
  }
  
  // Find the selected category to get its collectionName and id
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  
  if (!selectedCategoryData) {
    return [];
  }
  
  // FIX: "Category shows no products" - Improved matching logic
  // Filter products that match the selected category
  const filtered = allProducts.filter(product => {
    // Standardize category field name - check multiple possible field names
    const productCategoryId = product.categoryId || 
                              (product as any).category || 
                              (product as any).Category ||
                              (product as any).catagory; // Handle typo
    
    // Match by category ID (primary match)
    if (productCategoryId === selectedCategory) {
      return true;
    }
    
    // Also check if product's categoryId matches the category's id
    // This handles cases where categoryId was set during getAllProducts()
    if (productCategoryId && selectedCategoryData.id === productCategoryId) {
      return true;
    }
    
    // Match by collection name (fallback for products without categoryId)
    const productCollectionName = (product as any).collectionName;
    const categoryCollectionName = selectedCategoryData.collectionName || selectedCategoryData.name;
    if (productCollectionName === categoryCollectionName) {
      return true;
    }
    
    return false;
  });
  
  return filtered;
}

