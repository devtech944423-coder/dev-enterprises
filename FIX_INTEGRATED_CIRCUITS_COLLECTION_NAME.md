# Fix: Integrated_Circuits Collection Name Mismatch

## Problem Identified

From the console logs, the issue was clear:

1. **Document ID in _categories**: `Integrated_Circuits` (with underscore)
2. **Category name field**: "Integrated Circuits" (with space)
3. **Collection being searched**: "Integrated Circuits" (with space) ❌
4. **Actual Firestore collection**: `Integrated_Circuits` (with underscore) ✅
5. **Result**: 0 products fetched because the collection name didn't match

## Root Cause

When processing category documents from `_categories` collection:
- The system was using the category name ("Integrated Circuits") as the collection name
- But the actual Firestore collection is named `Integrated_Circuits` (matching the document ID)
- Since there's no explicit `collectionName` field in the category document, it fell back to the wrong name

## Solution Applied

Updated the collection name resolution logic in `lib/firebase/products.ts`:

**Before:**
```typescript
const finalCollectionName = data.collectionName || data.collection || finalCategoryName;
```

**After:**
```typescript
let finalCollectionName: string;
if (data.collectionName || data.collection) {
  finalCollectionName = data.collectionName || data.collection || '';
} else {
  // No explicit collectionName - use document ID as it typically matches the collection name
  finalCollectionName = doc.id || finalCategoryName;
}
```

### Key Changes:
1. **Document ID Priority**: When no explicit `collectionName` field exists, the system now uses the document ID (which usually matches the Firestore collection name)
2. **Better Fallback**: Document IDs in `_categories` often match the actual collection names in Firestore
3. **Improved Logging**: Added logging to show when document ID is used vs category name

## Expected Behavior After Fix

1. **Category Detection**: 
   - Document ID: `Integrated_Circuits`
   - Category Name: "Integrated Circuits" (for display)
   - Collection Name: `Integrated_Circuits` (from document ID) ✅

2. **Product Fetching**:
   - System will now fetch from collection `Integrated_Circuits` ✅
   - Products should be found and displayed ✅

3. **Console Output**:
   ```
   Category: "Integrated Circuits" → Collection: "Integrated_Circuits"
   Document ID: "Integrated_Circuits"
   ℹ️ Using document ID "Integrated_Circuits" as collection name (differs from category name "Integrated Circuits")
   ✅ Fetched X products from "Integrated_Circuits"
   ```

## Testing

After the fix, verify:

1. **Category appears in filter**: "Integrated Circuits" should appear in the category filter buttons
2. **Products show in "All Products"**: Products from `Integrated_Circuits` collection should appear
3. **Category filter works**: Clicking "Integrated Circuits" should show only those products
4. **Console logs**: Check that collection name is `Integrated_Circuits` (with underscore)

## Alternative Solution (If Fix Doesn't Work)

If you want to be explicit, you can add a `collectionName` field to your category document:

1. Go to Firebase Console → Firestore → `_categories` collection
2. Open the `Integrated_Circuits` document
3. Add a field:
   - **Field name**: `collectionName`
   - **Field value**: `Integrated_Circuits`
4. Save the document

This ensures the system knows exactly which collection to use.

## Files Modified

- `lib/firebase/products.ts` - Updated collection name resolution logic

## Related Issues

This fix also applies to any other categories where:
- Document ID has underscores (e.g., `Some_Category`)
- Category name has spaces (e.g., "Some Category")
- No explicit `collectionName` field exists

The system will now automatically use the document ID as the collection name, which is the most common pattern in Firestore.

