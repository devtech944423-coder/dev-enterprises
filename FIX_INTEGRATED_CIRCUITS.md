# Fix: Integrated Circuits Products Not Showing

If products in the "Integrated Circuits" category are not showing, follow these steps:

## 🔍 Step 1: Check the Category Document in _categories Collection

1. Go to **Firebase Console** → **Firestore Database**
2. Open the `_categories` collection
3. Find the document for "Integrated Circuits"
4. Check the `collectionName` field

**Important:** The `collectionName` field must match **exactly** the Firestore collection name where your products are stored.

### Example - Correct Setup:

If your products are in a collection called **"Integrated Circuits"**:
```javascript
{
  name: "Integrated Circuits",
  collectionName: "Integrated Circuits",  // ✅ Must match exactly
  icon: "🔌",
  order: 1
}
```

If your products are in a collection called **"IntegratedCircuits"** (no space):
```javascript
{
  name: "Integrated Circuits",
  collectionName: "IntegratedCircuits",  // ✅ Must match exactly
  icon: "🔌",
  order: 1
}
```

## 🔍 Step 2: Verify Your Firestore Collection Name

1. Go to **Firestore Database**
2. Look at your collections list
3. Find the collection that contains your Integrated Circuits products
4. **Note the exact name** (including spaces, capitalization, etc.)

Common variations:
- `Integrated Circuits` (with space)
- `IntegratedCircuits` (no space, camelCase)
- `integrated-circuits` (lowercase with hyphen)
- `integrated_circuits` (lowercase with underscore)

## 🔧 Step 3: Update the collectionName Field

Once you know the exact collection name:

1. Go to `_categories` collection
2. Find the "Integrated Circuits" document
3. Edit the document
4. Set the `collectionName` field to match **exactly** your Firestore collection name
5. Save

## 📋 Step 4: Check Browser Console

After updating, refresh your browser and check the console for:

```
🔍 Fetching products for category:
   Category ID: integrated-circuits
   Collection Name: "Integrated Circuits"  ← Check this matches your Firestore collection
```

If you see:
```
⚠️ No products found in collection "Integrated Circuits"
```

Check:
1. Does the collection name match exactly? (case-sensitive!)
2. Does the collection exist in Firestore?
3. Does the collection have product documents?
4. Are Firestore rules allowing read access?

## 🐛 Common Issues

### Issue 1: Collection Name Mismatch

**Symptom:** Category shows but no products

**Cause:** `collectionName` in `_categories` doesn't match actual collection name

**Fix:** Update `collectionName` field to match exactly

### Issue 2: Collection Name Missing

**Symptom:** Category shows but uses default 'products' collection

**Cause:** `collectionName` field is missing from category document

**Fix:** Add `collectionName` field to the category document

### Issue 3: Collection Name Has Wrong Case

**Symptom:** Category shows but no products

**Cause:** Collection name is case-sensitive

**Fix:** Ensure exact case match (e.g., "Integrated Circuits" vs "integrated circuits")

## ✅ Verification Checklist

- [ ] Category document in `_categories` has `collectionName` field
- [ ] `collectionName` matches Firestore collection name exactly
- [ ] Firestore collection exists
- [ ] Collection has product documents
- [ ] Firestore rules allow reading from that collection
- [ ] Browser console shows correct collection name when fetching

## 🔍 Debugging Commands

Check browser console for these logs when clicking the category:

```
🔍 Fetching products for category:
   Category ID: [category-id]
   Collection Name: "[collection-name]"  ← Should match your Firestore collection
```

If collection name is wrong, update the `collectionName` field in `_categories`.

## 📝 Quick Fix Template

In your `_categories` collection document for "Integrated Circuits":

```javascript
{
  name: "Integrated Circuits",           // Display name
  collectionName: "YOUR_COLLECTION_NAME", // ← MUST match Firestore collection exactly!
  icon: "🔌",
  order: 1
}
```

Replace `YOUR_COLLECTION_NAME` with your actual Firestore collection name!




