const days = [
  {
    day: "Day 1",
    date: "March 13, 2026",
    label: "Setup & Registration",
    color: "blue",
    events: [
      { time: "08:00 AM", title: "Venue Setup & Booth Allocation", type: "logistics", desc: "Teams set up their project displays, posters, and demo equipment at assigned booths." },
      { time: "10:00 AM", title: "Student Registration & Briefing", type: "admin", desc: "All participating teams check in, receive ID badges, and attend the mandatory briefing session." },
      { time: "12:00 PM", title: "Technical Equipment Check", type: "logistics", desc: "Audio/visual systems, laptops, demo hardware verified. IT support available on-site." },
      { time: "02:00 PM", title: "Rehearsal Presentations", type: "academic", desc: "Teams do a dry run of their 10-minute presentation in front of their assigned supervisor." },
      { time: "04:00 PM", title: "Judge Orientation", type: "admin", desc: "Panel of judges briefed on evaluation criteria, scoring rubrics, and schedule." },
      { time: "06:00 PM", title: "Day 1 Wrap-up", type: "logistics", desc: "Security briefing and overnight equipment arrangements confirmed." },
    ],
  },
  {
    day: "Day 2",
    date: "March 14, 2026",
    label: "Main Exhibition",
    color: "green",
    events: [
      { time: "08:30 AM", title: "Doors Open — Public & Industry", type: "expo", desc: "Exhibition opens to registered visitors including industry professionals, recruiters, and the public." },
      { time: "09:00 AM", title: "Inauguration Ceremony", type: "ceremony", desc: "Opening remarks by the Vice Chancellor, Chief Guest, and Expo Director. Ribbon-cutting ceremony." },
      { time: "10:00 AM", title: "Judging Round 1 — CS & SE Departments", type: "judging", desc: "Judges evaluate Computer Science and Software Engineering projects. Teams present for 10 minutes each." },
      { time: "12:00 PM", title: "Lunch Break", type: "logistics", desc: "Complimentary lunch for registered participants, judges, and sponsors." },
      { time: "01:00 PM", title: "Judging Round 2 — Aerospace & EE", type: "judging", desc: "Aerospace Engineering and Electrical Engineering projects evaluated by the technical panel." },
      { time: "03:00 PM", title: "Industry Networking Session", type: "expo", desc: "Dedicated networking hour where companies meet students, exchange cards, and discuss opportunities." },
      { time: "04:30 PM", title: "Public Voting Closes", type: "admin", desc: "Online and on-site public voting for People's Choice Award closes at 4:30 PM sharp." },
      { time: "05:00 PM", title: "Day 2 Wrap-up", type: "logistics", desc: "End of main exhibition day. Booths remain setup for Day 3." },
    ],
  },
  {
    day: "Day 3",
    date: "March 15, 2026",
    label: "Awards & Closing",
    color: "yellow",
    events: [
      { time: "09:00 AM", title: "Final Judging — Special Categories", type: "judging", desc: "Best AI Project, Best Aerospace Project, and Best Social Impact Project judged by specialist panels." },
      { time: "11:00 AM", title: "Judges Deliberation", type: "admin", desc: "Closed-door session where the judging panel finalizes scores and selects award winners." },
      { time: "12:00 PM", title: "Alumni & Media Session", type: "expo", desc: "AU alumni and press representatives tour the exhibition and conduct interviews with teams." },
      { time: "02:00 PM", title: "Award Ceremony Begins", type: "ceremony", desc: "Grand Award Ceremony. Category winners, departmental awards, and special recognitions announced." },
      { time: "03:30 PM", title: "Closing Remarks", type: "ceremony", desc: "Closing address by the Vice Chancellor. Vote of thanks by the Expo Director." },
      { time: "04:00 PM", title: "Group Photography & Networking", type: "expo", desc: "Official group photos with award winners, judges, and sponsors. Final networking opportunity." },
      { time: "05:00 PM", title: "Expo Concludes", type: "logistics", desc: "Teams dismantle their displays. Equipment collection and venue handover." },
    ],
  },
];

const typeConfig = {
  logistics: { color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  admin:     { color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
  academic:  { color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  judging:   { color: "bg-red-100 text-red-700", dot: "bg-red-500" },
  expo:      { color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  ceremony:  { color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
};

const dayColors = {
  blue:   { header: "from-blue-800 to-blue-600",   badge: "bg-blue-600" },
  green:  { header: "from-green-800 to-green-600",  badge: "bg-green-600" },
  yellow: { header: "from-yellow-700 to-yellow-500",badge: "bg-yellow-500" },
};

export default function Schedule() {
  return (
    <div className="min-h-screen bg-gray-50 fade-in">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)" }}
      >
        <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
          March 13–15, 2026
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Expo Schedule
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Three days of innovation, evaluation, networking, and celebration
        </p>

        {/* Quick day pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {days.map((d) => (
            <a
              key={d.day}
              href={`#${d.day.replace(" ", "-").toLowerCase()}`}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition-all"
            >
              {d.day} — {d.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {Object.entries(typeConfig).map(([type, cfg]) => (
            <div key={type} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
              <span className="text-xs text-gray-600 capitalize font-medium">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Day Sections ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {days.map((day) => {
          const dc = dayColors[day.color];
          return (
            <div
              key={day.day}
              id={day.day.replace(" ", "-").toLowerCase()}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Day header */}
              <div className={`bg-gradient-to-r ${dc.header} px-6 py-5`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-wider">
                      {day.day}
                    </p>
                    <h2
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {day.label}
                    </h2>
                  </div>
                  <span className="text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full self-start sm:self-auto">
                    📅 {day.date}
                  </span>
                </div>
              </div>

              {/* Events */}
              <div className="divide-y divide-gray-50">
                {day.events.map((event, i) => {
                  const tc = typeConfig[event.type];
                  return (
                    <div
                      key={i}
                      className="flex gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                      {/* Time */}
                      <div className="w-24 flex-shrink-0">
                        <p className="text-sm font-bold text-gray-800">{event.time}</p>
                      </div>

                      {/* Dot */}
                      <div className="flex flex-col items-center pt-1.5">
                        <span className={`w-3 h-3 rounded-full flex-shrink-0 ${tc.dot}`} />
                        {i < day.events.length - 1 && (
                          <div className="w-px flex-1 bg-gray-200 mt-1" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-4">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                          <span className={`badge ${tc.color} text-xs`}>
                            {event.type}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">{event.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Venue Info ──────────────────────────────────────────────────── */}
      <div
        className="py-16 px-4"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2149 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl font-bold text-white mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Venue & Location
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🏛️", label: "Venue", value: "AU Sports Complex & Main Auditorium" },
              { icon: "📍", label: "Address", value: "PAF Complex E-9, Islamabad, Pakistan" },
              { icon: "🚗", label: "Parking", value: "Available at Gate 2 & Gate 4" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center"
              >
                <span className="text-3xl block mb-3">{item.icon}</span>
                <p className="text-blue-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}