import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value) {
  if (!value) return "N/A";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const map = {
    approved: "bg-green-50 text-green-800 border-green-200",
    rejected: "bg-red-50 text-red-800 border-red-200",
    pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
  };
  const cls = map[status] || "bg-slate-50 text-slate-700 border-slate-200";
  const dots = {
    approved: "bg-green-500",
    rejected: "bg-red-500",
    pending: "bg-yellow-500",
  };
  const labels = { approved: "Approved", rejected: "Rejected", pending: "Pending Review" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || "bg-slate-400"}`} />
      {labels[status] || status}
    </span>
  );
}

// ─── Image Lightbox ───────────────────────────────────────────────────────────

function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white text-3xl font-light leading-none"
        >
          &times;
        </button>
        <img
          src={src}
          alt={alt}
          className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
        <p className="text-white/50 text-xs text-center mt-3">
          Click outside or press ESC to close
        </p>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({ projectTitle, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-900 text-center mb-1">Delete Project</h3>
        <p className="text-sm text-slate-500 text-center mb-5">
          Are you sure you want to delete{" "}
          <strong className="text-slate-700">"{projectTitle}"</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Project Modal ───────────────────────────────────────────────────────

function EditModal({ project, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    title: project.title || "",
    description: project.description || "",
    category: project.category || "",
    teamName: project.teamName || "",
    members: project.members || "",
    supervisorName: project.supervisorName || "",
    department: project.department || "",
    boothNumber: project.boothNumber || "",
    techStack: project.techStack || "",
    tags: project.tags || "",
    imageUrl: project.imageUrl || "",
    demoUrl: project.demoUrl || "",
    reportUrl: project.reportUrl || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  const inputCls =
    "w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelCls =
    "block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto z-10 p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Edit Project</h3>
            {project.status === "rejected" && (
              <p className="text-sm text-amber-600 mt-0.5">
                Saving will resubmit this project for admin approval.
              </p>
            )}
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-700 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {project.status === "rejected" && project.rejectionReason && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">
              Admin Feedback
            </p>
            <p className="text-sm text-red-800">{project.rejectionReason}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category *</label>
            <input name="category" value={form.category} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Team Name *</label>
            <input name="teamName" value={form.teamName} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Supervisor *</label>
            <input name="supervisorName" value={form.supervisorName} onChange={handleChange} required className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Members (comma-separated) *</label>
            <input name="members" value={form.members} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Department</label>
            <input name="department" value={form.department} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Booth Number</label>
            <input name="boothNumber" value={form.boothNumber} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Tech Stack</label>
            <input name="techStack" value={form.techStack} onChange={handleChange} className={inputCls} placeholder="React, Node.js, ..." />
          </div>
          <div>
            <label className={labelCls}>Tags</label>
            <input name="tags" value={form.tags} onChange={handleChange} className={inputCls} placeholder="AI, IoT, ..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Banner Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>Demo URL</label>
            <input name="demoUrl" value={form.demoUrl} onChange={handleChange} className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>Report URL</label>
            <input name="reportUrl" value={form.reportUrl} onChange={handleChange} className={inputCls} placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className={`${inputCls} resize-none`}
            />
          </div>
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              {saving
                ? "Saving..."
                : project.status === "rejected"
                ? "Save & Resubmit"
                : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, onEdit, onDelete, onImageClick }) {
  const statusMessages = {
    pending:
      "Your project is currently under admin review. You will be notified once a decision is made.",
    approved:
      "Your project has been approved and is now visible in the expo showcase.",
    rejected:
      "Your project was rejected. Please review the admin feedback below and resubmit.",
  };

  const bannerGradient = {
    approved: "from-green-600 to-teal-600",
    rejected: "from-red-500 to-rose-600",
    pending: "from-blue-600 to-indigo-700",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Banner */}
      <div className="relative h-40 overflow-hidden bg-slate-100">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
            onClick={() => onImageClick(project.imageUrl, project.title)}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${
              bannerGradient[project.status] || "from-slate-500 to-slate-700"
            } flex items-center justify-center`}
          >
            <span className="text-white/30 text-6xl font-bold">
              {project.title?.charAt(0)?.toUpperCase() || "P"}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-base leading-snug mb-0.5 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          {project.category} &bull; {project.teamName}
        </p>

        {/* Status message */}
        <div
          className={`text-xs rounded-xl px-3 py-2 mb-3 leading-relaxed border ${
            project.status === "approved"
              ? "bg-green-50 text-green-800 border-green-100"
              : project.status === "rejected"
              ? "bg-red-50 text-red-800 border-red-100"
              : "bg-blue-50 text-blue-800 border-blue-100"
          }`}
        >
          {statusMessages[project.status]}
        </div>

        {/* Rejection reason */}
        {project.status === "rejected" && project.rejectionReason && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 mb-3">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-0.5">
              Admin Feedback
            </p>
            <p className="text-xs text-red-800">{project.rejectionReason}</p>
          </div>
        )}

        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
          <span>Submitted {formatDate(project.createdAt)}</span>
          <span>Updated {formatDate(project.lastUpdatedAt || project.updatedAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {project.status === "pending" ? (
            <div className="flex-1 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold py-2 rounded-lg text-center">
              Under Review
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              {project.status === "rejected" ? "Edit & Resubmit" : "Edit"}
            </button>
          )}
          <button
            type="button"
            onClick={() => onDelete(project)}
            className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors border border-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Card ─────────────────────────────────────────────────────────────

function ProfileCard({ profile, user }) {
  const approvalStatus = profile?.approvalStatus || user?.approvalStatus;
  const isVerified = profile?.isVerified ?? user?.isVerified;
  const initials = `${profile?.firstName?.charAt(0) || ""}${
    profile?.lastName?.charAt(0) || ""
  }`.toUpperCase() || "?";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-700" />
      <div className="px-5 pb-5">
        <div className="-mt-10 mb-3">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-white shadow-md flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{initials}</span>
          </div>
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          {profile?.firstName} {profile?.lastName}
        </h2>
        <p className="text-sm text-slate-500 mb-4">{profile?.email}</p>

        <div className="space-y-2.5">
          <InfoRow label="Reg ID" value={profile?.registrationId} />
          <InfoRow label="Department" value={profile?.department} />
          <InfoRow
            label="Semester"
            value={profile?.semester ? `Semester ${profile.semester}` : "N/A"}
          />
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Email
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isVerified ? "Verified" : "Unverified"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Account
            </span>
            <StatusBadge status={approvalStatus} />
          </div>
        </div>

        {approvalStatus === "rejected" && profile?.rejectionReason && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">
              Registration Rejected
            </p>
            <p className="text-xs text-red-800">{profile.rejectionReason}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-1 border-b border-slate-50">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-xs text-slate-800 font-medium text-right max-w-[55%]">
        {value || "N/A"}
      </span>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar({ projects }) {
  const total = projects.length;
  const approved = projects.filter((p) => p.status === "approved").length;
  const pending = projects.filter((p) => p.status === "pending").length;
  const rejected = projects.filter((p) => p.status === "rejected").length;

  return (
    <div className="grid grid-cols-4 gap-3">
      {[
        { label: "Total", value: total, color: "bg-blue-50 border-blue-100 text-blue-700" },
        { label: "Pending", value: pending, color: "bg-yellow-50 border-yellow-100 text-yellow-800" },
        { label: "Approved", value: approved, color: "bg-green-50 border-green-100 text-green-700" },
        { label: "Rejected", value: rejected, color: "bg-red-50 border-red-100 text-red-700" },
      ].map((s) => (
        <div key={s.label} className={`border rounded-2xl p-3 text-center ${s.color}`}>
          <p className="text-2xl font-bold">{s.value}</p>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mt-0.5">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError("");
    try {
      const [meRes, projRes] = await Promise.all([
        api.get("/user/me"),
        api.get("/user/projects"),
      ]);
      setProfile(meRes.data);
      setProjects(projRes.data || []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  function showSuccess(msg) {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 4000);
  }

  const hasPendingProject = useMemo(
    () => projects.some((p) => p.status === "pending"),
    [projects]
  );

  async function handleSave(formData) {
    if (!editingProject) return;
    setSaving(true);
    setError("");
    try {
      const res = await api.patch(`/user/projects/${editingProject.id}`, formData);
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? res.data : p))
      );
      setEditingProject(null);
      showSuccess(
        editingProject.status === "rejected"
          ? "Project updated and resubmitted for admin approval."
          : "Project updated successfully."
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setError("");
    try {
      await api.delete(`/user/projects/${deleteTarget.id}`);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
      showSuccess("Project deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete project.");
    } finally {
      setDeleting(false);
    }
  }

  const openLightbox = useCallback((src, alt) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modals */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          projectTitle={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
      {editingProject && (
        <EditModal
          project={editingProject}
          onSave={handleSave}
          onCancel={() => setEditingProject(null)}
          saving={saving}
        />
      )}

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Manage your account and project submissions
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={loadDashboard}
                className="text-sm font-medium text-slate-600 border border-slate-200 bg-white px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Refresh
              </button>
              {hasPendingProject ? (
                <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-xl">
                  🔒 Submission locked
                </div>
              ) : (
                <Link
                  to="/submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  + Submit Project
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            {success}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm">
            Loading your dashboard...
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── Sidebar ── */}
            <aside className="lg:w-72 flex-shrink-0 space-y-4">
              <ProfileCard profile={profile} user={user} />

              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Quick Actions
                </p>
                <div className="space-y-2">
                  {hasPendingProject ? (
                    <div className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-medium px-4 py-2.5 rounded-xl text-center">
                      🔒 Submission locked
                    </div>
                  ) : (
                    <Link
                      to="/submit"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl text-center transition-colors"
                    >
                      Submit New Project
                    </Link>
                  )}
                  <Link
                    to="/projects"
                    className="block w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl text-center transition-colors border border-slate-200"
                  >
                    View Expo Showcase
                  </Link>
                </div>
                {hasPendingProject && (
                  <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-100 rounded-xl px-3 py-2 mt-3 leading-relaxed">
                    Your previous project submission is currently under admin
                    review. You can submit another project once the current
                    request is approved or rejected.
                  </p>
                )}
              </div>
            </aside>

            {/* ── Main content ── */}
            <main className="flex-1 min-w-0 space-y-5">
              <StatsBar projects={projects} />

              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">
                  My Projects
                  <span className="ml-2 text-slate-400 font-normal text-sm">
                    ({projects.length})
                  </span>
                </h2>
              </div>

              {projects.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    No projects yet
                  </h3>
                  <p className="text-sm text-slate-500 mb-5">
                    Submit your Final Year Project to participate in FYP Expo 2026.
                  </p>
                  <Link
                    to="/submit"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                  >
                    Submit Your Project
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {projects.map((p) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      onEdit={(project) => setEditingProject(project)}
                      onDelete={(project) => setDeleteTarget(project)}
                      onImageClick={openLightbox}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}