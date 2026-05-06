import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { apiUrl } from '../lib/api';

interface Testimonial {
  id: number; name: string; location: string; text: string;
  rating: number; project: string; avatar_url: string | null;
}

function Avatar({ t }: { t: Testimonial }) {
  const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#0f2044','#f07c1e','#1a3a6b','#c9a84c','#d4640a','#16a34a'];
  const color = colors[t.id % colors.length];
  if (t.avatar_url) {
    return (
      <img
        src={t.avatar_url}
        alt={t.name}
        className="w-full h-full object-cover"
        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl"
      style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, fontFamily: 'Montserrat, sans-serif' }}>
      {initials}
    </div>
  );
}

export default function TestimonialSlider({ compact = false }: { compact?: boolean }) {
  const [items, setItems]   = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState<'left'|'right'>('right');
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch(apiUrl('/api/testimonials'))
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length) setItems(data); })
      .catch(console.error);
  }, []);

  const go = useCallback((dir: 'left' | 'right') => {
    setVisible(false);
    setAnimDir(dir);
    setTimeout(() => {
      setActive(prev => {
        if (dir === 'right') return (prev + 1) % items.length;
        return (prev - 1 + items.length) % items.length;
      });
      setVisible(true);
    }, 260);
  }, [items.length]);

  // Auto-advance
  useEffect(() => {
    if (items.length < 2) return;
    timerRef.current = setInterval(() => go('right'), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [items.length, go]);

  const pause  = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const resume = () => {
    if (items.length < 2) return;
    timerRef.current = setInterval(() => go('right'), 5000);
  };

  if (!items.length) return null;

  const t = items[active];
  const visibleCount = compact ? 1 : Math.min(items.length, window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);

  // For desktop: show 3 cards sliding
  if (!compact && typeof window !== 'undefined' && window.innerWidth >= 768) {
    return <SliderDesktop items={items} go={go} pause={pause} resume={resume} active={active} setActive={setActive} animDir={animDir} visible={visible} />;
  }

  // Mobile single card
  return (
    <div className="relative" onMouseEnter={pause} onMouseLeave={resume}>
      <div
        className="transition-all duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : animDir === 'right' ? 'translateX(-24px)' : 'translateX(24px)',
        }}
      >
        <SingleCard t={t} />
      </div>
      {items.length > 1 && (
        <>
          <NavButtons go={go} />
          <Dots items={items} active={active} setActive={setActive} go={go} />
        </>
      )}
    </div>
  );
}

function SliderDesktop({ items, go, pause, resume, active, setActive, animDir, visible }: any) {
  const count = items.length;
  const getIdx = (offset: number) => (active + offset + count) % count;
  const indices = count >= 3 ? [getIdx(-1), active, getIdx(1)] : count === 2 ? [active, getIdx(1)] : [active];

  return (
    <div className="relative" onMouseEnter={pause} onMouseLeave={resume}>
      <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${indices.length}, 1fr)` }}>
        {indices.map((idx, pos) => {
          const isCenter = count >= 3 ? pos === 1 : pos === 0;
          return (
            <div
              key={`${idx}-${active}`}
              className="transition-all duration-400"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? `translateX(0) scale(${isCenter ? 1 : 0.97})`
                  : `translateX(${animDir === 'right' ? '-20px' : '20px'}) scale(${isCenter ? 1 : 0.97})`,
              }}
            >
              <SingleCard t={items[idx]} highlight={isCenter} />
            </div>
          );
        })}
      </div>
      {items.length > 1 && (
        <>
          <NavButtons go={go} />
          <Dots items={items} active={active} setActive={setActive} go={go} />
        </>
      )}
    </div>
  );
}

function SingleCard({ t, highlight = false }: { t: Testimonial; highlight?: boolean }) {
  return (
    <div
      className="relative rounded-2xl p-6 h-full flex flex-col transition-all duration-300"
      style={{
        background: highlight ? 'linear-gradient(135deg, #0f2044, #1a3a6b)' : 'white',
        boxShadow: highlight ? '0 20px 60px rgba(15,32,68,0.25)' : '0 4px 20px rgba(0,0,0,0.07)',
        border: highlight ? 'none' : '1px solid rgba(0,0,0,0.06)',
        transform: highlight ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Quote icon */}
      <Quote
        size={32}
        className="absolute top-5 right-5 opacity-10"
        style={{ color: highlight ? 'white' : '#f07c1e' }}
      />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map(n => (
          <Star key={n} size={15}
            fill={n <= t.rating ? '#f5c518' : 'none'}
            stroke={n <= t.rating ? '#f5c518' : '#ddd'}
          />
        ))}
      </div>

      {/* Text */}
      <p
        className="text-sm leading-relaxed flex-1 mb-5 italic"
        style={{ color: highlight ? 'rgba(255,255,255,0.85)' : '#4b5563', fontFamily: 'Poppins, sans-serif' }}
      >
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
          style={{ boxShadow: `0 0 0 2px ${highlight ? 'rgba(255,255,255,0.35)' : 'rgba(240,124,30,0.35)'}` }}>
          <Avatar t={t} />
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: highlight ? 'white' : '#111827', fontFamily: 'Montserrat, sans-serif' }}>
            {t.name}
          </p>
          <p className="text-xs mt-0.5" style={{ color: highlight ? 'rgba(255,255,255,0.55)' : '#9ca3af' }}>
            {t.location}
          </p>
          {t.project && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
              style={{
                background: highlight ? 'rgba(240,124,30,0.2)' : 'rgba(240,124,30,0.1)',
                color: highlight ? '#f9a14b' : '#d4640a',
              }}
            >
              {t.project}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function NavButtons({ go }: { go: (d: 'left'|'right') => void }) {
  return (
    <>
      <button
        onClick={() => go('left')}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl z-10"
        style={{ border: '1.5px solid rgba(240,124,30,0.2)' }}
        aria-label="Previous"
      >
        <ChevronLeft size={18} className="text-orange-500" />
      </button>
      <button
        onClick={() => go('right')}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl z-10"
        style={{ border: '1.5px solid rgba(240,124,30,0.2)' }}
        aria-label="Next"
      >
        <ChevronRight size={18} className="text-orange-500" />
      </button>
    </>
  );
}

function Dots({ items, active, setActive, go }: any) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {items.map((_: any, i: number) => (
        <button
          key={i}
          onClick={() => { const dir = i > active ? 'right' : 'left'; go(dir); }}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === active ? '28px' : '8px',
            height: '8px',
            background: i === active ? '#f07c1e' : 'rgba(240,124,30,0.25)',
          }}
          aria-label={`Go to testimonial ${i + 1}`}
        />
      ))}
    </div>
  );
}
