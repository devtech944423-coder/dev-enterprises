# Automatic Category Detection Setup

The app now supports **truly automatic category detection** directly from your Firestore database! No need to manually update code files.

## How It Works

The system uses a **two-tier approach**:

1. **Primary Method (Automatic)**: Reads from a `_categories` collection in Firestore
2. **Fallback Method**: Uses the config file if metadata collection doesn't exist

This means you can manage all your categories directly in Firebase Console - no code changes needed!

## Setup Instructions

### Step 1: Create the Categories Collection

1. Go to **Firebase Console** → **Firestore Database**
2. Click **"Start collection"**
3. Collection ID: `_categories` (exact spelling with underscore prefix)
4. Create documents for each category collection you have

### Step 2: Add Category Collection Names

For each category collection you have (Electronics, Sweets, Beverage, etc.), create a document:

**Document Format Options:**

**Option A - Simple (Recommended):**
- Document ID: Auto-generate (or use the collection name)
- Add field:
  - Field name: `collectionName`
  - Type: `string`
  - Value: `Electronics` (the exact collection name)

**Option B - Using Document ID:**
- Document ID: `Electronics` (use the collection name as the ID)
- No fields needed (document ID will be used)

**Example Documents:**

1. **Document 1:**
   - Document ID: `electronics` (or auto-generate)
   - Fields:
     - `collectionName` (string): `Electronics`

2. **Document 2:**
   - Document ID: `sweets` (or auto-generate)
   - Fields:
     - `collectionName` (string): `Sweets`

3. **Document 3:**
   - Document ID: `beverage` (or auto-generate)
   - Fields:
     - `collectionName` (string): `Beverage`

### Step 3: Update Firestore Rules

Make sure your Firestore rules allow reading from the _categories collection. The rules file (`firestore.rules`) already includes this:

```javascript
match /_categories/{document} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

Copy the entire rules from `firestore.rules` file and publish them in Firebase Console.

### Step 4: Verify Your Category Collections Exist

Make sure you have collections in Firestore with the exact names listed in `_categories`:
- `Electronics` (with products)
- `Sweets` (with products)
- `Beverage` (with products)
- etc.

### Step 5: Refresh Your App

1. Refresh your browser
2. The app will automatically detect categories from the database
3. Check browser console (F12) for detection logs

## How to Add New Categories

### Method 1: Add to Database (Automatic - Recommended)

1. Create a new collection in Firestore (e.g., `Clothing`)
2. Add at least one product document to it
3. Add a new document to `_categories` collection:
   - Field: `collectionName` = `Clothing`
4. Refresh your app - it will automatically appear!

### Method 2: Fallback (Config File)

If the metadata collection doesn't exist or is empty, the app falls back to checking collections listed in `lib/firebase/categories-config.ts`.

## Verification

After setup, check your browser console (F12). You should see logs like:

```
✅ Using collection names from database metadata
📋 Found 3 collection names in metadata: Electronics, Sweets, Beverage
✓ Detected collection: Electronics (10 documents)
✓ Detected collection: Sweets (5 documents)
✓ Detected collection: Beverage (8 documents)
✅ Auto-detection complete:
   Categories detected: 3
```

## Troubleshooting

### Categories not showing?

1. **Check _categories collection exists:**
   - Go to Firestore Database
   - Look for `_categories` collection (with underscore prefix)
   - Verify it has documents

2. **Check collection names match exactly:**
   - The `collectionName` in metadata must match the actual collection name exactly (case-sensitive)
   - Example: If your collection is `Electronics`, metadata must say `Electronics` (not `electronics`)

3. **Check collections have products:**
   - Empty collections won't be detected as categories
   - Each collection needs at least one product document

4. **Check Firestore rules:**
   - Rules must allow reading from both `_categories` and your category collections

5. **Check browser console:**
   - Look for error messages or warnings
   - Check which detection method is being used

### Still using config file?

If you see this in console:
```
📝 Using collection names from config file (fallback)
```

It means the `_categories` collection doesn't exist or is empty. Create it following Step 1 above.

## Benefits

✅ **No code changes needed** - Manage categories entirely in Firebase Console  
✅ **Truly automatic** - App discovers categories from database  
✅ **Easy to update** - Just add/remove documents in metadata collection  
✅ **Database-driven** - Single source of truth in Firestore  

## Example: Complete Setup

Here's what your Firestore structure should look like:

```
Firestore Database
├── _categories (collection)
│   ├── doc1: { collectionName: "Electronics" }
│   ├── doc2: { collectionName: "Sweets" }
│   └── doc3: { collectionName: "Beverage" }
├── Electronics (collection)
│   ├── product1: { name: "Laptop", ... }
│   └── product2: { name: "Phone", ... }
├── Sweets (collection)
│   ├── product1: { name: "Chocolate", ... }
│   └── product2: { name: "Candy", ... }
└── Beverage (collection)
    ├── product1: { name: "Coffee", ... }
    └── product2: { name: "Tea", ... }
```

That's it! The app will automatically detect all three categories.

