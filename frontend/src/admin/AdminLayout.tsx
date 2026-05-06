import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FolderOpen, BookOpen, Star,
  Settings, LogOut, Menu, X, ChevronRight, Bell, Home, Images, Wrench
} from 'lucide-react';
import supabase from '../lib/supabase';

const navItems = [
  { path: '/admin',                label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/admin/leads',          label: 'Leads',        icon: Users,      badge: true },
  { path: '/admin/projects',       label: 'Projects',     icon: FolderOpen },
  { path: '/admin/services',       label: 'Services',     icon: Wrench },
  { path: '/admin/catalog',        label: 'Catalog',      icon: Images },
  { path: '/admin/blog',           label: 'Blog Posts',   icon: BookOpen },
  { path: '/admin/testimonials',   label: 'Testimonials', icon: Star },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [newLeads, setNewLeads] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login');
      else setUser(session.user);
    });
    supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate('/admin/login');
      else setUser(session.user);
    });
  }, []);

  useEffect(() => {
    fetch('/api/leads')
      .then(r => r.json())
      .then(data => setNewLeads(data.filter((l: any) => l.status === 'new').length))
      .catch(() => {});
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif', background: '#f0f2f5' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0f2044 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <img src="/uploads/upload_1.png" alt="Sankalp" className="h-9 w-auto" />
          <div>
            <p className="text-white text-xs font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>SANKALP</p>
            <p className="text-orange-400 text-xs">Admin Panel</p>
          </div>
          <button className="ml-auto lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon, badge }) => {
            const active = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
                style={active ? { background: 'linear-gradient(135deg, rgba(240,124,30,0.25), rgba(240,124,30,0.1))', borderLeft: '3px solid #f07c1e' } : {}}
              >
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {badge && newLeads > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#f07c1e' }}>
                    {newLeads}
                  </span>
                )}
                {active && <ChevronRight size={14} className="text-orange-400" />}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">Admin</p>
              <p className="text-white/40 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 text-sm transition-all mb-1">
            <Home size={16} /> View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-all"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white shadow-sm flex-shrink-0" style={{ borderBottom: '1px solid #e8e8f0' }}>
          <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-bold text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {navItems.find(n => location.pathname === n.path || (n.path !== '/admin' && location.pathname.startsWith(n.path)))?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {newLeads > 0 && (
              <Link to="/admin/leads" className="relative">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center" style={{ background: '#f07c1e', fontSize: '10px' }}>
                  {newLeads}
                </span>
              </Link>
            )}
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
