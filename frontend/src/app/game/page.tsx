'use client';
import { Link } from 'next-view-transitions'
import { useState } from 'react';
import Image from 'next/image';

export default function Introduction() {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {slide === 0 && (
        <div className="transition-all duration-500">
          <h1 className="text-3xl font-bold mb-8">
            Nepal Earthquake Simulation: Build Your House
          </h1>
          <Image src="/nepal.png" alt="Nepal Earthquake" width={500} height={300} className="mb-4" />
          <p className="text-lg">
            In 2015, a massive earthquake struck Nepal. Thousands of people lost their
            lives and many more lost their homes. The earthquake caused
            widespread destruction and devastation.
          </p>
          <p className="text-lg mt-4">
            In this simulation, you will build a house in Nepal. You will have a
            budget and you will need to choose the materials to build your house.
            Your goal is to build a house that is both affordable and durable.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={nextSlide}
          >
            Next
          </button>
        </div>
      )}

      {slide === 1 && (
        <div className="transition-all duration-500">
            <p className="text-lg">
            You will have a budget of रु. 1,000,000 to build your house. You can
            choose from different types of materials to build your house.
            </p>
            <p className="text-lg mt-4">
            The materials available include bricks, wood, and concrete. Each material
            has its own cost and durability. You need to balance your budget while
            ensuring the durability of your house.
            </p>
            <p className="text-lg mt-4">
            Remember, a well-built house can withstand earthquakes better. Make your
            choices wisely to protect your house and its inhabitants.
            </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={nextSlide}
          >
            Next
          </button>
        </div>
      )}

      {slide === 2 && (
        <div className="transition-all duration-500">
          <p className="text-lg">
            Are you ready to build your house in Nepal? Click the button below to
            start building your house. Good luck!
          </p>
          <Link href="/game/phase-1">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              Start Building!
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
