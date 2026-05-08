import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const DEPARTMENTS = [
  "Computer Science",
  "Electrical & Avionics Engineering",
  "Mechanical & Aerospace Engineering",
  "Business Administration",
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    registrationId: "",
    password: "",
    confirmPassword: "",
    department: "",
    semester: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.department) {
      setError("Please select a department.");
      return;
    }
    if (!form.semester) {
      setError("Please select a semester.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        registrationId: form.registrationId,
        password: form.password,
        department: form.department,
        semester: form.semester,
      });
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Create an Account</h1>
          <p className="text-slate-500 text-sm mt-1">
            Register for Air University FYP Expo 2026
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Registration ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Registration ID
            </label>
            <input
              type="text"
              name="registrationId"
              value={form.registrationId}
              onChange={handleChange}
              required
              placeholder="AU-2021-CS-001"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select your department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Semester
            </label>
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Min. 8 characters"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}