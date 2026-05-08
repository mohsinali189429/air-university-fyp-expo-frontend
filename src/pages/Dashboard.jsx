import { useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

function badgeClass(status) {
  if (status === "approved") return "bg-green-50 text-green-800 border-green-200";
  if (status === "rejected") return "bg-red-50 text-red-800 border-red-200";
  return "bg-yellow-50 text-yellow-800 border-yellow-200";
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
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
  });

  useEffect(() => {
    async function load() {
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
    load();
  }, []);

  const accountStatus = useMemo(() => {
    const approvalStatus = profile?.approvalStatus || user?.approvalStatus;
    if (approvalStatus === "approved") return { label: "Approved", color: "text-green-700" };
    if (approvalStatus === "rejected") return { label: "Rejected", color: "text-red-700" };
    return { label: "Pending Approval", color: "text-yellow-800" };
  }, [profile, user]);

  function startEdit(project) {
    setSuccess("");
    setError("");
    setEditing(project);
    setForm({
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditing(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!editing) return;

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.patch(`/projects/${editing.id}`, form);
      setProjects((prev) => prev.map((p) => (p.id === editing.id ? res.data : p)));
      setSuccess(
        "Project updated successfully. If it was rejected, it has been resubmitted and is now pending admin approval."
      );
      setEditing(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">User Dashboard</h1>
        <p className="text-sm text-slate-600 mt-1">
          View your account status and manage your project submissions.
        </p>
      </div>

      {error && (
        <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-5 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          {success}
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-600">
          Loading dashboard...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Profile</h2>
              <div className="space-y-2 text-sm text-slate-700">
                <p><span className="text-slate-500">Name:</span> {profile?.firstName} {profile?.lastName}</p>
                <p><span className="text-slate-500">Email:</span> {profile?.email}</p>
                <p><span className="text-slate-500">Registration ID:</span> {profile?.registrationId}</p>
                <p><span className="text-slate-500">Department:</span> {profile?.department}</p>
                <p><span className="text-slate-500">Semester:</span> {profile?.semester}</p>
                <p>
                  <span className="text-slate-500">Account Status:</span>{" "}
                  <span className={`font-semibold ${accountStatus.color}`}>{accountStatus.label}</span>
                </p>
                {profile?.approvalStatus === "rejected" && profile?.rejectionReason ? (
                  <div className="mt-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <strong>Rejection reason:</strong> {profile.rejectionReason}
                  </div>
                ) : null}
              </div>
            </div>

            {editing && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">
                  Edit & Resubmit Project
                </h2>
                <p className="text-sm text-slate-500 mb-4">
                  If your project was rejected, saving changes will resubmit it for approval.
                </p>
                <form onSubmit={handleSave} className="space-y-3">
                  <Field label="Title">
                    <input name="title" value={form.title} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </Field>
                  <Field label="Category">
                    <input name="category" value={form.category} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </Field>
                  <Field label="Team Name">
                    <input name="teamName" value={form.teamName} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </Field>
                  <Field label="Members">
                    <input name="members" value={form.members} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </Field>
                  <Field label="Supervisor Name">
                    <input name="supervisorName" value={form.supervisorName} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </Field>
                  <Field label="Description">
                    <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </Field>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg disabled:opacity-70"
                    >
                      {saving ? "Saving..." : "Save & Resubmit"}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-white border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">My Projects</h2>
                <p className="text-sm text-slate-500">
                  Status indicators: yellow pending, green approved, red rejected.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="text-left px-4 py-3">Title</th>
                      <th className="text-left px-4 py-3">Category</th>
                      <th className="text-left px-4 py-3">Status</th>
                      <th className="text-left px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 text-slate-900 font-medium">{p.title}</td>
                        <td className="px-4 py-3">{p.category}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badgeClass(p.status)}`}>
                            {p.status}
                          </span>
                          {p.status === "rejected" && p.rejectionReason ? (
                            <div className="text-xs text-slate-500 mt-1">{p.rejectionReason}</div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          {p.status === "rejected" ? (
                            <button
                              type="button"
                              onClick={() => startEdit(p)}
                              className="text-blue-700 hover:underline font-medium"
                            >
                              Edit & Resubmit
                            </button>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {!projects.length && (
                      <tr>
                        <td className="px-4 py-6 text-slate-500" colSpan={4}>
                          You have not submitted any projects yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

