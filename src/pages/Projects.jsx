import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import ProjectCard from "../components/ProjectCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects]         = useState([]);
  const [categories, setCategories]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const search   = searchParams.get("search")   || "";
  const category = searchParams.get("category") || "";
  const sort     = searchParams.get("sort")     || "newest";

  useEffect(() => {
    api.get("/categories").then(r => setCategories(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = {};
    if (search)   params.search   = search;
    if (category) params.category = category;
    if (sort)     params.sort     = sort;

    api.get("/projects", { params })
      .then(r => { setProjects(r.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [search, category, sort]);

  function setParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  function clearFilters() {
    setSearchParams({});
  }

  const hasFilters = search || category || sort !== "newest";

  return (
    <div className="min-h-screen bg-gray-50">

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
          All Projects
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Browse and search Final Year Projects
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar Filters ───────────────────────────────────────────── */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-20">

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                   Search
                </label>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setParam("search", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                   Category
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setParam("category", "")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !category
                        ? "bg-blue-700 text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setParam("category", cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        category === cat.name
                          ? "bg-blue-700 text-white font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        category === cat.name ? "bg-blue-600 text-blue-100" : "bg-gray-100 text-gray-400"
                      }`}>
                        {cat.projectCount || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                   Sort By
                </label>
                <select
                  value={sort}
                  onChange={e => setParam("sort", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Clear Filters */}
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full text-sm text-red-500 hover:text-red-700 font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  ✕ Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* ── Projects Grid ─────────────────────────────────────────────── */}
          <div className="flex-1">

            {/* Results bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500 text-sm">
                {loading ? "Loading..." : (
                  <>
                    Showing <span className="font-semibold text-gray-900">{projects.length}</span> project{projects.length !== 1 ? "s" : ""}
                    {category && <> in <span className="font-semibold text-blue-700">{category}</span></>}
                    {search && <> matching <span className="font-semibold text-blue-700">"{search}"</span></>}
                  </>
                )}
              </p>
            </div>

            {/* Error state */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
                <p className="font-semibold mb-1">Failed to load projects</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && projects.length === 0 && (
              <div className="text-center py-24">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No projects found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}

            {/* Projects grid */}
            {!loading && !error && projects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}