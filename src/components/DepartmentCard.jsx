import React from "react";

export default function DepartmentCard({ department }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 bg-blue-50 overflow-hidden flex-shrink-0">
        {department.image ? (
          <img
            src={department.image}
            alt={department.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
            <span className="text-5xl">🏛️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {department.name}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {department.description || "Dedicated to excellence in education and innovative research. Nurturing the next generation of leaders and innovators."}
        </p>

        {/* Action area (optional, keeps card layout balanced) */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <span className="inline-flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-colors">
            Explore Projects
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
