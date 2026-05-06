import { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) updateSlider(e.clientX);
  }, [isDragging, updateSlider]);

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchMove = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="before-after-container select-none"
      style={{ height: '420px', cursor: 'ew-resize' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.15)' }} />
        <span
          className="absolute top-4 left-4 bg-black/60 text-white text-sm font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {beforeLabel}
        </span>
      </div>

      {/* After Image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }}
          draggable={false}
        />
        <span
          className="absolute top-4 left-4 text-white text-sm font-semibold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(240, 124, 30, 0.9)', fontFamily: 'Poppins, sans-serif' }}
        >
          {afterLabel}
        </span>
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
        >
          <ArrowLeftRight size={20} style={{ color: '#f07c1e' }} />
        </div>
      </div>
    </div>
  );
}
