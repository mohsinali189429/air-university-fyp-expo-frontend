import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(
        res.data?.message || "If this email exists, a password reset link has been sent."
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Forgot Password</h1>
        <p className="text-sm text-slate-500 mb-6">Enter your email to receive a reset link.</p>

        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        {message && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-5">
          Back to{" "}
          <Link to="/login" className="text-blue-700 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
