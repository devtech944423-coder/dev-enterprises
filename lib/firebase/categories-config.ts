import { Category } from './products';

/**
 * AUTO-DETECTION CONFIGURATION
 * 
 * IMPORTANT: The app only checks collections listed in this array.
 * It does NOT automatically scan all Firestore collections.
 * 
 * To add a new category:
 * 1. Add the exact collection name (case-sensitive) to this array
 * 2. Save the file and refresh your browser
 * 3. The app will check if the collection exists and has products
 * 4. If found, it will automatically create a category with smart defaults
 * 
 * The app will automatically:
 * 1. Check each collection name in this list
 * 2. Detect which collections exist and have products
 * 3. Create categories automatically with icons and gradients
 */

export const collectionNamesToCheck: string[] = [
  'semiconductors',
  'sensors',
  'cables',
  'switches',
  'lab-equipment',
  // Add more collection names here (must match Firestore collection names exactly):
  // 'integrated-circuits',
  // 'wires',
  // etc...
];

/**
 * Smart defaults for category metadata based on collection name
 */
function getCategoryDefaults(collectionName: string): Omit<Category, 'id' | 'collectionName'> {
  const name = collectionName;
  const lowerName = collectionName.toLowerCase();
  
  // Icon mapping based on collection name
  const iconMap: Record<string, string> = {
    'electronics': '🔌',
    'sweets': '🍬',
    'beverage': '🥤',
    'beverages': '🥤',
    'drink': '🥤',
    'drinks': '🥤',
    'clothing': '👕',
    'books': '📚',
    'home': '🏠',
    'appliances': '🏠',
    'food': '🍔',
    'toys': '🧸',
    'sports': '⚽',
    'beauty': '💄',
    'health': '💊',
    'garden': '🌱',
    'automotive': '🚗',
  };
  
  // Find matching icon
  let icon = '📦'; // default
  for (const [key, value] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) {
      icon = value;
      break;
    }
  }
  
  // Gradient colors - black gradient variations
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
  
  // Use collection name to pick a consistent gradient
  const hash = collectionName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradient = gradients[hash % gradients.length];
  
  return {
    name: name,
    icon: icon,
    gradient: gradient,
    description: `Explore our ${name.toLowerCase()} collection`,
  };
}

/**
 * Create category ID from collection name (URL-friendly)
 */
function createCategoryId(collectionName: string): string {
  return collectionName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert collection name to Category object with smart defaults
 */
export function createCategoryFromCollectionName(collectionName: string, order: number = 999): Category {
  const defaults = getCategoryDefaults(collectionName);
  return {
    id: createCategoryId(collectionName),
    collectionName: collectionName,
    order: order,
    ...defaults,
  };
}

