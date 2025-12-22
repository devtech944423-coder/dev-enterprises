/**
 * Real-time listener functions for categories and products
 * These use Firestore's onSnapshot to automatically update when data changes
 */

import {
  collection,
  query,
  onSnapshot,
  Unsubscribe,
  QuerySnapshot,
  DocumentData,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { Category, Product } from './products';
import { getAllCategories, getAllProducts } from './products';
import { cache, CACHE_KEYS } from './cache';

/**
 * Set up real-time listener for categories
 * Automatically calls callback whenever categories change in Firebase
 */
export function subscribeToCategories(
  onCategoriesUpdate: (categories: Category[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  try {
    const categoriesRef = collection(db, '_categories');
    const categoriesQuery = query(categoriesRef);
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(
      categoriesQuery,
      async (snapshot: QuerySnapshot<DocumentData>) => {
        try {
          // Process categories the same way as getAllCategories does
          // For now, we'll fetch using the existing function and refresh
          // This ensures validation and filtering logic is reused
          // Invalidate cache to ensure fresh data
          cache.invalidate(CACHE_KEYS.allCategories);
          const categories = await getAllCategories();
          onCategoriesUpdate(categories);
        } catch (error: any) {
          if (onError) {
            onError(error);
          }
        }
      },
      (error) => {
        if (onError) {
          onError(error);
        }
      }
    );
    
    return unsubscribe;
  } catch (error: any) {
    if (onError) {
      onError(error);
    }
    // Return a no-op unsubscribe function
    return () => {};
  }
}

/**
 * Set up real-time listener for products from all categories
 * Automatically calls callback whenever products change in any category collection
 */
export function subscribeToAllProducts(
  onProductsUpdate: (products: Product[]) => void,
  onError?: (error: Error) => void,
  categories?: Category[],
  onCategoriesRefresh?: () => Promise<void>
): Unsubscribe {
  const unsubscribes: Unsubscribe[] = [];
  let isActive = true;
  const initialSnapshots = new Set<string>(); // Track which collections have received initial snapshot
  
  // If categories are provided, set up listeners for each category collection
  if (categories && categories.length > 0) {
    categories.forEach((category) => {
      const collectionName = category.collectionName || category.name;
      
      try {
        const productsRef = collection(db, collectionName);
        const productsQuery = query(productsRef);
        
        const unsubscribe = onSnapshot(
          productsQuery,
          async (snapshot: QuerySnapshot<DocumentData>) => {
            if (!isActive) return;
            
            // Check if this is the initial snapshot (all changes will be 'added')
            const isInitialSnapshot = !initialSnapshots.has(collectionName);
            if (isInitialSnapshot) {
              initialSnapshots.add(collectionName);
              // Skip refresh on initial snapshot - we already load initial products separately
              return;
            }
            
            // Check for changes (additions, modifications, deletions)
            const changes = snapshot.docChanges();
            const hasDeletions = changes.some(change => change.type === 'removed');
            const hasAdditions = changes.some(change => change.type === 'added');
            const hasModifications = changes.some(change => change.type === 'modified');
            
            // Only refresh if there are actual changes (not initial snapshot)
            if (hasDeletions || hasAdditions || hasModifications) {
              // CRITICAL FIX: Debounce rapid changes to prevent CPU overload
              // Instead of calling getAllProducts() immediately, batch changes
              // This prevents multiple expensive queries when multiple collections update
              
              const isCollectionEmpty = snapshot.size === 0;
              
              // For modifications only, skip full refresh (too expensive)
              // Only refresh on actual additions/deletions
              if (hasModifications && !hasDeletions && !hasAdditions) {
                // Skip expensive getAllProducts() for modifications
                // Client can handle individual product updates if needed
                return;
              }
              
              // Debounce: Wait longer to batch multiple rapid changes
              // This prevents CPU spikes when multiple collections update simultaneously
              let delay = 1000; // Increased from 200ms to 1s to batch changes
              if (hasDeletions) {
                delay = 1500; // Longer delay for deletions to ensure Firestore has processed
              }
              
              await new Promise(resolve => setTimeout(resolve, delay));
              
              // Check if still active after delay (component might have unmounted)
              if (!isActive) return;
              
              try {
                // OPTIMIZATION: Only fetch all products if we really need to
                // For single collection changes, we could update incrementally
                // But for now, we'll keep it simple but debounced
                // Invalidate cache before fetching to ensure fresh data
                cache.invalidate(CACHE_KEYS.allProducts);
                const allProducts = await getAllProducts();
                if (isActive) {
                  onProductsUpdate(allProducts);
                }
                
                // Only refresh categories on deletions (not on every change)
                if (hasDeletions && onCategoriesRefresh && isActive) {
                  const categoryDelay = isCollectionEmpty ? 1000 : 800;
                  await new Promise(resolve => setTimeout(resolve, categoryDelay));
                  
                  if (!isActive) return;
                  
                  try {
                    // Invalidate cache before refresh
                    cache.invalidate(CACHE_KEYS.allCategories);
                    await onCategoriesRefresh();
                  } catch (categoryError: any) {
                    // Silently fail - don't retry to avoid CPU spikes
                  }
                }
              } catch (error: any) {
                if (onError && isActive) {
                  onError(error);
                }
              }
            }
          },
          (error) => {
            if (onError) {
              onError(error);
            }
          }
        );
        
        unsubscribes.push(unsubscribe);
      } catch (error: any) {
        // Silently fail for individual collection listener setup
      }
    });
  }
  
  // Return function to unsubscribe from all listeners
  return () => {
    isActive = false;
    unsubscribes.forEach(unsubscribe => unsubscribe());
  };
}

/**
 * Set up real-time listener that monitors both categories and products
 * Automatically refreshes products when categories change (in case new collections are added)
 * FIX: Now properly re-subscribes to product listeners when categories change
 */
export function subscribeToProductsAndCategories(
  onCategoriesUpdate: (categories: Category[]) => void,
  onProductsUpdate: (products: Product[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const allUnsubscribes: Unsubscribe[] = [];
  let productListenersUnsubscribe: Unsubscribe | null = null;
  let currentCategories: Category[] = [];
  let isActive = true;
  
  // Helper function to set up product listeners for current categories
  const setupProductListeners = (categories: Category[]) => {
    // Clean up old product listeners first
    if (productListenersUnsubscribe) {
      productListenersUnsubscribe();
      productListenersUnsubscribe = null;
    }
    
    // Set up new product listeners with updated categories
    if (isActive && categories.length > 0) {
      productListenersUnsubscribe = subscribeToAllProducts(
        async (products) => {
          if (isActive) {
            onProductsUpdate(products);
          }
        },
        (err) => {
          if (isActive && onError) {
            onError(err);
          }
        },
        categories,
        // Category refresh callback - refreshes categories when products are deleted
        async () => {
          if (!isActive) {
            return;
          }
          try {
            // Invalidate cache before refresh
            cache.invalidate(CACHE_KEYS.allCategories);
            const updatedCategories = await getAllCategories();
            if (isActive) {
              currentCategories = updatedCategories;
              onCategoriesUpdate(updatedCategories);
            }
          } catch (error: any) {
            throw error;
          }
        }
      );
    }
  };
  
  // Set up categories listener first
  const categoriesUnsubscribe = subscribeToCategories(
    (categories) => {
      if (!isActive) return;
      
      currentCategories = categories;
      onCategoriesUpdate(categories);
      
      // Re-subscribe to product listeners with new categories
      // This ensures we're listening to all current collections
      setupProductListeners(categories);
      
      // Also refresh products immediately to catch any changes
      cache.invalidate(CACHE_KEYS.allProducts);
      getAllProducts()
        .then((products) => {
          if (isActive) {
            onProductsUpdate(products);
          }
        })
        .catch((error) => {
          if (isActive && onError) {
            onError(error);
          }
        });
    },
    (err) => {
      if (isActive && onError) {
        onError(err);
      }
    }
  );
  
  allUnsubscribes.push(categoriesUnsubscribe);
  
  // Set up initial categories and product listeners
  // Don't invalidate cache on initial load - use cache if available
  getAllCategories()
    .then((initialCategories) => {
      if (!isActive) return;
      
      currentCategories = initialCategories;
      onCategoriesUpdate(initialCategories);
      
      // Set up initial product listeners
      setupProductListeners(initialCategories);
      
      // Also fetch initial products (will use cache if available)
      return getAllProducts();
    })
    .then((initialProducts) => {
      if (isActive && initialProducts) {
        onProductsUpdate(initialProducts);
      }
    })
    .catch((error) => {
      if (isActive && onError) {
        onError(error);
      }
    });
  
  // Return function to unsubscribe from all listeners
  return () => {
    isActive = false;
    
    // Unsubscribe from product listeners
    if (productListenersUnsubscribe) {
      productListenersUnsubscribe();
    }
    
    // Unsubscribe from all other listeners
    allUnsubscribes.forEach(unsubscribe => unsubscribe());
  };
}

