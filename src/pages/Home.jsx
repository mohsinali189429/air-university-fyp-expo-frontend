import React from "react";
import HeroSlider from "../components/HeroSlider.jsx";
import DirectorSection from "../components/DirectorSection.jsx";
import HODSection from "../components/HODSection.jsx";
import TeamLeadsSection from "../components/TeamLeadsSection.jsx";
import DocumentarySection from "../components/DocumentarySection.jsx";
import FeaturedProjects from "../components/FeaturedProjects.jsx";

export default function Home() {
  return (
    <div className="fade-in bg-white min-h-screen">
      <HeroSlider />
      <DirectorSection />
      <HODSection />
      <TeamLeadsSection />
      <DocumentarySection />
      <FeaturedProjects />
    </div>
  );
}