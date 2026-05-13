import React from "react";

// Import director image
import directorImg from "../assets/images/Air Vice Marshal  SHMAS UL HAQ.jpeg";

export default function DirectorSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Column */}
          <div className="w-full lg:w-5/12">
            <img
              src={directorImg}
              alt="Air Vice Marshal SHMAS UL HAQ"
              className="w-full h-auto object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <h2 
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Director’s Campus Message
            </h2>
            
            <div className="prose prose-lg text-gray-600 mb-8 max-w-none">
              <p className="leading-relaxed mb-4 text-lg">
                <span className="font-semibold">I look forward to you joining the ‘community’ of Aerospace & Aviation Campus</span> which is driven by energy of its vision of excellence in learning, research, innovation and public service. At AU-A&AC, you will feel empowered to realize your academic ambitions and seek out knowledge with purpose in fields ranging from basic sciences to engineering & technology as well as humanities & social sciences at graduate and post-graduate level.
              </p>
              <p className="leading-relaxed mb-4 text-lg">
                We endeavor to create a safe social and physical environment which helps all our students learn and succeed. This campus uniquely stands to promote academia-industry linkage focused on socio-economic development of Pakistan and creation of sustainable R&D ecosystem that will enable the Public and Corporate sector industry to flourish.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-6 mt-2">
              <h3 className="text-xl font-bold text-gray-900 mb-1">AIR VICE MARSHAL SHAMS UL HAQ</h3>
              <p className="text-blue-600 font-medium">Director Campus</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
