# Fix: Integrated_Circuits Products Not Showing

## Issue
Products in the "Integrated_Circuits" collection are not showing on the website.

## Possible Causes

1. **Category not in _categories collection**: The category document might not exist in `_categories`
2. **Collection name mismatch**: The `collectionName` field in the category document might not match "Integrated_Circuits" exactly
3. **Category name mismatch**: The category might be named differently (e.g., "Integrated Circuits" with space instead of underscore)

## Solution Steps

### Step 1: Check Your Firestore Structure

1. Go to Firebase Console → Firestore Database
2. Check if you have a collection named **"Integrated_Circuits"** (exact spelling with underscore)
3. Check if this collection has products in it

### Step 2: Check _categories Collection

1. Open the `_categories` collection
2. Look for a document related to "Integrated Circuits"
3. Check the document fields:
   - Does it have a `name` field? (e.g., "Integrated Circuits")
   - Does it have a `collectionName` field? (should be "Integrated_Circuits")
   - What is the document ID?

### Step 3: Verify Collection Name Match

The `collectionName` field in your category document **MUST** match the exact Firestore collection name:
- ✅ Correct: `collectionName: "Integrated_Circuits"` (matches collection name)
- ❌ Wrong: `collectionName: "Integrated Circuits"` (has space, doesn't match)
- ❌ Wrong: `collectionName: "integrated_circuits"` (wrong case)

### Step 4: Fix the Category Document

If the category document exists but has wrong `collectionName`:

1. Edit the category document in `_categories` collection
2. Set `collectionName` field to: **"Integrated_Circuits"** (exact match)
3. Save the document
4. Refresh your website

### Step 5: Create Category Document (if missing)

If the category document doesn't exist in `_categories`, create one:

**Document ID**: `integrated-circuits` (or any ID you prefer)

**Fields**:
```javascript
{
  name: "Integrated Circuits",           // Display name (can have spaces)
  collectionName: "Integrated_Circuits", // MUST match Firestore collection name exactly
  icon: "🔌",                             // Optional
  gradient: "from-gray-900 to-black",    // Optional
  description: "Explore our integrated circuits collection", // Optional
  order: 5                                // Optional (for sorting)
}
```

## Quick Diagnostic

Open your browser console (F12) and check for these logs:

1. **Category loading**: Look for "Categories auto-detected" - is "Integrated Circuits" in the list?
2. **Collection fetching**: Look for "Fetching from collection: Integrated_Circuits" - is this logged?
3. **Product count**: Look for "Fetched X products from Integrated_Circuits" - is the count 0 or correct?

## Example Category Document

Here's what your category document should look like:

```
Collection: _categories
Document ID: integrated-circuits

Fields:
├── name: "Integrated Circuits"
├── collectionName: "Integrated_Circuits"  ← Must match collection name exactly!
├── icon: "🔌"
├── gradient: "from-gray-900 to-black"
├── description: "High-quality integrated circuits"
└── order: 5
```

## Common Issues

### Issue 1: Collection Name Has Underscore
- **Collection**: "Integrated_Circuits" (with underscore)
- **Category collectionName**: "Integrated Circuits" (with space)
- **Fix**: Change category `collectionName` to "Integrated_Circuits"

### Issue 2: Category Not Detected
- Category document missing from `_categories`
- **Fix**: Create category document as shown above

### Issue 3: Permission Error
- Firestore rules blocking read access
- **Fix**: Check your Firestore security rules allow reading from "Integrated_Circuits" collection

## Testing

After fixing:

1. Refresh your website
2. Check browser console for logs
3. Verify "Integrated Circuits" appears in category filters
4. Click on "Integrated Circuits" category
5. Verify products appear

## Still Not Working?

Check the browser console for:
- Error messages
- Warning messages about collection names
- Logs showing which collections were fetched
- Logs showing product counts per collection


