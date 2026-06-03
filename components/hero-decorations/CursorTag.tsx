interface CursorTagProps {
  text: string;
  color: string;
  icon?: string;
  className?: string;
}

export default function CursorTag({ text, color, icon = '/decorations/cursor-arrow.svg', className = '' }: CursorTagProps) {
  return (
    <div className={`cursor-tag ${className}`}>
      <span className="cursor-tag-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} className="cursor-tag-icon" width={20} height={27} alt="" aria-hidden="true" />
        <span className="cursor-tag-label" style={{ backgroundColor: color }}>{text}</span>
      </span>
    </div>
  );
}
