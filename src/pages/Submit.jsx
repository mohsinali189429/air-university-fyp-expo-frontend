import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function Submit() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [success, setSuccess]       = useState(null);
  const [form, setForm] = useState({
    title: "", description: "", category: "", teamName: "",
    members: "", supervisorName: "", department: "",
    boothNumber: "", techStack: "", tags: "",
    imageUrl: "", demoUrl: "", reportUrl: "",
  });

  useEffect(() => {
    api.get("/categories").then(r => setCategories(r.data)).catch(console.error);
  }, []);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post("/projects", form);
      setSuccess("Project submitted successfully. It is now pending admin approval.");
      setTimeout(() => navigate("/projects"), 900);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit project. Please try again.");
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50 fade-in">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)" }}
      >
        <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
          FYP Expo 2026
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Submit Your Project
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Register your Final Year Project for AU FYP Expo 2026
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
              <p className="font-semibold text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6">
              <p className="font-semibold text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── Section: Basic Info ──────────────────────────────────── */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                📋 Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Project Title <span className="text-red-500">*</span></label>
                  <input type="text" name="title" value={form.title} onChange={handleChange}
                    required placeholder="e.g. AI-Powered Drone Surveillance System"
                    className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Description <span className="text-red-500">*</span></label>
                  <textarea name="description" value={form.description} onChange={handleChange}
                    required rows={4} placeholder="Describe your project, its objectives, methodology, and outcomes..."
                    className={`${inputClass} resize-none`} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category <span className="text-red-500">*</span></label>
                    <select name="category" value={form.category} onChange={handleChange}
                      required className={inputClass}>
                      <option value="">Select category...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Department</label>
                    <input type="text" name="department" value={form.department} onChange={handleChange}
                      placeholder="e.g. Computer Science"
                      className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section: Team Info ───────────────────────────────────── */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                👥 Team Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Team Name <span className="text-red-500">*</span></label>
                    <input type="text" name="teamName" value={form.teamName} onChange={handleChange}
                      required placeholder="e.g. SkyGuard"
                      className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Booth Number</label>
                    <input type="text" name="boothNumber" value={form.boothNumber} onChange={handleChange}
                      placeholder="e.g. A-01"
                      className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Team Members <span className="text-red-500">*</span></label>
                  <input type="text" name="members" value={form.members} onChange={handleChange}
                    required placeholder="e.g. Ali Hassan, Muhammad Bilal, Sana Tariq"
                    className={inputClass} />
                  <p className="text-xs text-gray-400 mt-1">Separate names with commas</p>
                </div>

                <div>
                  <label className={labelClass}>Supervisor Name <span className="text-red-500">*</span></label>
                  <input type="text" name="supervisorName" value={form.supervisorName} onChange={handleChange}
                    required placeholder="e.g. Dr. Naveed Ahmed"
                    className={inputClass} />
                </div>
              </div>
            </div>

            {/* ── Section: Technical Details ───────────────────────────── */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                🛠️ Technical Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Tech Stack</label>
                  <input type="text" name="techStack" value={form.techStack} onChange={handleChange}
                    placeholder="e.g. Python, TensorFlow, React, PostgreSQL"
                    className={inputClass} />
                  <p className="text-xs text-gray-400 mt-1">Separate technologies with commas</p>
                </div>

                <div>
                  <label className={labelClass}>Tags</label>
                  <input type="text" name="tags" value={form.tags} onChange={handleChange}
                    placeholder="e.g. AI, Machine Learning, Healthcare"
                    className={inputClass} />
                  <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </div>

            {/* ── Section: Links & Media ───────────────────────────────── */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                🔗 Links & Media
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Project Image URL</label>
                  <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Demo Link</label>
                    <input type="url" name="demoUrl" value={form.demoUrl} onChange={handleChange}
                      placeholder="https://your-demo.vercel.app"
                      className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Report Link</label>
                    <input type="url" name="reportUrl" value={form.reportUrl} onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 text-base"
            >
              {loading ? "Submitting..." : "🚀 Submit Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}