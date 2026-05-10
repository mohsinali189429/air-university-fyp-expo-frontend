import React from "react";

// ── Image imports ─────────────────────────────────────────────────────────────
import harisImg from "../assets/images/Team Leads/Computer Science/Mr. Haris.jpg";
import zakaImg from "../assets/images/Team Leads/Computer Science/Zaka Ullah.jpg";
import tariqImg from "../assets/images/Team Leads/Computer Science/Mr. Tariq Aziz.jpg";
import ehtishamImg from "../assets/images/Team Leads/Electrical & Avionics Engineering/Muhammad Ehtisham Hassan.jpg";
import osamaImg from "../assets/images/Team Leads/Electrical & Avionics Engineering/Osama Muzaffar.jpg";
import aliImg from "../assets/images/Team Leads/Mechanical & Aerospace Engineering/Ali Abbas.jpg";
import bilawalImg from "../assets/images/Team Leads/Mechanical & Aerospace Engineering/Bilawal Ramzan.jpg";
import nadiaImg from "../assets/images/Team Leads/Business Administration/Dr. Nadia Ashraf.jpg";

// ── Data ──────────────────────────────────────────────────────────────────────

const departments = [
  {
    name: "Department of Computer Science",
    accent: "from-blue-600 to-indigo-600",
    leads: [
      {
        name: "Muhammad Haris",
        designation: "Lecturer / Final Year Project Manager CS AACK",
        email: "Muhammad.haris@aack.au.edu.pk",
        image: harisImg,
      },
      {
        name: "Zaka Ullah",
        designation: "Lecturer",
        email: "zakaullah@aack.au.edu.pk",
        image: zakaImg,
      },
    ],
  },
  {
    name: "Department of Electrical & Avionics Engineering",
    accent: "from-sky-600 to-blue-600",
    leads: [
      {
        name: "Dr. Ehtisham Hassan",
        designation: "Assistant Professor",
        email: "ehtisham.eave@aack.au.edu.pk",
        image: ehtishamImg,
      },
      {
        name: "Engr. Osama Bin Muzzaffar",
        designation: "Lecturer",
        email: "osamamuzaffar@aack.au.edu.pk",
        image: osamaImg,
      },
    ],
  },
  {
    name: "Department of Mechanical & Aerospace Engineering",
    accent: "from-blue-700 to-cyan-600",
    leads: [
      {
        name: "Ali Abbas",
        designation: "Lecturer",
        email: "aliabbas@aack.au.edu.pk",
        image: aliImg,
      },
      {
        name: "Bilawal Ramzan",
        designation: "Lecturer",
        email: "bilawal@aack.au.edu.pk",
        image: bilawalImg,
      },
    ],
  },
  {
    name: "Department of Business Administration",
    accent: "from-indigo-600 to-blue-500",
    leads: [
      {
        name: "Dr. Nadia Ashraf",
        designation: "Assistant Professor",
        email: "nadia.ashraf@aack.au.edu.pk",
        image: nadiaImg,
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ── Team Lead Card ────────────────────────────────────────────────────────────

function TeamLeadCard({ lead, accent }) {
  const [imgError, setImgError] = React.useState(false);
  const showInitials = !lead.image || imgError;

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col">
      {/* Photo area */}
      <div className="relative overflow-hidden bg-slate-50" style={{ aspectRatio: "4/5" }}>
        {showInitials ? (
          <div
            className={`w-full h-full bg-gradient-to-br ${accent} flex items-center justify-center`}
          >
            <span className="text-white text-5xl font-bold opacity-80">
              {getInitials(lead.name)}
            </span>
          </div>
        ) : (
          <img
            src={lead.image}
            alt={lead.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Bottom gradient overlay for text legibility transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      {/* Info area */}
      <div className="p-5 flex flex-col flex-1 items-center text-center">
        <h4 className="text-base font-bold text-slate-900 leading-snug mb-1">
          {lead.name}
        </h4>
        <p className="text-xs font-semibold text-blue-600 mb-4 leading-snug px-1">
          {lead.designation}
        </p>

        <a
          href={`mailto:${lead.email}`}
          className="mt-auto inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-600 transition-colors group/mail"
        >
          <svg
            className="w-3.5 h-3.5 flex-shrink-0 group-hover/mail:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="truncate max-w-[160px]">{lead.email}</span>
        </a>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export default function TeamLeadsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            Meet the Faculty
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            FYP Team Leads
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Dedicated faculty coordinators guiding final year projects across all departments
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mt-6" />
        </div>

        {/* Departments */}
        <div className="space-y-16">
          {departments.map((dept) => (
            <div key={dept.name}>

              {/* Department heading */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-slate-200" />
                <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${dept.accent}`} />
                  <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest whitespace-nowrap">
                    {dept.name}
                  </h3>
                </div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dept.leads.map((lead) => (
                  <TeamLeadCard
                    key={lead.email}
                    lead={lead}
                    accent={dept.accent}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}