import React from "react";
import HeroSlider from "../components/HeroSlider.jsx";
import DirectorSection from "../components/DirectorSection.jsx";
import HODSection from "../components/HODSection.jsx";
import DocumentarySection from "../components/DocumentarySection.jsx";

export default function Home() {
  return (
    <div className="fade-in bg-white min-h-screen">
      {/* 1. Hero Section (Image Slider) */}
      <HeroSlider />

      {/* 2. Director Message Section */}
      <DirectorSection />

      {/* 3. Heads of Departments Section */}
      <HODSection />

      {/* 4. AU Documentary Section */}
      <DocumentarySection />
      
    </div>
  );
}