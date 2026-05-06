import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Loader, ShieldCheck } from 'lucide-react';
import supabase from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin');
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/admin');
    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #060f1f 0%, #0f2044 100%)', fontFamily: 'Poppins, sans-serif' }}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: '#f07c1e', filter: 'blur(96px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: '#1a3a6b', filter: 'blur(96px)' }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-10 pb-8 text-center" style={{ background: 'linear-gradient(135deg, #0f2044, #1a3a6b)' }}>
            <img src="/uploads/upload_1.png" alt="Sankalp" className="h-14 mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck size={20} className="text-orange-400" />
              <h1 className="text-white font-bold text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>Admin Login</h1>
            </div>
            <p className="text-white/50 text-sm">Secure access to your dashboard</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    placeholder="admin@sankalpinterior.com"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
                    style={{ borderColor: error ? '#ef4444' : '#e0e0e8', fontFamily: 'Poppins, sans-serif' }}
                    onFocus={e => e.target.style.borderColor = '#f07c1e'}
                    onBlur={e => e.target.style.borderColor = error ? '#ef4444' : '#e0e0e8'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3.5 rounded-xl border text-sm outline-none transition-all"
                    style={{ borderColor: error ? '#ef4444' : '#e0e0e8', fontFamily: 'Poppins, sans-serif' }}
                    onFocus={e => e.target.style.borderColor = '#f07c1e'}
                    onBlur={e => e.target.style.borderColor = error ? '#ef4444' : '#e0e0e8'}
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-sm text-red-600" style={{ background: 'rgba(239,68,68,0.08)' }}>
                  <ShieldCheck size={15} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-bold text-base transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #f07c1e, #d4640a)', boxShadow: '0 4px 20px rgba(240,124,30,0.4)', fontFamily: 'Montserrat, sans-serif' }}
              >
                {loading ? <><Loader size={18} className="animate-spin" /> Signing in...</> : 'Sign In to Dashboard'}
              </button>
            </form>

            <div className="mt-6 p-4 rounded-xl text-center" style={{ background: '#faf8f4' }}>
              <p className="text-gray-400 text-xs">🔒 This area is restricted to authorized personnel only.</p>
              <p className="text-gray-400 text-xs mt-1">All access attempts are logged.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
