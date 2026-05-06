import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader, FolderOpen } from 'lucide-react';
import { apiUrl } from '../lib/api';
import ImageUpload from './ImageUpload';

interface Project {
  id?: number; title: string; category: string; location: string;
  budget: string; duration: string; area: string; description: string;
  image_url: string; featured: boolean; sort_order: number;
}

const EMPTY: Project = { title:'', category:'full-home', location:'', budget:'', duration:'', area:'', description:'', image_url:'', featured:false, sort_order:0 };
const CATEGORIES = ['full-home','kitchen','bedroom','living-room','commercial'];
const LIBRARY = [
  { path:'/images/project1.jpg',     label:'Project 1' },
  { path:'/images/project2.jpg',     label:'Project 2' },
  { path:'/images/kitchen.jpg',      label:'Kitchen' },
  { path:'/images/bedroom.jpg',      label:'Bedroom' },
  { path:'/images/wardrobe.jpg',     label:'Wardrobe' },
  { path:'/images/false-ceiling.jpg',label:'False Ceiling' },
  { path:'/images/commercial.jpg',   label:'Commercial' },
  { path:'/images/hero-living.jpg',  label:'Living Room' },
];

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Project>(EMPTY);
  const [editing, setEditing] = useState<number|null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number|null>(null);

  const fetch_ = async () => {
    setLoading(true);
    try { setProjects(await fetch(apiUrl('/api/projects')).then(r=>r.json())); }
    catch(e){ console.error(e); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    if (!form.title || !form.category) return alert('Title and category are required');
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, id: editing } : form;
      await fetch(apiUrl('/api/projects'), { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
      await fetch_();
      setShowForm(false); setForm(EMPTY); setEditing(null);
    } catch(e){ console.error(e); alert('Save failed'); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    setDeleting(id);
    try {
      await fetch(apiUrl('/api/projects'), { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({id}) });
      await fetch_();
    } catch(e){ console.error(e); } finally { setDeleting(null); }
  };

  const edit = (p: Project) => { setForm({...p}); setEditing(p.id!); setShowForm(true); window.scrollTo({top:0,behavior:'smooth'}); };
  const inp = (field: keyof Project, val: any) => setForm(f=>({...f,[field]:val}));

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="projects-admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Projects Portfolio</h2>
          <p className="text-gray-400 text-sm mt-0.5">{projects.length} projects in portfolio</p>
        </div>
        <button onClick={()=>{ setForm(EMPTY); setEditing(null); setShowForm(true); }}
          data-testid="add-project-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm" style={{ border: '2px solid rgba(240,124,30,0.3)' }} data-testid="project-form">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>{editing ? 'Edit Project' : 'Add New Project'}</h3>
            <button onClick={()=>{ setShowForm(false); setForm(EMPTY); setEditing(null); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {([
              ['title','Project Title *','text'],['location','Location (e.g. Salt Lake, Kolkata)','text'],
              ['budget','Budget (e.g. 4.8L)','text'],['duration','Duration (e.g. 52 days)','text'],
              ['area','Area (e.g. 650 sq ft)','text'],['sort_order','Sort Order (1=first)','number'],
            ] as [keyof Project, string, string][]).map(([field,placeholder,type])=>(
              <div key={field}>
                <label className="text-xs font-medium text-gray-500 block mb-1 capitalize">{placeholder}</label>
                <input
                  type={type}
                  value={form[field] as string | number}
                  onChange={e=>inp(field, type==='number'?Number(e.target.value):e.target.value)}
                  placeholder={placeholder}
                  data-testid={`project-${field}-input`}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Category *</label>
              <select value={form.category} onChange={e=>inp('category',e.target.value)}
                data-testid="project-category-select"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 bg-white">
                {CATEGORIES.map(c=><option key={c} value={c}>{c.replace('-',' ')}</option>)}
              </select>
            </div>

            {/* Image uploader spans 2 cols */}
            <div className="md:col-span-2">
              <ImageUpload
                value={form.image_url}
                onChange={url => inp('image_url', url)}
                folder="projects"
                label="Project Cover Image"
                library={LIBRARY}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-1">Description</label>
              <textarea value={form.description} onChange={e=>inp('description',e.target.value)} rows={3} placeholder="Describe this project..."
                data-testid="project-description-input"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e=>inp('featured',e.target.checked)} className="w-4 h-4 accent-orange-500" data-testid="project-featured-checkbox" />
              <label htmlFor="featured" className="text-sm text-gray-700">Mark as Featured Project</label>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} disabled={saving}
              data-testid="project-save-btn"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}>
              {saving ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving...' : (editing ? 'Update Project' : 'Add Project')}
            </button>
            <button onClick={()=>{ setShowForm(false); setForm(EMPTY); setEditing(null); }}
              className="px-6 py-3 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl p-16 text-center"><Loader size={32} className="animate-spin text-orange-500 mx-auto" /></div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center">
          <FolderOpen size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="projects-grid">
          {projects.map(p=>(
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }} data-testid={`project-card-${p.id}`}>
              {p.image_url && <div className="relative h-44 overflow-hidden">
                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                {p.featured && <span className="absolute top-2 left-2 text-xs text-white px-2 py-1 rounded-full" style={{ background: 'rgba(240,124,30,0.9)' }}>⭐ Featured</span>}
              </div>}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{p.title}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 flex-shrink-0 capitalize">{p.category.replace('-',' ')}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1">{p.location} · {p.budget} · {p.duration}</p>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{p.description}</p>
                <div className="flex gap-2">
                  <button onClick={()=>edit(p)}
                    data-testid={`project-edit-${p.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={()=>del(p.id!)} disabled={deleting===p.id}
                    data-testid={`project-delete-${p.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-all disabled:opacity-50">
                    {deleting===p.id ? <Loader size={12} className="animate-spin" /> : <Trash2 size={12} />} Delete
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
