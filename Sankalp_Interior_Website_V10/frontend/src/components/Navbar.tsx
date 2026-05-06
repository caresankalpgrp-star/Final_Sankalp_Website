import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Catalog', path: '/catalog' },
  { label: 'Locations', path: '/locations' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled
            ? 'rgba(9, 21, 48, 0.97)'
            : 'linear-gradient(180deg, rgba(9,21,48,0.9) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/uploads/upload_1.png"
                alt="Sankalp Interior Solution"
                className="h-16 w-auto"
                style={{ filter: 'brightness(1.05)' }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA only */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/contact" className="navbar-cta">
                <Sparkles size={14} className="navbar-cta-icon" />
                <span>Free Consultation</span>
                <span className="navbar-cta-badge">Limited</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 mobile-menu pt-20 pb-8 px-6 overflow-y-auto">
          <div className="flex flex-col gap-2 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-4 px-4 text-lg font-medium border-b border-white/10 transition-colors ${
                  location.pathname === link.path
                    ? 'text-orange-400'
                    : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/contact" className="navbar-cta justify-center text-base">
                <Sparkles size={15} />
                <span>Free Consultation</span>
                <span className="navbar-cta-badge">Limited</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
