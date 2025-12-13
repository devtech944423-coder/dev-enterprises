import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from './config';

/**
 * Get download URL for an image from Firebase Storage
 */
export async function getImageUrl(imagePath: string): Promise<string | null> {
  try {
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    // Error getting image URL
    return null;
  }
}

/**
 * Get all images from a storage folder
 */
export async function getImagesFromFolder(folderPath: string): Promise<string[]> {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    
    const urls: string[] = [];
    for (const itemRef of result.items) {
      const url = await getDownloadURL(itemRef);
      urls.push(url);
    }
    
    return urls;
  } catch (error) {
    // Error getting images from folder
    return [];
  }
}

/**
 * Construct Firebase Storage URL directly (for public images)
 */
export function getStorageUrl(imagePath: string): string {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(imagePath)}?alt=media`;
}

