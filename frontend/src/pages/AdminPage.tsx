import { useState, useEffect } from 'react';
import {
  Users, Phone, Mail, MapPin, IndianRupee, Home, Clock,
  RefreshCw, Download, Search, Filter, CheckCircle, XCircle,
  MessageCircle, TrendingUp, Star, Eye
} from 'lucide-react';
import { apiUrl } from '../lib/api';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  budget: string;
  property_type: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  new:        { bg: 'rgba(59,130,246,0.1)',  text: '#2563eb', label: '🔵 New'        },
  contacted:  { bg: 'rgba(245,158,11,0.1)',  text: '#d97706', label: '🟡 Contacted'  },
  converted:  { bg: 'rgba(34,197,94,0.1)',   text: '#16a34a', label: '🟢 Converted'  },
  closed:     { bg: 'rgba(239,68,68,0.1)',   text: '#dc2626', label: '🔴 Closed'     },
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/leads'));
      const data = await res.json();
      setLeads(data);
      setLastRefresh(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(apiUrl('/api/leads'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Location', 'Budget', 'Property', 'Source', 'Status', 'Date'];
    const rows = filteredLeads.map((l) => [
      l.id, l.name, l.phone, l.email || '-', l.location || '-',
      l.budget || '-', l.property_type || '-', l.source, l.status,
      new Date(l.created_at).toLocaleString('en-IN'),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `sankalp-leads-${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const filtered = leads
    .filter((l) => filterStatus === 'all' || l.status === filterStatus)
    .filter((l) => filterSource === 'all' || l.source.includes(filterSource))
    .filter((l) => {
      if (!search) return true;
      const s = search.toLowerCase();
      return (
        l.name?.toLowerCase().includes(s) ||
        l.phone?.includes(s) ||
        l.email?.toLowerCase().includes(s) ||
        l.location?.toLowerCase().includes(s)
      );
    });

  const filteredLeads = filtered;

  const stats = {
    total:     leads.length,
    new:       leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    converted: leads.filter((l) => l.status === 'converted').length,
  };

  const sources = [...new Set(leads.map((l) => l.source))];

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen pt-20" style={{ background: '#f5f5f7', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f2044, #1a3a6b)' }} className="px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              📋 Lead Dashboard
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Sankalp Interior Solution — All enquiries in one place
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:bg-white/20"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #f07c1e, #d4640a)' }}
            >
              <Download size={15} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads',  value: stats.total,     icon: Users,       color: '#0f2044' },
            { label: 'New',          value: stats.new,        icon: Star,        color: '#2563eb' },
            { label: 'Contacted',    value: stats.contacted,  icon: Phone,       color: '#d97706' },
            { label: 'Converted',    value: stats.converted,  icon: CheckCircle, color: '#16a34a' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">{label}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
              </div>
              <div className="text-3xl font-black" style={{ color, fontFamily: 'Montserrat, sans-serif' }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm flex flex-col md:flex-row gap-4" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, email, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none focus:border-orange-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none focus:border-orange-400 bg-white"
          >
            <option value="all">All Status</option>
            <option value="new">🔵 New</option>
            <option value="contacted">🟡 Contacted</option>
            <option value="converted">🟢 Converted</option>
            <option value="closed">🔴 Closed</option>
          </select>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none focus:border-orange-400 bg-white"
          >
            <option value="all">All Sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="text-gray-400 text-sm self-center whitespace-nowrap">
            {filteredLeads.length} of {leads.length} leads
          </span>
        </div>

        {/* Last refresh */}
        <p className="text-gray-400 text-xs mb-4">
          Last updated: {lastRefresh.toLocaleTimeString('en-IN')}
        </p>

        {/* Leads Table */}
        {loading ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <RefreshCw size={32} className="animate-spin text-orange-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <Users size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No leads found</p>
            <p className="text-gray-300 text-sm mt-1">Try changing your filters or share your website to get leads</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-2xl p-5 shadow-sm transition-all hover:shadow-md cursor-pointer"
                style={{ border: '1px solid rgba(0,0,0,0.06)' }}
                onClick={() => setSelected(lead)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #0f2044, #1a3a6b)' }}
                    >
                      {lead.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {lead.name}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        #{lead.id} · {formatDate(lead.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex flex-wrap gap-3 flex-1">
                    <a
                      href={`tel:${lead.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-sm font-medium hover:text-orange-500 transition-colors"
                      style={{ color: '#0f2044' }}
                    >
                      <Phone size={13} className="text-orange-500" />
                      {lead.phone}
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors truncate"
                      >
                        <Mail size={13} className="text-orange-500 flex-shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </a>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {lead.location && (
                      <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                        <MapPin size={11} className="text-orange-400" />{lead.location}
                      </span>
                    )}
                    {lead.budget && (
                      <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                        <IndianRupee size={11} className="text-orange-400" />{lead.budget}
                      </span>
                    )}
                    {lead.property_type && (
                      <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                        <Home size={11} className="text-orange-400" />{lead.property_type}
                      </span>
                    )}
                  </div>

                  {/* Source + Status */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full capitalize">
                      {lead.source?.replace(/-/g, ' ')}
                    </span>
                    <select
                      value={lead.status || 'new'}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => { e.stopPropagation(); updateStatus(lead.id, e.target.value); }}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer"
                      style={{
                        background: STATUS_COLORS[lead.status]?.bg || STATUS_COLORS.new.bg,
                        color: STATUS_COLORS[lead.status]?.text || STATUS_COLORS.new.text,
                      }}
                    >
                      <option value="new">🔵 New</option>
                      <option value="contacted">🟡 Contacted</option>
                      <option value="converted">🟢 Converted</option>
                      <option value="closed">🔴 Closed</option>
                    </select>

                    {/* Quick WhatsApp */}
                    <a
                      href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}?text=Hi ${lead.name}, this is Sankalp Interior Solution. Thank you for your enquiry!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                      style={{ background: '#25D366' }}
                      title="WhatsApp"
                    >
                      <MessageCircle size={14} />
                    </a>
                  </div>
                </div>

                {/* Message preview */}
                {lead.message && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <p className="text-gray-400 text-xs italic">💬 "{lead.message}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4.8px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeInUp 0.3s ease' }}
          >
            {/* Modal Header */}
            <div style={{ background: 'linear-gradient(135deg, #0f2044, #1a3a6b)' }} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                    {selected.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selected.name}
                    </h3>
                    <p className="text-white/60 text-xs">Lead #{selected.id} · {formatDate(selected.created_at)}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white text-xl font-bold">✕</button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {[
                { icon: Phone,       label: 'Phone',         value: selected.phone,         href: `tel:${selected.phone}` },
                { icon: Mail,        label: 'Email',         value: selected.email,         href: `mailto:${selected.email}` },
                { icon: MapPin,      label: 'Location',      value: selected.location,      href: null },
                { icon: IndianRupee, label: 'Budget',        value: selected.budget,        href: null },
                { icon: Home,        label: 'Property Type', value: selected.property_type, href: null },
                { icon: TrendingUp,  label: 'Source',        value: selected.source,        href: null },
              ].filter((r) => r.value).map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(240,124,30,0.1)' }}>
                    <Icon size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs">{label}</p>
                    {href ? (
                      <a href={href} className="font-semibold text-gray-900 hover:text-orange-500 transition-colors text-sm">{value}</a>
                    ) : (
                      <p className="font-semibold text-gray-900 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {selected.message && (
                <div className="p-4 rounded-xl" style={{ background: '#faf8f4' }}>
                  <p className="text-gray-400 text-xs mb-1">Message</p>
                  <p className="text-gray-700 text-sm leading-relaxed">"{selected.message}"</p>
                </div>
              )}

              {/* Status Update */}
              <div>
                <p className="text-gray-400 text-xs mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(STATUS_COLORS).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(selected.id, key)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                      style={{
                        background: selected.status === key ? val.text : val.bg,
                        color: selected.status === key ? 'white' : val.text,
                        border: `1.5px solid ${val.text}`,
                      }}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex gap-3">
              <a
                href={`tel:${selected.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #0f2044, #1a3a6b)' }}
              >
                <Phone size={15} /> Call Now
              </a>
              <a
                href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g, '')}?text=Hi ${selected.name}, this is Sankalp Interior Solution. Thank you for your enquiry! We'd love to schedule a free consultation for you.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ background: '#25D366' }}
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              {selected.email && (
                <a
                  href={`mailto:${selected.email}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: 'rgba(240,124,30,0.1)', color: '#d4640a' }}
                >
                  <Mail size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
