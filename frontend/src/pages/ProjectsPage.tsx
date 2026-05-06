import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, IndianRupee, Clock, Loader } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TestimonialSection from '../components/TestimonialSection';
import { apiUrl } from '../lib/api';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  budget: string;
  duration: string;
  area: string;
  description: string;
  image_url: string;
  featured: boolean;
  tags: string[];
}

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'living-room', label: 'Living Room' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'full-home', label: 'Full Home' },
  { key: 'commercial', label: 'Commercial' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchProjects = async () => {
    try {
      const url = activeFilter === 'all'
        ? apiUrl('/api/projects')
        : apiUrl(`/api/projects?category=${activeFilter}`);
      const res = await fetch(url);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProjects();
  }, [activeFilter]);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

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
          <span className="section-tag mb-4">Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Our <span className="gradient-text">Work</span>
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            500+ projects completed across Kolkata & West Bengal. Real homes, real transformations.
          </p>
        </div>
      </section>

      {/* Before/After Feature */}
      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                tag="Transformation"
                title="Dramatic "
                highlight="Before & After"
                subtitle="See how we transform ordinary spaces into extraordinary homes. Every project tells a story."
              />
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Space', value: '650 sq ft 2BHK' },
                  { label: 'Budget', value: '₹4.8 Lakhs' },
                  { label: 'Duration', value: '52 days' },
                  { label: 'Location', value: 'Salt Lake, Kolkata' },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4 rounded-xl" style={{ background: '#faf8f4' }}>
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    <p className="font-bold text-gray-900 text-sm">{value}</p>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">
                Start Your Project
                <ArrowRight size={18} />
              </Link>
            </div>
            <div>
              <BeforeAfterSlider
                beforeImage="/images/before.jpg"
                afterImage="/images/after.jpg"
                beforeLabel="Before"
                afterLabel="After Sankalp"
              />
              <p className="text-center text-gray-400 text-sm mt-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ← Drag to compare →
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding px-4" style={{ background: '#f5f5f7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <SectionHeading
              tag="Portfolio"
              title="Featured "
              highlight="Projects"
              subtitle="Browse our portfolio of completed projects across Kolkata & West Bengal."
              center
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-10 reveal">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader size={40} className="text-orange-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className="reveal bg-white rounded-2xl overflow-hidden shadow-sm card-hover"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="img-overlay" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-white text-xs font-semibold px-3 py-1.5 rounded-full capitalize"
                        style={{ background: 'rgba(240, 124, 30, 0.9)' }}
                      >
                        {project.category.replace('-', ' ')}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                          style={{ background: 'rgba(15, 32, 68, 0.9)' }}>
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {project.description}
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin size={12} className="text-orange-500" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <IndianRupee size={12} className="text-orange-500" />
                        <span className="truncate">{project.budget}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock size={12} className="text-orange-500" />
                        <span className="truncate">{project.duration}</span>
                      </div>
                    </div>
                    {project.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(240, 124, 30, 0.08)', color: '#d4640a' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection
        subtitle="Hear from homeowners whose projects are featured in our portfolio."
        dark={false}
        showCta={false}
      />

      {/* CTA */}
      <section
        className="py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Love What You See?
          </h2>
          <p className="text-white/70 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Let's create something even more beautiful for your home. Book a free consultation today.
          </p>
          <Link to="/contact" className="btn-primary text-base px-10 py-4">
            Start Your Project
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
