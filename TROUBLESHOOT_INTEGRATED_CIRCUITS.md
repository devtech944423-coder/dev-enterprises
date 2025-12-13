# Troubleshooting: Integrated_Circuits Products Not Showing

## Quick Diagnosis Steps

### Step 1: Check Browser Console

Open your browser console (F12) and look for these logs when the products page loads:

1. **Category Loading**:
   ```
   📋 Categories auto-detected: X
   ```
   - Does "Integrated Circuits" appear in the list?
   - What is the `collectionName` shown for it?

2. **Collection Fetching**:
   ```
   📦 Collections to fetch from: [...]
   ```
   - Is "Integrated_Circuits" (with underscore) in this list?
   - Or is it "Integrated Circuits" (with space)?

3. **Product Fetch Summary**:
   ```
   📊 Product Fetch Summary:
   ✅ "Integrated_Circuits": X products
   ```
   - How many products does it show?
   - Is it 0 or the correct number?

### Step 2: Check Your Firestore Database

1. **Check Collection Name**:
   - Go to Firebase Console → Firestore Database
   - Look at your collections list
   - Find the collection with Integrated Circuits products
   - **Note the EXACT name** (case-sensitive, including underscores/spaces)
   - Common variations:
     - `Integrated_Circuits` (with underscore) ✅
     - `Integrated Circuits` (with space)
     - `integrated_circuits` (lowercase)
     - `IntegratedCircuits` (no separator)

2. **Check _categories Collection**:
   - Open the `_categories` collection
   - Find the document for "Integrated Circuits"
   - Check the `collectionName` field:
     - It MUST match the exact collection name from step 1
     - Example: If collection is "Integrated_Circuits", then `collectionName: "Integrated_Circuits"`

### Step 3: Common Issues and Fixes

#### Issue 1: Collection Name Mismatch

**Problem**: Category document has wrong `collectionName`

**Example**:
```
Collection in Firestore: "Integrated_Circuits" (with underscore)
Category document collectionName: "Integrated Circuits" (with space) ❌
```

**Fix**:
1. Edit the category document in `_categories`
2. Change `collectionName` to match exactly: `"Integrated_Circuits"`
3. Save and refresh website

#### Issue 2: Category Document Missing

**Problem**: No document in `_categories` for Integrated Circuits

**Fix**: Create a new document:

```
Collection: _categories
Document ID: integrated-circuits (or any ID you prefer)

Fields:
{
  name: "Integrated Circuits",
  collectionName: "Integrated_Circuits",  ← Must match collection name exactly!
  icon: "🔌",
  gradient: "from-gray-900 to-black",
  description: "Explore our integrated circuits collection",
  order: 5
}
```

#### Issue 3: Case Sensitivity

**Problem**: Collection name case doesn't match

**Example**:
```
Firestore collection: "Integrated_Circuits"
Category collectionName: "integrated_circuits" (lowercase) ❌
```

**Fix**: Make sure `collectionName` matches the exact case

#### Issue 4: Collection Doesn't Exist

**Problem**: Collection "Integrated_Circuits" doesn't exist in Firestore

**Check**:
1. Go to Firestore Database
2. Look for a collection with a similar name
3. Maybe it's named differently?

**Fix**: Either:
- Rename your collection to match the category's `collectionName`
- Or update the category's `collectionName` to match the actual collection name

## Verification Checklist

After fixing, verify:

- [ ] Category document exists in `_categories` collection
- [ ] `collectionName` field matches Firestore collection name exactly (case-sensitive)
- [ ] Collection "Integrated_Circuits" exists in Firestore
- [ ] Collection has at least one product document
- [ ] Browser console shows: `✅ "Integrated_Circuits": X products` (where X > 0)
- [ ] Category appears in the category filter buttons
- [ ] Clicking the category shows products

## Debug Console Output

When working correctly, you should see:

```
📋 Categories auto-detected: 5
📋 Category to Collection mapping: [
  { categoryName: "Integrated Circuits", categoryId: "integrated-circuits", collectionName: "Integrated_Circuits" },
  ...
]
📦 Collections to fetch from: ["Integrated_Circuits", ...]
  📦 Fetching from collection: "Integrated_Circuits"
  ✅ Fetched 10 products from "Integrated_Circuits"
📊 Product Fetch Summary:
   ✅ "Integrated_Circuits": 10 products
✅ Successfully fetched 50 total products from 5 categories
```

If you see:
```
  ⚠️ "Integrated_Circuits": 0 products (collection might be empty or not exist)
```

Then check:
1. Does the collection exist?
2. Does it have products?
3. Does the `collectionName` match exactly?

## Still Not Working?

1. **Check Firestore Security Rules**:
   ```javascript
   match /Integrated_Circuits/{product} {
     allow read: if true; // Must allow public read
   }
   ```

2. **Check Browser Console for Errors**:
   - Look for permission errors
   - Look for "collection not found" errors
   - Look for network errors

3. **Verify Collection Structure**:
   - Collection exists: ✅
   - Has documents: ✅
   - Documents have required fields (name, description, etc.): ✅

4. **Contact Support**:
   - Share browser console logs
   - Share your Firestore structure screenshot
   - Share your _categories document structure


