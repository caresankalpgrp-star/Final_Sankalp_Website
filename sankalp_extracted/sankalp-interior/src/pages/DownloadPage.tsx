import { useState } from 'react';
import {
  Download, FileArchive, Code2, Globe, CheckCircle,
  AlertCircle, Loader, ExternalLink, Copy, Terminal
} from 'lucide-react';

const VERCEL_URL = 'https://sankalp-interior-solution.vercel.app';

interface DownloadItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  badge: string;
  steps: string[];
}

const DOWNLOADS: DownloadItem[] = [
  {
    id: 'source',
    title: 'Source Code Package',
    subtitle: 'For Developers / GitHub / Vercel Deploy',
    description: 'Complete source code — all React components, API routes, SEO pages, admin panel. Ready to deploy on Vercel.',
    icon: Code2,
    color: '#0f2044',
    badge: '~220 KB',
    steps: [
      'Extract the .tar.gz file',
      'Run: npm install',
      'Add environment variables (Supabase keys)',
      'Run: npm run build',
      'Deploy to Vercel or any Node.js host',
    ],
  },
  {
    id: 'deploy',
    title: 'Built Website (dist folder)',
    subtitle: 'For cPanel / Serverbyt / Any Web Host',
    description: 'Pre-built HTML/CSS/JS files. Upload directly to public_html on any web hosting (cPanel, Serverbyt, etc.).',
    icon: Globe,
    color: '#f07c1e',
    badge: '~226 KB',
    steps: [
      'Extract the .tar.gz file',
      'Upload ALL contents to public_html/',
      'Upload .htaccess file (see below)',
      'Point your domain to public_html',
      'Enable SSL via cPanel Let\'s Encrypt',
    ],
  },
];

