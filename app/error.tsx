'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import PromoBar from '@/components/PromoBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Add your error reporting service here (e.g., Sentry, LogRocket)
      // console.error('Error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900">
      <PromoBar />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">500</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re sorry, but something unexpected happened. Please try again later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-block bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-block bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Go to Home
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
              <p className="text-sm text-red-800 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

