import { Link } from "react-router-dom";
import airUniversityLogo from "../assets/air-university-logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 border-t border-blue-300 text-slate-700 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={airUniversityLogo}
                alt="Air University logo"
                className="w-14 h-14 object-contain rounded-md"
              />
              <div>
                <p className="text-slate-900 font-bold">Air University</p>
                <p className="text-blue-800 text-sm font-semibold">FYP Expo 2026</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-slate-700">
              Showcasing the next generation of engineers and innovators from Air University, Islamabad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["/about", "/projects", "/judges", "/sponsors", "/schedule"].map((path) => (
                <li key={path}>
                  <Link to={path} className="font-medium hover:text-blue-900 hover:underline transition-all">
                    {path.replace("/", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>Air University Aerospace & Aviation Campus </li>
              <li>6 KM Off GT-Road Hattian Aviation City </li>
              <li>(FHS) Kamra Attock.</li>
              <li className="pt-2">
                <a href="mailto:fyp@au.edu.pk" className="hover:text-blue-900 hover:underline transition-all">
                  fyp@au.edu.pk
                </a>
              </li>
              <li>+92-51-9262557</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-400/30 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-semibold text-slate-600">
          <p>© 2026 Air University. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-blue-900/80">FYP Expo 2026 — Excellence in Engineering</p>
        </div>
      </div>
    </footer>
  );
}