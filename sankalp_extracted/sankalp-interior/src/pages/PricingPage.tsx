import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, HelpCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TestimonialSection from '../components/TestimonialSection';

const plans = [
  {
    name: 'Essential',
    tagline: 'Smart & Affordable',
    price: '₹800',
    unit: '/sq ft',
    desc: 'Perfect for budget-conscious homeowners who want quality without overspending.',
    color: '#1a3a6b',
    features: [
      'Basic modular furniture',
      'Laminate finish wardrobes',
      'POP false ceiling',
      'Standard kitchen cabinets',
      'Ceramic tile flooring',
      'Emulsion painting',
      'Basic lighting setup',
      '2-year warranty',
    ],
    notIncluded: ['3D visualization', 'Premium materials', 'Smart home features'],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Premium',
    tagline: 'Best Value — Most Chosen',
    price: '₹1,400',
    unit: '/sq ft',
    desc: 'Our most popular package. The perfect balance of quality, aesthetics, and value.',
    color: '#f07c1e',
    features: [
      'Premium modular furniture',
      'Acrylic / membrane finish',
      'Gypsum false ceiling + LED',
      'Premium kitchen with soft-close',
      'Engineered wood / vitrified tiles',
      'Texture / wallpaper options',
      'Designer lighting',
      'Free 3D visualization',
      '5-year warranty',
      'Dedicated project manager',
    ],
    notIncluded: ['Imported materials', 'Smart home automation'],
    popular: true,
    cta: 'Most Popular',
  },
  {
    name: 'Ultra Premium',
    tagline: 'Luxury Without Compromise',
    price: '₹2,200+',
    unit: '/sq ft',
    desc: 'The ultimate luxury interior experience. No compromises on quality or aesthetics.',
    color: '#c9a84c',
    features: [
      'Luxury imported furniture',
      'Italian lacquer / veneer finish',
      'Cinematic ceiling design',
      'Chef-grade kitchen',
      'Italian marble / hardwood flooring',
      'Custom wallcoverings',
      'Architectural lighting design',
      'Free 3D + VR walkthrough',
      'Smart home automation',
      '10-year warranty',
      'Dedicated design team',
      'Post-project support',
    ],
    notIncluded: [],
    popular: false,
    cta: 'Go Luxury',
  },
];

const realExamples = [
  {
    title: '650 sq ft 2BHK — Salt Lake',
    plan: 'Premium',
    breakdown: [
      { item: 'Living Room (180 sq ft)', cost: '₹72,000' },
      { item: 'Master Bedroom (160 sq ft)', cost: '₹64,000' },
      { item: 'Second Bedroom (140 sq ft)', cost: '₹56,000' },
      { item: 'Modular Kitchen', cost: '₹1,40,000' },
      { item: 'Bathrooms (2)', cost: '₹60,000' },
      { item: 'False Ceiling (entire home)', cost: '₹45,000' },
      { item: 'Electrical & Plumbing', cost: '₹35,000' },
      { item: 'Painting & Finishing', cost: '₹28,000' },
    ],
    total: '₹5,00,000',
    duration: '55 days',
  },
  {
    title: '900 sq ft 3BHK — Newtown',
    plan: 'Premium',
    breakdown: [
      { item: 'Living + Dining (250 sq ft)', cost: '₹1,00,000' },
      { item: 'Master Bedroom (180 sq ft)', cost: '₹72,000' },
      { item: 'Bedroom 2 (150 sq ft)', cost: '₹60,000' },
      { item: 'Bedroom 3 (140 sq ft)', cost: '₹56,000' },
      { item: 'Modular Kitchen', cost: '₹1,80,000' },
      { item: 'Bathrooms (3)', cost: '₹90,000' },
      { item: 'False Ceiling', cost: '₹60,000' },
      { item: 'Electrical & Plumbing', cost: '₹50,000' },
    ],
    total: '₹6,68,000',
    duration: '70 days',
  },
];

