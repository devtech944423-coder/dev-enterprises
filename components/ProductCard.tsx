import Image from 'next/image';
import { memo } from 'react';
import { getStorageUrl } from '@/lib/firebase/storage';

export interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  imageUrl?: string;
  className?: string;
}

// Generate placeholder image URL based on product name
const getPlaceholderImage = (name: string): string => {
  // Using Unsplash API with electronics/technology themed images
  // Different image IDs for variety based on product name hash
  const imageIds = [
    '1518770660439-4636190af475', // Electronics
    '1558618666-fcd25c85cd64',     // Circuit board
    '1555949963-aa79dcee981c',     // Technology
    '1550751827-4bd374c3f58b',     // Components
    '1581091226825-a6a2a5aee158',   // Electronics components
  ];
  
  // Simple hash to get consistent image for same product name
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageId = imageIds[hash % imageIds.length];
  
  return `https://images.unsplash.com/photo-${imageId}?w=400&h=300&fit=crop&q=80`;
};

// Check if imageUrl is a Firebase Storage path (doesn't start with http)
const isFirebaseStoragePath = (url: string): boolean => {
  return !url.startsWith('http://') && !url.startsWith('https://');
};

const ProductCard = memo(function ProductCard({
  name,
  description,
  imageUrl,
  className = '',
}: ProductCardProps) {
  // If imageUrl is provided and is a Firebase Storage path, convert it to full URL
  // Otherwise, use the URL as-is or fallback to placeholder
  let imageSrc: string;
  if (imageUrl) {
    if (isFirebaseStoragePath(imageUrl)) {
      imageSrc = getStorageUrl(imageUrl);
    } else {
      imageSrc = imageUrl; // Already a full URL
    }
  } else {
    imageSrc = getPlaceholderImage(name);
  }

  return (
    <div
      className={`
        bg-white rounded-lg overflow-hidden border border-gray-200 
        hover:border-[#3b82f6] hover:shadow-lg transition-all duration-200 
        shadow-sm group
        ${className}
      `}
      role="article"
      aria-label={`Product: ${name}`}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 md:h-56 bg-gray-100 overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
});

export default ProductCard;

