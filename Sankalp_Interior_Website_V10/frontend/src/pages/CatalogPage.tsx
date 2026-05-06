import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink, ArrowRight, Phone, Filter, Grid3X3,
  LayoutGrid, ChevronRight, Star, Eye, Sparkles
} from 'lucide-react';
import { apiUrl } from '../lib/api';
import LeadForm from '../components/LeadForm';
import SectionHeading from '../components/SectionHeading';

interface Catalog {
  id: number;
  title: string;
  description: string;
  image_url: string;
  album_url: string;
  alt_text: string;
  category: string;
  sort_order: number;
  active: boolean;
}

const CATEGORY_ICONS: Record<string, string> = {
  'All': '✦',
  'Living Room': '🛋️',
  'Bedroom': '🛏️',
  'Kitchen': '🍳',
  'Bathroom': '🚿',
  'Ceiling': '✨',
  'Flooring': '🪵',
  'Wall Design': '🎨',
  'Puja Room': '🪔',
};

function CatalogCard({ item, index }: { item: Catalog; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`,
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(249,115,22,0.4)'
          : '0 8px 32px rgba(0,0,0,0.18)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(item.album_url, '_blank', 'noopener,noreferrer')}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {/* Skeleton */}
        {!loaded && (
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(110deg, #1a1a2e 25%, #252540 50%, #1a1a2e 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
        )}
        <img
          src={item.image_url}
          alt={item.alt_text || item.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            opacity: loaded ? 1 : 0,
          }}
        />

        {/* Gradient Overlay — always present, deepens on hover */}
        <div
          className="absolute inset-0"
          style={{
            background: hovered
              ? 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
          style={{ background: 'rgba(249,115,22,0.85)', color: 'white', fontFamily: 'Poppins, sans-serif' }}
        >
          <span>{CATEGORY_ICONS[item.category] || '✦'}</span>
          {item.category}
        </div>

        {/* View count badge */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Poppins, sans-serif' }}
        >
          <Eye size={11} /> View Album
        </div>

        {/* Bottom content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'transform 0.4s ease',
          }}
        >
          <h3
            className="text-white font-bold text-lg leading-tight mb-1.5"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {item.title}
          </h3>
          <p
            className="text-white/70 text-xs leading-relaxed mb-4"
            style={{
              fontFamily: 'Poppins, sans-serif',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </p>

          {/* CTA Button */}
          <div
            style={{
              opacity: hovered ? 1 : 0.7,
              transform: hovered ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.35s ease 0.08s, transform 0.35s ease 0.08s',
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
              style={{
                background: hovered
                  ? 'linear-gradient(135deg, #f97316, #ea6c10)'
                  : 'rgba(249,115,22,0.75)',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: hovered ? '0 4px 20px rgba(249,115,22,0.5)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <ExternalLink size={14} />
              View Full Catalog
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [layout, setLayout] = useState<'grid4' | 'grid3'>('grid4');

  useEffect(() => {
    document.title = 'Design Catalog | Interior Design Ideas | Sankalp Interior Solution';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Browse Sankalp Interior Solution\'s complete design catalog — TV units, wardrobes, modular kitchens, false ceilings, living rooms and more. Real project photos from Kolkata & West Bengal.'
    );
    fetch(apiUrl('/api/catalogs'))
      .then(r => r.json())
      .then(data => setCatalogs(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', ...Array.from(new Set(catalogs.map(c => c.category)))];
  const filtered = activeCategory === 'All' ? catalogs : catalogs.filter(c => c.category === activeCategory);

  const gridClass = layout === 'grid4'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  return (
    <div className="pt-20" style={{ background: '#0a0a14', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060d1f 0%, #0f1e3d 60%, #1a0a00 100%)' }}
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
            style={{ background: '#f97316', filter: 'blur(100px)' }} />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15"
            style={{ background: '#3b82f6', filter: 'blur(100px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
            style={{ background: '#f97316', filter: 'blur(80px)' }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c', border: '1px solid rgba(249,115,22,0.3)', fontFamily: 'Poppins, sans-serif' }}>
            <Sparkles size={14} /> Design Inspiration Catalog
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Browse Our
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Design Catalog
            </span>
          </h1>

          <p
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Real projects. Real transformations. Browse {catalogs.length}+ curated design collections
            from our completed work across Kolkata & West Bengal.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { v: '500+', l: 'Projects Done' },
              { v: `${catalogs.length}+`, l: 'Design Collections' },
              { v: '4.9★', l: 'Google Rating' },
              { v: '8+', l: 'Years Experience' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-black"
                  style={{
                    background: 'linear-gradient(135deg,#f97316,#fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >{v}</div>
                <div className="text-white/50 text-xs mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG GRID ─────────────────────────────────────── */}
      <section className="px-4 py-16" style={{ background: '#0d0d1a' }}>
        <div className="max-w-7xl mx-auto">

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: activeCategory === cat
                      ? 'linear-gradient(135deg,#f97316,#ea6c10)'
                      : 'rgba(255,255,255,0.06)',
                    color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.55)',
                    border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: activeCategory === cat ? '0 4px 15px rgba(249,115,22,0.35)' : 'none',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {CATEGORY_ICONS[cat] && <span>{CATEGORY_ICONS[cat]}</span>}
                  {cat}
                  {activeCategory === cat && (
                    <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                      {filtered.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Layout toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-white/40 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {filtered.length} collections
              </span>
              <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                {([['grid4', Grid3X3], ['grid3', LayoutGrid]] as const).map(([key, Icon]) => (
                  <button
                    key={key}
                    onClick={() => setLayout(key)}
                    className="p-2 rounded-lg transition-all"
                    style={{
                      background: layout === key ? 'rgba(249,115,22,0.25)' : 'transparent',
                      color: layout === key ? '#f97316' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className={gridClass}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.05)' }}>
                  <div className="w-full h-full" style={{
                    background: 'linear-gradient(110deg, #1a1a2e 25%, #252540 50%, #1a1a2e 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                  }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">No catalogs found in this category.</p>
            </div>
          ) : (
            <div className={gridClass}>
              {filtered.map((item, i) => (
                <CatalogCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}

          {/* Bottom note */}
          {!loading && filtered.length > 0 && (
            <p
              className="text-center text-white/30 text-sm mt-10"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Click any card to open the full photo album in Google Photos
            </p>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ background: 'linear-gradient(135deg, #0f1e3d 0%, #060d1f 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c', border: '1px solid rgba(249,115,22,0.25)', fontFamily: 'Poppins, sans-serif' }}
            >
              Our Process
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              From Catalog to{' '}
              <span style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Your Dream Home
              </span>
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              See something you love? Here's how we make it a reality in your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '👁️', title: 'Browse & Inspire', desc: 'Explore our catalog albums and save designs that speak to you.' },
              { step: '02', icon: '📞', title: 'Free Consultation', desc: 'Share your favorites with our designer. We visit your home for free.' },
              { step: '03', icon: '🎨', title: '3D Design', desc: 'We create a photorealistic 3D render of your space before work begins.' },
              { step: '04', icon: '🏠', title: 'Perfect Execution', desc: 'Our skilled team brings the design to life — on time, on budget.' },
            ].map((s, i) => (
              <div
                key={s.step}
                className="relative text-center p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {i < 3 && (
                  <div
                    className="hidden md:block absolute top-10 -right-3 z-10 text-orange-500/40"
                    style={{ fontSize: '20px' }}
                  >›</div>
                )}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}
                >
                  {s.icon}
                </div>
                <div
                  className="text-xs font-bold mb-2"
                  style={{ color: '#f97316', fontFamily: 'Montserrat, sans-serif', letterSpacing: '2px' }}
                >
                  STEP {s.step}
                </div>
                <h3
                  className="text-white font-bold mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS STRIP ───────────────────────────────── */}
      <section className="px-4 py-16" style={{ background: '#0d0d1a' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Priya Sharma', loc: 'Salt Lake, Kolkata', text: 'The catalog helped me visualize exactly what I wanted. The final result matched perfectly!', stars: 5, project: 'Living Room + Bedroom' },
              { name: 'Rahul Banerjee', loc: 'New Town, Kolkata', text: 'Browsed the modular kitchen catalog and fell in love. Sankalp delivered exactly that in my home.', stars: 5, project: 'Modular Kitchen' },
              { name: 'Anita Das', loc: 'Durgapur', text: 'The false ceiling and TV unit designs in the catalog are stunning. My home looks like a magazine shoot!', stars: 5, project: 'Full Home Interior' },
            ].map(t => (
              <div
                key={t.name}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#fbbf24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm italic mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  "{t.text}"
                </p>
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{t.loc} · {t.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET QUOTE FORM ────────────────────────────────────── */}
      <section
        className="px-4 py-20"
        style={{ background: 'linear-gradient(135deg, #1a0800 0%, #0f1e3d 50%, #0a0a14 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c', border: '1px solid rgba(249,115,22,0.25)', fontFamily: 'Poppins, sans-serif' }}
              >
                Get Your Home Done
              </span>
              <h2
                className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Loved Something
                <span
                  className="block"
                  style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  in the Catalog?
                </span>
              </h2>
              <p className="text-white/60 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Tell us which designs you loved and we'll create a personalised proposal for your home — completely free.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🏠', text: 'Free home visit by expert designer' },
                  { icon: '🎨', text: 'Personalized 3D design based on your catalog picks' },
                  { icon: '💰', text: 'Transparent pricing — no hidden costs' },
                  { icon: '⚡', text: 'Project completed in 45–75 days' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-7"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
            >
              <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Book Free Consultation
              </h3>
              <p className="text-white/50 text-sm mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Worth ₹2,999 — free for you. No obligation.
              </p>
              <LeadForm source="catalog-page" compact darkBg />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA STRIP ──────────────────────────────────── */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-black text-white mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Ready to Transform Your Home?
          </h2>
          <p className="text-white/80 mb-7" style={{ fontFamily: 'Poppins, sans-serif' }}>
            500+ families across Kolkata & West Bengal have trusted Sankalp. You're next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Get Free Consultation <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+919748297025"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Phone size={18} /> +91 97482 97025
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