const faqs = [
  {
    q: 'What is included in the price per sq ft?',
    a: 'The price per sq ft includes design, materials, labor, project management, and installation. It covers all rooms including kitchen, bedrooms, living room, and bathrooms.',
  },
  {
    q: 'Are there any hidden charges?',
    a: 'Absolutely not. We provide a complete, itemized quote before starting any work. The final cost matches the quoted amount unless you request changes.',
  },
  {
    q: 'What is the payment schedule?',
    a: 'We follow a milestone-based payment schedule: 30% advance, 40% at execution start, 20% at 80% completion, and 10% at handover.',
  },
  {
    q: 'Do you offer EMI options?',
    a: 'Yes! We offer 0% EMI for up to 12 months through our banking partners. Ask our team for details.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A 2BHK typically takes 45–60 days, a 3BHK takes 60–80 days. Timeline depends on scope and material availability.',
  },
  {
    q: 'What is the warranty on your work?',
    a: 'Essential plan: 2 years, Premium plan: 5 years, Ultra Premium: 10 years on all materials and workmanship.',
  },
];

export default function PricingPage() {
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
          <span className="section-tag mb-4">Transparent Pricing</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Honest <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            No hidden costs. No surprises. Just fair pricing for premium quality.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-padding px-4" style={{ background: '#faf8f4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <SectionHeading
              tag="Choose Your Plan"
              title="Find Your "
              highlight="Perfect Package"
              subtitle="All plans include free consultation, 3D design, and transparent pricing."
              center
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`reveal bg-white rounded-2xl overflow-hidden shadow-md flex flex-col ${plan.popular ? 'pricing-popular' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {plan.popular && (
                  <div
                    className="py-3 text-center text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #f07c1e, #d4640a)', fontFamily: 'Poppins, sans-serif' }}
                  >
                    ⭐ MOST POPULAR CHOICE
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ background: `${plan.color}15`, color: plan.color, fontFamily: 'Poppins, sans-serif' }}
                    >
                      {plan.tagline}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{plan.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-gray-100">
                    <span
                      className="text-5xl font-black"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: plan.color }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-sm">{plan.unit}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Included:</p>
                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <CheckCircle size={15} style={{ color: plan.color }} className="flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-auto text-center font-bold py-4 px-6 rounded-xl transition-all hover:-translate-y-1 text-white"
                    style={{
                      background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
                      boxShadow: `0 4px 20px ${plan.color}40`,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6 reveal" style={{ fontFamily: 'Poppins, sans-serif' }}>
            * Prices are indicative. Final quote depends on project scope, location, and material choices.
          </p>
        </div>
      </section>

      {/* Real Examples */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <SectionHeading
              tag="Real Cost Examples"
              title="What Does It Actually "
              highlight="Cost?"
              subtitle="Real project breakdowns from our completed work. No fluff, just facts."
              center
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {realExamples.map((example, i) => (
              <div
                key={example.title}
                className="reveal bg-white rounded-2xl shadow-md overflow-hidden"
                style={{ border: '1px solid rgba(240, 124, 30, 0.15)', transitionDelay: `${i * 0.15}s` }}
              >
                <div
                  className="p-6"
                  style={{ background: 'linear-gradient(135deg, #0f2044, #1a3a6b)' }}
                >
                  <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {example.title}
                  </h3>
                  <div className="flex gap-4 mt-2">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'rgba(240, 124, 30, 0.2)', color: '#f9a14b' }}
                    >
                      {example.plan} Plan
                    </span>
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      ⏱ {example.duration}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <table className="w-full">
                    <tbody>
                      {example.breakdown.map(({ item, cost }) => (
                        <tr key={item} className="border-b border-gray-50">
                          <td className="py-2.5 text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{item}</td>
                          <td className="py-2.5 text-right font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{cost}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="pt-4 font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Total</td>
                        <td className="pt-4 text-right font-black text-xl gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{example.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding px-4" style={{ background: '#f5f5f7' }}>
        <div className="max-w-3xl mx-auto">
          <div className="reveal">
            <SectionHeading
              tag="FAQ"
              title="Common "
              highlight="Questions"
              subtitle="Everything you need to know about our pricing and process."
              center
            />
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="reveal bg-white rounded-2xl p-6 shadow-sm"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex gap-3">
                  <HelpCircle size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {faq.q}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection
        subtitle="Real clients sharing honest reviews about our pricing transparency and quality."
        dark
        showCta={false}
      />

      {/* CTA */}
      <section
        className="py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #f07c1e 0%, #d4640a 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Get Your Custom Quote Today
          </h2>
          <p className="text-white/80 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Every project is unique. Get a personalized quote based on your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-all inline-flex items-center gap-2 justify-center">
              Get Free Quote
              <ArrowRight size={18} />
            </Link>
            <a href="tel:+919748297025" className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-flex items-center gap-2 justify-center">
              <Phone size={18} />
              Call: +91 97482 97025
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
