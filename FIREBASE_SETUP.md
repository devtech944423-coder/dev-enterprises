# Firebase Setup Guide for Dev Tech Enterprises

This guide will help you set up Firebase Firestore Database and Storage for your Next.js website.

## Prerequisites

- A Google account
- Firebase project created

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: **Dev Tech Enterprises** (or your preferred name)
4. Disable Google Analytics (optional) or enable it if you want
5. Click "Create project"
6. Wait for project creation to complete

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select a location (choose closest to your users)
5. Click "Enable"

### Firestore Security Rules (Important!)

The app uses category-based collections where each category (like "Electronics", "Sweets") is its own collection, and products are documents within those collections.

Update your Firestore rules in Firebase Console:

1. Go to **Firestore Database** → **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Each category is a collection, products are documents within it
    // Allow public read access, but require auth for writes
    match /{category}/{product} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

**Note:** These rules allow public read access (no authentication required) but require authentication for write operations. This allows anyone to view products without signing in.

## Step 3: Enable Firebase Storage

1. In Firebase Console, go to **Build** → **Storage**
2. Click "Get started"
3. Start in **test mode** (for development)
4. Use the same location as Firestore
5. Click "Done"

### Storage Security Rules

Update Storage rules to allow read access:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only allow reads for now
    }
  }
}
```

## Step 4: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. Click the **Web icon** `</>` to add a web app
5. Register app with nickname: **Dev Tech Enterprises Web**
6. Copy the Firebase configuration object

You'll see something like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Step 5: Add Configuration to Your Project

1. Open `.env.local` file in your project root
2. Add your Firebase configuration values:

```env
# Formspree Configuration
NEXT_PUBLIC_FORMSPREE_ID=xjkqgnej

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your actual Firebase config values.

## Step 6: Create Firestore Collections

### Understanding the Collection Structure

The app uses **category-based collections**. Each category (like "Electronics", "Sweets") is a separate Firestore collection, and products are documents within those collections.

For example:
- Collection: `Electronics`
  - Document: `product1` (with fields: name, description, price, etc.)
  - Document: `product2`
- Collection: `Sweets`
  - Document: `product1`
  - Document: `product2`

**Important:** Collection names must match exactly what you configure in `lib/firebase/categories-config.ts`.

### Configure Category Collections

The app automatically detects categories from collection names. To add categories:

1. Open `lib/firebase/categories-config.ts` in your project
2. Add your collection names to the `collectionNamesToCheck` array:

```typescript
export const collectionNamesToCheck: string[] = [
  'Electronics',
  'Sweets',
  // Add more collection names here
];
```

3. Create collections in Firestore with these exact names

### Create Category Collections and Products

For each category collection (e.g., "Electronics", "Sweets"):

1. Click "Start collection"
2. Collection ID: Use the exact name from `categories-config.ts` (e.g., `Electronics`)
3. Add product documents with these fields:

**Example Product Document:**
- Document ID: Auto-generate (e.g., `product1`)
- Fields:
  - `name` (string): `Product Name` (e.g., `Laptop`)
  - `description` (string): `Product description`
  - `imageUrl` (string): Optional - Firebase Storage path (e.g., `products/electronics/laptop.jpg`)
  - `price` (number): Optional
  - `inStock` (boolean): Optional - `true`
  - `createdAt` (timestamp): Current timestamp

**Example: Creating "Electronics" Collection**
1. Start collection → Collection ID: `Electronics`
2. Add first product → Document ID: auto-generate → Add fields: name, description, etc.
3. Repeat for more products in the same collection

**Important:** 
- Collection names must match exactly what's in `categories-config.ts`
- The `imageUrl` should be the path in Firebase Storage (e.g., `products/electronics/image.jpg`), not the full URL
- The app will construct the full URL automatically

## Step 7: Upload Images to Firebase Storage

1. Go to **Storage** in Firebase Console
2. Click "Get started" if not already done
3. Create folder structure:
   - `products/`
     - `semiconductors/`
     - `sensors/`
     - `cables/`
     - `switches/`
     - `lab-equipment/`

4. Upload product images to respective folders
5. After uploading, you can get the download URL or use the path format: `products/category/image.jpg`

## Step 8: Update Product Documents with Image URLs

For each product in Firestore, set the `imageUrl` field to the Storage path:
- Example: `products/semiconductors/microprocessors.jpg`

The app will automatically convert this to a full Firebase Storage URL.

## Step 9: Test Your Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/products
3. You should see products loading from Firestore
4. Check browser console for any errors

## Troubleshooting

### Products not loading?
- Check browser console for errors
- Verify Firebase config in `.env.local`
- Ensure Firestore security rules allow public read access (`allow read: if true`)
- Check that collections and documents exist in Firestore
- Verify collection names in `lib/firebase/categories-config.ts` match Firestore collection names exactly

### Images not displaying?
- Verify Storage security rules allow read access
- Check that image paths in Firestore match Storage paths
- Ensure images are uploaded to Storage
- Check browser console for image loading errors

### Environment variables not working?
- Make sure all variables start with `NEXT_PUBLIC_`
- Restart the dev server after adding/changing env variables
- Check that `.env.local` is in the project root

## Production Deployment

When deploying to Vercel, Netlify, or other platforms:

1. Add all environment variables in your hosting platform's dashboard
2. Use the same variable names from `.env.local`
3. Redeploy your application

## Next Steps

- Add more products to Firestore
- Upload product images to Storage
- Customize product fields as needed
- Set up proper security rules for production

