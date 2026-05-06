import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FolderOpen, BookOpen, Star, TrendingUp, ArrowRight, Phone, MessageCircle, Clock, Images, Wrench } from 'lucide-react';
import { apiUrl } from '../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({ leads: 0, newLeads: 0, projects: 0, blogs: 0, testimonials: 0, catalogs: 0, services: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(apiUrl('/api/leads')).then(r => r.json()),
      fetch(apiUrl('/api/projects')).then(r => r.json()),
      fetch(apiUrl('/api/blog')).then(r => r.json()),
      fetch(apiUrl('/api/testimonials')).then(r => r.json()),
      fetch(apiUrl('/api/catalogs?all=true')).then(r => r.json()),
      fetch(apiUrl('/api/services')).then(r => r.json()),
    ]).then(([leads, projects, blogs, testimonials, catalogs, services]) => {
      setStats({
        leads: leads.length,
        newLeads: leads.filter((l: any) => l.status === 'new').length,
        projects: projects.length,
        blogs: blogs.length,
        testimonials: testimonials.length,
        catalogs: Array.isArray(catalogs) ? catalogs.length : 0,
        services: Array.isArray(services) ? services.length : 0,
      });
      setRecentLeads(leads.slice(0, 5));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Leads',    value: stats.leads,        sub: `${stats.newLeads} new`,    icon: Users,      color: '#0f2044', link: '/admin/leads' },
    { label: 'Projects',       value: stats.projects,     sub: 'in portfolio',              icon: FolderOpen, color: '#f07c1e', link: '/admin/projects' },
    { label: 'Services',       value: stats.services,     sub: 'service offerings',         icon: Wrench,     color: '#16a34a', link: '/admin/services' },
    { label: 'Catalog',        value: stats.catalogs,     sub: 'design collections',        icon: Images,     color: '#7c3aed', link: '/admin/catalog' },
    { label: 'Blog Posts',     value: stats.blogs,        sub: 'published',                 icon: BookOpen,   color: '#1a3a6b', link: '/admin/blog' },
    { label: 'Testimonials',   value: stats.testimonials, sub: 'client reviews',            icon: Star,       color: '#f07c1e', link: '/admin/testimonials' },
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Welcome back! 👋</h2>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with Sankalp Interior today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8" data-testid="dashboard-stats">
        {statCards.map(({ label, value, sub, icon: Icon, color, link }) => (
          <Link key={label} to={link}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            style={{ border: '1px solid rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <ArrowRight size={16} className="text-gray-300" />
            </div>
            <div className="text-3xl font-black mb-1" style={{ color, fontFamily: 'Montserrat, sans-serif' }}>
              {loading ? '—' : value}
            </div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <p className="text-gray-300 text-xs mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#f0f0f8' }}>
            <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Recent Leads</h3>
            <Link to="/admin/leads" className="text-orange-500 text-sm font-medium hover:text-orange-600 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: '#f8f8fc' }}>
            {loading ? (
              <div className="p-6 text-center text-gray-300 text-sm">Loading...</div>
            ) : recentLeads.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-300 text-sm">No leads yet.</p>
                <p className="text-gray-300 text-xs mt-1">Share your website to start getting leads!</p>
              </div>
            ) : recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
                  {lead.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{lead.name}</p>
                  <p className="text-gray-400 text-xs truncate">{lead.location} · {lead.budget}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      background: lead.status === 'new' ? 'rgba(59,130,246,0.1)' : lead.status === 'converted' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                      color: lead.status === 'new' ? '#2563eb' : lead.status === 'converted' ? '#16a34a' : '#d97706'
                    }}>
                    {lead.status}
                  </span>
                  <a href={`tel:${lead.phone}`} className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(15,32,68,0.08)' }}>
                    <Phone size={12} className="text-navy" style={{ color: '#0f2044' }} />
                  </a>
                  <a href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g,'')}`} target="_blank" rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                    style={{ background: '#25D366' }}>
                    <MessageCircle size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: '#f0f0f8' }}>
            <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Quick Actions</h3>
          </div>
          <div className="p-6 space-y-3">
            {[
              { label: 'Add New Project',     link: '/admin/projects',     icon: FolderOpen, color: '#f07c1e', desc: 'Add to your portfolio' },
              { label: 'Manage Services',     link: '/admin/services',     icon: Wrench,     color: '#16a34a', desc: 'Services & pricing' },
              { label: 'Manage Catalog',      link: '/admin/catalog',      icon: Images,     color: '#7c3aed', desc: 'Update design catalog' },
              { label: 'Write Blog Post',     link: '/admin/blog',         icon: BookOpen,   color: '#0f2044', desc: 'Publish new SEO content' },
              { label: 'View All Leads',      link: '/admin/leads',        icon: Users,      color: '#1a3a6b', desc: `${stats.newLeads} new enquiries` },
            ].map(({ label, link, icon: Icon, color, desc }) => (
              <Link key={label} to={link}
                className="flex items-center gap-4 p-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-sm"
                style={{ background: '#faf8f4', border: '1px solid rgba(240,124,30,0.08)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                  <p className="text-gray-400 text-xs">{desc}</p>
                </div>
                <ArrowRight size={16} className="text-gray-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
