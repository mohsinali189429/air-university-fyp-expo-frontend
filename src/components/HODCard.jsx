import React, { useState } from "react";

export default function HODCard({ hod }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full overflow-hidden group">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative">
          <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <img
            src={hod.image}
            alt={hod.hodName}
            className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-sm"
          />
        </div>
        <div className="text-center sm:text-left flex-grow">
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-1">{hod.department}</p>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{hod.hodName}</h3>
          <p className="text-slate-500 font-medium text-sm">Head of Department</p>
        </div>
      </div>

      {/* Message Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h4 className="text-lg font-bold text-slate-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Message from Head Of Department
        </h4>
        
        <div className="relative flex-grow">
          <p 
            className={`text-slate-600 leading-relaxed text-sm whitespace-pre-line ${
              expanded ? "" : "line-clamp-4"
            }`}
          >
            {hod.message}
          </p>
          
          {/* Read More Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors mt-2 underline-offset-2 hover:underline focus:outline-none"
          >
            {expanded ? "Show Less" : "Read More..."}
          </button>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 pt-0 mt-auto">
        <a
          href={hod.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Visit Official HOD Message
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
    </div>
  );
}
