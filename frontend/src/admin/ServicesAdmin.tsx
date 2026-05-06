import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader, Wrench, Star, ChevronUp, ChevronDown } from 'lucide-react';
import { apiUrl } from '../lib/api';
import ImageUpload from './ImageUpload';

interface Service {
  id?: number;
  title: string;
  slug: string;
  description: string;
  price_range: string;
  timeline: string;
  image_url: string;
  features: string[];
  popular: boolean;
  sort_order: number;
}

const EMPTY: Service = {
  title:'', slug:'', description:'', price_range:'', timeline:'',
  image_url:'', features:[], popular:false, sort_order:0,
};

const LIBRARY = [
  { path:'/images/project1.jpg',     label:'Project 1' },
  { path:'/images/project2.jpg',     label:'Project 2' },
  { path:'/images/kitchen.jpg',      label:'Kitchen' },
  { path:'/images/bedroom.jpg',      label:'Bedroom' },
  { path:'/images/wardrobe.jpg',     label:'Wardrobe' },
  { path:'/images/false-ceiling.jpg',label:'False Ceiling' },
  { path:'/images/commercial.jpg',   label:'Commercial' },
  { path:'/images/hero-living.jpg',  label:'Living Room' },
  { path:'/catalogs/Modern-Kitchen.jpg',         label:'Modern Kitchen' },
  { path:'/catalogs/Living-Room-Design.jpg',     label:'Living Room Design' },
  { path:'/catalogs/Wardrobe.jpg',                label:'Wardrobe' },
  { path:'/catalogs/Bedroom-Interior.jpg',        label:'Bedroom Interior' },
  { path:'/catalogs/False-Ceiling-Design.jpg',    label:'False Ceiling Design' },
];

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

