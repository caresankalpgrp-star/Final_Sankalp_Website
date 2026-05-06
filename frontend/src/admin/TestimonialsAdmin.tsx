import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader, Star, Upload, User, Camera } from 'lucide-react';
import { apiUrl } from '../lib/api';

interface Testimonial {
  id?: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  project: string;
  avatar_url: string;
  sort_order: number;
}

const EMPTY: Testimonial = {
  name: '', location: '', text: '', rating: 5,
  project: '', avatar_url: '', sort_order: 0,
};

function Avatar({ t, size = 48 }: { t: Testimonial; size?: number }) {
  const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
  const colors = ['#0f2044','#f07c1e','#1a3a6b','#c9a84c','#d4640a','#16a34a'];
  const color = colors[(t.id || 0) % colors.length];
  if (t.avatar_url) {
    return (
      <img src={t.avatar_url} alt={t.name}
        className="object-cover w-full h-full"
        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center text-white font-bold"
      style={{ background: `linear-gradient(135deg,${color},${color}99)`, fontSize: size * 0.35, fontFamily: 'Montserrat, sans-serif' }}>
      {initials}
    </div>
  );
}

export default function TestimonialsAdmin() {
  const [items, setItems]     = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState<Testimonial>(EMPTY);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── fetch ─────────────────────────────────────────── */
  const fetch_ = async () => {
    setLoading(true);
    try { setItems(await fetch(apiUrl('/api/testimonials')).then(r => r.json())); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  /* ── photo upload ───────────────────────────────────── */
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return alert('Photo must be under 5MB');

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = ev => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const base64 = await new Promise<string>((res, rej) => {
        const r2 = new FileReader();
        r2.onload  = () => res(r2.result as string);
        r2.onerror = rej;
        r2.readAsDataURL(file);
      });

      const resp = await fetch(apiUrl('/api/upload'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, fileName: file.name, folder: 'testimonials' }),
      });
      const data = await resp.json();
      if (data.url) {
        setForm(f => ({ ...f, avatar_url: data.url }));
        setUploadPreview(data.url);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  /* ── save ───────────────────────────────────────────── */
  const save = async () => {
    if (!form.name || !form.text) return alert('Name and review text are required');
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const body   = editing ? { ...form, id: editing } : form;
      const res = await fetch(apiUrl('/api/testimonials'), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetch_();
      closeForm();
    } catch (e: any) { console.error(e); alert('Save failed: ' + e.message); }
    finally { setSaving(false); }
  };

  /* ── delete ─────────────────────────────────────────── */
  const del = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    setDeleting(id);
    try {
      await fetch(apiUrl('/api/testimonials'), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      await fetch_();
    } catch (e) { console.error(e); }
    finally { setDeleting(null); }
  };

  const openEdit = (t: Testimonial) => {
    setForm({ ...t });
    setEditing(t.id!);
    setUploadPreview(t.avatar_url || '');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(EMPTY);
    setEditing(null);
    setUploadPreview('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const inp = (field: keyof Testimonial, val: any) =>
    setForm(f => ({ ...f, [field]: val }));

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Testimonials
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} client reviews</p>
        </div>
        <button
          onClick={() => { setForm(EMPTY); setEditing(null); setUploadPreview(''); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}
        >
          <Plus size={16} /> Add Review
        </button>
      </div>

      {/* ── FORM ── */}
      {showForm && (
        <div
          className="bg-white rounded-2xl p-6 mb-6 shadow-sm"
          style={{ border: '2px solid rgba(240,124,30,0.3)', animation: 'fadeInUp 0.3s ease' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {editing ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Photo Upload */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">
                Client Photo
              </label>
              <div className="flex items-center gap-5">
                {/* Preview circle */}
                <div
                  className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 relative"
                  style={{ border: '3px solid rgba(240,124,30,0.3)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                >
                  {uploading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <Loader size={24} className="animate-spin text-orange-500" />
                    </div>
                  ) : uploadPreview || form.avatar_url ? (
                    <img
                      src={uploadPreview || form.avatar_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                      <User size={28} className="text-gray-300" />
                      <span className="text-gray-300 text-xs mt-1">No photo</span>
                    </div>
                  )}
                  {/* Camera overlay */}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                  >
                    <Camera size={22} color="white" />
                  </button>
                </div>

                <div className="flex-1">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 border-dashed transition-all hover:border-orange-400 hover:bg-orange-50 disabled:opacity-60"
                    style={{ borderColor: 'rgba(240,124,30,0.35)', color: '#d4640a' }}
                  >
                    {uploading ? <Loader size={15} className="animate-spin" /> : <Upload size={15} />}
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                  </button>
                  <p className="text-gray-400 text-xs mt-2">JPG, PNG, WebP · Max 5MB</p>
                  {form.avatar_url && (
                    <button
                      type="button"
                      onClick={() => { inp('avatar_url', ''); setUploadPreview(''); }}
                      className="text-red-400 text-xs mt-1 hover:text-red-500 flex items-center gap-1"
                    >
                      <X size={11} /> Remove photo
                    </button>
                  )}
                  {/* Or paste URL */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-gray-300 text-xs">or</span>
                    <input
                      type="url"
                      value={form.avatar_url}
                      onChange={e => { inp('avatar_url', e.target.value); setUploadPreview(e.target.value); }}
                      placeholder="Paste image URL..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs outline-none focus:border-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Client Name *</label>
              <input
                value={form.name}
                onChange={e => inp('name', e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Location</label>
              <input
                value={form.location}
                onChange={e => inp('location', e.target.value)}
                placeholder="e.g. Salt Lake, Kolkata"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Project */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Project Info</label>
              <input
                value={form.project}
                onChange={e => inp('project', e.target.value)}
                placeholder="e.g. 2BHK Interior - ₹4.5L"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Sort Order (1 = first)</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={e => inp('sort_order', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {/* Rating */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => inp('rating', n)}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: n <= form.rating ? 'rgba(240,124,30,0.12)' : '#f5f5f7' }}
                  >
                    <Star
                      size={20}
                      fill={n <= form.rating ? '#f07c1e' : 'none'}
                      stroke={n <= form.rating ? '#f07c1e' : '#ccc'}
                    />
                  </button>
                ))}
                <span className="self-center text-sm text-gray-500 ml-2">{form.rating}/5 stars</span>
              </div>
            </div>

            {/* Review Text */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Review Text *</label>
              <textarea
                value={form.text}
                onChange={e => inp('text', e.target.value)}
                rows={4}
                placeholder="What did the client say about your work? Write in their words..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none"
              />
              <p className="text-gray-300 text-xs mt-1">{form.text.length} characters</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={save}
              disabled={saving || uploading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}
            >
              {saving ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving...' : editing ? 'Update Review' : 'Add Review'}
            </button>
            <button
              onClick={closeForm}
              className="px-6 py-3 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── LIST ── */}
      {loading ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <Loader size={32} className="animate-spin text-orange-500 mx-auto" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <Star size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No testimonials yet. Add your first client review!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-5 shadow-sm transition-all hover:shadow-md"
              style={{ border: '1px solid rgba(0,0,0,0.05)' }}
            >
              {/* Card header */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: '2px solid rgba(240,124,30,0.2)' }}
                >
                  <Avatar t={t} size={56} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {t.name}
                  </p>
                  <p className="text-gray-400 text-xs truncate">{t.location}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} size={11}
                        fill={n <= t.rating ? '#f5c518' : 'none'}
                        stroke={n <= t.rating ? '#f5c518' : '#ddd'}
                      />
                    ))}
                  </div>
                </div>
                {/* Actions */}
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEdit(t)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-white transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}
                  >
                    <Pencil size={11} /> Edit
                  </button>
                  <button
                    onClick={() => del(t.id!)}
                    disabled={deleting === t.id}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-red-500 border border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                  >
                    {deleting === t.id ? <Loader size={11} className="animate-spin" /> : <Trash2 size={11} />}
                  </button>
                </div>
              </div>

              {/* Review text */}
              <p className="text-gray-600 text-xs leading-relaxed italic line-clamp-3 mb-3">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                {t.project && (
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(240,124,30,0.1)', color: '#d4640a' }}
                  >
                    {t.project}
                  </span>
                )}
                <span className="text-gray-300 text-xs ml-auto">#{t.sort_order}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
