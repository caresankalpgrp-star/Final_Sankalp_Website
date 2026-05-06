import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Loader, Home, ChefHat, DoorOpen, Layers, Building2, Sofa } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TestimonialSection from '../components/TestimonialSection';

const serviceDetails = [
  {
    id: 'full-home',
    icon: Home,
    title: 'Full Home Interior',
    subtitle: 'Complete transformation from bare walls to dream home',
    description: 'Our comprehensive full home interior service covers every inch of your space. From initial concept to final handover, we manage everything — design, procurement, execution, and finishing.',
    priceRange: '₹800 – ₹2,200 per sq ft',
    timeline: '45 – 90 days',
    image: '/images/project1.jpg',
    features: [
      'Complete 3D design & visualization',
      'Modular furniture & custom carpentry',
      'Flooring (tiles, wood, marble)',
      'False ceiling with LED lighting',
      'Electrical & plumbing work',
      'Painting & wall treatments',
      'Modular kitchen',
      'Wardrobe & storage solutions',
    ],
    popular: false,
  },
  {
    id: 'modular-kitchen',
    icon: ChefHat,
    title: 'Modular Kitchen',
    subtitle: 'Smart, functional kitchens that inspire cooking',
    description: 'Transform your kitchen into a functional masterpiece. We design and install premium modular kitchens with the best materials, hardware, and finishes that last decades.',
    priceRange: '₹1.2 Lakhs – ₹5 Lakhs',
    timeline: '15 – 25 days',
    image: '/images/kitchen.jpg',
    features: [
      'Premium BWR plywood cabinets',
      'Soft-close hinges & channels',
      'Granite / quartz countertops',
      'Stainless steel sink & fittings',
      'Chimney & hob installation',
      'Backsplash tiles',
      'Under-cabinet lighting',
      '10-year warranty on hardware',
    ],
    popular: true,
  },
  {
    id: 'wardrobe',
    icon: DoorOpen,
    title: 'Wardrobe Design',
    subtitle: 'Custom storage solutions for every bedroom',
    description: 'From sliding wardrobes to walk-in closets, we create custom storage solutions that maximize space while adding elegance to your bedroom.',
    priceRange: '₹45,000 – ₹2 Lakhs',
    timeline: '10 – 18 days',
    image: '/images/wardrobe.jpg',
    features: [
      'Sliding / hinged / walk-in options',
      'Premium laminate / acrylic finish',
      'Soft-close mechanisms',
      'Internal organizers & drawers',
      'Mirror panels',
      'LED interior lighting',
      'Custom sizing',
      '5-year warranty',
    ],
    popular: false,
  },
  {
    id: 'false-ceiling',
    icon: Layers,
    title: 'False Ceiling',
    subtitle: 'Stunning ceilings that transform your space',
    description: 'Our false ceiling designs add drama, warmth, and character to any room. We specialize in gypsum, POP, and wooden false ceilings with integrated lighting.',
    priceRange: '₹65 – ₹200 per sq ft',
    timeline: '7 – 15 days',
    image: '/images/false-ceiling.jpg',
    features: [
      'Gypsum / POP / wood options',
      'LED strip & cove lighting',
      'Recessed spotlights',
      'Acoustic panels',
      'Waterproof options',
      'Custom designs',
      'Quick installation',
      '3-year warranty',
    ],
    popular: false,
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Interior',
    subtitle: 'Professional spaces that impress clients & boost productivity',
    description: 'We design offices, retail stores, restaurants, and commercial spaces that reflect your brand identity while maximizing functionality and employee productivity.',
    priceRange: '₹600 – ₹1,800 per sq ft',
    timeline: '30 – 75 days',
    image: '/images/commercial.jpg',
    features: [
      'Office & retail design',
      'Brand identity integration',
      'Space planning & optimization',
      'Ergonomic furniture',
      'Reception & lounge areas',
      'Conference room design',
      'Acoustic solutions',
      'MEP coordination',
    ],
    popular: false,
  },
  {
    id: 'living-room',
    icon: Sofa,
    title: 'Living Room Design',
    subtitle: 'Create a space that wows every guest',
    description: 'Your living room is the heart of your home. We design living spaces that balance aesthetics with comfort, creating the perfect environment for family and entertainment.',
    priceRange: '₹80,000 – ₹4 Lakhs',
    timeline: '20 – 35 days',
    image: '/images/hero-living.jpg',
    features: [
      'Custom sofa & seating',
      'TV unit design',
      'Accent walls',
      'Decorative lighting',
      'Curtains & blinds',
      'Rugs & accessories',
      'Art & décor',
      'Smart home integration',
    ],
    popular: false,
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('full-home');

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = serviceDetails.find((s) => s.id === activeService)!;

  return (
    <div>
      {/* Hero */}
      <section
        className="relative pt-32 pb-24 px-4"
        style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <img src="/images/project2.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="section-tag mb-4">What We Do</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            From full home interiors to modular kitchens — we deliver premium quality at honest prices.
          </p>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-8 px-4 bg-white sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {serviceDetails.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeService === s.id ? 'tab-active' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <s.icon size={16} />
                {s.title}
                {s.popular && <span className="text-xs">⭐</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Service Detail */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full object-cover"
                  style={{ height: '480px' }}
                />
                <div className="img-overlay" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-4">
                    <div className="glass rounded-xl px-4 py-3 text-center flex-1">
                      <p className="text-white/70 text-xs mb-0.5">Price Range</p>
                      <p className="text-white font-bold text-sm">{active.priceRange}</p>
                    </div>
                    <div className="glass rounded-xl px-4 py-3 text-center flex-1">
                      <p className="text-white/70 text-xs mb-0.5">Timeline</p>
                      <p className="text-white font-bold text-sm">{active.timeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal-right">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f07c1e, #d4640a)' }}
                >
                  <active.icon size={22} color="white" />
                </div>
                {active.popular && (
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                    style={{ background: 'linear-gradient(135deg, #f07c1e, #d4640a)' }}
                  >
                    ⭐ Most Popular
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {active.title}
              </h2>
              <p className="text-orange-500 font-medium mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {active.subtitle}
              </p>
              <div className="divider" />
              <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {active.description}
              </p>
              <h4 className="font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                What's Included:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {active.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Get Free Quote
                  <ArrowRight size={18} />
                </Link>
                <a href="tel:+919748297025" className="btn-navy">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="section-padding px-4" style={{ background: '#f5f5f7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <SectionHeading
              tag="All Services"
              title="Complete "
              highlight="Service Range"
              subtitle="Everything you need under one roof."
              center
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceDetails.map((s, i) => (
              <div
                key={s.id}
                className="reveal bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer"
                style={{ transitionDelay: `${i * 0.08}s` }}
                onClick={() => {
                  setActiveService(s.id);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
                  <div className="img-overlay" />
                  {s.popular && (
                    <div
                      className="absolute top-3 right-3 text-white text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(240, 124, 30, 0.9)' }}
                    >
                      Most Popular
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon size={18} className="text-orange-500" />
                    <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {s.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-semibold text-sm">{s.priceRange}</span>
                    <ArrowRight size={16} className="text-orange-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection
        subtitle="See what our clients say about our interior design services."
        dark={false}
        showCta
      />

      {/* CTA */}
      <section
        className="py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #f07c1e 0%, #d4640a 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Not Sure Which Service You Need?
          </h2>
          <p className="text-white/80 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Book a free consultation and our expert will guide you to the perfect solution for your home and budget.
          </p>
          <Link to="/contact" className="bg-white text-orange-600 font-bold py-4 px-10 rounded-lg hover:bg-gray-50 transition-all inline-flex items-center gap-2">
            Book Free Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
