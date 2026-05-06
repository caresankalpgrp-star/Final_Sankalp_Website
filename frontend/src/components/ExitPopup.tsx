import { useState, useEffect, useRef } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('exitPopupShown');
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered.current && !dismissed) {
        triggered.current = true;
        setShow(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Also show after 45 seconds on mobile
    const timer = setTimeout(() => {
      if (!triggered.current && !dismissed) {
        triggered.current = true;
        setShow(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  if (!show) return null;

  return (
    <div className="exit-popup-overlay" onClick={handleDismiss}>
      <div
        className="relative bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.4s ease' }}
      >
        {/* Top Banner */}
        <div
          className="py-6 px-8 text-center"
          style={{ background: 'linear-gradient(135deg, #0f2044, #1a3a6b)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: 'rgba(240, 124, 30, 0.2)' }}
          >
            <Gift size={26} className="text-orange-400" />
          </div>
          <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            অপেক্ষা করুন! 🎁
          </h3>
          <p className="text-white/80 text-sm mt-1">Wait! Before you leave...</p>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Get{' '}
            <span className="gradient-text">FREE Design Consultation</span>
          </h4>
          <p className="text-gray-600 text-sm mb-2">
            Worth ₹2,999 — absolutely FREE for you!
          </p>
          <p className="text-gray-500 text-xs mb-6">
            Our expert designer will visit your home & create a personalized design plan.
          </p>

          <div className="space-y-3 mb-6 text-left">
            {[
              '✅ Free home visit by expert designer',
              '✅ 3D design visualization',
              '✅ Transparent pricing breakdown',
              '✅ No obligation, no pressure',
            ].map((item) => (
              <p key={item} className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {item}
              </p>
            ))}
          </div>

          <Link
            to="/contact"
            className="btn-primary w-full justify-center text-base"
            onClick={handleDismiss}
          >
            Claim Free Consultation
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={handleDismiss}
            className="mt-4 text-gray-400 text-xs hover:text-gray-600 transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            No thanks, I'll pay full price later
          </button>
        </div>

        {/* Close */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
