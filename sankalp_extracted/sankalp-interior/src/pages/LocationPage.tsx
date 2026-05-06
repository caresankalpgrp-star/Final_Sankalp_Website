import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle, MapPin, Star, MessageCircle, ChevronRight } from 'lucide-react';
import { getLocation, getRelated, ALL_LOCATIONS as LOCATIONS } from '../seo/allLocations';
import LeadForm from '../components/LeadForm';
import SectionHeading from '../components/SectionHeading';
import TestimonialSection from '../components/TestimonialSection';

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const loc = getLocation(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (loc) {
      document.title = loc.metaTitle;
      document.querySelector('meta[name="description"]')?.setAttribute('content', loc.metaDesc);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://www.sankalpinterior.com/${loc.slug}`);
    }
  }, [slug, loc]);

  if (!loc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ paddingTop: '120px' }}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Location not found</h1>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    );
  }

  const related = getRelated(loc.relatedSlugs);
  const allCities = LOCATIONS.filter(l => l.slug !== loc.slug).slice(0, 8);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sankalp Interior Solution',
    description: loc.metaDesc,
    url: `https://www.sankalpinterior.com/${loc.slug}`,
    telephone: '+919748297025',
    email: 'info@sankalpinterior.com',
    priceRange: loc.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office Unit GB02, Oishi Tower-II, Rabindra Pally, Jyangra, VIP Rd, Raghunathpur',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700059',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: loc.name,
    },
    geo: { '@type': 'GeoCoordinates', latitude: loc.lat, longitude: loc.lng },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '500' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '10:00', closes: '19:00' },
    ],
  };

  return (
    <div>
      {/* Inject schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <img src="/images/project1.jpg" alt={`Interior design ${loc.name}`} className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/interior-designer-kolkata" className="hover:text-white transition-colors">Locations</Link>
            <ChevronRight size={14} />
            <span className="text-white/80">{loc.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Bengali accent line */}
              <p className="bengali-accent-line mb-4">
                {loc.name}-এ স্বপ্নের বাড়ি তৈরি করুন
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
                style={{ background: 'rgba(240,124,30,0.2)', color: '#f9a14b', border: '1px solid rgba(240,124,30,0.3)' }}>
                <MapPin size={14} /> {loc.name}, {loc.state}
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {loc.h1}
              </h1>

              <p className="text-white/75 text-base leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {loc.intro}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { en: '500+ Projects', bn: '৫০০+ প্রজেক্ট' },
                  { en: '4.9★ Rating', bn: null },
                  { en: 'Free Home Visit', bn: 'বিনামূল্যে ভিজিট' },
                  { en: 'On-Time Delivery', bn: null },
                ].map(({ en, bn }) => (
                  <div key={en} className="flex items-center gap-1.5 text-white/80 text-sm">
                    <CheckCircle size={13} className="text-orange-400" />
                    <span>{en}</span>
                    {bn && <span className="font-bengali text-white/40 text-xs">· {bn}</span>}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="btn-primary">
                  Get Free Consultation <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/919748297025?text=Hi, I need interior design in ${loc.name}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <span className="font-bengali" style={{ fontSize: '14px' }}>ফ্রি কনসালটেশন বুক করুন</span>
                </a>
              </div>
            </div>

            {/* Lead Form */}
            <div className="bg-white rounded-2xl p-7 shadow-2xl">
              <p className="font-bengali text-orange-500 text-sm mb-1">{loc.name}-এ বিনামূল্যে পরামর্শ নিন</p>
              <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Free Consultation in {loc.name}
              </h3>
              <p className="text-gray-400 text-sm mb-5">Our designer visits your home in {loc.name} — free, no obligation.</p>
              <LeadForm source={`location-${loc.slug}`} compact />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-4" style={{ background: '#faf8f4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['500+','Projects Done'],['4.9★','Google Rating'],['8+','Years Experience'],['Free','Home Visit']].map(([v,l]) => (
              <div key={l}>
                <div className="stat-number text-3xl font-black">{v}</div>
                <div className="text-gray-500 text-sm mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none"
                style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.9', color: '#374151' }}
                dangerouslySetInnerHTML={{ __html: loc.body }}
              />

              {/* Areas Covered */}
              <div className="mt-10 p-6 rounded-2xl" style={{ background: '#faf8f4', border: '1px solid rgba(240,124,30,0.12)' }}>
                <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  📍 Areas We Cover in {loc.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {loc.areas.map(area => (
                    <span key={area} className="text-sm px-3 py-1.5 rounded-full font-medium"
                      style={{ background: 'rgba(240,124,30,0.1)', color: '#d4640a' }}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Housing Types */}
              <div className="mt-6 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
                <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  🏠 Housing Types We Design in {loc.name}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {loc.housingTypes.map(h => (
                    <div key={h} className="flex items-center gap-2 text-white/80 text-sm">
                      <CheckCircle size={14} className="text-orange-400 flex-shrink-0" />{h}
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {loc.faqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white shadow-sm" style={{ border: '1px solid rgba(240,124,30,0.1)' }}>
                      <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Q: {faq.q}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <div className="rounded-2xl overflow-hidden shadow-md" style={{ border: '1px solid rgba(240,124,30,0.15)' }}>
                <div className="p-5" style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
                  <h4 className="text-white font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Price Range in {loc.name}</h4>
                </div>
                <div className="p-5 bg-white">
                  <div className="text-2xl font-black gradient-text mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{loc.priceRange}</div>
                  <p className="text-gray-400 text-xs mb-4">Indicative pricing. Final quote after free consultation.</p>
                  {[['2BHK Complete Interior','₹4–7 Lakhs'],['Modular Kitchen','₹1.2–3 Lakhs'],['Wardrobe','₹45K–1.5L'],['False Ceiling','₹65–200/sq ft']].map(([s,p]) => (
                    <div key={s} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                      <span className="text-gray-600">{s}</span>
                      <span className="font-semibold text-gray-900">{p}</span>
                    </div>
                  ))}
                  <Link to="/pricing" className="btn-primary w-full justify-center mt-4 text-sm">View Full Pricing</Link>
                </div>
              </div>

              {/* Contact Card */}
              <div className="rounded-2xl p-5 bg-white shadow-md" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                <h4 className="font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Contact Us</h4>
                <div className="space-y-3">
                  <a href="tel:+919748297025" className="flex items-center gap-3 p-3 rounded-xl hover:-translate-y-0.5 transition-all"
                    style={{ background: 'rgba(15,32,68,0.05)' }}>
                    <Phone size={18} className="text-navy" style={{ color: '#0f2044' }} />
                    <div><p className="text-xs text-gray-400">Call Us</p><p className="font-semibold text-sm">+91 97482 97025</p></div>
                  </a>
                  <a href={`https://wa.me/919748297025?text=Hi, I need interior design in ${loc.name}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:-translate-y-0.5 transition-all"
                    style={{ background: 'rgba(37,211,102,0.08)' }}>
                    <MessageCircle size={18} style={{ color: '#25D366' }} />
                    <div><p className="text-xs text-gray-400">WhatsApp</p><p className="font-semibold text-sm">Chat Now</p></div>
                  </a>
                </div>
              </div>

              {/* Nearby Locations */}
              <div className="rounded-2xl p-5 bg-white shadow-md" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                <h4 className="font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Nearby Locations We Serve</h4>
                <div className="space-y-2">
                  {loc.nearbyLocations.map(n => {
                    const nearby = LOCATIONS.find(l => l.name === n);
                    return nearby ? (
                      <Link key={n} to={`/${nearby.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-orange-50 transition-colors text-sm">
                        <span className="text-gray-700">{n}</span>
                        <ArrowRight size={14} className="text-orange-400" />
                      </Link>
                    ) : <div key={n} className="text-gray-500 text-sm p-2">{n}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection
        subtitle={`See what our clients say — we serve ${loc.name} and all of West Bengal.`}
        dark
        showCta
      />

      {/* Related Locations */}
      {related.length > 0 && (
        <section className="section-padding px-4" style={{ background: '#f5f5f7' }}>
          <div className="max-w-7xl mx-auto">
            <SectionHeading tag="We Also Serve" title="Interior Design in " highlight="Nearby Areas"
              subtitle="We serve all major cities and districts across West Bengal." center />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.slug} to={`/${r.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 block"
                  style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-orange-500" />
                    <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{r.name}</span>
                    <span className="text-xs text-gray-400 capitalize ml-auto">{r.type}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">{r.intro}</p>
                  <div className="flex items-center gap-1 text-orange-500 text-sm font-medium mt-3">
                    View Details <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Locations Map */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading tag="Service Area" title="We Serve All of " highlight="West Bengal"
            subtitle="From Kolkata to Siliguri, from Durgapur to the Sundarbans — Sankalp Interior Solution is West Bengal's interior design partner." center />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-10">
            {LOCATIONS.map(l => (
              <Link key={l.slug} to={`/${l.slug}`}
                className={`flex items-center gap-2 p-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 ${
                  l.slug === loc.slug
                    ? 'text-white font-semibold'
                    : 'bg-white text-gray-700 hover:bg-orange-50'
                }`}
                style={l.slug === loc.slug
                  ? { background: 'linear-gradient(135deg,#f07c1e,#d4640a)', boxShadow: '0 4px 15px rgba(240,124,30,0.3)' }
                  : { border: '1px solid rgba(0,0,0,0.06)' }}>
                <MapPin size={13} className={l.slug === loc.slug ? 'text-white/80' : 'text-orange-400'} />
                {l.name}
              </Link>
            ))}
          </div>
          {/* Map Embed */}
          <div className="rounded-2xl overflow-hidden shadow-xl" style={{ height: '380px' }}>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent('Interior Designer ' + loc.name + ', West Bengal, India')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen loading="lazy" title={`Interior designer in ${loc.name}`} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ready to Transform Your Home in {loc.name}?
          </h2>
          <p className="text-white/80 mb-8">Book a free home visit today. Our designer comes to {loc.name} — no charges, no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-all inline-flex items-center gap-2 justify-center">
              Book Free Visit <ArrowRight size={18} />
            </Link>
            <a href="tel:+919748297025" className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-flex items-center gap-2 justify-center">
              <Phone size={18} /> +91 97482 97025
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
