import { useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";

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
    pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
    approved: "bg-green-50 text-green-800 border-green-200",
    rejected: "bg-red-50 text-red-800 border-red-200",
  };
  const cls = map[status] || "bg-slate-50 text-slate-700 border-slate-200";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}
    >
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A"}
    </span>
  );
}

// ─── Rejection Modal ──────────────────────────────────────────────────────────

function RejectModal({ title, onConfirm, onCancel, loading }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Reject — {title}
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Provide a clear reason. This will be emailed to the user.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="Enter rejection reason..."
          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
        />
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => onConfirm(reason)}
            disabled={loading || reason.trim().length < 3}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Rejecting..." : "Confirm Rejection"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white border border-slate-300 text-slate-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Project Detail Modal ─────────────────────────────────────────────────────

function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
            <p className="text-sm text-slate-500 mt-1">
              {project.teamName} &bull; {project.category}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <DetailField label="Status">
            <StatusBadge status={project.status} />
            {project.status === "rejected" && project.rejectionReason && (
              <p className="text-red-700 mt-1 text-xs">{project.rejectionReason}</p>
            )}
          </DetailField>
          <DetailField label="Department" value={project.department || "N/A"} />
          <DetailField label="Supervisor" value={project.supervisorName} />
          <DetailField label="Booth Number" value={project.boothNumber || "N/A"} />
          <DetailField label="Members" value={project.members} />
          <DetailField label="Tech Stack" value={project.techStack || "N/A"} />
          <DetailField label="Tags" value={project.tags || "N/A"} />
          <DetailField label="Submitted" value={formatDate(project.createdAt)} />
          {project.demoUrl && (
            <DetailField label="Demo URL">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {project.demoUrl}
              </a>
            </DetailField>
          )}
          {project.reportUrl && (
            <DetailField label="Report URL">
              <a
                href={project.reportUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {project.reportUrl}
              </a>
            </DetailField>
          )}
          <div className="sm:col-span-2">
            <DetailField label="Description">
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                {project.description}
              </p>
            </DetailField>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailField({ label, value, children }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      {children || <p className="text-slate-800 text-sm">{value}</p>}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    green: "bg-green-50 border-green-100 text-green-700",
    yellow: "bg-yellow-50 border-yellow-100 text-yellow-800",
    red: "bg-red-50 border-red-100 text-red-700",
    slate: "bg-slate-50 border-slate-200 text-slate-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
  };
  return (
    <div className={`border rounded-2xl p-4 ${colors[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="text-3xl font-bold mt-1">{value ?? 0}</p>
    </div>
  );
}

function SidebarItem({ active, label, badge, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${active
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
        }`}
    >
      <span>{label}</span>
      {badge > 0 && (
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? "bg-white/25 text-white" : "bg-blue-100 text-blue-700"
            }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function Input({ label, name, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

const emptyProjectForm = {
  title: "",
  description: "",
  category: "",
  teamName: "",
  members: "",
  supervisorName: "",
  department: "",
  boothNumber: "",
  techStack: "",
  tags: "",
  imageUrl: "",
  demoUrl: "",
  reportUrl: "",
};

// ─── Main Admin Component ─────────────────────────────────────────────────────

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeView, setActiveView] = useState("dashboard");

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [userQuery, setUserQuery] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("pending");
  const [projectQuery, setProjectQuery] = useState("");
  const [projectStatusFilter, setProjectStatusFilter] = useState("pending");

  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);

  // Rejection modal state
  const [rejectModal, setRejectModal] = useState(null);
  // { type: "user" | "project", id: number, name: string }

  const isEditing = Boolean(editingProjectId);

  // ── Load data ──
  useEffect(() => {
    loadAdminData();
  }, []);

  async function loadAdminData() {
    setLoading(true);
    setError("");
    try {
      const [statsRes, usersRes, projectsRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/admin/projects"),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data || []);
      setProjects(projectsRes.data || []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  function showSuccess(msg) {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3500);
  }

  // ── Derived counts ──
  const pendingRegistrationsCount = useMemo(
    () => users.filter((u) => u.approvalStatus === "pending" && u.isVerified).length,
    [users]
  );
  const pendingProjectsCount = useMemo(
    () => projects.filter((p) => p.status === "pending").length,
    [projects]
  );
  const totals = stats?.totals || {};

  const userCounts = useMemo(() => ({
    pending: users.filter((u) => u.approvalStatus === "pending").length,
    approved: users.filter((u) => u.approvalStatus === "approved").length,
    rejected: users.filter((u) => u.approvalStatus === "rejected").length,
    all: users.length,
  }), [users]);

  const projectCounts = useMemo(() => ({
    pending: projects.filter((p) => p.status === "pending").length,
    approved: projects.filter((p) => p.status === "approved").length,
    rejected: projects.filter((p) => p.status === "rejected").length,
    all: projects.length,
  }), [projects]);

  // ── Filtered lists ──
  const filteredUsers = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    return users
      .filter((u) =>
        userStatusFilter === "all" ? true : u.approvalStatus === userStatusFilter
      )
      .filter((u) => {
        if (!q) return true;
        return (
          `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q) ||
          (u.registrationId || "").toLowerCase().includes(q) ||
          (u.department || "").toLowerCase().includes(q)
        );
      });
  }, [users, userQuery, userStatusFilter]);

  const filteredProjects = useMemo(() => {
    const q = projectQuery.trim().toLowerCase();
    return projects
      .filter((p) =>
        projectStatusFilter === "all" ? true : p.status === projectStatusFilter
      )
      .filter((p) => {
        if (!q) return true;
        return (
          (p.title || "").toLowerCase().includes(q) ||
          (p.teamName || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q) ||
          (p.department || "").toLowerCase().includes(q)
        );
      });
  }, [projects, projectQuery, projectStatusFilter]);

  // ── User actions ──
  async function handleApproveUser(userId) {
    setActionLoading(true);
    setError("");
    try {
      const res = await api.patch(`/admin/users/${userId}/approve`);
      const updated = res.data?.user;
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, approvalStatus: updated.approvalStatus, isApproved: updated.isApproved, approvedAt: updated.approvedAt }
            : u
        )
      );
      showSuccess("User approved and notified by email.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve user.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRejectUser(reason) {
    if (!rejectModal) return;
    setActionLoading(true);
    setError("");
    try {
      const res = await api.patch(`/admin/users/${rejectModal.id}/reject`, {
        rejectionReason: reason,
      });
      const updated = res.data?.user;
      setUsers((prev) =>
        prev.map((u) =>
          u.id === rejectModal.id
            ? { ...u, approvalStatus: updated.approvalStatus, isApproved: updated.isApproved, rejectionReason: updated.rejectionReason }
            : u
        )
      );
      setRejectModal(null);
      showSuccess("User rejected and notified by email.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reject user.");
    } finally {
      setActionLoading(false);
    }
  }

  // ── Project actions ──
  async function handleApproveProject(projectId) {
    setActionLoading(true);
    setError("");
    try {
      const res = await api.patch(`/admin/projects/${projectId}/approve`);
      const updated = res.data?.project;
      if (updated) setProjects((prev) => prev.map((p) => (p.id === projectId ? updated : p)));
      showSuccess("Project approved and submitter notified.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve project.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRejectProject(reason) {
    if (!rejectModal) return;
    setActionLoading(true);
    setError("");
    try {
      const res = await api.patch(`/admin/projects/${rejectModal.id}/reject`, {
        rejectionReason: reason,
      });
      const updated = res.data?.project;
      if (updated) setProjects((prev) => prev.map((p) => (p.id === rejectModal.id ? updated : p)));
      setRejectModal(null);
      showSuccess("Project rejected and submitter notified.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reject project.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteProject(id) {
    if (!window.confirm("Permanently delete this project? This cannot be undone.")) return;
    setError("");
    try {
      await api.delete(`/admin/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingProjectId === id) resetProjectForm();
      showSuccess("Project deleted.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete project.");
    }
  }

  // ── Project form ──
  function handleProjectFieldChange(e) {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(project) {
    setEditingProjectId(project.id);
    setProjectForm({
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
    setActiveView("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetProjectForm() {
    setEditingProjectId(null);
    setProjectForm(emptyProjectForm);
  }

  async function handleProjectSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isEditing) {
        const res = await api.patch(`/admin/projects/${editingProjectId}`, projectForm);
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProjectId ? res.data : p))
        );
        showSuccess("Project updated successfully.");
      } else {
        const res = await api.post("/admin/projects", projectForm);
        setProjects((prev) => [res.data, ...prev]);
        showSuccess("Project created successfully.");
      }
      resetProjectForm();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  // ── Render ──
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modals */}
      {rejectModal && (
        <RejectModal
          title={rejectModal.name}
          onConfirm={rejectModal.type === "user" ? handleRejectUser : handleRejectProject}
          onCancel={() => setRejectModal(null)}
          loading={actionLoading}
        />
      )}
      {viewingProject && (
        <ProjectDetailModal
          project={viewingProject}
          onClose={() => setViewingProject(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Air University FYP Expo 2026 — Admin Control Center
            </p>
          </div>
          <button
            type="button"
            onClick={loadAdminData}
            className="self-start sm:self-auto text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
          >
            Refresh Data
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            {success}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
            Loading admin data...
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── Sidebar ── */}
            <aside className="lg:w-56 flex-shrink-0">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:sticky lg:top-20">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
                  Navigation
                </p>
                <nav className="space-y-1">
                  <SidebarItem
                    active={activeView === "dashboard"}
                    label="Dashboard"
                    onClick={() => setActiveView("dashboard")}
                  />
                  <SidebarItem
                    active={activeView === "registrations"}
                    label="Registrations"
                    badge={pendingRegistrationsCount}
                    onClick={() => setActiveView("registrations")}
                  />
                  <SidebarItem
                    active={activeView === "projects"}
                    label="Projects"
                    badge={pendingProjectsCount}
                    onClick={() => setActiveView("projects")}
                  />
                  <SidebarItem
                    active={activeView === "create"}
                    label="Create Project"
                    onClick={() => { resetProjectForm(); setActiveView("create"); }}
                  />
                </nav>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Badges show pending items requiring your attention.
                  </p>
                </div>
              </div>
            </aside>

            {/* ── Main content ── */}
            <main className="flex-1 min-w-0 space-y-6">

              {/* ── DASHBOARD ── */}
              {activeView === "dashboard" && (
                <div className="space-y-6">
                  {/* Stat grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                    <StatCard label="Total Users" value={totals.totalUsers} color="blue" />
                    <StatCard label="Verified Users" value={totals.verifiedUsers} color="green" />
                    <StatCard label="Pending Registrations" value={pendingRegistrationsCount} color="yellow" />
                    <StatCard label="Total Projects" value={totals.totalProjects} color="blue" />
                    <StatCard label="Pending Projects" value={pendingProjectsCount} color="yellow" />
                    <StatCard label="Approved Projects" value={projectCounts.approved} color="green" />
                    <StatCard label="Total Sponsors" value={totals.totalSponsors} color="purple" />
                    <StatCard label="Total Judges" value={totals.totalJudges} color="slate" />
                  </div>

                  {/* Quick action banners */}
                  {(pendingRegistrationsCount > 0 || pendingProjectsCount > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pendingRegistrationsCount > 0 && (
                        <button
                          type="button"
                          onClick={() => { setUserStatusFilter("pending"); setActiveView("registrations"); }}
                          className="text-left bg-yellow-50 border border-yellow-200 rounded-2xl p-4 hover:bg-yellow-100 transition-colors"
                        >
                          <p className="text-xs font-bold text-yellow-700 uppercase tracking-wide">
                            Action Required
                          </p>
                          <p className="text-xl font-bold text-yellow-900 mt-1">
                            {pendingRegistrationsCount} pending registration{pendingRegistrationsCount !== 1 ? "s" : ""}
                          </p>
                          <p className="text-sm text-yellow-700 mt-0.5">
                            Click to review &rarr;
                          </p>
                        </button>
                      )}
                      {pendingProjectsCount > 0 && (
                        <button
                          type="button"
                          onClick={() => { setProjectStatusFilter("pending"); setActiveView("projects"); }}
                          className="text-left bg-blue-50 border border-blue-200 rounded-2xl p-4 hover:bg-blue-100 transition-colors"
                        >
                          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                            Action Required
                          </p>
                          <p className="text-xl font-bold text-blue-900 mt-1">
                            {pendingProjectsCount} pending project{pendingProjectsCount !== 1 ? "s" : ""}
                          </p>
                          <p className="text-sm text-blue-700 mt-0.5">
                            Click to review &rarr;
                          </p>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Recent activity */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                      <h2 className="text-base font-semibold text-slate-900 mb-3">
                        Recent Registrations
                      </h2>
                      <div className="divide-y divide-slate-100">
                        {(stats?.activity?.recentUsers || []).length === 0 && (
                          <p className="text-sm text-slate-400 py-2">No recent users.</p>
                        )}
                        {(stats?.activity?.recentUsers || []).map((u) => (
                          <div
                            key={u.id}
                            className="flex items-center justify-between py-2.5 text-sm"
                          >
                            <span className="text-slate-700 truncate">{u.email}</span>
                            <span className="text-slate-400 text-xs ml-2 flex-shrink-0">
                              {formatDate(u.createdAt)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                      <h2 className="text-base font-semibold text-slate-900 mb-3">
                        Recent Project Submissions
                      </h2>
                      <div className="divide-y divide-slate-100">
                        {(stats?.activity?.recentProjects || []).length === 0 && (
                          <p className="text-sm text-slate-400 py-2">No recent projects.</p>
                        )}
                        {(stats?.activity?.recentProjects || []).map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between py-2.5 text-sm"
                          >
                            <span className="text-slate-700 truncate">{p.title}</span>
                            <span className="text-slate-400 text-xs ml-2 flex-shrink-0">
                              {formatDate(p.createdAt)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── REGISTRATIONS ── */}
              {activeView === "registrations" && (
                <div className="space-y-4">
                  {/* Count pills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Pending", value: "pending", count: userCounts.pending, color: "yellow" },
                      { label: "Approved", value: "approved", count: userCounts.approved, color: "green" },
                      { label: "Rejected", value: "rejected", count: userCounts.rejected, color: "red" },
                      { label: "All", value: "all", count: userCounts.all, color: "slate" },
                    ].map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        onClick={() => setUserStatusFilter(f.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${userStatusFilter === f.value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                      >
                        {f.label} ({f.count})
                      </button>
                    ))}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    {/* Table header */}
                    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-base font-semibold text-slate-900">
                          Registration Approval Queue
                        </h2>
                        <p className="text-sm text-slate-500">
                          Verify student info and approve or reject registrations.
                        </p>
                      </div>
                      <input
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        placeholder="Search name, email, reg ID..."
                        className="w-full sm:w-64 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                          <tr>
                            <th className="text-left px-4 py-3">Student</th>
                            <th className="text-left px-4 py-3">Reg ID</th>
                            <th className="text-left px-4 py-3">Department</th>
                            <th className="text-left px-4 py-3">Sem</th>
                            <th className="text-left px-4 py-3">Email Verified</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-left px-4 py-3">Registered</th>
                            <th className="text-left px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredUsers.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3">
                                <div className="font-medium text-slate-900">
                                  {u.firstName} {u.lastName}
                                </div>
                                <div className="text-slate-500 text-xs">{u.email}</div>
                              </td>
                              <td className="px-4 py-3 text-slate-700">{u.registrationId}</td>
                              <td className="px-4 py-3 text-slate-700 max-w-[160px] truncate">
                                {u.department}
                              </td>
                              <td className="px-4 py-3 text-slate-700">{u.semester}</td>
                              <td className="px-4 py-3">
                                {u.isVerified ? (
                                  <span className="text-green-600 font-semibold">Yes</span>
                                ) : (
                                  <span className="text-red-500">No</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <StatusBadge status={u.approvalStatus} />
                                {u.approvalStatus === "rejected" && u.rejectionReason && (
                                  <div className="text-xs text-slate-500 mt-1 max-w-[180px] line-clamp-2">
                                    {u.rejectionReason}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                                {formatDate(u.createdAt)}
                              </td>
                              <td className="px-4 py-3">
                                {u.approvalStatus === "pending" ? (
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleApproveUser(u.id)}
                                      disabled={!u.isVerified || actionLoading}
                                      title={!u.isVerified ? "Email not verified yet" : ""}
                                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setRejectModal({
                                          type: "user",
                                          id: u.id,
                                          name: `${u.firstName} ${u.lastName}`,
                                        })
                                      }
                                      disabled={actionLoading}
                                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-slate-300 text-xs">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                          {filteredUsers.length === 0 && (
                            <tr>
                              <td
                                colSpan={8}
                                className="px-4 py-8 text-center text-slate-400 text-sm"
                              >
                                No users match the current filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PROJECTS ── */}
              {activeView === "projects" && (
                <div className="space-y-4">
                  {/* Count pills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Pending", value: "pending", count: projectCounts.pending },
                      { label: "Approved", value: "approved", count: projectCounts.approved },
                      { label: "Rejected", value: "rejected", count: projectCounts.rejected },
                      { label: "All", value: "all", count: projectCounts.all },
                    ].map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        onClick={() => setProjectStatusFilter(f.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${projectStatusFilter === f.value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                      >
                        {f.label} ({f.count})
                      </button>
                    ))}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-base font-semibold text-slate-900">Project Moderation</h2>
                        <p className="text-sm text-slate-500">
                          Review submissions. Only approved projects appear publicly.
                        </p>
                      </div>
                      <input
                        value={projectQuery}
                        onChange={(e) => setProjectQuery(e.target.value)}
                        placeholder="Search title, team, category..."
                        className="w-full sm:w-64 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                          <tr>
                            <th className="text-left px-4 py-3">Project</th>
                            <th className="text-left px-4 py-3">Category</th>
                            <th className="text-left px-4 py-3">Team</th>
                            <th className="text-left px-4 py-3">Department</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-left px-4 py-3">Submitted</th>
                            <th className="text-left px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredProjects.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3">
                                <div className="font-medium text-slate-900 max-w-[200px] truncate">
                                  {p.title}
                                </div>
                                <div className="text-xs text-slate-500">{p.supervisorName}</div>
                              </td>
                              <td className="px-4 py-3 text-slate-700">{p.category}</td>
                              <td className="px-4 py-3 text-slate-700">{p.teamName}</td>
                              <td className="px-4 py-3 text-slate-700 max-w-[140px] truncate">
                                {p.department || "N/A"}
                              </td>
                              <td className="px-4 py-3">
                                <StatusBadge status={p.status} />
                                {p.status === "rejected" && p.rejectionReason && (
                                  <div className="text-xs text-slate-500 mt-1 max-w-[160px] line-clamp-2">
                                    {p.rejectionReason}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                                {formatDate(p.createdAt)}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex flex-wrap gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setViewingProject(p)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                                  >
                                    View
                                  </button>
                                  {p.status === "pending" && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => handleApproveProject(p.id)}
                                        disabled={actionLoading}
                                        className="px-2.5 py-1 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setRejectModal({
                                            type: "project",
                                            id: p.id,
                                            name: p.title,
                                          })
                                        }
                                        disabled={actionLoading}
                                        className="px-2.5 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => startEdit(p)}
                                    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-lg transition-colors"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteProject(p.id)}
                                    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg transition-colors"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {filteredProjects.length === 0 && (
                            <tr>
                              <td
                                colSpan={7}
                                className="px-4 py-8 text-center text-slate-400 text-sm"
                              >
                                No projects match the current filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Inline edit form — appears below table when editing */}
                  {isEditing && (
                    <div className="bg-white border border-blue-200 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-slate-900">
                          Editing: {projectForm.title || "Project"}
                        </h3>
                        <button
                          type="button"
                          onClick={resetProjectForm}
                          className="text-sm text-slate-500 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                      </div>
                      <form
                        onSubmit={handleProjectSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <Input name="title" label="Title" value={projectForm.title} onChange={handleProjectFieldChange} required />
                        <Input name="category" label="Category" value={projectForm.category} onChange={handleProjectFieldChange} required />
                        <Input name="teamName" label="Team Name" value={projectForm.teamName} onChange={handleProjectFieldChange} required />
                        <Input name="supervisorName" label="Supervisor Name" value={projectForm.supervisorName} onChange={handleProjectFieldChange} required />
                        <Input name="members" label="Members (comma-separated)" value={projectForm.members} onChange={handleProjectFieldChange} required />
                        <Input name="department" label="Department" value={projectForm.department} onChange={handleProjectFieldChange} />
                        <Input name="boothNumber" label="Booth Number" value={projectForm.boothNumber} onChange={handleProjectFieldChange} />
                        <Input name="techStack" label="Tech Stack" value={projectForm.techStack} onChange={handleProjectFieldChange} />
                        <Input name="tags" label="Tags" value={projectForm.tags} onChange={handleProjectFieldChange} />
                        <Input name="imageUrl" label="Image URL" value={projectForm.imageUrl} onChange={handleProjectFieldChange} />
                        <Input name="demoUrl" label="Demo URL" value={projectForm.demoUrl} onChange={handleProjectFieldChange} />
                        <Input name="reportUrl" label="Report URL" value={projectForm.reportUrl} onChange={handleProjectFieldChange} />
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                          </label>
                          <textarea
                            name="description"
                            value={projectForm.description}
                            onChange={handleProjectFieldChange}
                            required
                            rows={4}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          />
                        </div>
                        <div className="md:col-span-2 flex gap-3">
                          <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                          >
                            {saving ? "Saving..." : "Update Project"}
                          </button>
                          <button
                            type="button"
                            onClick={resetProjectForm}
                            className="bg-white border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* ── CREATE PROJECT ── */}
              {activeView === "create" && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h2 className="text-base font-semibold text-slate-900 mb-5">
                    Create New Project
                  </h2>
                  <form
                    onSubmit={handleProjectSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <Input name="title" label="Title" value={projectForm.title} onChange={handleProjectFieldChange} required />
                    <Input name="category" label="Category" value={projectForm.category} onChange={handleProjectFieldChange} required />
                    <Input name="teamName" label="Team Name" value={projectForm.teamName} onChange={handleProjectFieldChange} required />
                    <Input name="supervisorName" label="Supervisor Name" value={projectForm.supervisorName} onChange={handleProjectFieldChange} required />
                    <Input name="members" label="Members (comma-separated)" value={projectForm.members} onChange={handleProjectFieldChange} required />
                    <Input name="department" label="Department" value={projectForm.department} onChange={handleProjectFieldChange} />
                    <Input name="boothNumber" label="Booth Number" value={projectForm.boothNumber} onChange={handleProjectFieldChange} />
                    <Input name="techStack" label="Tech Stack" value={projectForm.techStack} onChange={handleProjectFieldChange} />
                    <Input name="tags" label="Tags" value={projectForm.tags} onChange={handleProjectFieldChange} />
                    <Input name="imageUrl" label="Image URL" value={projectForm.imageUrl} onChange={handleProjectFieldChange} />
                    <Input name="demoUrl" label="Demo URL" value={projectForm.demoUrl} onChange={handleProjectFieldChange} />
                    <Input name="reportUrl" label="Report URL" value={projectForm.reportUrl} onChange={handleProjectFieldChange} />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={projectForm.description}
                        onChange={handleProjectFieldChange}
                        required
                        rows={5}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                      >
                        {saving ? "Creating..." : "Create Project"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}