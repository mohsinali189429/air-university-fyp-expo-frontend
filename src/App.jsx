import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar     from "./components/Navbar.jsx";
import Footer     from "./components/Footer.jsx";
import Home       from "./pages/Home.jsx";
import Projects   from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Judges     from "./pages/Judges.jsx";
import Sponsors   from "./pages/Sponsors.jsx";
import About      from "./pages/About.jsx";
import Schedule   from "./pages/Schedule.jsx";
import Contact    from "./pages/Contact.jsx";
import Submit     from "./pages/Submit.jsx";
import Categories from "./pages/Categories.jsx";
import Register from "./pages/Register.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Admin from "./pages/Admin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/projects"       element={<Projects />} />
            <Route path="/projects/:id"   element={<ProjectDetail />} />
            <Route path="/judges"         element={<Judges />} />
            <Route path="/sponsors"       element={<Sponsors />} />
            <Route path="/about"          element={<About />} />
            <Route path="/schedule"       element={<Schedule />} />
            <Route path="/contact"        element={<Contact />} />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <Submit />
                </ProtectedRoute>
              }
            />
            <Route path="/categories"     element={<Categories />} />
            <Route path="/register"       element={<Register />} />
            <Route path="/verify-email"   element={<VerifyEmail />} />
            <Route path="/login"          element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}