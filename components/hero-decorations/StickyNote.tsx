interface StickyNoteProps {
  text: string;
  subtitle?: string;
  subtitleColor?: string;
  color?: string;
  rotation?: number;
  className?: string;
}

export default function StickyNote({
  text,
  subtitle,
  subtitleColor = 'rgba(0,0,0,0.4)',
  color = '#FFF3CD',
  rotation = -4,
  className = '',
}: StickyNoteProps) {
  return (
    <div
      className={`sticky-note ${className}`}
      style={{ backgroundColor: color, transform: `rotate(var(--sticky-inner-rotate, ${rotation}deg)) scale(var(--sticky-note-scale, 1))` }}
    >
      <p>{text}</p>
      {subtitle && (
        <span className="sticky-note-subtitle" style={{ color: subtitleColor }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}
