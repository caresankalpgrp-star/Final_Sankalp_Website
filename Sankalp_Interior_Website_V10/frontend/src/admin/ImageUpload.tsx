import { useRef, useState } from 'react';
import { Upload, Loader, Image as ImageIcon, X, Link as LinkIcon } from 'lucide-react';
import { apiUrl } from '../lib/api';

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  /** Optional preset gallery the admin can pick from */
  library?: { path: string; label: string }[];
  /** Allow entering a custom URL/path (defaults true) */
  allowCustomUrl?: boolean;
  required?: boolean;
}

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export default function ImageUpload({
  value, onChange, folder = 'uploads', label = 'Image',
  library = [], allowCustomUrl = true, required = false,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed (jpg, png, webp, gif).');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(`File too large. Max 5 MB. (Got ${(file.size/1024/1024).toFixed(2)} MB)`);
      return;
    }

    setUploading(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const r = await fetch(apiUrl('/api/upload'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, fileName: file.name, folder }),
      });
      const data = await r.json();
      if (!r.ok || !data?.url) throw new Error(data?.detail || data?.error || 'Upload failed');
      onChange(data.url);
    } catch (e: any) {
      console.error('Upload error', e);
      setError(e?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const filteredLibrary = library.filter(img =>
    img.label.toLowerCase().includes(librarySearch.toLowerCase()) ||
    img.path.toLowerCase().includes(librarySearch.toLowerCase())
  );

  return (
    <div data-testid="image-upload">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
        {label}{required && ' *'}
      </label>

      {/* Current preview */}
      {value ? (
        <div
          className="flex items-center gap-3 mb-3 p-3 rounded-xl"
          style={{ background: 'rgba(240,124,30,0.06)', border: '1px solid rgba(240,124,30,0.2)' }}
          data-testid="image-current-preview"
        >
          <img
            src={value}
            alt="preview"
            className="w-20 h-16 rounded-lg object-cover flex-shrink-0 bg-white"
            onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-gray-700 text-sm font-medium truncate" title={value}>{value}</p>
            <p className="text-gray-400 text-xs mt-0.5">Current image</p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-red-400 hover:text-red-600 flex-shrink-0 p-1"
            title="Remove"
            data-testid="image-remove-btn"
          >
            <X size={16} />
          </button>
        </div>
      ) : null}

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        className="rounded-xl px-4 py-6 cursor-pointer transition-all text-center"
        style={{
          border: dragOver ? '2px dashed #f07c1e' : '2px dashed #e2e2ea',
          background: dragOver ? 'rgba(240,124,30,0.05)' : '#fafafa',
        }}
        data-testid="image-dropzone"
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          data-testid="image-file-input"
        />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-orange-500">
            <Loader size={18} className="animate-spin" />
            <span className="text-sm font-medium">Uploading…</span>
          </div>
        ) : (
          <>
            <Upload size={22} className="mx-auto text-gray-400 mb-1.5" />
            <p className="text-sm font-medium text-gray-700">
              Click or drop an image here
            </p>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5 MB</p>
          </>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2 font-medium" data-testid="image-error">
          {error}
        </p>
      )}

      {/* Secondary actions */}
      {(library.length > 0 || allowCustomUrl) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {library.length > 0 && (
            <button
              type="button"
              onClick={() => setShowLibrary(o => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-gray-50"
              style={{ borderColor: showLibrary ? '#f07c1e' : '#e0e0e8', color: showLibrary ? '#f07c1e' : '#666' }}
              data-testid="image-library-toggle"
            >
              <ImageIcon size={13} />
              {showLibrary ? 'Hide library' : 'Pick from library'}
            </button>
          )}
        </div>
      )}

      {/* Library picker */}
      {showLibrary && library.length > 0 && (
        <div className="mt-3 p-3 rounded-xl border" style={{ borderColor: '#e8e8f0', background: '#fafafa' }}>
          <input
            value={librarySearch}
            onChange={e => setLibrarySearch(e.target.value)}
            placeholder="Search library…"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-orange-400 mb-2"
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-56 overflow-y-auto">
            {filteredLibrary.map(img => (
              <button
                type="button"
                key={img.path}
                onClick={() => { onChange(img.path); setShowLibrary(false); setLibrarySearch(''); }}
                className="relative rounded-lg overflow-hidden group"
                style={{
                  border: value === img.path ? '2.5px solid #f07c1e' : '2px solid transparent',
                  boxShadow: value === img.path ? '0 0 0 3px rgba(240,124,30,0.2)' : 'none',
                }}
                title={img.label}
              >
                <img
                  src={img.path}
                  alt={img.label}
                  className="w-full object-cover group-hover:scale-105 transition-transform"
                  style={{ aspectRatio: '4/3' }}
                />
                <div className="absolute bottom-0 left-0 right-0 px-1 py-0.5" style={{ background: 'rgba(0,0,0,0.6)' }}>
                  <p className="text-white truncate" style={{ fontSize: '9px' }}>{img.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom URL */}
      {allowCustomUrl && (
        <div className="mt-2 flex gap-2">
          <div className="relative flex-1">
            <LinkIcon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={customUrl}
              onChange={e => setCustomUrl(e.target.value)}
              placeholder="…or paste an image URL"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-orange-400"
              data-testid="image-custom-url-input"
            />
          </div>
          <button
            type="button"
            onClick={() => { if (customUrl.trim()) { onChange(customUrl.trim()); setCustomUrl(''); } }}
            className="px-3 rounded-lg text-xs font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#f07c1e,#d4640a)' }}
            data-testid="image-custom-url-use"
          >
            Use
          </button>
        </div>
      )}
    </div>
  );
}