export default function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Service>(EMPTY);
  const [editing, setEditing] = useState<number|null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number|null>(null);
  const [featureDraft, setFeatureDraft] = useState('');

  const fetch_ = async () => {
    setLoading(true);
    try {
      const r = await fetch(apiUrl('/api/services')).then(r=>r.json());
      setItems(Array.isArray(r) ? r : []);
    } catch(e){ console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const inp = (field: keyof Service, val: any) => setForm(f => ({ ...f, [field]: val }));

  const openAdd = () => {
    setForm({ ...EMPTY, sort_order: items.length + 1 });
    setEditing(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (s: Service) => {
    setForm({ ...s, features: s.features || [] });
    setEditing(s.id!);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => { setShowForm(false); setForm(EMPTY); setEditing(null); setFeatureDraft(''); };

  const addFeature = () => {
    const v = featureDraft.trim();
    if (!v) return;
    inp('features', [...form.features, v]);
    setFeatureDraft('');
  };
  const removeFeature = (i: number) => inp('features', form.features.filter((_,idx)=>idx!==i));
  const moveFeature = (i: number, dir: -1|1) => {
    const next = [...form.features];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    inp('features', next);
  };

  const save = async () => {
    if (!form.title.trim()) return alert('Title is required');
    if (!form.slug.trim())  return alert('Slug is required');
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, id: editing } : form;
      const r = await fetch(apiUrl('/api/services'), {
        method,
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body),
      });
      if (!r.ok) {
        const err = await r.json().catch(()=>({}));
        throw new Error(err.detail || err.error || `Save failed (${r.status})`);
      }
      await fetch_();
      closeForm();
    } catch(e:any){ console.error(e); alert(e.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await fetch(apiUrl('/api/services'), {
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({id}),
      });
      await fetch_();
    } catch(e){ console.error(e); }
    finally { setDeleting(null); }
  };

  const togglePopular = async (s: Service) => {
    try {
      await fetch(apiUrl('/api/services'), {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ id: s.id, popular: !s.popular }),
      });
      setItems(prev => prev.map(i => i.id === s.id ? { ...i, popular: !i.popular } : i));
    } catch(e){ console.error(e); }
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="services-admin">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Services</h2>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} service{items.length===1?'':'s'} listed</p>
        </div>
        <button
          onClick={openAdd}
          data-testid="add-service-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)', boxShadow:'0 4px 15px rgba(240,124,30,0.3)' }}
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm" style={{ border: '2px solid rgba(240,124,30,0.3)' }} data-testid="service-form">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {editing ? '✏️ Edit Service' : '➕ Add New Service'}
            </h3>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Service Title *</label>
              <input
                value={form.title}
                onChange={e => { inp('title', e.target.value); if (!editing) inp('slug', slugify(e.target.value)); }}
                placeholder="e.g. Modular Kitchen"
                data-testid="service-title-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Slug * (auto-generated)</label>
              <input
                value={form.slug}
                onChange={e => inp('slug', slugify(e.target.value))}
                placeholder="modular-kitchen"
                data-testid="service-slug-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 font-mono"
              />
            </div>

            {/* Price range */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Price Range</label>
              <input
                value={form.price_range}
                onChange={e => inp('price_range', e.target.value)}
                placeholder="₹800 – ₹2,200 per sq ft"
                data-testid="service-price-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Timeline</label>
              <input
                value={form.timeline}
                onChange={e => inp('timeline', e.target.value)}
                placeholder="45 – 90 days"
                data-testid="service-timeline-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Sort order */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Sort Order (1 = first)</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={e => inp('sort_order', Number(e.target.value))}
                data-testid="service-sort-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Popular toggle */}
            <div className="flex items-center gap-3 pt-6">
              <div
                onClick={() => inp('popular', !form.popular)}
                data-testid="service-popular-toggle"
                className="relative w-12 h-6 rounded-full cursor-pointer transition-all"
                style={{ background: form.popular ? 'linear-gradient(135deg,#f07c1e,#d4640a)' : '#d1d5db' }}
              >
                <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                  style={{ left: form.popular ? '26px' : '2px' }} />
              </div>
              <label className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-1.5"
                onClick={() => inp('popular', !form.popular)}>
                <Star size={14} className={form.popular ? 'text-orange-500 fill-orange-500' : 'text-gray-400'} />
                Mark as Popular
              </label>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={e => inp('description', e.target.value)}
                rows={3}
                placeholder="Briefly describe this service..."
                data-testid="service-description-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none"
              />
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <ImageUpload
                value={form.image_url}
                onChange={url => inp('image_url', url)}
                folder="services"
                label="Service Cover Image"
                library={LIBRARY}
              />
            </div>

            {/* Features list */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-1">
                Features / What's included ({form.features.length})
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  value={featureDraft}
                  onChange={e => setFeatureDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                  placeholder="Add a feature and press Enter…"
                  data-testid="service-feature-input"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  data-testid="service-feature-add"
                  className="px-4 rounded-xl text-white font-semibold text-sm flex items-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              {form.features.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No features added yet.</p>
              ) : (
                <ul className="space-y-1.5" data-testid="service-features-list">
                  {form.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background:'#fafafa', border:'1px solid #efeff3' }}>
                      <span className="text-xs text-gray-400 w-5 text-right">{i+1}.</span>
                      <span className="flex-1 text-sm text-gray-700">{f}</span>
                      <button type="button" onClick={() => moveFeature(i, -1)} disabled={i===0}
                        className="text-gray-400 hover:text-gray-700 disabled:opacity-30" title="Move up">
                        <ChevronUp size={14} />
                      </button>
                      <button type="button" onClick={() => moveFeature(i, 1)} disabled={i===form.features.length-1}
                        className="text-gray-400 hover:text-gray-700 disabled:opacity-30" title="Move down">
                        <ChevronDown size={14} />
                      </button>
                      <button type="button" onClick={() => removeFeature(i)}
                        className="text-red-400 hover:text-red-600" title="Remove">
                        <X size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
            <button onClick={save} disabled={saving}
              data-testid="service-save-btn"
              className="flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)', boxShadow: '0 4px 15px rgba(240,124,30,0.3)' }}>
              {saving ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving...' : editing ? 'Update Service' : 'Add Service'}
            </button>
            <button onClick={closeForm}
              className="px-6 py-3 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <Loader size={32} className="animate-spin text-orange-500 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading services…</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <Wrench size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No services yet.</p>
          <p className="text-gray-300 text-sm mt-1">Click "Add Service" to create your first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" data-testid="services-grid">
          {items.map(s => (
            <div key={s.id} className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}
              data-testid={`service-card-${s.id}`}>
              {/* Image */}
              <div className="relative h-40 bg-gray-100 overflow-hidden">
                {s.image_url ? (
                  <img src={s.image_url} alt={s.title} className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/project1.jpg'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Wrench size={32} />
                  </div>
                )}
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'rgba(0,0,0,0.55)' }}>
                  #{s.sort_order}
                </div>
                {s.popular && (
                  <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full text-white flex items-center gap-1"
                    style={{ background:'rgba(240,124,30,0.95)' }}>
                    <Star size={11} className="fill-white" /> Popular
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{s.title}</h4>
                <p className="text-orange-500 text-xs font-mono mb-2">/{s.slug}</p>
                {s.description && <p className="text-gray-500 text-xs mb-2 line-clamp-2">{s.description}</p>}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="px-2 py-1.5 rounded-lg" style={{ background:'#faf5ef' }}>
                    <p className="text-gray-400">Price</p>
                    <p className="font-semibold text-gray-700 truncate">{s.price_range || '—'}</p>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg" style={{ background:'#faf5ef' }}>
                    <p className="text-gray-400">Timeline</p>
                    <p className="font-semibold text-gray-700 truncate">{s.timeline || '—'}</p>
                  </div>
                </div>
                {s.features && s.features.length > 0 && (
                  <p className="text-gray-400 text-xs mb-3">{s.features.length} feature{s.features.length===1?'':'s'} listed</p>
                )}

                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)}
                    data-testid={`service-edit-${s.id}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:-translate-y-0.5 flex-1 justify-center"
                    style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => togglePopular(s)}
                    data-testid={`service-popular-${s.id}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
                    style={{
                      background: s.popular ? 'rgba(240,124,30,0.1)' : 'rgba(0,0,0,0.04)',
                      color: s.popular ? '#dc6c0a' : '#666',
                      border: `1px solid ${s.popular ? 'rgba(240,124,30,0.3)' : 'rgba(0,0,0,0.08)'}`,
                    }}
                    title={s.popular ? 'Unmark popular' : 'Mark as popular'}>
                    <Star size={12} className={s.popular ? 'fill-orange-500' : ''} />
                  </button>
                  <button onClick={() => del(s.id!)} disabled={deleting===s.id}
                    data-testid={`service-delete-${s.id}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                    title="Delete">
                    {deleting===s.id ? <Loader size={12} className="animate-spin" /> : <Trash2 size={12} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