export default function DownloadPage() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleDownload = async (id: string, filename: string) => {
    setDownloading(id);
    setError(null);
    setDone(null);
    try {
      // Direct link download
      const url = `${VERCEL_URL}/api/download?file=${id}`;
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => { setDone(id); setDownloading(null); }, 1500);
    } catch (err: any) {
      setError('Download failed. Use the direct link below.');
      setDownloading(null);
    }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const htaccess = `Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]`;

  return (
    <div className="min-h-screen pt-20" style={{ background: '#f5f5f7', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }} className="px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(240,124,30,0.2)' }}>
          <Download size={32} className="text-orange-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3"
          style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Download Your Website
        </h1>
        <p className="text-white/60 text-base max-w-xl mx-auto">
          Download the latest version of your Sankalp Interior Solution website.
          Always up-to-date with the live deployment.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Download Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {DOWNLOADS.map(({ id, title, subtitle, description, icon: Icon, color, badge, steps }) => (
            <div key={id} className="bg-white rounded-2xl overflow-hidden shadow-sm"
              style={{ border: `2px solid ${done === id ? '#16a34a' : 'rgba(0,0,0,0.06)'}` }}>
              {/* Card Header */}
              <div className="p-6" style={{ background: `${color}10` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: color }}>
                    <Icon size={22} color="white" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                    style={{ background: color }}>{badge}</span>
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-1"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
                <p className="text-sm font-medium mb-2" style={{ color }}>{subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>

              {/* Steps */}
              <div className="px-6 py-4 border-b" style={{ borderColor: '#f0f0f8' }}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">How to use:</p>
                <ol className="space-y-1.5">
                  {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5"
                        style={{ background: color, fontSize: '10px' }}>{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Download Buttons */}
              <div className="p-6 space-y-3">
                {/* Primary button */}
                <button
                  onClick={() => handleDownload(id, id === 'source' ? 'sankalp-source-noimg.tar.gz' : 'sankalp-deploy.tar.gz')}
                  disabled={downloading === id}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: `linear-gradient(135deg,${color},${color}cc)`, boxShadow: `0 4px 20px ${color}40` }}
                >
                  {downloading === id ? (
                    <><Loader size={16} className="animate-spin" /> Preparing download...</>
                  ) : done === id ? (
                    <><CheckCircle size={16} /> Downloaded! ✓</>
                  ) : (
                    <><Download size={16} /> Download {id === 'source' ? 'Source Code' : 'Deploy Files'}</>
                  )}
                </button>

                {/* Direct link fallback */}
                <div className="rounded-xl overflow-hidden" style={{ background: '#f8f8fc', border: '1px solid #e8e8f0' }}>
                  <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: '#e8e8f0' }}>
                    <ExternalLink size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">Direct link (if button fails)</span>
                  </div>
                  <div className="flex items-center gap-2 p-3">
                    <code className="text-xs text-gray-600 flex-1 break-all">
                      {VERCEL_URL}/api/download?file={id}
                    </code>
                    <button
                      onClick={() => copyText(`${VERCEL_URL}/api/download?file=${id}`, id)}
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-orange-100"
                      style={{ background: copied === id ? 'rgba(34,197,94,0.1)' : 'rgba(240,124,30,0.1)' }}
                    >
                      {copied === id
                        ? <CheckCircle size={14} className="text-green-500" />
                        : <Copy size={14} className="text-orange-500" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* .htaccess box */}
        <div className="bg-white rounded-2xl shadow-sm mb-8 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#f0f0f8', background: '#faf8f4' }}>
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-orange-500" />
              <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                .htaccess file (REQUIRED for cPanel hosting)
              </span>
            </div>
            <button
              onClick={() => copyText(htaccess, 'htaccess')}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{ background: copied === 'htaccess' ? 'rgba(34,197,94,0.1)' : 'rgba(240,124,30,0.1)', color: copied === 'htaccess' ? '#16a34a' : '#f07c1e' }}
            >
              {copied === 'htaccess' ? <><CheckCircle size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-sm mb-4">
              Create a file named <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.htaccess</code> in your
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">public_html</code> folder with this content:
            </p>
            <pre className="text-sm rounded-xl p-4 overflow-x-auto" style={{ background: '#1a1a2e', color: '#f9a14b', fontFamily: 'monospace' }}>
              {htaccess}
            </pre>
          </div>
        </div>

        {/* Always-available links */}
        <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid rgba(240,124,30,0.15)' }}>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <AlertCircle size={18} className="text-orange-500" />
            Permanent Download Links (Always Work)
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            These links always point to the latest deployed version. Paste directly in your browser:
          </p>
          <div className="space-y-3">
            {[
              { label: '📦 Source Code (.tar.gz)', url: `${VERCEL_URL}/api/download?file=source` },
              { label: '🌐 Deploy Files (.tar.gz)', url: `${VERCEL_URL}/api/download?file=deploy` },
            ].map(({ label, url }) => (
              <div key={url} className="rounded-xl p-4" style={{ background: '#f8f8fc', border: '1px solid #e8e8f0' }}>
                <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-blue-600 flex-1 break-all">{url}</code>
                  <button
                    onClick={() => copyText(url, url)}
                    className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                    style={{ background: copied === url ? 'rgba(34,197,94,0.1)' : 'rgba(240,124,30,0.1)', color: copied === url ? '#16a34a' : '#f07c1e' }}
                  >
                    {copied === url ? '✓ Copied' : 'Copy'}
                  </button>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium text-white"
                    style={{ background: 'linear-gradient(135deg,#0f2044,#1a3a6b)' }}>
                    <Download size={11} /> Open
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 rounded-2xl" style={{ background: 'rgba(240,124,30,0.06)', border: '1px solid rgba(240,124,30,0.15)' }}>
          <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>💡 Which file do I need?</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-900 mb-1">📁 Source Code — use if:</p>
              <ul className="space-y-1">
                <li>• Deploying on Vercel (recommended)</li>
                <li>• Pushing to GitHub</li>
                <li>• You have a developer helping you</li>
                <li>• You want to make code changes</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">🌐 Deploy Files — use if:</p>
              <ul className="space-y-1">
                <li>• Uploading to cPanel / Serverbyt</li>
                <li>• Using File Manager or FTP</li>
                <li>• No Node.js on your server</li>
                <li>• Just want to upload and go live</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
