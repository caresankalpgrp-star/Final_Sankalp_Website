import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import TestimonialSlider from './TestimonialSlider';
import SectionHeading from './SectionHeading';

interface Props {
  title?: string;
  subtitle?: string;
  dark?: boolean;
  compact?: boolean;
  showCta?: boolean;
}

export default function TestimonialSection({
  title = 'What Our Clients Say',
  subtitle = 'Real stories from real homeowners across Kolkata & West Bengal.',
  dark = false,
  compact = false,
  showCta = true,
}: Props) {
  return (
    <section
      className="section-padding px-4"
      style={{ background: dark ? 'linear-gradient(135deg,#0f2044,#1a3a6b)' : '#faf8f4' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">Client Love</span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-2"
            style={{ fontFamily: 'Montserrat, sans-serif', color: dark ? 'white' : '#111827' }}
          >
            {title.includes('Say') ? (
              <>What Our Clients <span className="gradient-text">Say</span></>
            ) : title}
          </h2>
          <div className="divider divider-center" />
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: dark ? 'rgba(255,255,255,0.65)' : '#6b7280', fontFamily: 'Poppins, sans-serif' }}
          >
            {subtitle}
          </p>

          {/* Rating badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full"
            style={{ background: dark ? 'rgba(255,255,255,0.08)' : 'white', border: '1px solid rgba(240,124,30,0.2)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(n => <Star key={n} size={14} fill="#f5c518" stroke="#f5c518" />)}
            </div>
            <span className="font-bold text-sm" style={{ color: dark ? 'white' : '#111827', fontFamily: 'Montserrat, sans-serif' }}>4.9</span>
            <span className="text-sm" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>· 500+ Happy Clients</span>
          </div>
        </div>

        {/* Slider */}
        <div className="px-6">
          <TestimonialSlider compact={compact} />
        </div>

        {/* CTA */}
        {showCta && (
          <div className="text-center mt-10">
            <Link
              to="/contact"
              className="btn-primary"
            >
              Get Your Free Consultation
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
