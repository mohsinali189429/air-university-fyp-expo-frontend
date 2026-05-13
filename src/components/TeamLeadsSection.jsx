import React, { useState, useEffect, useRef, useCallback } from "react";

// ── Image imports ─────────────────────────────────────────────────────────────
import harisImg from "../assets/images/Team Leads/Computer Science/Mr. Haris.jpg";
import zakaImg from "../assets/images/Team Leads/Computer Science/Zaka Ullah.jpg";
import ehtishamImg from "../assets/images/Team Leads/Electrical & Avionics Engineering/Muhammad Ehtisham Hassan.jpg";
import osamaImg from "../assets/images/Team Leads/Electrical & Avionics Engineering/Osama Muzaffar.jpg";
import aliImg from "../assets/images/Team Leads/Mechanical & Aerospace Engineering/Ali Abbas.jpg";
import bilawalImg from "../assets/images/Team Leads/Mechanical & Aerospace Engineering/Bilawal Ramzan.jpg";
import nadiaImg from "../assets/images/Team Leads/Business Administration/Dr. Nadia Ashraf.jpg";

// ── All team leads — flat list, no department grouping ────────────────────────

const teamLeads = [
  {
    name: "Muhammad Haris",
    designation: "Lecturer / FYP Manager CS AACK",
    email: "Muhammad.haris@aack.au.edu.pk",
    department: "Computer Science",
    image: harisImg,
  },
  {
    name: "Zaka Ullah",
    designation: "Lecturer",
    email: "zakaullah@aack.au.edu.pk",
    department: "Computer Science",
    image: zakaImg,
  },
  {
    name: "Dr. Ehtisham Hassan",
    designation: "Assistant Professor",
    email: "ehtisham.eave@aack.au.edu.pk",
    department: "Electrical & Avionics Engineering",
    image: ehtishamImg,
  },
  {
    name: "Engr. Osama Bin Muzzaffar",
    designation: "Lecturer",
    email: "osamamuzaffar@aack.au.edu.pk",
    department: "Electrical & Avionics Engineering",
    image: osamaImg,
  },
  {
    name: "Ali Abbas",
    designation: "Lecturer",
    email: "aliabbas@aack.au.edu.pk",
    department: "Mechanical & Aerospace Engineering",
    image: aliImg,
  },
  {
    name: "Bilawal Ramzan",
    designation: "Lecturer",
    email: "bilawal@aack.au.edu.pk",
    department: "Mechanical & Aerospace Engineering",
    image: bilawalImg,
  },
  {
    name: "Dr. Nadia Ashraf",
    designation: "Assistant Professor",
    email: "nadia.ashraf@aack.au.edu.pk",
    department: "Business Administration",
    image: nadiaImg,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const deptAccent = {
  "Computer Science": "from-blue-600 to-indigo-600",
  "Electrical & Avionics Engineering": "from-sky-500 to-blue-600",
  "Mechanical & Aerospace Engineering": "from-blue-700 to-cyan-600",
  "Business Administration": "from-indigo-500 to-blue-500",
};

// ── Card ──────────────────────────────────────────────────────────────────────

function TeamLeadCard({ lead }) {
  const [imgError, setImgError] = React.useState(false);
  const accent = deptAccent[lead.department] || "from-blue-600 to-indigo-600";
  const showInitials = !lead.image || imgError;

  return (
    <div className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group mx-3">
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        {showInitials ? (
          <div
            className={`w-full h-full bg-gradient-to-br ${accent} flex items-center justify-center`}
          >
            <span className="text-white text-5xl font-bold opacity-70">
              {getInitials(lead.name)}
            </span>
          </div>
        ) : (
          <img
            src={lead.image}
            alt={lead.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {/* Department pill */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full truncate max-w-full">
            {lead.department}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 text-center">
        <h4 className="text-base font-bold text-slate-900 leading-snug mb-1">
          {lead.name}
        </h4>
        <p className="text-xs font-semibold text-blue-600 mb-3 leading-snug">
          {lead.designation}
        </p>
        <a
          href={`mailto:${lead.email}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate max-w-[160px]">{lead.email}</span>
        </a>
      </div>
    </div>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────

export default function TeamLeadsSection() {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(288); // w-72 = 288px
  const total = teamLeads.length;
  const autoplayRef = useRef(null);

  // Measure actual card width on mount / resize
  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const firstCard = trackRef.current.querySelector(".flex-shrink-0");
        if (firstCard) {
          setCardWidth(firstCard.offsetWidth + 24); // card + mx-3 * 2
        }
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, total - 1));
      setCurrent(clamped);
    },
    [total]
  );

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  }, [total]);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(next, 4000);
    return () => clearInterval(autoplayRef.current);
  }, [next]);

  function pauseAutoplay() {
    clearInterval(autoplayRef.current);
  }
  function resumeAutoplay() {
    autoplayRef.current = setInterval(next, 4000);
  }

  // Touch swipe
  const touchStartX = useRef(null);
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoplay();
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
    resumeAutoplay();
  }

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            Meet the Faculty
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            FYP Team Leads
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Dedicated faculty guiding final year projects across all departments
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mt-6" />
        </div>

        {/* Carousel wrapper */}
        <div
          className="relative"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-2 sm:-translate-x-4 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-lg transition-all"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-2 sm:translate-x-4 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-lg transition-all"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Track */}
          <div className="overflow-hidden mx-6 sm:mx-8">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${current} * ${cardWidth}px))` }}
            >
              {teamLeads.map((lead) => (
                <TeamLeadCard key={lead.email} lead={lead} />
              ))}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {teamLeads.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2.5 bg-blue-600"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-blue-300"
              }`}
              aria-label={`Go to ${teamLeads[i].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}