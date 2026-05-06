import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ArrowRight, ExternalLink } from 'lucide-react';

// ─── NAP (Name Address Phone) — single source of truth ───────────────────────
export const NAP = {
  name:    'Sankalp Interior Solution',
  phone:   '+919748297025',
  phoneDisplay: '+91 97482 97025',
  email:   'info@sankalpinterior.com',
  address: 'Office Unit GB02, Oishi Tower-II, Rabindra Pally, Jyangra, VIP Rd, Raghunathpur, Kolkata 700059',
  addressFull: {
    street:   'Office Unit GB02, Oishi Tower-II, Rabindra Pally, Jyangra, VIP Rd, Raghunathpur',
    city:     'Kolkata',
    state:    'West Bengal',
    pin:      '700059',
    country:  'IN',
  },
  website:  'https://www.sankalpinterior.com',
  mapShare: 'https://maps.app.goo.gl/V6ANcC5AgnwnvC5L9',
  // CID-based embed — pins the verified Google Business Profile exactly
  mapEmbed: 'https://maps.google.com/maps?cid=13480184401609593026&output=embed&hl=en&gl=IN',
};

// ─── Social / Directory links — verified correct ─────────────────────────────
export const SOCIAL_LINKS = [
  {
    label:   'Facebook',
    href:    'https://www.facebook.com/sankalpinterior/',
    color:   '#1877F2',
    icon:    Facebook,
  },
  {
    label:   'Instagram',
    href:    'https://www.instagram.com/sankalp_interior_solution',
    color:   '#E4405F',
    icon:    Instagram,
  },
  {
    label:   'YouTube',
    href:    'https://www.youtube.com/@SankalpInterior',
    color:   '#FF0000',
    icon:    Youtube,
  },
  {
    // Threads — no lucide icon, use inline SVG
    label:   'Threads',
    href:    'https://www.threads.com/@sankalp_interior_solution',
    color:   '#ffffff',
    icon:    null,
  },
];

export const DIRECTORY_LINKS = [
  { label: 'JustDial',   href: 'https://jsdl.in/DT-37UCB3P14BR',                           logo: '📋' },
  { label: 'IndiaMART',  href: 'https://www.indiamart.com/sankalp-interior-solution/',       logo: '🏪' },
];

export const BRAND_WEBSITES = [
  { label: 'sankalpinterior.com', href: 'https://www.sankalpinterior.com' },
  { label: 'sankalpdesign.com',   href: 'https://www.sankalpdesign.com'   },
  { label: 'sankalps.com',        href: 'https://www.sankalps.com'        },
  { label: 'sankalpinterior.in',  href: 'https://www.sankalpinterior.in'  },
];

// ─── Global LocalBusiness Schema ─────────────────────────────────────────────
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'InteriorDesigner'],
  name:        NAP.name,
  description: 'Premium interior design company in Kolkata, West Bengal. 500+ completed projects. Modular kitchens, full home interiors, wardrobes, false ceiling. Serving all of West Bengal since 2016.',
  url:         NAP.website,
  telephone:   NAP.phone,
  email:       NAP.email,
  priceRange:  '₹₹',
  image:       `${NAP.website}/uploads/upload_1.png`,
  logo:        `${NAP.website}/uploads/upload_1.png`,
  foundingDate: '2016',
  address: {
    '@type':           'PostalAddress',
    streetAddress:     NAP.addressFull.street,
    addressLocality:   NAP.addressFull.city,
    addressRegion:     NAP.addressFull.state,
    postalCode:        NAP.addressFull.pin,
    addressCountry:    NAP.addressFull.country,
  },
  geo: {
    '@type':    'GeoCoordinates',
    latitude:   22.6234,
    longitude:  88.4765,
  },
  hasMap: NAP.mapShare,
  areaServed: [
    { '@type': 'State', name: 'West Bengal' },
    { '@type': 'City',  name: 'Kolkata'     },
    { '@type': 'City',  name: 'Howrah'      },
    { '@type': 'City',  name: 'Durgapur'    },
    { '@type': 'City',  name: 'Asansol'     },
    { '@type': 'City',  name: 'Siliguri'    },
    { '@type': 'City',  name: 'Bardhaman'   },
    { '@type': 'City',  name: 'Kharagpur'   },
    { '@type': 'City',  name: 'Haldia'      },
    { '@type': 'City',  name: 'Bankura'     },
    { '@type': 'City',  name: 'Bolpur'      },
    { '@type': 'City',  name: 'Darjeeling'  },
  ],
  openingHoursSpecification: [
    {
      '@type':      'OpeningHoursSpecification',
      dayOfWeek:    ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens:        '10:00',
      closes:       '19:00',
    },
  ],
  aggregateRating: {
    '@type':       'AggregateRating',
    ratingValue:   '4.9',
    reviewCount:   '500',
    bestRating:    '5',
    worstRating:   '1',
  },
  // sameAs — all verified social + directory + brand URLs
  sameAs: [
    'https://www.facebook.com/sankalpinterior/',
    'https://www.instagram.com/sankalp_interior_solution',
    'https://www.youtube.com/@SankalpInterior',
    'https://www.threads.com/@sankalp_interior_solution',
    'https://jsdl.in/DT-37UCB3P14BR',
    'https://www.indiamart.com/sankalp-interior-solution/',
    'https://www.sankalpdesign.com',
    'https://www.sankalps.com',
    'https://www.sankalpinterior.in',
  ],
};

