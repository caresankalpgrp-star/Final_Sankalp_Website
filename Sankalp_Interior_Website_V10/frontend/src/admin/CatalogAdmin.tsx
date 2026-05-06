import { useState, useEffect, useRef } from 'react';
import {
  Plus, Pencil, Trash2, Save, X, Loader, Image as ImageIcon,
  ExternalLink, Eye, EyeOff, RefreshCw, AlertCircle
} from 'lucide-react';
import { apiUrl } from '../lib/api';
import ImageUpload from './ImageUpload';

interface Catalog {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  album_url: string;
  alt_text: string;
  category: string;
  sort_order: number;
  active: boolean;
}

const EMPTY: Catalog = {
  title: '', description: '', image_url: '', album_url: '',
  alt_text: '', category: 'Living Room', sort_order: 0, active: true,
};

const CATEGORIES = [
  'Living Room', 'Bedroom', 'Kitchen', 'Bathroom',
  'Ceiling', 'Flooring', 'Wall Design', 'Puja Room', 'Other',
];

// All available catalog images in /public/catalogs/
const CATALOG_IMAGES = [
  { path: '/catalogs/TV-Unit-Design.jpg',        label: 'TV Unit Design' },
  { path: '/catalogs/Wardrobe.jpg',               label: 'Wardrobe' },
  { path: '/catalogs/Bedroom-Interior.jpg',       label: 'Bedroom Interior' },
  { path: '/catalogs/Wall-Molding-Paneling.jpg',  label: 'Wall Moulding & Paneling' },
  { path: '/catalogs/False-Ceiling-Design.jpg',   label: 'False Ceiling Design' },
  { path: '/catalogs/Flooring.jpg',               label: 'Flooring' },
  { path: '/catalogs/Wall-Paint-Wallpaper.jpg',   label: 'Wall Paint & Wallpaper' },
  { path: '/catalogs/Washroom-Bathroom.jpg',      label: 'Washroom & Bathroom' },
  { path: '/catalogs/Living-Room-Design.jpg',     label: 'Living Room Design' },
  { path: '/catalogs/Puja-Room.jpg',              label: 'Puja Room' },
  { path: '/catalogs/Modern-Kitchen.jpg',         label: 'Modular Kitchen' },
  // Project images as fallback
  { path: '/images/project1.jpg',   label: 'Project 1' },
  { path: '/images/project2.jpg',   label: 'Project 2' },
  { path: '/images/kitchen.jpg',    label: 'Kitchen' },
  { path: '/images/bedroom.jpg',    label: 'Bedroom' },
  { path: '/images/wardrobe.jpg',   label: 'Wardrobe' },
  { path: '/images/commercial.jpg', label: 'Commercial' },
  { path: '/images/hero-living.jpg', label: 'Living Room' },
];

