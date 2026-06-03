interface StickyNoteProps {
  text: string;
  color?: string;
  rotation?: number;
  className?: string;
}

export default function StickyNote({ text, color = '#FFF3CD', rotation = -4, className = '' }: StickyNoteProps) {
  return (
    <div
      className={`sticky-note ${className}`}
      style={{ backgroundColor: color, transform: `rotate(${rotation}deg)` }}
    >
      <p>{text}</p>
    </div>
  );
}
