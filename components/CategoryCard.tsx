'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Category } from '@/lib/firebase/products';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = memo(function CategoryCard({ category }: CategoryCardProps) {

  return (
    <Link
      href={`/products#${category.id}`}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-700/50 shadow-2xl cursor-pointer aspect-[4/3] block"
      aria-label={`View ${category.name} products`}
    >
      {/* Category Name Display */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
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
    </Link>
  );
});

export default CategoryCard;

