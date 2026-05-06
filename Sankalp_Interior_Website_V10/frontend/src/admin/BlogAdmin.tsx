import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader } from 'lucide-react';
import { apiUrl } from '../lib/api';
import ImageUpload from './ImageUpload';
import RichTextEditor from './RichTextEditor';

interface Post {
  id?: number; title: string; slug: string; excerpt: string;
  content: string; image_url: string; author: string;
  category: string; read_time: string; published_at: string;
}

const EMPTY: Post = { title:'', slug:'', excerpt:'', content:'', image_url:'', author:'Sankalp Design Team', category:'Design Tips', read_time:'5 min read', published_at: new Date().toISOString().slice(0,10) };
const CATEGORIES = ['Cost Guide','Design Ideas','Design Tips','Trends','Before & After'];
const LIBRARY = [
  { path:'/images/project1.jpg',     label:'Project 1' },
  { path:'/images/project2.jpg',     label:'Project 2' },
  { path:'/images/kitchen.jpg',      label:'Kitchen' },
  { path:'/images/bedroom.jpg',      label:'Bedroom' },
  { path:'/images/hero-living.jpg',  label:'Living Room' },
  { path:'/images/false-ceiling.jpg',label:'False Ceiling' },
];

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Post>(EMPTY);
  const [editing, setEditing] = useState<number|null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number|null>(null);

  const fetch_ = async () => {
    setLoading(true);
    try { setPosts(await fetch(apiUrl('/api/blog')).then(r=>r.json())); }
    catch(e){ console.error(e); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

  const save = async () => {
    if (!form.title || !form.slug) return alert('Title and slug are required');
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, id: editing } : form;
      await fetch(apiUrl('/api/blog'), { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
      await fetch_();
      setShowForm(false); setForm(EMPTY); setEditing(null);
    } catch(e){ console.error(e); alert('Save failed'); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    setDeleting(id);
    try {
      await fetch(apiUrl('/api/blog'), { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({id}) });
      await fetch_();
    } catch(e){ console.error(e); } finally { setDeleting(null); }
  };

  const edit = (p: Post) => { setForm({...p, published_at: p.published_at?.slice(0,10)||new Date().toISOString().slice(0,10)}); setEditing(p.id!); setShowForm(true); window.scrollTo({top:0,behavior:'smooth'}); };
  const inp = (field: keyof Post, val: string) => setForm(f=>({...f,[field]:val}));

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="blog-admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Blog Posts</h2>
          <p className="text-gray-400 text-sm mt-0.5">{posts.length} published posts</p>
        </div>
        <button onClick={()=>{ setForm(EMPTY); setEditing(null); setShowForm(true); }}
          data-testid="add-post-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm" style={{ border: '2px solid rgba(240,124,30,0.3)' }} data-testid="blog-form">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>{editing ? 'Edit Post' : 'New Blog Post'}</h3>
            <button onClick={()=>{ setShowForm(false); setForm(EMPTY); setEditing(null); }}><X size={20} className="text-gray-400" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-1">Post Title *</label>
              <input value={form.title} onChange={e=>{ inp('title',e.target.value); if(!editing) inp('slug',slugify(e.target.value)); }}
                placeholder="e.g. Interior Design Cost in Kolkata 2025"
                data-testid="blog-title-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">URL Slug * (auto-generated)</label>
              <input value={form.slug} onChange={e=>inp('slug',slugify(e.target.value))}
                placeholder="interior-design-cost-kolkata-2025"
                data-testid="blog-slug-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Category</label>
              <select value={form.category} onChange={e=>inp('category',e.target.value)}
                data-testid="blog-category-select"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 bg-white">
                {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Author</label>
              <input value={form.author} onChange={e=>inp('author',e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Read Time</label>
              <input value={form.read_time} onChange={e=>inp('read_time',e.target.value)} placeholder="5 min read"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Publish Date</label>
              <input type="date" value={form.published_at} onChange={e=>inp('published_at',e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" />
            </div>

            {/* Cover image uploader */}
            <div className="md:col-span-2">
              <ImageUpload
                value={form.image_url}
                onChange={url => inp('image_url', url)}
                folder="blog"
                label="Cover Image"
                library={LIBRARY}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-1">Excerpt (short summary)</label>
              <textarea value={form.excerpt} onChange={e=>inp('excerpt',e.target.value)} rows={2} placeholder="Short description shown in blog listing..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-1">Content</label>
              <RichTextEditor
                value={form.content}
                onChange={html => inp('content', html)}
                placeholder="Write your full blog post here. Use the toolbar for headings, lists, links, images, and more…"
                uploadFolder="blog"
              />
              <p className="text-xs text-gray-400 mt-1">
                Tip: Use the image button in the toolbar to upload pictures inline. They go straight to your Supabase storage.
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} disabled={saving}
              data-testid="blog-save-btn"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
              {saving ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving...' : (editing ? 'Update Post' : 'Publish Post')}
            </button>
            <button onClick={()=>{ setShowForm(false); setForm(EMPTY); setEditing(null); }}
              className="px-6 py-3 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl p-16 text-center"><Loader size={32} className="animate-spin text-orange-500 mx-auto" /></div>
      ) : (
        <div className="space-y-3" data-testid="blog-list">
          {posts.map(p=>(
            <div key={p.id} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4" style={{ border: '1px solid rgba(0,0,0,0.05)' }} data-testid={`blog-item-${p.id}`}>
              {p.image_url && <img src={p.image_url} alt={p.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{p.title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{p.category} · {p.read_time} · {p.published_at?.slice(0,10)}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={()=>edit(p)}
                      data-testid={`blog-edit-${p.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                      style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
                      <Pencil size={11} /> Edit
                    </button>
                    <button onClick={()=>del(p.id!)} disabled={deleting===p.id}
                      data-testid={`blog-delete-${p.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50 disabled:opacity-50">
                      {deleting===p.id ? <Loader size={11} className="animate-spin" /> : <Trash2 size={11} />} Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{p.excerpt}</p>
                <p className="text-orange-400 text-xs mt-1 font-mono">/blog/{p.slug}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
