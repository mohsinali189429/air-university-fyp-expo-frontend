import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import airUniversityLogo from "../assets/air-university-logo.png";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/",           label: "Home" },
  { to: "/about",      label: "About" },
  { to: "/projects",   label: "Projects" },
  { to: "/categories", label: "Categories" },
  { to: "/schedule",   label: "Schedule" },
  { to: "/judges",     label: "Judges" },
  { to: "/sponsors",   label: "Sponsors" },
  { to: "/contact",    label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={airUniversityLogo}
              alt="Air University logo"
              className="w-10 h-10 object-contain rounded-md"
            />
            <div>
              <p className="text-slate-900 font-semibold text-sm leading-tight">Air University</p>
              <p className="text-blue-700 text-xs font-medium">FYP Expo 2026</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Submit Button */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-slate-700 hover:text-blue-700 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-slate-700 hover:text-blue-700 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <Link to="/submit" className="btn-outline text-sm py-2 px-4">
                  Submit Project
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="text-sm font-medium text-slate-700 hover:text-blue-700 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 hover:text-blue-700 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Register
                </Link>
                <Link to="/submit" className="btn-outline text-sm py-2 px-4">
                  Submit Project
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-slate-600 hover:text-blue-700 p-2"
          >
            <div className={`w-6 h-0.5 bg-current transition-all mb-1.5 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 bg-current transition-all mb-1.5 ${open ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden px-4 pb-4 space-y-1 border-t border-slate-200 bg-white">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block mt-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block mt-2 btn-primary text-sm text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="block mt-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                >
                  Admin
                </Link>
              )}
              {!isAdmin && (
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block mt-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                >
                  Dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="block mt-2 w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50"
              >
                Logout
              </button>
            </>
          )}
          <Link
            to="/submit"
            onClick={() => setOpen(false)}
            className="block mt-2 btn-outline text-sm text-center"
          >
            Submit Project
          </Link>
        </div>
      )}
    </nav>
  );
}