export default function CatalogAdmin() {
  const [items, setItems]     = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState<Catalog>(EMPTY);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [toggling, setToggling] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const data = await fetch(apiUrl('/api/catalogs?all=true')).then(r => r.json());
      setItems(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const inp = (field: keyof Catalog, val: any) => setForm(f => ({ ...f, [field]: val }));

  const openAdd = () => {
    setForm(EMPTY); setEditing(null); setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const openEdit = (item: Catalog) => {
    setForm({ ...item }); setEditing(item.id!); setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const closeForm = () => { setShowForm(false); setForm(EMPTY); setEditing(null); };

  const save = async () => {
    if (!form.title.trim())     return alert('Title is required');
    if (!form.image_url.trim()) return alert('Cover image is required');
    if (!form.album_url.trim()) return alert('Google Photos album URL is required');
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const body   = editing ? { ...form, id: editing } : form;
      await fetch(apiUrl('/api/catalogs'), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await fetch_();
      closeForm();
    } catch (e) { console.error(e); alert('Save failed. Please try again.'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this catalog entry? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await fetch(apiUrl('/api/catalogs'), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      await fetch_();
    } catch (e) { console.error(e); }
    finally { setDeleting(null); }
  };

  const toggleActive = async (item: Catalog) => {
    setToggling(item.id!);
    try {
      await fetch(apiUrl('/api/catalogs'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, active: !item.active }),
      });
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, active: !i.active } : i));
    } catch (e) { console.error(e); }
    finally { setToggling(null); }
  };

  const filteredImages = CATALOG_IMAGES; // kept reference (now passed to <ImageUpload library/>)

  const activeCount   = items.filter(i => i.active).length;
  const inactiveCount = items.filter(i => !i.active).length;

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Design Catalog</h2>
          <p className="text-gray-400 text-sm mt-0.5">
            {activeCount} active · {inactiveCount} hidden · {items.length} total
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetch_} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-all">
            <RefreshCw size={14} className={loading ? 'animate-spin text-orange-500' : 'text-gray-400'} />
            Refresh
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)', boxShadow: '0 4px 15px rgba(240,124,30,0.3)' }}
          >
            <Plus size={16} /> Add Catalog
          </button>
        </div>
      </div>

      {/* ── ADD / EDIT FORM ─────────────────────────────────── */}
      {showForm && (
        <div
          ref={formRef}
          className="rounded-2xl p-6 mb-6 shadow-sm"
          style={{ border: '2px solid rgba(240,124,30,0.35)', background: '#fffdf9' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {editing ? '✏️ Edit Catalog Entry' : '➕ Add New Catalog Entry'}
            </h3>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Title */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Catalog Title *</label>
              <input
                value={form.title}
                onChange={e => inp('title', e.target.value)}
                placeholder="e.g. Modular Kitchen Design"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={e => inp('description', e.target.value)}
                rows={2}
                placeholder="Short description shown on hover..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none"
              />
            </div>

            {/* ── Cover Image (uploader + library + custom URL) ── */}
            <div className="md:col-span-2">
              <ImageUpload
                value={form.image_url}
                onChange={url => inp('image_url', url)}
                folder="catalogs"
                label="Cover Image *"
                library={CATALOG_IMAGES}
                required
              />
            </div>

            {/* Album URL */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                Google Photos Album URL *
              </label>
              <div className="relative">
                <input
                  value={form.album_url}
                  onChange={e => inp('album_url', e.target.value)}
                  placeholder="https://photos.app.goo.gl/..."
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
                />
                {form.album_url && (
                  <a
                    href={form.album_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600"
                    title="Test link"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              <p className="text-gray-400 text-xs mt-1">Paste your Google Photos shared album link here.</p>
            </div>

            {/* Alt Text */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">SEO Alt Text</label>
              <input
                value={form.alt_text}
                onChange={e => inp('alt_text', e.target.value)}
                placeholder="e.g. Modular kitchen design Kolkata"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => inp('category', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 bg-white"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Sort Order (1 = first)</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={e => inp('sort_order', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-3 py-2">
              <div
                onClick={() => inp('active', !form.active)}
                className="relative w-12 h-6 rounded-full cursor-pointer transition-all"
                style={{ background: form.active ? 'linear-gradient(135deg,#f07c1e,#d4640a)' : '#d1d5db' }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                  style={{ left: form.active ? '26px' : '2px' }}
                />
              </div>
              <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => inp('active', !form.active)}>
                {form.active ? '✅ Visible on website' : '🚫 Hidden from website'}
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)', boxShadow: '0 4px 15px rgba(240,124,30,0.3)' }}
            >
              {saving ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving...' : editing ? 'Update Catalog' : 'Add to Catalog'}
            </button>
            <button
              onClick={closeForm}
              className="px-6 py-3 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── CATALOG LIST ────────────────────────────────────── */}
      {loading ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <Loader size={32} className="animate-spin text-orange-500 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading catalogs...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <ImageIcon size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No catalog entries yet.</p>
          <p className="text-gray-300 text-sm mt-1">Click "Add Catalog" to create your first entry.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md"
              style={{
                border: item.active ? '1px solid rgba(0,0,0,0.06)' : '1px dashed rgba(0,0,0,0.12)',
                opacity: item.active ? 1 : 0.65,
              }}
            >
              {/* Image preview */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={item.image_url}
                  alt={item.alt_text || item.title}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/project1.jpg'; }}
                />
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(240,124,30,0.9)', color: 'white' }}
                  >
                    {item.category}
                  </span>
                  {!item.active && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-white">
                      Hidden
                    </span>
                  )}
                </div>
                {/* Sort order badge */}
                <div
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'rgba(0,0,0,0.55)' }}
                >
                  #{item.sort_order}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-gray-500 text-xs mb-2 line-clamp-2">{item.description}</p>
                )}

                {/* Album URL preview */}
                <div className="flex items-center gap-1.5 mb-3">
                  <ExternalLink size={12} className="text-orange-400 flex-shrink-0" />
                  <a
                    href={item.album_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 text-xs hover:underline truncate"
                  >
                    {item.album_url}
                  </a>
                </div>

                {/* Image path */}
                <div className="flex items-center gap-1.5 mb-4">
                  <ImageIcon size={12} className="text-gray-300 flex-shrink-0" />
                  <span className="text-gray-400 text-xs truncate">{item.image_url}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:-translate-y-0.5 flex-1 justify-center"
                    style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}
                  >
                    <Pencil size={12} /> Edit
                  </button>

                  <button
                    onClick={() => toggleActive(item)}
                    disabled={toggling === item.id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-50"
                    style={{
                      background: item.active ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
                      color: item.active ? '#dc2626' : '#16a34a',
                      border: `1px solid ${item.active ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`,
                    }}
                    title={item.active ? 'Hide from website' : 'Show on website'}
                  >
                    {toggling === item.id
                      ? <Loader size={12} className="animate-spin" />
                      : item.active ? <EyeOff size={12} /> : <Eye size={12} />
                    }
                    {item.active ? 'Hide' : 'Show'}
                  </button>

                  <button
                    onClick={() => del(item.id!)}
                    disabled={deleting === item.id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                    title="Delete permanently"
                  >
                    {deleting === item.id ? <Loader size={12} className="animate-spin" /> : <Trash2 size={12} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 p-5 rounded-2xl" style={{ background: 'rgba(240,124,30,0.05)', border: '1px solid rgba(240,124,30,0.15)' }}>
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-800 text-sm mb-1">How to manage catalogs</p>
            <ul className="text-gray-500 text-xs space-y-1">
              <li>• <strong>Cover Image:</strong> Use the image picker to select from your /catalogs/ folder or enter a custom path</li>
              <li>• <strong>Album URL:</strong> Paste your Google Photos shared album link (photos.app.goo.gl/...)</li>
              <li>• <strong>Sort Order:</strong> Lower numbers appear first on the catalog page</li>
              <li>• <strong>Hide/Show:</strong> Toggle visibility without deleting — useful for seasonal catalogs</li>
              <li>• <strong>New images:</strong> Upload images to your /public/catalogs/ folder then use the custom URL field</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
