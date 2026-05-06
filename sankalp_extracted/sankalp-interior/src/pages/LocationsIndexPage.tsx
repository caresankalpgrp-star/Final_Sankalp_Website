import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle, Building2, Home, TrendingUp } from 'lucide-react';
import { ALL_LOCATIONS, REGIONS, CITIES, DISTRICTS } from '../seo/allLocations';
import SectionHeading from '../components/SectionHeading';

const REGION_COLORS: Record<string, string> = {
  'Kolkata Metro':    '#0f2044',
  'North Bengal':     '#1a5c2a',
  'Industrial Belt':  '#7c3a0f',
  'South Bengal':     '#0f4a6b',
  'Central Bengal':   '#4a0f6b',
  'North 24 Parganas':'#0f4a3a',
  'Jungle Mahal':     '#6b4a0f',
};

export default function LocationsIndexPage() {
  useEffect(() => {
    document.title = 'Interior Designer in West Bengal | All Cities & Districts | Sankalp Interior';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Sankalp Interior Solution serves all cities and districts of West Bengal — Kolkata, Howrah, Durgapur, Siliguri, Darjeeling and 25+ more locations. Free home visit anywhere in West Bengal.'
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
        <div className="absolute inset-0 opacity-10">
          <img src="/images/project2.jpg" alt="Interior design West Bengal" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="section-tag mb-4">Service Coverage</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Interior Design Across <span className="gradient-text">West Bengal</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            From Kolkata to Siliguri, from Durgapur to the Sundarbans — Sankalp Interior Solution serves
            <strong className="text-white"> {ALL_LOCATIONS.length}+ cities and districts</strong> across West Bengal
            with free home visits and transparent pricing.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { v: `${ALL_LOCATIONS.length}+`, l: 'Locations Covered' },
              { v: '500+', l: 'Projects Done' },
              { v: '4.9★', l: 'Google Rating' },
              { v: 'Free', l: 'Home Visit' },
            ].map(({ v, l }) => (
              <div key={l} className="rounded-xl py-4 px-3" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="stat-number text-2xl font-black">{v}</div>
                <div className="text-white/60 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Cover All WB */}
      <section className="py-12 px-4" style={{ background: '#faf8f4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Home, title: 'Free Home Visits', desc: 'Our designers visit your home anywhere in West Bengal — no travel charges, no obligation.' },
              { icon: TrendingUp, title: 'Local Material Sourcing', desc: 'We source materials locally in each city to reduce costs and ensure faster delivery.' },
              { icon: CheckCircle, title: 'Same Quality Guarantee', desc: 'Whether Kolkata or Cooch Behar — same premium quality, same 5-year warranty, same transparent pricing.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(240,124,30,0.1)' }}>
                  <Icon size={22} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations by Region */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading tag="By Region" title="Coverage Across " highlight="West Bengal" subtitle="Every region, every district, every major city — we're there." center />

          {Object.entries(REGIONS).map(([region, locs]) => locs.length === 0 ? null : (
            <div key={region} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: REGION_COLORS[region] || '#0f2044' }}>
                  <MapPin size={18} />
                </div>
                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>{region}</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{locs.length} locations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {locs.map(loc => (
                  <Link key={loc.slug} to={`/${loc.slug}`}
                    className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="relative h-32 overflow-hidden">
                      <img src="/images/project1.jpg" alt={`Interior designer in ${loc.name}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${REGION_COLORS[region] || '#0f2044'}cc, transparent)` }} />
                      <div className="absolute bottom-2 left-3">
                        <span className="text-white font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{loc.name}</span>
                        <span className="text-white/60 text-xs block capitalize">{loc.type}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-gray-500 text-xs line-clamp-2 mb-2">{loc.intro}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-600 font-semibold text-xs">{loc.priceRange}</span>
                        <ArrowRight size={13} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full A-Z List */}
      <section className="section-padding px-4" style={{ background: '#f5f5f7' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading tag="Complete List" title="All Locations — " highlight="A to Z" subtitle="Click any location to see detailed pricing, areas covered, and get a free quote." center />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {[...ALL_LOCATIONS].sort((a, b) => a.name.localeCompare(b.name)).map(loc => (
              <Link key={loc.slug} to={`/${loc.slug}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-white text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                <MapPin size={13} className="text-orange-400 flex-shrink-0" />
                <span className="text-gray-700 font-medium truncate">{loc.name}</span>
                <span className="text-gray-300 text-xs ml-auto capitalize flex-shrink-0">{loc.type === 'area' ? 'city' : loc.type}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading tag="Pricing" title="Prices Across " highlight="West Bengal" subtitle="Indicative price ranges by region. Final quote after free home visit." center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { region: 'Kolkata & Metro', range: '₹800 – ₹2,200/sq ft', note: 'Salt Lake, New Town, Howrah' },
              { region: 'North Bengal', range: '₹700 – ₹2,000/sq ft', note: 'Siliguri, Darjeeling, Jalpaiguri' },
              { region: 'Industrial Belt', range: '₹700 – ₹1,800/sq ft', note: 'Durgapur, Asansol, Bardhaman' },
              { region: 'South Bengal', range: '₹700 – ₹1,900/sq ft', note: 'Kharagpur, Haldia, Midnapore' },
              { region: 'Central Bengal', range: '₹700 – ₹1,800/sq ft', note: 'Hooghly, Nadia, Murshidabad' },
              { region: 'Jungle Mahal', range: '₹650 – ₹1,600/sq ft', note: 'Purulia, Bankura, Bolpur' },
            ].map(({ region, range, note }) => (
              <div key={region} className="p-5 rounded-2xl bg-white shadow-sm" style={{ border: '1px solid rgba(240,124,30,0.12)' }}>
                <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{region}</h4>
                <div className="text-xl font-black gradient-text mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{range}</div>
                <p className="text-gray-400 text-xs">{note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">* Prices are indicative. Final quote after free home visit — no hidden charges.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Don't See Your City? We Still Serve You!
          </h2>
          <p className="text-white/80 mb-8">We serve all of West Bengal. If your city isn't listed, call us — we'll visit for free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-all inline-flex items-center gap-2 justify-center">
              Book Free Home Visit <ArrowRight size={18} />
            </Link>
            <a href="tel:+919748297025" className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-flex items-center gap-2 justify-center">
              Call: +91 97482 97025
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
