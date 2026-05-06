import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, IndianRupee, Home, RefreshCw, Download, Search, MessageCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { apiUrl } from '../lib/api';

interface Lead {
  id: number; name: string; phone: string; email: string;
  location: string; budget: string; property_type: string;
  message: string; source: string; status: string; created_at: string;
}

const STATUS = {
  new:       { bg: 'rgba(59,130,246,0.1)',  text: '#2563eb', label: '🔵 New' },
  contacted: { bg: 'rgba(245,158,11,0.1)',  text: '#d97706', label: '🟡 Contacted' },
  converted: { bg: 'rgba(34,197,94,0.1)',   text: '#16a34a', label: '🟢 Converted' },
  closed:    { bg: 'rgba(239,68,68,0.1)',   text: '#dc2626', label: '🔴 Closed' },
} as const;

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/leads'));
      setLeads(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(apiUrl('/api/leads'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const exportCSV = () => {
    const h = ['ID','Name','Phone','Email','Location','Budget','Property','Source','Status','Date'];
    const rows = filtered.map(l => [l.id,l.name,l.phone,l.email||'',l.location||'',l.budget||'',l.property_type||'',l.source,l.status,new Date(l.created_at).toLocaleString('en-IN')]);
    const csv = [h,...rows].map(r=>r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
    a.download = `leads-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const filtered = leads
    .filter(l => filterStatus === 'all' || l.status === filterStatus)
    .filter(l => !search || [l.name,l.phone,l.email,l.location].some(v => v?.toLowerCase().includes(search.toLowerCase())));

  const fmt = (d: string) => new Date(d).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });

  const statsBar = [
    { label: 'Total',     val: leads.length,                                      color: '#0f2044' },
    { label: 'New',       val: leads.filter(l=>l.status==='new').length,           color: '#2563eb' },
    { label: 'Contacted', val: leads.filter(l=>l.status==='contacted').length,     color: '#d97706' },
    { label: 'Converted', val: leads.filter(l=>l.status==='converted').length,     color: '#16a34a' },
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statsBar.map(({ label, val, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <p className="text-gray-400 text-sm mb-1">{label}</p>
            <p className="text-3xl font-black" style={{ color, fontFamily: 'Montserrat, sans-serif' }}>{val}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 mb-4 flex flex-col md:flex-row gap-3 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, phone, email..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none focus:border-orange-400" />
        </div>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none bg-white">
          <option value="all">All Status</option>
          {Object.entries(STATUS).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <button onClick={fetchLeads} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
          style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <RefreshCw size={32} className="animate-spin text-orange-500 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading leads...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <p className="text-gray-300 text-lg">No leads found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(lead => (
            <div key={lead.id} onClick={() => setSelected(lead)}
              className="bg-white rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
                    {lead.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'Montserrat, sans-serif' }}>{lead.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">#{lead.id} · {fmt(lead.created_at)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 flex-1">
                  <a href={`tel:${lead.phone}`} onClick={e=>e.stopPropagation()}
                    className="flex items-center gap-1.5 text-sm font-medium hover:text-orange-500 transition-colors" style={{ color: '#0f2044' }}>
                    <Phone size={13} className="text-orange-500" />{lead.phone}
                  </a>
                  {lead.email && <span className="flex items-center gap-1.5 text-sm text-gray-400 truncate">
                    <Mail size={13} className="text-orange-500 flex-shrink-0" />{lead.email}
                  </span>}
                </div>
                <div className="flex flex-wrap gap-2 flex-1">
                  {lead.location && <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full"><MapPin size={11} className="text-orange-400" />{lead.location}</span>}
                  {lead.budget && <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full"><IndianRupee size={11} className="text-orange-400" />{lead.budget}</span>}
                  {lead.property_type && <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full"><Home size={11} className="text-orange-400" />{lead.property_type}</span>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <select value={lead.status||'new'} onClick={e=>e.stopPropagation()}
                    onChange={e=>{ e.stopPropagation(); updateStatus(lead.id,e.target.value); }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer"
                    style={{ background: STATUS[lead.status as keyof typeof STATUS]?.bg||STATUS.new.bg, color: STATUS[lead.status as keyof typeof STATUS]?.text||STATUS.new.text }}>
                    {Object.entries(STATUS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                  </select>
                  <a href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g,'')}`} target="_blank" rel="noopener noreferrer"
                    onClick={e=>e.stopPropagation()}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all"
                    style={{ background: '#25D366' }}>
                    <MessageCircle size={14} />
                  </a>
                </div>
              </div>
              {lead.message && <div className="mt-3 pt-3 border-t border-gray-50"><p className="text-gray-400 text-xs italic">💬 "{lead.message}"</p></div>}
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4.8px)' }}
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e=>e.stopPropagation()}
            style={{ animation: 'fadeInUp 0.3s ease' }}>
            <div style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                    {selected.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>{selected.name}</h3>
                    <p className="text-white/60 text-xs">Lead #{selected.id} · {fmt(selected.created_at)}</p>
                  </div>
                </div>
                <button onClick={()=>setSelected(null)} className="text-white/60 hover:text-white text-xl">✕</button>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {[
                { icon: Phone,       label: 'Phone',    value: selected.phone,         href: `tel:${selected.phone}` },
                { icon: Mail,        label: 'Email',    value: selected.email,         href: `mailto:${selected.email}` },
                { icon: MapPin,      label: 'Location', value: selected.location,      href: null },
                { icon: IndianRupee, label: 'Budget',   value: selected.budget,        href: null },
                { icon: Home,        label: 'Property', value: selected.property_type, href: null },
                { icon: TrendingUp,  label: 'Source',   value: selected.source,        href: null },
              ].filter(r=>r.value).map(({icon:Icon,label,value,href})=>(
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(240,124,30,0.1)' }}>
                    <Icon size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{label}</p>
                    {href ? <a href={href} className="font-semibold text-gray-900 hover:text-orange-500 text-sm">{value}</a>
                          : <p className="font-semibold text-gray-900 text-sm">{value}</p>}
                  </div>
                </div>
              ))}
              {selected.message && <div className="p-4 rounded-xl" style={{ background: '#faf8f4' }}>
                <p className="text-gray-400 text-xs mb-1">Message</p>
                <p className="text-gray-700 text-sm">"{selected.message}"</p>
              </div>}
              <div>
                <p className="text-gray-400 text-xs mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(STATUS).map(([key,val])=>(
                    <button key={key} onClick={()=>updateStatus(selected.id,key)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                      style={{ background: selected.status===key?val.text:val.bg, color: selected.status===key?'white':val.text, border: `1.5px solid ${val.text}` }}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <a href={`tel:${selected.phone}`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
                <Phone size={15} /> Call Now
              </a>
              <a href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g,'')}?text=Hi ${selected.name}, this is Sankalp Interior Solution!`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: '#25D366' }}>
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
