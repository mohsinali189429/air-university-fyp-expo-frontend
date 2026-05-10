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
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden">

      {/* ── Desktop slideshow images (hidden on mobile) ── */}
      <div className="hidden md:block absolute inset-0">
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
        {/* Dark overlay for desktop */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ── Mobile background (shown only on mobile, no images) ── */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
        {/* Subtle decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full bg-indigo-700/20 blur-3xl" />
      </div>

      {/* ── Hero text content (always visible) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-4 opacity-90">
          Air University · Aerospace & Aviation Campus Kamra
        </p>
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent mb-5 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          FYP Expo 2026
        </h1>
        <p className="text-base sm:text-xl lg:text-2xl text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Showcasing Innovation &amp; Excellence in Final Year Projects
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 text-base shadow-lg shadow-blue-900/50 hover:scale-105"
          >
            🚀 Explore Projects
          </Link>
          <Link
            to="/submit"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 text-base hover:bg-white/10 hover:scale-105"
          >
            📤 Submit Project
          </Link>
        </div>
      </div>

      {/* ── Slide indicators (desktop only) ── */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-3">
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