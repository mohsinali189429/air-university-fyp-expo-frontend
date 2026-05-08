import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import images
import hero1 from "../assets/images/hero/hero1.png";
import hero2 from "../assets/images/hero/hero2.jpeg";
import hero3 from "../assets/images/hero/hero3.jpeg";
import hero4 from "../assets/images/hero/hero4.png";
import hero5 from "../assets/images/hero/hero5.png";
import hero6 from "../assets/images/hero/hero6.jpeg";

const images = [hero1, hero2, hero3, hero4, hero5, hero6];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Hero Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-sm"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Air University FYP Expo 2026
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          Showcasing Innovation & Excellence
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-lg shadow-lg shadow-blue-900/50 hover:scale-105"
          >
            🚀 Explore Projects
          </Link>
          <Link
            to="/submit"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-lg hover:bg-white/10 hover:scale-105"
          >
            📤 Submit Project
          </Link>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-500 scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
