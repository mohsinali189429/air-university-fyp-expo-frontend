import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects/featured")
      .then((r) => setProjects(r.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && projects.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Projects
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Outstanding Final Year Projects from AU FYP Expo 2026
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <FeaturedCard key={p.id} project={p} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Banner */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
            <span className="text-white/30 text-6xl font-bold">
              {project.title?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
            ⭐ Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">
          {project.category}
        </p>
        <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 mb-2">
          {project.teamName}
          {project.department ? ` · ${project.department}` : ""}
        </p>
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="mt-4">
          <Link
            to={`/projects/${project.id}`}
            className="block text-center bg-blue-50 hover:bg-blue-600 border border-blue-200 hover:border-blue-600 text-blue-600 hover:text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}