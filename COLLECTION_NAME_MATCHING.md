# Collection Name Matching Guide

## ⚠️ Important: Collection Name Must Match Exactly

When you have a category document in `_categories` with only a `name` field (no `collectionName`), the system uses the `name` as the collection name.

This means:
- **Category name** = **Firestore collection name** (must match exactly!)

## 🔍 Current Setup

Your category documents likely look like this:
```javascript
{
  name: "Integrated Circuits"
}
```

The system will try to fetch products from a collection named: **"Integrated Circuits"**

## ❌ Problem

If your actual Firestore collection has a different name, products won't be found!

Examples of mismatches:
- Category name: `"Integrated Circuits"` (with space)
- Collection name: `"IntegratedCircuits"` (no space) ❌ Won't match!
- Collection name: `"integrated-circuits"` (lowercase, hyphen) ❌ Won't match!
- Collection name: `"integrated_circuits"` (underscore) ❌ Won't match!

## ✅ Solution Options

### Option 1: Add `collectionName` Field (Recommended)

Add a separate `collectionName` field to your category document:

```javascript
{
  name: "Integrated Circuits",           // Display name (can be anything)
  collectionName: "IntegratedCircuits"   // Exact Firestore collection name
}
```

**Benefits:**
- Display name can be different from collection name
- More flexible
- Clear separation of concerns

### Option 2: Match Collection Name Exactly

Ensure your Firestore collection name matches the `name` field exactly:

If your category has:
```javascript
{
  name: "Integrated Circuits"
}
```

Then your Firestore collection **must** be named exactly: `"Integrated Circuits"` (with space, same capitalization)

## 🔧 How to Fix "Integrated Circuits" Issue

### Step 1: Check Your Firestore Collection Name

1. Go to **Firebase Console** → **Firestore Database**
2. Look at your collections list
3. Find the collection with Integrated Circuits products
4. **Note the exact name** (spaces, capitalization, etc.)

### Step 2: Update Your Category Document

Go to `_categories` collection → Find "Integrated Circuits" document

**If collection is named exactly "Integrated Circuits":**
- No change needed! It should work.

**If collection has a different name (e.g., "IntegratedCircuits"):**
- Add a `collectionName` field:
```javascript
{
  name: "Integrated Circuits",
  collectionName: "IntegratedCircuits"  // ← Add this field with exact collection name
}
```

### Step 3: Verify

1. Refresh your app
2. Click "Integrated Circuits" category
3. Check browser console - it should show:
```
Collection Name: "IntegratedCircuits"  // ← Should match your Firestore collection
```

## 📋 Example Document Structures

### Example 1: Using name as collection name
```javascript
// Category document
{
  name: "Electronics"  // Collection name will also be "Electronics"
}

// Firestore collection
Electronics (collection) ✅ Matches!
```

### Example 2: Using separate collectionName
```javascript
// Category document
{
  name: "Integrated Circuits",        // Display name
  collectionName: "IntegratedCircuits" // Actual collection name
}

// Firestore collection
IntegratedCircuits (collection) ✅ Matches collectionName!
```

## 🎯 Quick Fix for Your Case

1. Check what your Firestore collection is actually named (for Integrated Circuits products)
2. If it's NOT "Integrated Circuits", add a `collectionName` field to your `_categories` document:

```javascript
{
  name: "Integrated Circuits",
  collectionName: "[YOUR_ACTUAL_COLLECTION_NAME]"  // ← Exact name from Firestore
}
```

3. Save and refresh!

That's it! The products should now show up. 🎉




