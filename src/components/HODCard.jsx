import React, { useState } from "react";

export default function HODCard({ hod }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1200px", height: "340px" }}
      onClick={() => setFlipped(!flipped)}
    >
      {/* The card wrapper that flips */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT FACE ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", position: "absolute", inset: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center gap-5 p-8 group"
        >
          {/* Glow ring */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <img
              src={hod.image}
              alt={hod.hodName}
              className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>

          <div className="text-center">
            <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-1">
              {hod.department}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{hod.hodName}</h3>
            <p className="text-slate-500 text-sm font-medium">Head of Department</p>
          </div>

          {/* Hint */}
          <p className="text-slate-400 text-xs mt-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
            </svg>
            Click to see message
          </p>
        </div>

        {/* ── BACK FACE ── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #0891b2 100%)",
          }}
          className="rounded-2xl shadow-xl flex flex-col overflow-hidden"
        >
          {/* Top strip */}
          <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-white/20">
            <img
              src={hod.image}
              alt={hod.hodName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/60 shadow"
            />
            <div>
              <p className="text-white font-bold text-sm leading-tight">{hod.hodName}</p>
              <p className="text-blue-200 text-xs">{hod.department}</p>
            </div>
          </div>

          {/* Scrollable message */}
          <div className="flex-1 overflow-y-auto px-6 py-4" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.3) transparent" }}>
            <p className="text-blue-50 text-sm leading-relaxed" style={{ display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {hod.message}
            </p>
          </div>

          {/* Action button */}
          <div className="px-6 pb-5 pt-3">
            <a
              href={hod.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-full px-4 py-3 bg-white text-blue-700 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg gap-2"
            >
              View Full HOD Message
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <p className="text-center text-blue-300 text-xs mt-3">
              Click card to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
