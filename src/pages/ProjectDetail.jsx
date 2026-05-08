import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

const categoryColors = {
  "Artificial Intelligence": "bg-purple-100 text-purple-700",
  "Web Development":         "bg-blue-100 text-blue-700",
  "Embedded Systems":        "bg-orange-100 text-orange-700",
  "Cybersecurity":           "bg-red-100 text-red-700",
  "Aerospace Engineering":   "bg-sky-100 text-sky-700",
  "IoT & Automation":        "bg-green-100 text-green-700",
  "Data Science":            "bg-yellow-100 text-yellow-700",
  "Mobile Development":      "bg-pink-100 text-pink-700",
};

export default function ProjectDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/projects/${id}`)
      .then(r => { setProject(r.data); setLoading(false); })
      .catch(err => {
        setError(err.response?.status === 404 ? "Project not found" : "Failed to load project");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader text="Loading project..." />;

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-6xl">😕</p>
      <h2 className="text-2xl font-bold text-gray-700">{error}</h2>
      <button onClick={() => navigate("/projects")} className="btn-primary">
        ← Back to Projects
      </button>
    </div>
  );

  const members  = project.members  ? project.members.split(",").map(m => m.trim())  : [];
  const techStack= project.techStack? project.techStack.split(",").map(t => t.trim()): [];
  const tags     = project.tags     ? project.tags.split(",").map(t => t.trim())     : [];
  const colorClass = categoryColors[project.category] || "bg-gray-100 text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 fade-in">

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-blue-600">Projects</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{project.title}</span>
        </div>
      </div>

      {/* ── Hero Image ──────────────────────────────────────────────────── */}
      {project.imageUrl && (
        <div className="w-full h-72 sm:h-96 overflow-hidden bg-gray-200">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main Content ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Title & badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`badge ${colorClass}`}>{project.category}</span>
                {project.isFeatured && (
                  <span className="badge bg-yellow-100 text-yellow-700">⭐ Featured</span>
                )}
                {project.award && (
                  <span className="badge bg-blue-100 text-blue-700">🏆 {project.award}</span>
                )}
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {project.department  && <span>🏛️ {project.department}</span>}
                {project.boothNumber && <span>📍 Booth {project.boothNumber}</span>}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Description</h2>
              <p className="text-gray-600 leading-relaxed text-base">{project.description}</p>
            </div>

            {/* Tech Stack */}
            {techStack.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🛠️ Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🏷️ Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="badge bg-blue-50 text-blue-600 border border-blue-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Team Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">👥 Team</h3>
              <p className="text-blue-700 font-semibold mb-3">{project.teamName}</p>
              <div className="space-y-2">
                {members.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {member.charAt(0)}
                    </div>
                    <span className="text-gray-700 text-sm">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supervisor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">🎓 Supervisor</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold">
                  {project.supervisorName.charAt(0)}
                </div>
                <span className="text-gray-700 font-medium">{project.supervisorName}</span>
              </div>
            </div>

            {/* Links */}
            {(project.demoUrl || project.reportUrl) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">🔗 Links</h3>
                <div className="space-y-3">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2.5 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
                    >
                      🚀 Live Demo
                    </a>
                  )}
                  {project.reportUrl && (
                    <a 
                      href={project.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                      📄 View Report
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Back button */}
            <Link
              to="/projects"
              className="block w-full text-center py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-700 transition-all text-sm"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}