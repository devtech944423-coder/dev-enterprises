'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PromoBar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    // Bar will show again on page reload - no localStorage persistence
  };

  const phoneNumber = '+91 8410750000';
  const phoneLink = `tel:${phoneNumber.replace(/\s/g, '')}`;

  return (
    <div
      className={`
        sticky top-0 overflow-hidden transition-all duration-300 ease-in-out z-[60]
        ${isVisible ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      {/* Main Bar with Gradient Background */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg">
        {/* Animated background pattern for extra visual interest */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5 sm:py-3">
            {/* Left side - Attention-seeking message */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              {/* Sparkle/Star Icon for attention */}
              <div className="flex-shrink-0 animate-pulse">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white/90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              {/* Attention-seeking message */}
              <p className="text-xs sm:text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="hidden sm:inline">🔥 </span>
                <span className="font-bold">Call Now for Best Prices & Fast Delivery!</span>
                <span className="hidden sm:inline"> 🔥</span>
              </p>
            </div>

            {/* Right side - Phone Number (Highlighted) */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ml-2 sm:ml-4">
              {/* Phone Icon */}
              <div className="flex-shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>

              {/* Phone Number - Highly Visible */}
              <Link
                href={phoneLink}
                className="
                  bg-white text-gray-900 
                  px-3 sm:px-4 py-1.5 sm:py-2 
                  rounded-lg sm:rounded-xl
                  font-bold text-sm sm:text-base
                  shadow-lg hover:shadow-xl
                  transform hover:scale-105
                  transition-all duration-200
                  whitespace-nowrap
                  flex items-center space-x-1
                  border-2 border-white
                  hover:bg-gray-100
                "
                aria-label={`Call ${phoneNumber}`}
              >
                <span>{phoneNumber}</span>
                {/* Small call icon */}
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </Link>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className="
                  flex-shrink-0
                  p-1 sm:p-1.5
                  rounded-md
                  hover:bg-white/20
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent
                "
                aria-label="Dismiss promotional bar"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

