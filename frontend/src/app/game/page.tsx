"use client";
import { Link } from "next-view-transitions";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Introduction() {
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = 3;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSlide((prev) => Math.min(prev + 1, totalSlides - 1));
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSlide((prev) => Math.max(prev - 1, 0));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Focus management for accessibility
  useEffect(() => {
    if (slide < totalSlides - 1 && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [slide]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      prevSlide();
    }
  };

  return (
    <Layout className="w-full min-h-screen justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-4xl h-full flex flex-col justify-center items-center py-8 md:py-16">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:p-4 focus:bg-blue-600 focus:text-white focus:absolute focus:z-50 focus:top-4 focus:left-4">
          Skip to main content
        </a>
        
        {/* Progress indicator */}
        <div className="w-full max-w-md flex justify-center mb-8" aria-hidden="true">
          {[...Array(totalSlides)].map((_, i) => (
            <div 
              key={i} 
              className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                i === slide ? 'w-8 bg-blue-600' : 'w-4 bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        <main id="main-content" 
          className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10"
          onKeyDown={handleKeyDown}
          role="region"
          aria-live="polite"
          tabIndex={0}
        >
          {slide === 0 && (
            <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                Nepal Earthquake Simulation: Build Your House
              </h1>

              <div className="relative rounded-lg overflow-hidden mb-6">
                <Image
                  src="/nepal.png"
                  alt="Aftermath of the 2015 Nepal Earthquake showing damaged buildings"
                  width={800}
                  height={500}
                  className="w-full object-cover h-[300px] md:h-[400px]"
                  priority
                />
                <div className="absolute bottom-0 left-0 right=0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm md:text-base">2015 Nepal Earthquake aftermath</p>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-200">
                In 2015, a massive earthquake struck Nepal. Thousands of people
                lost their lives and many more lost their homes. The earthquake
                caused widespread destruction and devastation.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                In this simulation, you will build a house in Nepal. You will have
                a budget and you will need to choose the materials to build your
                house. Your goal is to build a house that is both affordable and
                durable.
              </p>
              
              <div className="flex justify-between mt-8">
                <div>
                  {/* Empty div for layout consistency */}
                </div>
                <button
                  ref={buttonRef}
                  className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  disabled={isTransitioning}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {slide === 1 && (
            <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Building Materials & Budget</h2>
              
              <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  You will have a budget of रु. 1,000,000 to build your house.
                </p>
              </div>
              
              <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-200">
                You can choose from different types of materials to build your house.
                The materials available include bricks, wood, and concrete. Each
                material has its own cost and durability.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-200">
                You need to balance your budget while ensuring the durability of your house.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                Remember, a well-built house can withstand earthquakes better.
                Make your choices wisely to protect your house and its
                inhabitants.
              </p>
              
              <div className="flex justify-between mt-8">
                <button
                  className="bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  disabled={isTransitioning}
                >
                  Back
                </button>
                <button
                  ref={buttonRef}
                  className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  disabled={isTransitioning}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {slide === 2 && (
            <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Ready to Test Your Design?</h2>
              
              <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  When you finish building, we'll simulate an earthquake using our model trained on 2015 Nepal earthquake data.
                </p>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-200">
                The model will predict the damage to your house based on the materials you chose and how you constructed it.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                Are you ready to build your house in Nepal? Click the button below
                to start building your house. Good luck!
              </p>

              <div className="flex justify-between mt-8">
                <button
                  className="bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  disabled={isTransitioning}
                >
                  Back
                </button>
                <Link href="/game/phase-1">
                  <button className="bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                    Start Building!
                  </button>
                </Link>
              </div>
            </div>
          )}
        </main>
        
        {/* Keyboard navigation hint */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Use arrow keys to navigate between slides</p>
        </div>
      </div>
    </Layout>
  );
}
