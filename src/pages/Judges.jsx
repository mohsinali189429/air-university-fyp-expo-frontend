import { useState, useEffect } from "react";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

const criteriaItems = [
  {
    icon: "💡",
    title: "Innovation & Originality",
    desc: "Novelty of the idea, creative approach to problem-solving, and originality of the solution.",
    weight: "25%",
  },
  {
    icon: "🛠️",
    title: "Technical Excellence",
    desc: "Depth of technical implementation, complexity, correctness, and use of appropriate technologies.",
    weight: "25%",
  },
  {
    icon: "🎯",
    title: "Impact & Relevance",
    desc: "Real-world applicability, potential societal or industry impact, and relevance to Pakistan's needs.",
    weight: "20%",
  },
  {
    icon: "📊",
    title: "Presentation & Demo",
    desc: "Clarity of presentation, quality of demonstration, and ability to answer technical questions.",
    weight: "20%",
  },
  {
    icon: "📝",
    title: "Documentation",
    desc: "Quality of project report, system design documentation, and completeness of deliverables.",
    weight: "10%",
  },
];

function JudgeCard({ judge }) {
  const initials = judge.name
    .split(" ")
    .filter(w => !w.includes("(") && !["Air", "Cdre", "Dr.", "Mr.", "Ms.", "Wg", "Cdr"].includes(w))
    .slice(0, 2)
    .map(w => w.charAt(0))
    .join("");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Avatar */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)" }}
        >
          {initials || judge.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">
            {judge.name}
          </h3>
          <p className="text-blue-600 font-semibold text-sm mb-0.5">
            {judge.designation}
          </p>
          <p className="text-gray-500 text-sm truncate">
            {judge.organization}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-4">
        {judge.bio ? (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {judge.bio}
          </p>
        ) : (
          <p className="text-gray-400 text-sm italic">
            Biography not available.
          </p>
        )}
      </div>

      {/* Organization badge */}
      <div className="mt-4 pt-4 border-t border-gray-50">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
          🏛️ {judge.organization}
        </span>
      </div>
    </div>
  );
}

export default function Judges() {
  const [judges, setJudges]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    api.get("/judges")
      .then(r => { setJudges(r.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 fade-in">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div
        className="py-16 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)" }}
      >
        <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
          AU FYP Expo 2026
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Panel of Judges
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Industry leaders and academic experts evaluating this year's Final Year Projects
        </p>
      </div>

      {/* ── Judges Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        {loading && <Loader text="Loading judges..." />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
            <p className="font-semibold">Failed to load judges</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && judges.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">👨‍⚖️</p>
            <p className="text-gray-500">No judges listed yet.</p>
          </div>
        )}

        {!loading && !error && judges.length > 0 && (
          <>
            <div className="text-center mb-12">
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-gray-800">{judges.length}</span> distinguished judges
                from industry and academia
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {judges.map(judge => (
                <JudgeCard key={judge.id} judge={judge} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Judging Criteria ────────────────────────────────────────────── */}
      <div
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2149 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
              Evaluation Framework
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Judging Criteria
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Projects are evaluated across five key dimensions by our expert panel
            </p>
          </div>

          <div className="space-y-4">
            {criteriaItems.map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-start gap-5 hover:bg-white/15 transition-all duration-200"
              >
                <span className="text-4xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    <span className="text-blue-300 font-bold text-lg bg-blue-900/50 px-3 py-1 rounded-lg">
                      {item.weight}
                    </span>
                  </div>
                  <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>

                  {/* Weight bar */}
                  <div className="mt-3 bg-white/10 rounded-full h-1.5">
                    <div
                      className="bg-blue-400 h-1.5 rounded-full transition-all"
                      style={{ width: item.weight }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Become a Judge CTA ──────────────────────────────────────────── */}
      <div className="bg-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Interested in Judging?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            We welcome industry professionals and academics to join our judging panel and help
            recognize outstanding student innovation.
          </p>
            <a
          
           href="/contact"
            className="btn-primary inline-flex"
          >
            ✉️ Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}