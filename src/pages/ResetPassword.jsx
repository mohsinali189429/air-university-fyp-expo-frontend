import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios.js";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenChecking, setTokenChecking] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setTokenValid(false);
        setTokenChecking(false);
        return;
      }

      try {
        await api.post("/auth/verify-reset-token", { token });
        setTokenValid(true);
      } catch {
        setTokenValid(false);
      } finally {
        setTokenChecking(false);
      }
    }

    verifyToken();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/reset-password", { token, password });
      setMessage(res.data?.message || "Password reset successful.");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Reset Password</h1>
        <p className="text-sm text-slate-500 mb-6">Set a new password for your account.</p>

        {tokenChecking && <p className="text-sm text-slate-600">Checking reset link...</p>}

        {!tokenChecking && !tokenValid && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            Invalid or expired reset link.
          </div>
        )}

        {!tokenChecking && tokenValid && (
          <>
            {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
            {message && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <p className="text-sm text-slate-600 mt-5">
          Go to{" "}
          <Link to="/login" className="text-blue-700 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
