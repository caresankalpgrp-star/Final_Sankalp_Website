import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Loader, ArrowRight } from 'lucide-react';
import LeadForm from '../components/LeadForm';
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

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl(`/api/blog?slug=${slug}`))
      .then((r) => r.json())
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '80px' }}>
        <Loader size={40} className="text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ paddingTop: '80px' }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '480px' }}>
        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(9,21,48,0.7)' }} />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 pb-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 text-sm mb-4 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span
              className="block text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: '#f9a14b' }}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-5 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{post.read_time}</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Article */}
          <div className="lg:col-span-2">
            <div
              className="prose prose-lg max-w-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.9',
                color: '#374151',
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {/* Tags */}
            {post.tags && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-500 mb-3">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{ background: 'rgba(240, 124, 30, 0.1)', color: '#d4640a' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* CTA Form */}
            <div
              className="rounded-2xl p-6 sticky top-28"
              style={{ background: 'linear-gradient(135deg, #0f2044, #1a3a6b)' }}
            >
              <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Get Free Consultation
              </h3>
              <p className="text-white/60 text-sm mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Transform your home with Kolkata's best interior designers.
              </p>
              <LeadForm source={`blog-${post.slug}`} compact darkBg />
            </div>
          </div>
        </div>
      </div>

      {/* Back CTA */}
      <div className="bg-gray-50 py-12 px-4 text-center">
        <Link to="/blog" className="btn-navy">
          <ArrowLeft size={18} />
          Back to All Articles
        </Link>
      </div>
    </div>
  );
}