// ─── Nav links ────────────────────────────────────────────────────────────────
const SERVICE_LINKS = [
  { label: 'Full Home Interior',   path: '/services' },
  { label: 'Modular Kitchen',      path: '/services' },
  { label: 'Wardrobe Design',      path: '/services' },
  { label: 'False Ceiling',        path: '/services' },
  { label: 'Commercial Interior',  path: '/services' },
  { label: 'Living Room Design',   path: '/services' },
];

const CITY_LINKS = [
  { label: 'Interior Designer Kolkata',   path: '/interior-designer-kolkata'   },
  { label: 'Interior Designer Howrah',    path: '/interior-designer-howrah'    },
  { label: 'Interior Designer Salt Lake', path: '/interior-designer-salt-lake' },
  { label: 'Interior Designer New Town',  path: '/interior-designer-new-town'  },
  { label: 'Interior Designer Durgapur',  path: '/interior-designer-durgapur'  },
  { label: 'Interior Designer Siliguri',  path: '/interior-designer-siliguri'  },
  { label: 'Interior Designer Asansol',   path: '/interior-designer-asansol'   },
  { label: 'Interior Designer Bardhaman', path: '/interior-designer-bardhaman' },
  { label: 'Interior Designer Kharagpur', path: '/interior-designer-kharagpur' },
  { label: 'Interior Designer Haldia',    path: '/interior-designer-haldia'    },
  { label: 'Interior Designer Bankura',   path: '/interior-designer-bankura'   },
  { label: 'View All Locations →',        path: '/locations'                   },
];

