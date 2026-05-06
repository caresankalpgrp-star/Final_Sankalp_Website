import { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink, Navigation } from 'lucide-react';
import { NAP } from '../components/Footer';
import { OFFICE_MAP_EMBED } from '../lib/mapConfig';
import LeadForm from '../components/LeadForm';
import SectionHeading from '../components/SectionHeading';
import TestimonialSection from '../components/TestimonialSection';

export default function ContactPage() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative pt-32 pb-24 px-4"
        style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 100%)' }}
      >
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="section-tag mb-4">Let's Talk</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Start Your <span className="gradient-text">Dream Project</span>
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Book a free consultation. Our expert will visit your home within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="reveal-left">
              <SectionHeading
                tag="Get In Touch"
                title="Book Free "
                highlight="Consultation"
                subtitle="Fill in your details and our design consultant will reach out within 2 hours."
              />
              <div
                className="bg-white rounded-2xl p-8 shadow-xl"
                style={{ border: '1px solid rgba(240, 124, 30, 0.15)' }}
              >
                <LeadForm source="contact-page" />
              </div>
            </div>

            {/* Info */}
            <div className="reveal-right">
              <SectionHeading
                tag="Contact Info"
                title="Reach "
                highlight="Us Directly"
                subtitle="Multiple ways to connect with our team."
              />

              <div className="space-y-5 mb-8">
                {[
                  {
                    icon: Phone,
                    title: 'Call Us',
                    lines: ['+91 97482 97025'],
                    href: 'tel:+919748297025',
                    color: '#0f2044',
                  },
                  {
                    icon: MessageCircle,
                    title: 'WhatsApp',
                    lines: ['+91 97482 97025', 'Chat anytime, 7 days a week'],
                    href: 'https://wa.me/919748297025',
                    color: '#25D366',
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    lines: ['info@sankalpinterior.com'],
                    href: 'mailto:info@sankalpinterior.com',
                    color: '#f07c1e',
                  },
                  {
                    icon: MapPin,
                    title: 'Office Address',
                    lines: [
                      'Office Unit GB02, Oishi Tower-II',
                      'Rabindra Pally, Jyangra, VIP Rd',
                      'Raghunathpur, Kolkata, WB 700059',
                    ],
                    href: NAP.mapShare,
                    color: '#d4640a',
                  },
                  {
                    icon: Clock,
                    title: 'Working Hours',
                    lines: ['Mon – Sat: 10:00 AM – 7:00 PM', 'Sunday: By Appointment Only'],
                    href: null,
                    color: '#1a3a6b',
                  },
                ].map(({ icon: Icon, title, lines, href, color }) => (
                  <div
                    key={title}
                    className="flex gap-4 p-5 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{ background: '#faf8f4', border: '1px solid rgba(240,124,30,0.08)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {title}
                      </p>
                      {lines.map((line) => (
                        <p key={line} className="text-gray-500 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {href && lines.indexOf(line) === 0 ? (
                            <a href={href} className="hover:text-orange-500 transition-colors">
                              {line}
                            </a>
                          ) : line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:+919748297025"
                  className="btn-navy justify-center text-sm"
                >
                  <Phone size={16} />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919748297025?text=Hi, I need interior design help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1"
                  style={{ background: '#25D366', fontFamily: 'Poppins, sans-serif' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection
        subtitle="Still deciding? See what 500+ happy clients across West Bengal say about us."
        dark
        showCta={false}
      />

      {/* Google Map */}
      <section className="px-4 pb-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            {/* Map Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  📍 Find Us on Map
                </h3>
                <p className="text-gray-400 text-sm mt-0.5">Oishi Tower-II, Raghunathpur, Kolkata 700059</p>
              </div>
              <a
                href={NAP.mapShare}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 15px rgba(240,124,30,0.35)' }}>
                <Navigation size={15} />
                Get Directions
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Map iframe — full real embed */}
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ height: '480px', border: '2px solid rgba(240,124,30,0.15)' }}
            >
              <iframe
                src={OFFICE_MAP_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sankalp Interior Solution — Office Location, Kolkata"
              />
            </div>

            {/* Address bar below map */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 p-4 rounded-2xl"
              style={{ background: '#faf8f4', border: '1px solid rgba(240,124,30,0.1)' }}
            >
              <div className="flex items-start gap-3 flex-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(240,124,30,0.12)' }}
                >
                  <MapPin size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>Office Address</p>
                  <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Unit GB02, Oishi Tower-II, Rabindra Pally, Jyangra, VIP Rd,
                    Raghunathpur, Kolkata, West Bengal 700059
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a
                  href="tel:+919748297025"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)', fontFamily: 'Poppins, sans-serif' }}
                >
                  <Phone size={14} /> Call Us
                </a>
                <a
                  href={NAP.mapShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: 'rgba(240,124,30,0.1)', color: '#d4640a', fontFamily: 'Poppins, sans-serif' }}
                >
                  <Navigation size={14} /> Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
