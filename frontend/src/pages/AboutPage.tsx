import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Clock, CheckCircle, Target, Heart, Zap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TestimonialSection from '../components/TestimonialSection';

const values = [
  {
    icon: Target,
    title: 'Precision Design',
    desc: 'Every millimeter matters. We design with precision to ensure perfect fit and finish.',
  },
  {
    icon: Heart,
    title: 'Client-First Approach',
    desc: 'Your vision is our blueprint. We listen, understand, and deliver beyond expectations.',
  },
  {
    icon: Zap,
    title: 'Fast Execution',
    desc: 'We deliver projects on time, every time. No delays, no excuses.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Guarantee',
    desc: 'Premium materials, skilled craftsmen, and a 5-year warranty on all work.',
  },
];

const team = [
  {
    name: 'Founder & Lead Designer',
    role: 'Sankalp Interior Solution',
    desc: 'With 8+ years of experience transforming homes across Kolkata, our founder brings a unique blend of modern aesthetics and traditional warmth to every project.',
    image: '/images/team.jpg',
  },
];

const milestones = [
  { year: '2016', event: 'Founded Sankalp Interior Solution in Kolkata' },
  { year: '2018', event: 'Completed 100th project — expanded to Newtown & Salt Lake' },
  { year: '2020', event: 'Launched modular kitchen division' },
  { year: '2022', event: 'Crossed 300+ projects, opened Raghunathpur office' },
  { year: '2024', event: 'Achieved 500+ projects with 4.9★ average rating' },
  { year: '2025', event: 'Expanding to commercial & luxury segment' },
];

export default function AboutPage() {
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
        className="relative pt-32 pb-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <img src="/images/project1.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="section-tag mb-4">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Crafting Dreams Since <span className="gradient-text">2016</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            We started with a simple belief: every family deserves a beautiful home, regardless of budget.
            Today, we're Kolkata's most trusted interior design company.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="relative">
                <img
                  src="/images/team.jpg"
                  alt="Founder"
                  className="w-full rounded-2xl shadow-2xl"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl"
                  style={{ border: '2px solid rgba(240, 124, 30, 0.2)' }}
                >
                  <div className="text-center">
                    <div className="stat-number text-4xl font-black">8+</div>
                    <div className="text-gray-500 text-sm mt-1">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal-right">
              <SectionHeading
                tag="Founder's Story"
                title="The "
                highlight="Vision"
                subtitle=""
              />
              <div className="space-y-5 text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p>
                  Sankalp Interior Solution was born from a simple yet powerful vision: to make premium interior design
                  accessible to every family in Kolkata, not just the privileged few.
                </p>
                <p>
                  When we started in 2016, we noticed a huge gap in the market. On one side were expensive design firms
                  that most middle-class families couldn't afford. On the other side were cheap contractors who delivered
                  poor quality. We decided to bridge this gap.
                </p>
                <p>
                  Our approach is simple: <strong>transparent pricing, premium quality, and honest communication.</strong>
                  No hidden costs, no fake promises, no substandard materials.
                </p>
                <p>
                  Today, with 500+ completed projects and a 4.9-star rating, we're proud to have transformed hundreds
                  of houses into homes — and we're just getting started.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { value: '500+', label: 'Projects' },
                  { value: '4.9★', label: 'Rating' },
                  { value: '8+', label: 'Years' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center p-4 rounded-xl" style={{ background: '#faf8f4' }}>
                    <div className="stat-number text-3xl font-black">{value}</div>
                    <div className="text-gray-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding px-4" style={{ background: '#f5f5f7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <SectionHeading
              tag="Our Values"
              title="Why Clients "
              highlight="Trust Us"
              subtitle="Our core values guide every decision we make and every project we deliver."
              center
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="reveal bg-white rounded-2xl p-8 text-center card-hover shadow-sm"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, #f07c1e, #d4640a)' }}
                >
                  <v.icon size={28} color="white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="reveal">
            <SectionHeading
              tag="Our Journey"
              title="A Decade of "
              highlight="Excellence"
              subtitle="From a small studio to Kolkata's most trusted interior design firm."
              center
            />
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, #f07c1e, rgba(240,124,30,0.1))' }}
            />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`reveal relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-20 md:pl-0`}>
                    <div
                      className="inline-block bg-white rounded-xl p-5 shadow-md"
                      style={{ border: '1px solid rgba(240, 124, 30, 0.15)' }}
                    >
                      <span
                        className="text-sm font-bold"
                        style={{ color: '#f07c1e', fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {m.year}
                      </span>
                      <p className="text-gray-700 text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {m.event}
                      </p>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white z-10"
                    style={{ background: '#f07c1e', boxShadow: '0 0 0 4px rgba(240,124,30,0.2)' }}
                  />
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="section-padding px-4"
        style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <SectionHeading
              tag="Why Sankalp"
              title="What Makes Us "
              highlight="Different"
              subtitle="We're not just interior designers. We're your partners in creating the home you've always dreamed of."
              center
              light
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Transparent Pricing', desc: 'Complete cost breakdown upfront. No hidden charges, ever.' },
              { title: 'On-Time Delivery', desc: 'We commit to deadlines and deliver. 95% on-time completion rate.' },
              { title: '5-Year Warranty', desc: 'All our work comes with a 5-year warranty on materials and labor.' },
              { title: 'In-House Team', desc: 'Our own craftsmen, not subcontractors. Better quality control.' },
              { title: 'Free 3D Design', desc: 'See your home before work begins with photorealistic 3D renders.' },
              { title: 'EMI Available', desc: 'Easy payment options. 0% EMI for up to 12 months.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal glass rounded-2xl p-6"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <CheckCircle size={24} className="text-orange-400 mb-3" />
                <h3 className="text-white font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal">
            <Link to="/contact" className="btn-primary text-base px-10 py-4">
              Start Your Project
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <TestimonialSection
        subtitle="Hear from families whose homes we've transformed across West Bengal."
        dark
        showCta
      />
    </div>
  );
}
