import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, IndianRupee, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const CASES = [
  {
    id: 1,
    title: '2BHK Complete Makeover',
    location: 'Salt Lake Sector III, Kolkata',
    locationBn: 'সল্ট লেক, কলকাতা',
    budget: '₹4.8 Lakhs',
    duration: '52 days',
    area: '650 sq ft',
    beforeImg: '/images/before.jpg',
    afterImg: '/images/after.jpg',
    scope: ['Living Room', 'Master Bedroom', 'Kitchen', 'False Ceiling'],
    materials: ['Acrylic finish wardrobes', 'Quartz countertop', 'Gypsum false ceiling', 'Engineered wood flooring'],
    testimonial: 'Sankalp transformed our flat completely. The 3D design was exactly what we wanted and they delivered on time with zero surprises.',
    client: 'Priya & Rahul Sharma',
    rating: 5,
    tag: 'Premium Package',
    tagColor: '#f07c1e',
  },
  {
    id: 2,
    title: '3BHK Luxury Interior',
    location: 'New Town Action Area II, Kolkata',
    locationBn: 'নিউ টাউন, কলকাতা',
    budget: '₹8.2 Lakhs',
    duration: '68 days',
    area: '950 sq ft',
    beforeImg: '/images/project1.jpg',
    afterImg: '/images/project2.jpg',
    scope: ['Full Home', 'Modular Kitchen', 'Walk-in Wardrobe', 'Home Office'],
    materials: ['Italian lacquer finish', 'Marble flooring', 'Smart lighting', 'Custom TV unit'],
    testimonial: 'Our New Town apartment looks like a premium hotel now. Sankalp\'s team was professional, clean, and delivered everything as promised.',
    client: 'Anita Das',
    rating: 5,
    tag: 'Luxury Package',
    tagColor: '#c9a84c',
  },
  {
    id: 3,
    title: 'Modular Kitchen + Wardrobe',
    location: 'Rajarhat, Kolkata',
    locationBn: 'রাজারহাট, কলকাতা',
    budget: '₹2.4 Lakhs',
    duration: '22 days',
    area: 'Kitchen + 1 Bedroom',
    beforeImg: '/images/kitchen.jpg',
    afterImg: '/images/wardrobe.jpg',
    scope: ['L-shaped Kitchen', 'Sliding Wardrobe', 'False Ceiling'],
    materials: ['Membrane finish cabinets', 'Soft-close hardware', 'LED strip lighting', 'Quartz top'],
    testimonial: 'Best modular kitchen in Kolkata at this price point. The soft-close cabinets and quartz countertop look premium. 10/10!',
    client: 'Subhajit Roy',
    rating: 5,
    tag: 'Essential Package',
    tagColor: '#1a3a6b',
  },
];

function BeforeAfterMini({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-ew-resize select-none"
      style={{ height: '220px' }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos(Math.max(5, Math.min(95, ((e.clientX - r.left) / r.width) * 100)));
      }}
      onTouchMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos(Math.max(5, Math.min(95, ((e.touches[0].clientX - r.left) / r.width) * 100)));
      }}
    >
      {/* After */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (pos / 100)}%`, maxWidth: 'none' }} />
      </div>
      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <ChevronLeft size={10} className="text-orange-500" />
          <ChevronRight size={10} className="text-orange-500" />
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.5)' }}>Before</span>
      <span className="absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(240,124,30,0.85)' }}>After</span>
    </div>
  );
}

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <section className="section-padding px-4" style={{ background: 'linear-gradient(135deg,#060f1f,#0f2044)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-tag">Real Projects</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Case Studies —{' '}
            <span className="gradient-text">Real Transformations</span>
          </h2>
          <p className="font-bengali text-white/50 text-sm">আমাদের কাজের বাস্তব উদাহরণ</p>
        </div>

        {/* Tab selector */}
        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          {CASES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={active === i
                ? { background: 'linear-gradient(135deg,#f07c1e,#d4640a)', color: 'white', fontFamily: 'Poppins, sans-serif' }
                : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif' }}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Case content */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — Before/After + details */}
          <div>
            <BeforeAfterMini before={c.beforeImg} after={c.afterImg} />
            <p className="text-white/40 text-xs text-center mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>← Drag to compare Before & After</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { icon: IndianRupee, label: 'Budget', val: c.budget },
                { icon: Clock, label: 'Duration', val: c.duration },
                { icon: MapPin, label: 'Area', val: c.area },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Icon size={16} className="text-orange-400 mx-auto mb-1" />
                  <p className="text-white/40 text-xs mb-0.5">{label}</p>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Details */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ background: c.tagColor }}>{c.tag}</span>
              <div className="flex gap-0.5">
                {[...Array(c.rating)].map((_, i) => <Star key={i} size={13} fill="#f5c518" className="text-yellow-400" />)}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{c.title}</h3>
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={14} className="text-orange-400" />
              <span className="text-white/60 text-sm">{c.location}</span>
              <span className="font-bengali text-white/35 text-xs">· {c.locationBn}</span>
            </div>

            {/* Scope */}
            <div className="mb-5">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Scope of Work</p>
              <div className="flex flex-wrap gap-2">
                {c.scope.map(s => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-full text-white/80" style={{ background: 'rgba(255,255,255,0.08)' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="mb-6">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Premium Materials Used</p>
              <div className="space-y-1.5">
                {c.materials.map(m => (
                  <div key={m} className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-5 rounded-2xl mb-6" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-white/75 text-sm italic leading-relaxed mb-3">"{c.testimonial}"</p>
              <p className="text-orange-400 text-sm font-semibold">— {c.client}</p>
            </div>

            <Link to="/contact" className="btn-primary w-full justify-center">
              Start Your Project Like This
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link to="/projects" className="text-white/60 text-sm hover:text-orange-400 transition-colors flex items-center gap-2 justify-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            View All 500+ Projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