// ─── Threads SVG icon ─────────────────────────────────────────────────────────
function ThreadsIcon({ size = 16, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 9.14c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.284 2.658ZM11.953 12.66c-.041 0-.083.002-.124.004-1.527.088-2.519.8-2.459 1.749.061.999 1.158 1.584 2.637 1.502 1.323-.073 2.887-.579 3.205-3.589a10.169 10.169 0 0 0-3.259.334Z"/>
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer>
      {/* Global LocalBusiness Schema — injected once */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <div className="py-14 px-4" style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/80 text-base mb-1" style={{ fontFamily: 'serif' }}>
            আপনার স্বপ্নের বাড়ি তৈরি করতে প্রস্তুত?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ready to Transform Your Home?
          </h2>
          <p className="text-white/85 mb-7" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Free home visit anywhere in West Bengal. No obligation, no hidden charges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"
              className="bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-all hover:-translate-y-1 inline-flex items-center gap-2 justify-center"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              Get Free Consultation <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${NAP.phone}?text=Hi, I'm interested in interior design services`}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-600 transition-all hover:-translate-y-1 inline-flex items-center gap-2 justify-center"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer ─────────────────────────────────────────────────── */}
      <div className="py-14 px-4" style={{ background: 'linear-gradient(135deg,#060f1f,#0a1628)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* ── Col 1: Brand + Social ─────────────────────────────────── */}
            <div className="lg:col-span-1">
              <img
                src="/uploads/upload_1.png"
                alt="Sankalp Interior Solution — Interior Designer Kolkata"
                className="mb-5"
                style={{ filter: 'brightness(1.1)', height: '52px', width: 'auto' }}
              />
              <p className="text-orange-400/80 text-sm mb-2" style={{ fontFamily: 'serif' }}>
                ঘর নয়, স্বপ্ন সাজাই আমরা।
              </p>
              <p className="text-white/55 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Kolkata's most trusted interior design company — 500+ successful projects across West Bengal since 2016.
              </p>

              {/* Social icons — all verified correct URLs */}
              <div className="flex gap-2.5 mb-5">
                {SOCIAL_LINKS.map(({ label, href, color, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Sankalp Interior Solution on ${label}`}
                    title={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:-translate-y-1 hover:opacity-90"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {Icon
                      ? <Icon size={16} style={{ color }} />
                      : <ThreadsIcon size={15} color={color} />
                    }
                  </a>
                ))}
              </div>

              {/* NAP */}
              <address className="not-italic space-y-2">
                <a href={`tel:${NAP.phone}`}
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-orange-400 transition-colors">
                  <Phone size={13} className="text-orange-400 flex-shrink-0" />
                  {NAP.phoneDisplay}
                </a>
                <a href={`mailto:${NAP.email}`}
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-orange-400 transition-colors">
                  <Mail size={13} className="text-orange-400 flex-shrink-0" />
                  {NAP.email}
                </a>
              </address>
            </div>

            {/* ── Col 2: Services ───────────────────────────────────────── */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Our Services
              </h4>
              <ul className="space-y-2.5">
                {SERVICE_LINKS.map(link => (
                  <li key={link.label}>
                    <Link to={link.path}
                      className="text-white/55 text-sm hover:text-orange-400 transition-colors flex items-center gap-2"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <ArrowRight size={11} className="text-orange-500/50 flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Locations ──────────────────────────────────────── */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Service Locations
              </h4>
              <ul className="space-y-2.5">
                {CITY_LINKS.map(link => (
                  <li key={link.label}>
                    <Link to={link.path}
                      className="text-white/55 text-sm hover:text-orange-400 transition-colors flex items-center gap-2"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <ArrowRight size={11} className="text-orange-500/50 flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Contact + Address ──────────────────────────────── */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Contact Us
              </h4>

              {/* Address */}
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(240,124,30,0.15)' }}>
                  <MapPin size={14} className="text-orange-400" />
                </div>
                <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {NAP.addressFull.street},<br />
                  {NAP.addressFull.city}, {NAP.addressFull.state} {NAP.addressFull.pin}
                </p>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-center mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(240,124,30,0.15)' }}>
                  <Phone size={14} className="text-orange-400" />
                </div>
                <a href={`tel:${NAP.phone}`}
                  className="text-white/55 text-sm hover:text-orange-400 transition-colors">
                  {NAP.phoneDisplay}
                </a>
              </div>

              {/* Google Maps link */}
              <a
                href={NAP.mapShare}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium mb-5 px-3 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ background: 'rgba(240,124,30,0.15)', color: '#f9a14b', width: 'fit-content' }}>
                <MapPin size={13} />
                Get Directions
                <ExternalLink size={11} />
              </a>

              {/* Working hours */}
              <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <p className="text-white/35 text-xs mb-1">Working Hours</p>
                <p className="text-white/75 text-sm font-medium">Mon – Sat: 10am – 7pm</p>
                <p className="text-white/45 text-xs mt-0.5">Sunday: By Appointment</p>
              </div>

              <p className="text-white/30 text-xs" style={{ fontFamily: 'serif' }}>
                আমরা সারা পশ্চিমবঙ্গে সেবা প্রদান করি।
              </p>
            </div>
          </div>

          {/* ── Trust / Listed On row ──────────────────────────────────── */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="flex flex-col md:flex-row md:items-center gap-6">

              {/* Directory listings */}
              <div className="flex-1">
                <p className="text-white/35 text-xs uppercase tracking-wider mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Listed & Verified On
                </p>
                <div className="flex flex-wrap gap-3">
                  {DIRECTORY_LINKS.map(({ label, href, logo }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Sankalp Interior Solution on ${label}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white transition-all hover:-translate-y-0.5"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <span>{logo}</span>
                      {label}
                      <ExternalLink size={11} className="text-white/30" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Brand network */}
              <div>
                <p className="text-white/35 text-xs uppercase tracking-wider mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Our Network
                </p>
                <div className="flex flex-wrap gap-2">
                  {BRAND_WEBSITES.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/40 hover:text-orange-400 transition-colors px-2.5 py-1.5 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEO text + location links ────────────────────────────────────── */}
      <div className="px-4 py-8" style={{ background: '#040b16' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-5 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <p className="text-white/30 text-xs leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <strong className="text-white/45">Sankalp Interior Solution</strong> is a premium interior design company based in Kolkata, West Bengal,
              serving 500+ happy families since 2016. We offer complete home interior design, modular kitchen installation,
              wardrobe design, false ceiling, and commercial interiors across Kolkata, Howrah, Salt Lake, New Town, Durgapur,
              Asansol, Siliguri, Bardhaman, Kharagpur, Haldia, Bankura, Bolpur, Darjeeling, Jalpaiguri, Cooch Behar and all
              districts of West Bengal. Transparent pricing from ₹800/sq ft. Free home visit anywhere in West Bengal.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {CITY_LINKS.slice(0, 11).map(link => (
              <Link key={link.path} to={link.path}
                className="text-white/25 text-xs hover:text-orange-400 transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t py-5 px-4" style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#020810' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif' }}>
            © 2025 Sankalp Interior Solution. All rights reserved. | sankalpinterior.com | Kolkata, West Bengal
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
              <a key={item}
                href={item === 'Sitemap' ? '/sitemap.xml' : '#'}
                className="text-white/25 text-xs hover:text-orange-400 transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
