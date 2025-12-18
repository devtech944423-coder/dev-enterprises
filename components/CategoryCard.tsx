'use client';

import Link from 'next/link';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Category, getProductsByCategory, Product } from '@/lib/firebase/products';
import { getStorageUrl } from '@/lib/firebase/storage';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = memo(function CategoryCard({ category }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const cachedPreviewImagesRef = useRef<string[] | null>(null);
  const requestSeqRef = useRef(0);

  // Generate placeholder image URL based on product name (same approach as ProductCard)
  const getPlaceholderImage = useCallback((name: string): string => {
    const imageIds = [
      '1518770660439-4636190af475', // Electronics
      '1558618666-fcd25c85cd64',     // Circuit board
      '1555949963-aa79dcee981c',     // Technology
      '1550751827-4bd374c3f58b',     // Components
      '1581091226825-a6a2a5aee158',  // Electronics components
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const imageId = imageIds[hash % imageIds.length];
    return `https://images.unsplash.com/photo-${imageId}?w=900&h=700&fit=crop&q=80`;
  }, []);

  const isFirebaseStoragePath = useCallback((url: string): boolean => {
    return !url.startsWith('http://') && !url.startsWith('https://');
  }, []);

  const resolveProductImage = useCallback((product: Product): string => {
    if (product.imageUrl) {
      return isFirebaseStoragePath(product.imageUrl) ? getStorageUrl(product.imageUrl) : product.imageUrl;
    }
    return getPlaceholderImage(product.name || category.name);
  }, [category.name, getPlaceholderImage, isFirebaseStoragePath]);

  const loadPreviewImages = useCallback(async () => {
    if (cachedPreviewImagesRef.current) {
      setPreviewImages(cachedPreviewImagesRef.current);
      return;
    }

    const myRequestSeq = ++requestSeqRef.current;
    setIsLoadingPreview(true);

    try {
      const products = await getProductsByCategory(category.id, category.collectionName);
      if (myRequestSeq !== requestSeqRef.current) return;

      const urls = products
        .map(resolveProductImage)
        .filter(Boolean);

      const uniqueUrls = Array.from(new Set(urls)).slice(0, 6);
      cachedPreviewImagesRef.current = uniqueUrls;
      setPreviewImages(uniqueUrls);
    } catch {
      // Silently ignore preview failures (card still works as a link)
      if (myRequestSeq !== requestSeqRef.current) return;
      cachedPreviewImagesRef.current = [];
      setPreviewImages([]);
    } finally {
      if (myRequestSeq !== requestSeqRef.current) return;
      setIsLoadingPreview(false);
    }
  }, [category.collectionName, category.id, resolveProductImage]);

  // Auto-advance carousel while hovered
  useEffect(() => {
    if (!isHovered) return;
    if (previewImages.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % previewImages.length);
    }, 1200);

    return () => window.clearInterval(interval);
  }, [isHovered, previewImages.length]);

  // Reset slide when unhovered
  useEffect(() => {
    if (isHovered) return;
    setActiveIndex(0);
  }, [isHovered]);

  const handleEnter = useCallback(() => {
    setIsHovered(true);
    loadPreviewImages();
  }, [loadPreviewImages]);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
    // Invalidate any in-flight load so it can't set state after leaving
    requestSeqRef.current++;
    setIsLoadingPreview(false);
  }, []);

  return (
    <Link
      href={`/products#${category.id}`}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-700/50 shadow-2xl cursor-pointer aspect-[4/3] block"
      aria-label={`View ${category.name} products`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {/* Default state: Category Name Display */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8
          transition-opacity duration-200
          ${isHovered ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <div className="text-center w-full px-4 sm:px-6">
          <h3 
            className="font-black text-white text-center tracking-tight drop-shadow-2xl break-words hyphens-auto"
            style={{
              fontSize: category.name.length > 25 
                ? `clamp(0.875rem, 3vw, 1.25rem)`
                : category.name.length > 20
                ? `clamp(1rem, 3.5vw, 1.5rem)`
                : category.name.length > 15
                ? `clamp(1.125rem, 4vw, 1.75rem)`
                : category.name.length > 10
                ? `clamp(1.25rem, 4.5vw, 2rem)`
                : `clamp(1.375rem, 5vw, 2.25rem)`,
              lineHeight: '1.3',
              maxWidth: '100%'
            }}
          >
            {category.name}
          </h3>
        </div>
      </div>

      {/* Hover state: Product image carousel preview */}
      <div
        className={`
          absolute inset-0
          transition-opacity duration-200
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden={!isHovered}
      >
        {/* Images */}
        <div className="absolute inset-0">
          {previewImages.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt=""
              className={`
                absolute inset-0 h-full w-full object-cover
                transition-opacity duration-500
                ${idx === activeIndex ? 'opacity-100' : 'opacity-0'}
              `}
              loading="lazy"
              draggable={false}
            />
          ))}

          {/* If loading, show subtle shimmer */}
          {isLoadingPreview && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-white/10 to-black/30 animate-pulse" />
          )}

          {/* If no images, keep it readable */}
          {!isLoadingPreview && previewImages.length === 0 && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          )}
        </div>

        {/* Readability overlay + label */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-white font-bold text-base sm:text-lg truncate drop-shadow">
                {category.name}
              </p>
              <p className="text-white/80 text-xs sm:text-sm">
                {isLoadingPreview ? 'Loading products…' : previewImages.length > 0 ? 'Preview products' : 'No products to preview'}
              </p>
            </div>

            {/* Dots */}
            {previewImages.length > 1 && (
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {previewImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`
                      h-1.5 w-1.5 rounded-full
                      ${idx === activeIndex ? 'bg-white' : 'bg-white/40'}
                    `}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default CategoryCard;

