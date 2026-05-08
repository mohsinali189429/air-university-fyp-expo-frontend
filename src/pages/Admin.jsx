import { useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";

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

function formatDate(value) {
  if (!value) return "N/A";
  return new Date(value).toLocaleString();
}

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
    approved: "bg-green-50 text-green-800 border-green-200",
    rejected: "bg-red-50 text-red-800 border-red-200",
  };
  const cls = map[status] || "bg-slate-50 text-slate-700 border-slate-200";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cls}`}>
      {status || "N/A"}
    </span>
  );
}

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("dashboard"); // dashboard | registrations | projects

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("pending"); // pending | approved | rejected | all
  const [projectQuery, setProjectQuery] = useState("");
  const [projectStatusFilter, setProjectStatusFilter] = useState("pending"); // pending | approved | rejected | all

  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);

  const isEditing = useMemo(() => Boolean(editingProjectId), [editingProjectId]);

  useEffect(() => {
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

    loadAdminData();
  }, []);

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
          prev.map((project) => (project.id === editingProjectId ? res.data : project))
        );
      } else {
        const res = await api.post("/admin/projects", projectForm);
        setProjects((prev) => [res.data, ...prev]);
      }
      resetProjectForm();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProject(id) {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    try {
      await api.delete(`/admin/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      if (editingProjectId === id) resetProjectForm();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete project.");
    }
  }

  const totals = stats?.totals || {};
  const pendingRegistrationsCount = useMemo(
    () => users.filter((u) => u.approvalStatus === "pending").length,
    [users]
  );
  const pendingProjectsCount = useMemo(
    () => projects.filter((p) => p.status === "pending").length,
    [projects]
  );

  const filteredUsers = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    return users
      .filter((u) => (userStatusFilter === "all" ? true : u.approvalStatus === userStatusFilter))
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

  async function handleApproveUser(userId) {
    const confirmed = window.confirm("Approve this registration?");
    if (!confirmed) return;

    try {
      setError("");
      const res = await api.patch(`/admin/users/${userId}/approve`);
      const updated = res.data?.user;
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, approvalStatus: updated.approvalStatus, isApproved: updated.isApproved, approvedAt: updated.approvedAt }
            : u
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve user.");
    }
  }

  async function handleRejectUser(userId) {
    const reason = window.prompt("Enter rejection reason (required):");
    if (!reason) return;

    try {
      setError("");
      const res = await api.patch(`/admin/users/${userId}/reject`, {
        rejectionReason: reason,
      });
      const updated = res.data?.user;
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                approvalStatus: updated.approvalStatus,
                isApproved: updated.isApproved,
                rejectionReason: updated.rejectionReason,
              }
            : u
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reject user.");
    }
  }

  const filteredProjects = useMemo(() => {
    const q = projectQuery.trim().toLowerCase();
    return projects
      .filter((p) => (projectStatusFilter === "all" ? true : p.status === projectStatusFilter))
      .filter((p) => {
        if (!q) return true;
        return (
          (p.title || "").toLowerCase().includes(q) ||
          (p.teamName || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
        );
      });
  }, [projects, projectQuery, projectStatusFilter]);

  const projectCounts = useMemo(() => {
    const pending = projects.filter((p) => p.status === "pending").length;
    const approved = projects.filter((p) => p.status === "approved").length;
    const rejected = projects.filter((p) => p.status === "rejected").length;
    return { pending, approved, rejected, all: projects.length };
  }, [projects]);

  async function handleApproveProject(projectId) {
    const confirmed = window.confirm("Approve this project?");
    if (!confirmed) return;

    try {
      setError("");
      const res = await api.patch(`/admin/projects/${projectId}/approve`);
      const updated = res.data?.project;
      if (updated) {
        setProjects((prev) => prev.map((p) => (p.id === projectId ? updated : p)));
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve project.");
    }
  }

  async function handleRejectProject(projectId) {
    const reason = window.prompt("Enter rejection reason (required):");
    if (!reason) return;

    try {
      setError("");
      const res = await api.patch(`/admin/projects/${projectId}/reject`, {
        rejectionReason: reason,
      });
      const updated = res.data?.project;
      if (updated) {
        setProjects((prev) => prev.map((p) => (p.id === projectId ? updated : p)));
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reject project.");
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Panel</h1>
        <p className="text-slate-600 text-sm mt-1">
          Professional monitoring, approval queues, and project lifecycle management.
        </p>
      </div>

      {error && (
        <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-600">
          Loading admin data...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sticky top-20">
              <nav className="space-y-1">
                <SidebarItem
                  active={activeView === "dashboard"}
                  label="Dashboard"
                  onClick={() => setActiveView("dashboard")}
                />
                <SidebarItem
                  active={activeView === "registrations"}
                  label={`Approval Queue (${pendingRegistrationsCount})`}
                  onClick={() => setActiveView("registrations")}
                />
                <SidebarItem
                  active={activeView === "projects"}
                  label={`Projects (${pendingProjectsCount} pending)`}
                  onClick={() => setActiveView("projects")}
                />
              </nav>
              <div className="mt-4 text-xs text-slate-500">
                Tip: Use search + status filters to quickly review queues.
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 space-y-6">
            {activeView === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <StatCard label="Total Users" value={totals.totalUsers} />
                  <StatCard label="Verified Users" value={totals.verifiedUsers} />
                  <StatCard label="Pending Registrations" value={pendingRegistrationsCount} />
                  <StatCard label="Total Projects" value={totals.totalProjects} />
                  <StatCard label="Pending Projects" value={pendingProjectsCount} />
                  <StatCard label="Total Categories" value={totals.totalCategories} />
                  <StatCard label="Total Sponsors" value={totals.totalSponsors} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5">
                    <h2 className="text-lg font-semibold text-slate-900 mb-3">Recent Users</h2>
                    <div className="space-y-2 text-sm">
                      {(stats?.activity?.recentUsers || []).map((user) => (
                        <div key={user.id} className="flex justify-between border-b border-slate-100 py-2">
                          <span className="text-slate-700">{user.email}</span>
                          <span className="text-slate-500">{formatDate(user.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5">
                    <h2 className="text-lg font-semibold text-slate-900 mb-3">Recent Projects</h2>
                    <div className="space-y-2 text-sm">
                      {(stats?.activity?.recentProjects || []).map((project) => (
                        <div key={project.id} className="flex justify-between border-b border-slate-100 py-2">
                          <span className="text-slate-700">{project.title}</span>
                          <span className="text-slate-500">{formatDate(project.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === "registrations" && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Registration Approval Queue</h2>
                    <p className="text-sm text-slate-500">Review student info and approval status.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder="Search name, email, reg id, department..."
                      className="w-full sm:w-72 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={userStatusFilter}
                      onChange={(e) => setUserStatusFilter(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="text-left px-4 py-3">Student</th>
                        <th className="text-left px-4 py-3">Registration ID</th>
                        <th className="text-left px-4 py-3">Department</th>
                        <th className="text-left px-4 py-3">Semester</th>
                        <th className="text-left px-4 py-3">Verified</th>
                        <th className="text-left px-4 py-3">Approval</th>
                        <th className="text-left px-4 py-3">Created</th>
                        <th className="text-left px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="border-t border-slate-100">
                          <td className="px-4 py-3">
                            <div className="text-slate-900 font-medium">
                              {(u.firstName || "") + " " + (u.lastName || "")}
                            </div>
                            <div className="text-slate-500">{u.email}</div>
                          </td>
                          <td className="px-4 py-3">{u.registrationId}</td>
                          <td className="px-4 py-3">{u.department}</td>
                          <td className="px-4 py-3">{u.semester}</td>
                          <td className="px-4 py-3">{u.isVerified ? "Yes" : "No"}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={u.approvalStatus} />
                            {u.approvalStatus === "rejected" && u.rejectionReason ? (
                              <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                                {u.rejectionReason}
                              </div>
                            ) : null}
                          </td>
                          <td className="px-4 py-3">{formatDate(u.createdAt)}</td>
                          <td className="px-4 py-3">
                            {u.approvalStatus === "pending" ? (
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleApproveUser(u.id)}
                                  className="text-green-700 hover:underline font-medium"
                                >
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRejectUser(u.id)}
                                  className="text-red-600 hover:underline font-medium"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {!filteredUsers.length && (
                        <tr>
                          <td className="px-4 py-6 text-slate-500" colSpan={8}>
                            No users found for the selected filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === "projects" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <QueueCard
                    label="Pending Projects"
                    value={projectCounts.pending}
                    active={projectStatusFilter === "pending"}
                    onClick={() => setProjectStatusFilter("pending")}
                  />
                  <QueueCard
                    label="Approved Projects"
                    value={projectCounts.approved}
                    active={projectStatusFilter === "approved"}
                    onClick={() => setProjectStatusFilter("approved")}
                  />
                  <QueueCard
                    label="Rejected Projects"
                    value={projectCounts.rejected}
                    active={projectStatusFilter === "rejected"}
                    onClick={() => setProjectStatusFilter("rejected")}
                  />
                  <QueueCard
                    label="All Projects"
                    value={projectCounts.all}
                    active={projectStatusFilter === "all"}
                    onClick={() => setProjectStatusFilter("all")}
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
                      <p className="text-sm text-slate-500">
                        Review and moderate submissions. Approve/reject pending projects with feedback.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        value={projectQuery}
                        onChange={(e) => setProjectQuery(e.target.value)}
                        placeholder="Search title, team, category..."
                        className="w-full sm:w-72 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={projectStatusFilter}
                        onChange={(e) => setProjectStatusFilter(e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="all">All</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-600">
                        <tr>
                          <th className="text-left px-4 py-3">Title</th>
                          <th className="text-left px-4 py-3">Category</th>
                          <th className="text-left px-4 py-3">Team</th>
                          <th className="text-left px-4 py-3">Status</th>
                          <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProjects.map((project) => (
                          <tr key={project.id} className="border-t border-slate-100">
                            <td className="px-4 py-3 text-slate-900 font-medium">{project.title}</td>
                            <td className="px-4 py-3">{project.category}</td>
                            <td className="px-4 py-3">{project.teamName}</td>
                            <td className="px-4 py-3">
                              <StatusBadge status={project.status} />
                              {project.status === "rejected" && project.rejectionReason ? (
                                <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                                  {project.rejectionReason}
                                </div>
                              ) : null}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => setViewingProject(project)}
                                  className="text-slate-700 hover:underline"
                                >
                                  View
                                </button>
                                {project.status === "pending" && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleApproveProject(project.id)}
                                      className="text-green-700 hover:underline font-medium"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleRejectProject(project.id)}
                                      className="text-red-600 hover:underline font-medium"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                <button
                                  type="button"
                                  onClick={() => startEdit(project)}
                                  className="text-blue-700 hover:underline"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="text-red-600 hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {!filteredProjects.length && (
                          <tr>
                            <td className="px-4 py-6 text-slate-500" colSpan={5}>
                              No projects found for the selected filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {viewingProject && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{viewingProject.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {viewingProject.teamName} • {viewingProject.category}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setViewingProject(null)}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900"
                      >
                        Close
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-slate-500">Status</p>
                        <div className="mt-1">
                          <StatusBadge status={viewingProject.status} />
                        </div>
                        {viewingProject.status === "rejected" && viewingProject.rejectionReason ? (
                          <p className="text-slate-600 mt-2">
                            <span className="font-medium">Reason:</span> {viewingProject.rejectionReason}
                          </p>
                        ) : null}
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-slate-500">Supervisor</p>
                        <p className="mt-1 text-slate-800 font-medium">{viewingProject.supervisorName}</p>
                        <p className="text-slate-500 mt-2">Members</p>
                        <p className="mt-1 text-slate-700">{viewingProject.members}</p>
                      </div>
                      <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-slate-500">Description</p>
                        <p className="mt-2 text-slate-700 whitespace-pre-line">{viewingProject.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {isEditing ? "Edit Project" : "Create Project"}
                  </h3>
                  <form
                    onSubmit={handleProjectSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <Input name="title" label="Title" value={projectForm.title} onChange={handleProjectFieldChange} required />
                    <Input name="category" label="Category" value={projectForm.category} onChange={handleProjectFieldChange} required />
                    <Input name="teamName" label="Team Name" value={projectForm.teamName} onChange={handleProjectFieldChange} required />
                    <Input name="supervisorName" label="Supervisor Name" value={projectForm.supervisorName} onChange={handleProjectFieldChange} required />
                    <Input name="members" label="Members" value={projectForm.members} onChange={handleProjectFieldChange} required />
                    <Input name="department" label="Department" value={projectForm.department} onChange={handleProjectFieldChange} />
                    <Input name="boothNumber" label="Booth Number" value={projectForm.boothNumber} onChange={handleProjectFieldChange} />
                    <Input name="techStack" label="Tech Stack" value={projectForm.techStack} onChange={handleProjectFieldChange} />
                    <Input name="tags" label="Tags" value={projectForm.tags} onChange={handleProjectFieldChange} />
                    <Input name="imageUrl" label="Image URL" value={projectForm.imageUrl} onChange={handleProjectFieldChange} />
                    <Input name="demoUrl" label="Demo URL" value={projectForm.demoUrl} onChange={handleProjectFieldChange} />
                    <Input name="reportUrl" label="Report URL" value={projectForm.reportUrl} onChange={handleProjectFieldChange} />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={projectForm.description}
                        onChange={handleProjectFieldChange}
                        required
                        rows={4}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg disabled:opacity-70"
                      >
                        {saving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
                      </button>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={resetProjectForm}
                          className="bg-white border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-50"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-1">{value ?? 0}</p>
    </div>
  );
}

function Input({ label, name, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function SidebarItem({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-blue-50"
      }`}
    >
      {label}
    </button>
  );
}

function QueueCard({ label, value, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left bg-white border rounded-2xl p-4 transition-colors ${
        active
          ? "border-blue-300 ring-2 ring-blue-100"
          : "border-slate-200 hover:bg-blue-50"
      }`}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-1">{value ?? 0}</p>
    </button>
  );
}
