import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

const tierConfig = {
  Platinum: {
    label: "Platinum Sponsors",
    icon: "💎",
    bg: "bg-gradient-to-br from-slate-50 to-blue-50",
    border: "border-slate-300",
    badge: "bg-slate-800 text-white",
    logoSize: "h-24",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  Gold: {
    label: "Gold Sponsors",
    icon: "🥇",
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
    border: "border-yellow-300",
    badge: "bg-yellow-500 text-white",
    logoSize: "h-20",
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  },
  Silver: {
    label: "Silver Sponsors",
    icon: "🥈",
    bg: "bg-gradient-to-br from-gray-50 to-slate-50",
    border: "border-gray-300",
    badge: "bg-gray-500 text-white",
    logoSize: "h-16",
    gridCols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  },
  Bronze: {
    label: "Bronze Sponsors",
    icon: "🥉",
    bg: "bg-gradient-to-br from-orange-50 to-amber-50",
    border: "border-orange-200",
    badge: "bg-orange-600 text-white",
    logoSize: "h-14",
    gridCols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  },
};

function SponsorCard({ sponsor, config }) {
  const name = sponsor.name;
  const logoUrl = sponsor.logoUrl;
  const description = sponsor.description;
  const websiteUrl = sponsor.websiteUrl;
  const id = sponsor.id;

  return (
    <div
      className={`${config.bg} border ${config.border} rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
    >
      {/* Logo placeholder or image */}
      <div className={`${config.logoSize} flex items-center justify-center mb-4`}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
            <span className="text-2xl font-black text-gray-700">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-700 transition-colors">
        {name}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-500 text-xs leading-relaxed mt-2 line-clamp-2">
          {description}
        </p>
      )}

      {/* Website link */}
      {websiteUrl && (
        
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-xs text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
          onClick={e => e.stopPropagation()}
        >
          Visit Website →
        </a>
      )}
    </div>
  );
}

function TierSection({ tier, sponsors }) {
  const config = tierConfig[tier];
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <div className="mb-16">
      {/* Tier header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{config.icon}</span>
          <div>
            <h2
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {config.label}
            </h2>
            <p className="text-gray-400 text-sm">{sponsors.length} sponsor{sponsors.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <span className={`badge ${config.badge} text-xs px-3 py-1`}>
          {tier}
        </span>
      </div>

      {/* Sponsors grid */}
      <div className={`grid ${config.gridCols} gap-4`}>
        {sponsors.map(sponsor => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} config={config} />
        ))}
      </div>
    </div>
  );
}

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    api.get("/sponsors")
      .then(r => { setSponsors(r.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  // Group sponsors by tier
  const grouped = sponsors.reduce((acc, s) => {
    if (!acc[s.tier]) acc[s.tier] = [];
    acc[s.tier].push(s);
    return acc;
  }, {});

  const tierOrder = ["Platinum", "Gold", "Silver", "Bronze"];

  return (
    <div className="min-h-screen bg-gray-50 fade-in">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div
        className="py-16 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)" }}
      >
        <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
          AU FYP Expo 2026
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Sponsors
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Organizations supporting the next generation of Pakistani engineers and innovators
        </p>

        {/* Tier pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {tierOrder.map(tier => (
            <span
              key={tier}
              className={`badge ${tierConfig[tier].badge} text-sm px-4 py-2`}
            >
              {tierConfig[tier].icon} {tier}
            </span>
          ))}
        </div>
      </div>

      {/* ── Sponsors Content ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        {loading && <Loader text="Loading sponsors..." />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
            <p className="font-semibold">Failed to load sponsors</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && sponsors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🤝</p>
            <p className="text-gray-500">No sponsors listed yet.</p>
          </div>
        )}

        {!loading && !error && sponsors.length > 0 && (
          <>
            {/* Thank you message */}
            <div className="text-center mb-14">
              <p className="text-gray-500 max-w-2xl mx-auto">
                We are grateful to our <span className="font-semibold text-gray-800">{sponsors.length} sponsors</span> whose
                generous support makes the FYP Expo possible every year.
              </p>
            </div>

            {/* Render each tier */}
            {tierOrder.map(tier => (
              <TierSection key={tier} tier={tier} sponsors={grouped[tier]} />
            ))}
          </>
        )}
      </div>

      {/* ── Become a Sponsor CTA ────────────────────────────────────────── */}
      <div
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2149 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
                Partner With Us
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Become a Sponsor
              </h2>
              <p className="text-blue-200 leading-relaxed mb-6">
                Join Pakistan's leading aerospace and technology university's flagship academic event.
                Connect with top engineering talent, showcase your brand, and invest in the future of innovation.
              </p>
              <Link to="/contact" className="btn-primary inline-flex">
                ✉️ Contact Us to Sponsor
              </Link>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: "👁️", text: "Brand visibility to 1000+ attendees including industry leaders" },
                { icon: "🎓", text: "Direct access to top graduating engineers and computer scientists" },
                { icon: "🤝", text: "Networking opportunities with Air University faculty and researchers" },
                { icon: "📢", text: "Logo placement on all event materials, banners, and digital platforms" },
                { icon: "🏆", text: "Opportunity to award a sponsored prize in your category of choice" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-blue-200 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}