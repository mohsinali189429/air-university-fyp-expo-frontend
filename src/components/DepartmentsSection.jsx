import React from "react";

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

export default function DepartmentsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Departments at AU Kamra Campus
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, index) => (
            <a 
              key={index}
              href={dept.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 relative border border-gray-200"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Optional dark overlay on hover for effect */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>

              {/* Text Container */}
              <div className="bg-white p-6 relative">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {dept.name}
                </h3>
                
                {/* Visual affordance for clicking */}
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Visit Department 
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
  );
}
