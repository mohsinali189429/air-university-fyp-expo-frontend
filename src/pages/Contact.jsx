import { useState } from "react";
import api from "../api/axios.js";

const contactInfo = [
  { icon: "📍", label: "Address", value: "Air University, PAF Complex E-9, Islamabad, Pakistan" },
  { icon: "📧", label: "Email", value: "fyp@au.edu.pk" },
  { icon: "📞", label: "Phone", value: "+92-51-9262557" },
  { icon: "🕐", label: "Office Hours", value: "Mon–Fri, 9:00 AM – 5:00 PM" },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState(null);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 fade-in">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)" }}
      >
        <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
          Get in Touch
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Contact Us
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Have questions about FYP Expo 2026? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Contact Info ──────────────────────────────────────────────── */}
          <div className="space-y-6">
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Expo Office
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Reach out to the FYP Expo organizing committee for any queries regarding
                participation, sponsorship, judging, or general information.
              </p>
            </div>

            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-gray-800 font-medium text-sm">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social / Quick Links */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Quick Links
              </p>
              <div className="space-y-2">
                
                <a
                  href="https://www.au.edu.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  🌐 Air University Website
                </a>
                <a
                  href="https://www.au.edu.pk/pages/Faculties/CS_AI/main.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  💻 Faculty of CS & AI
                </a>
              </div>
            </div>
          </div>

          {/* ── Contact Form ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Send a Message
              </h2>

              {/* Success message */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm mt-0.5">We'll get back to you within 1–2 business days.</p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
                  <p className="font-semibold text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Muhammad Ali"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="ali@au.edu.pk"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Sponsorship Inquiry, Project Submission"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Write your message here..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-base"
                >
                  {loading ? "Sending..." : "✉️ Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}