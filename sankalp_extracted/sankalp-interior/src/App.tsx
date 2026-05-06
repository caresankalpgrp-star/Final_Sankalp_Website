import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ExitPopup from './components/ExitPopup';

// Public pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import LocationPage from './pages/LocationPage';
import LocationsIndexPage from './pages/LocationsIndexPage';
import DownloadPage from './pages/DownloadPage';
import CatalogPage from './pages/CatalogPage';

// Admin
import AdminLayout from './admin/AdminLayout';
import LoginPage from './admin/LoginPage';
import DashboardPage from './admin/DashboardPage';
import LeadsAdmin from './admin/LeadsAdmin';
import ProjectsAdmin from './admin/ProjectsAdmin';
import BlogAdmin from './admin/BlogAdmin';
import TestimonialsAdmin from './admin/TestimonialsAdmin';
import CatalogAdmin from './admin/CatalogAdmin';

function PublicLayout() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/locations" element={<LocationsIndexPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/interior-designer-:slug" element={<LocationPage />} />
        <Route path="/:slug" element={<LocationPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <ExitPopup />
    </>
  );
}

function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadsAdmin />} />
        <Route path="/projects" element={<ProjectsAdmin />} />
        <Route path="/blog" element={<BlogAdmin />} />
        <Route path="/testimonials" element={<TestimonialsAdmin />} />
        <Route path="/catalog" element={<CatalogAdmin />} />
      </Routes>
    </AdminLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin login — no layout */}
        <Route path="/admin/login" element={<LoginPage />} />
        {/* All other admin routes — protected layout */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* Public website */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
