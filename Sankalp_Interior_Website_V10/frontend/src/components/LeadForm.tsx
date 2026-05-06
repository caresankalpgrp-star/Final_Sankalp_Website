import { useState } from 'react';
import { apiUrl } from '../lib/api';
import { Send, CheckCircle, Loader } from 'lucide-react';

interface LeadFormProps {
  source?: string;
  compact?: boolean;
  darkBg?: boolean;
}

const budgetOptions = [
  'Under ₹3 Lakhs',
  '₹3–5 Lakhs',
  '₹5–8 Lakhs',
  '₹8–12 Lakhs',
  '₹12–20 Lakhs',
  'Above ₹20 Lakhs',
];

const propertyTypes = [
  '1BHK Flat',
  '2BHK Flat',
  '3BHK Flat',
  '4BHK Flat',
  'Villa / Bungalow',
  'Office / Commercial',
];

export default function LeadForm({ source = 'website', compact = false, darkBg = false }: LeadFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    budget: '',
    property_type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Please enter your name'); return; }
    if (!form.phone.trim() || form.phone.length < 10) { setError('Please enter a valid phone number'); return; }

    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', location: '', budget: '', property_type: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please call us directly at +91 97482 97025');
    } finally {
      setLoading(false);
    }
  };

  const labelClass = `text-sm font-medium mb-1.5 block ${darkBg ? 'text-white/80' : 'text-gray-700'}`;

  if (success) {
    return (
      <div className="text-center py-12 px-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(34, 197, 94, 0.1)' }}
        >
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h3 className={`text-2xl font-bold mb-3 ${darkBg ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
          ধন্যবাদ! 🎉
        </h3>
        <p className={`text-base mb-2 ${darkBg ? 'text-white/80' : 'text-gray-600'}`}>
          Thank you for reaching out!
        </p>
        <p className={`text-sm ${darkBg ? 'text-white/60' : 'text-gray-500'}`}>
          Our design consultant will contact you within <strong>2 hours</strong> to schedule your free consultation.
        </p>
        <div
          className="mt-6 p-4 rounded-xl text-sm"
          style={{ background: 'rgba(240, 124, 30, 0.1)', color: '#d4640a' }}
        >
          📞 For immediate assistance: <a href="tel:+919748297025" className="font-bold">+91 97482 97025</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
        <div>
          <label className={labelClass}>Your Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="form-input"
            required
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="form-input"
            required
          />
        </div>
        {!compact && (
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="form-input"
            />
          </div>
        )}
        <div>
          <label className={labelClass}>Location / Area</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Salt Lake, Newtown, Kolkata"
            className="form-input"
          />
        </div>
        <div>
          <label className={labelClass}>Budget Range</label>
          <select name="budget" value={form.budget} onChange={handleChange} className="form-input">
            <option value="">Select Budget</option>
            {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Property Type</label>
          <select name="property_type" value={form.property_type} onChange={handleChange} className="form-input">
            <option value="">Select Property Type</option>
            {propertyTypes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        {!compact && (
          <div className="sm:col-span-2">
            <label className={labelClass}>Message (Optional)</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project, requirements, timeline..."
              rows={3}
              className="form-input resize-none"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-base py-4"
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Get Free Consultation
          </>
        )}
      </button>

      <p className={`text-xs text-center ${darkBg ? 'text-white/40' : 'text-gray-400'}`}>
        🔒 Your information is 100% secure. We never spam.
      </p>
    </form>
  );
}
