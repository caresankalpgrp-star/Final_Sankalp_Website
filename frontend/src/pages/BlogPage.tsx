import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag, Loader } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { apiUrl } from '../lib/api';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  read_time: string;
  published_at: string;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/api/blog'))
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative pt-32 pb-24 px-4"
        style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 100%)' }}
      >
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="section-tag mb-4">Design Insights</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Interior Design <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Expert tips, cost guides, and design inspiration for Kolkata homeowners.
          </p>
        </div>
      </section>

      <section className="section-padding px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader size={40} className="text-orange-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="reveal mb-16">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <div
                      className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl card-hover"
                      style={{ border: '1px solid rgba(240,124,30,0.1)' }}
                    >
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <img
                          src={featuredPost.image_url}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="img-overlay" />
                        <span
                          className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                          style={{ background: 'rgba(240, 124, 30, 0.9)' }}
                        >
                          Featured Article
                        </span>
                      </div>
                      <div className="p-10 flex flex-col justify-center bg-white">
                        <span
                          className="text-xs font-semibold uppercase tracking-wider mb-3"
                          style={{ color: '#f07c1e' }}
                        >
                          {featuredPost.category}
                        </span>
                        <h2
                          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                          <span className="flex items-center gap-1"><User size={12} />{featuredPost.author}</span>
                          <span className="flex items-center gap-1"><Clock size={12} />{featuredPost.read_time}</span>
                        </div>
                        <span className="text-orange-500 font-semibold flex items-center gap-2 hover:gap-4 transition-all">
                          Read Full Article <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Post Grid */}
              <div className="reveal">
                <SectionHeading
                  tag="Latest Articles"
                  title="More "
                  highlight="Design Guides"
                  subtitle="Expert advice for Kolkata homeowners."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restPosts.map((post, i) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="reveal blog-card"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="img-overlay" />
                      <span
                        className="absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(240, 124, 30, 0.9)' }}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3
                        className="font-bold text-gray-900 mb-2 leading-tight"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock size={11} />{post.read_time}</span>
                        <span className="text-orange-500 font-medium flex items-center gap-1">
                          Read More <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
