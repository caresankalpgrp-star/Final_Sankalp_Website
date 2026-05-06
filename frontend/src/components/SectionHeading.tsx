interface SectionHeadingProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({ tag, title, highlight, subtitle, center = false, light = false }: SectionHeadingProps) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {tag && <span className="section-tag">{tag}</span>}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${light ? 'text-white' : 'text-gray-900'}`}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {highlight ? (
          <>
            {parts[0]}
            <span className="gradient-text">{highlight}</span>
            {parts[1]}
          </>
        ) : title}
      </h2>
      <div className={`divider ${center ? 'divider-center' : ''}`} />
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-gray-500'}`}
          style={{ fontFamily: 'Poppins, sans-serif' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
