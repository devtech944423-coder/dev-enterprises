'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  gradient: string;
  backgroundImage?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Semiconductors',
    description: 'High-quality semiconductor components for your electronic projects. From microprocessors to memory chips, we have everything you need.',
    buttonText: 'Explore Semiconductors',
    buttonLink: '/products#semiconductors',
    gradient: 'from-gray-900 to-black',
    backgroundImage: '/images/semiconductor-bg.jpg', // Update this path with your image
  },
  {
    id: 2,
    title: 'Sensors',
    description: 'Advanced sensor technology for IoT, automation, and monitoring applications. Temperature, pressure, motion, and more.',
    buttonText: 'View Sensors',
    buttonLink: '/products#sensors',
    gradient: 'from-black to-gray-900',
    backgroundImage: '/images/sensor-bg.jpg',
  },
  {
    id: 3,
    title: 'Cables & Wires',
    description: 'Premium cables and wires for all your connectivity needs. Durable, reliable, and engineered for performance.',
    buttonText: 'Browse Cables',
    buttonLink: '/products#cables',
    gradient: 'from-gray-800 to-black',
    backgroundImage: '/images/cables-bg.jpg',
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  // Ensure consistent rendering between server and client
  // On server and initial client render, show first slide (index 0)
  const activeIndex = isMounted ? currentSlide : 0;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {slide.backgroundImage ? (
            // Slide with background image
            <div 
              className="relative w-full h-full"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark overlay for text contrast */}
              <div className="absolute inset-0 bg-black/50" />
              {/* Content */}
              <div className="relative h-full flex items-center justify-center p-8 md:p-16">
                <div className="max-w-3xl text-center text-white">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 md:mb-10 text-white/95 leading-relaxed drop-shadow-md">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.buttonLink}
                    className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // Slide with gradient background (other slides)
            <div className={`h-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center p-8 md:p-16`}>
              <div className="max-w-3xl text-center text-white">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 md:mb-10 text-white/90 leading-relaxed">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition-all shadow-md hover:shadow-lg z-20"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition-all shadow-md hover:shadow-lg z-20"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

