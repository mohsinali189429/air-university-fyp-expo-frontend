import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

const iconMap = {
  brain:       "🧠",
  globe:       "🌐",
  cpu:         "💻",
  shield:      "🛡️",
  plane:       "✈️",
  wifi:        "📡",
  "bar-chart": "📊",
  smartphone:  "📱",
  folder:      "📁",
};

const colorMap = [
  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", btn: "bg-purple-700" },
  { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   btn: "bg-blue-700" },
  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", btn: "bg-orange-700" },
  { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-700",    btn: "bg-red-700" },
  { bg: "bg-sky-50",    border: "border-sky-200",    text: "text-sky-700",    btn: "bg-sky-700" },
  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-700",  btn: "bg-green-700" },
  { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", btn: "bg-yellow-700" },
  { bg: "bg-pink-50",   border: "border-pink-200",   text: "text-pink-700",   btn: "bg-pink-700" },
];

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    api.get("/categories")
      .then(r => { setCategories(r.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 fade-in">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)" }}
      >
        <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
          Browse By
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Project Categories
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Explore Final Year Projects organized by engineering discipline and technology domain
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {loading && <Loader text="Loading categories..." />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
            <p className="font-semibold">Failed to load categories</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Summary */}
            <div className="text-center mb-12">
              <p className="text-gray-500">
                <span className="font-semibold text-gray-800">{categories.length}</span> categories
                spanning{" "}
                <span className="font-semibold text-gray-800">
                  {categories.reduce((sum, c) => sum + (c.projectCount || 0), 0)}
                </span>{" "}
                projects
              </p>
            </div>

            {/* Categories grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, i) => {
                const color  = colorMap[i % colorMap.length];
                const emoji  = iconMap[cat.icon] || "📁";
                return (
                  <div
                    key={cat.id}
                    className={`${color.bg} border ${color.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col`}
                  >
                    <span className="text-5xl mb-4 block">{emoji}</span>
                    <h3 className={`font-bold text-lg mb-2 ${color.text}`}>
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                        {cat.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
                      <span className="text-sm font-bold text-gray-700">
                        {cat.projectCount || 0} projects
                      </span>
                      <Link
                        to={`/projects?category=${encodeURIComponent(cat.name)}`}
                        className={`${color.btn} text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity`}
                      >
                        Browse →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <p className="text-gray-500 mb-4">Can't find what you're looking for?</p>
              <Link to="/projects" className="btn-primary">
                Browse All Projects →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}