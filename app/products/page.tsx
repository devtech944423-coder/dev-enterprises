'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import PromoBar from '@/components/PromoBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getAllCategories, applyCategoryFilter, Product, Category } from '@/lib/firebase/products';
import { subscribeToProductsAndCategories } from '@/lib/firebase/products-realtime';

export default function Products() {
  // FIX: State management - separate allProducts and filteredProducts
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Complete list from Firebase
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // FIX: Client-side filtering - compute filteredProducts from allProducts based on selectedCategory
  // This ensures "All Products" shows all items and categories filter correctly
  const filteredProducts = useMemo(() => {
    if (categories.length === 0 || allProducts.length === 0) {
      return [];
    }
    
    return applyCategoryFilter(allProducts, selectedCategory, categories);
  }, [allProducts, selectedCategory, categories]);

  // Handle URL hash to filter by category when page loads or hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#' symbol
      if (hash) {
        // Check if the hash matches any category ID or 'all'
        if (hash === 'all' || categories.some(cat => cat.id === hash)) {
          setSelectedCategory(hash);
          // Scroll to top of product list
          setTimeout(() => {
            const productList = document.getElementById('product-list');
            if (productList) {
              productList.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [categories]);

  // REAL-TIME: Set up real-time listeners for categories and products
  // This automatically updates the UI when data changes in Firebase (no refresh needed!)
  useEffect(() => {
    setCategoriesLoading(true);
    setLoading(true);
    setError(null);

    // Set up real-time listeners
    const unsubscribe = subscribeToProductsAndCategories(
      (updatedCategories) => {
        setCategories(updatedCategories);
        setCategoriesLoading(false);
      },
      (updatedProducts) => {
        setAllProducts(updatedProducts);
        setLoading(false);
        
        if (updatedProducts.length === 0) {
          setError('No products found. Please check your Firebase configuration.');
        } else {
          setError(null);
        }
      },
      (err) => {
        setError('Failed to load data. Please check your Firebase configuration.');
        setCategoriesLoading(false);
        setLoading(false);
      }
    );

    // Cleanup: Unsubscribe from listeners when component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Only run once on mount

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    // Update URL hash without scrolling
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${categoryId}`);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategoryChange(categoryId);
    }
  }, [handleCategoryChange]);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900">
      <PromoBar />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of electronic components and equipment
          </p>
        </div>

        {/* Category Filter */}
        <section className="mb-8 md:mb-12" aria-label="Product categories">
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6">
              Filter by Category
            </h2>
            {categoriesLoading ? (
              <div className="flex flex-wrap gap-3 md:gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"
                    aria-hidden="true"
                  />
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div
                className="flex flex-wrap gap-3 md:gap-4"
                role="tablist"
                aria-label="Product category filters"
              >
                {/* All Products Button */}
                <button
                  onClick={() => handleCategoryChange('all')}
                  onKeyDown={(e) => handleKeyDown(e, 'all')}
                  role="tab"
                  aria-selected={selectedCategory === 'all'}
                  aria-controls="product-list"
                  tabIndex={selectedCategory === 'all' ? 0 : -1}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-medium text-sm md:text-base
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                    ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-md scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-200'
                    }
                  `}
                >
                  <span>All Products</span>
                </button>
                {/* Category Buttons - Loaded from Database */}
                {categories.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      onKeyDown={(e) => handleKeyDown(e, category.id)}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="product-list"
                      tabIndex={isSelected ? 0 : -1}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-medium text-sm md:text-base
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                        ${
                          isSelected
                            ? `bg-gradient-to-r ${category.gradient} text-white shadow-md scale-105`
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-200'
                        }
                      `}
                    >
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 font-medium">No categories available.</p>
              </div>
            )}
          </div>
        </section>

        {/* Products Display */}
        <section
          id="product-list"
          role="tabpanel"
          aria-labelledby={`category-${selectedCategory}`}
        >
          {selectedCategoryData && selectedCategory !== 'all' && (
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedCategoryData.gradient} flex items-center justify-center text-2xl shadow-md`}>
                  {selectedCategoryData.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {selectedCategoryData.name}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    {loading ? 'Loading...' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200 shadow-sm text-center">
              <p className="text-gray-600 text-lg md:text-xl">Loading products...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200 shadow-sm text-center">
              <p className="text-red-600 text-lg md:text-xl">{error}</p>
              <p className="text-gray-600 mt-2">Please check your Firebase configuration.</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            // FIX: "Category shows no products" - Display filteredProducts instead of products
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200 shadow-sm text-center">
              <p className="text-gray-600 text-lg md:text-xl">
                {selectedCategory === 'all' 
                  ? 'No products found. Please check your Firebase configuration.'
                  : `No products found in "${selectedCategoryData?.name || selectedCategory}" category.`
                }
              </p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-16 md:mt-24 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Custom Solutions?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact us for bulk orders, custom specifications, or technical consultation
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
