import React from "react";
import { Link } from "react-router-dom";

// Import department images
import businessImg from "../assets/images/departments/bba.jpg";
import csImg from "../assets/images/departments/comp.jpg";
import mechImg from "../assets/images/departments/Mech_Aero.png";
import elecImg from "../assets/images/departments/Electrical and Avionics Engineering.jpeg";

const departments = [
  {
    name: "Department of Business Administration",
    image: businessImg,
    link: "https://aack.au.edu.pk/Pages/Departments/Business_Administration/dba_intro.aspx"
  },
  {
    name: "Department of Computer Science",
    image: csImg,
    link: "https://aack.au.edu.pk/Pages/Departments/Computer_Science/cs_intro.aspx"
  },
  {
    name: "Department of Aerospace and Mechanical Engineering",
    image: mechImg,
    link: "https://aack.au.edu.pk/Pages/Departments/Mech_Aero_Engg/about-mechanical-aerospace.aspx"
  },
  {
    name: "Department of Electrical and Avionics Engineering",
    image: elecImg,
    link: "https://aack.au.edu.pk/Pages/Departments/Elec-Avionics_Engg/About_Electrical_Avionics_Engineering.aspx"
  }
];

export default function About() {
  return (
    <div className="fade-in bg-white min-h-screen">
      
      {/* 1. Hero / Header Section */}
      <section className="relative py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: 0.2 }}></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight drop-shadow-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Air University Kamra Campus
          </h1>
          <p className="text-xl sm:text-2xl text-blue-800 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Aerospace & Aviation Campus – Excellence in Education, Research & Innovation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://aack.au.edu.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:scale-105 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Visit Official Website
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition-all w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision Card */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6">👁️</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Vision</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Air University aspires to be recognized globally in innovative research, transformative education, and sustainable development. It aims to foster a culture of creativity, inclusivity, and collaboration, preparing graduates to become ethical leaders and change-makers in a rapidly evolving world.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border-t-4 border-blue-700 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6">🎯</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Mission</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Air University's mission is to deliver world-class education and research that addresses global challenges and drives societal progress. It nurtures intellectual growth, ethical values, and prepares graduates to excel professionally, become self-sustained entrepreneurs, and lead with integrity and compassion. Through interdisciplinary research and collaboration with industry, government, and international partners, the university aims to contribute towards economic, technological, and social development while promoting diversity, equity, and inclusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Campus Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Aerospace & Aviation Campus, Kamra
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <div className="prose prose-lg text-slate-600 mx-auto leading-relaxed">
            <p className="mb-4">
              Situated in the heart of Pakistan's aviation industry, the Air University Aerospace and Aviation Campus (Kamra) offers an unparalleled environment for academic excellence and innovation. Our strategic location enables a unique academia-industry linkage, providing students with direct exposure to advanced aerospace technologies and real-world engineering challenges.
            </p>
            <p>
              We are committed to nurturing the next generation of engineers, scientists, and business leaders. Through rigorous academic programs, cutting-edge research facilities, and a focus on student development, AU Kamra empowers its graduates to drive socio-economic growth and contribute significantly to both the national and global technology landscape.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Departments Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Departments
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <a 
                key={index}
                href={dept.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/30 transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                    {dept.name}
                  </h3>
                  <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore Department 
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Campus Highlights */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: "🚀", title: "Innovation", desc: "Driving technological advancements" },
              { icon: "🔬", title: "Research", desc: "State-of-the-art facilities" },
              { icon: "✈️", title: "Aviation Focus", desc: "Heart of the aerospace industry" },
              { icon: "🎓", title: "Student Life", desc: "Holistic development & growth" },
            ].map((highlight, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-blue-100 text-sm">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}