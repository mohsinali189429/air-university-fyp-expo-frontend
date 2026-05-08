import React from "react";
import documentaryVideo from "../assets/videos/Main Video.mp4";

export default function DocumentarySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-4 leading-tight uppercase tracking-wider"
          >
            AU Documentary
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Video Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white bg-black group relative">
            <video 
              controls
              className="w-full h-auto aspect-video object-cover"
              preload="metadata"
            >
              <source src={documentaryVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

      </div>
    </section>
  );
}
