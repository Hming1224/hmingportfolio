interface CursorTagProps {
  text: string;
  color: string;
  className?: string;
}

export default function CursorTag({ text, color, className = '' }: CursorTagProps) {
  return (
    <div className={`cursor-tag ${className}`}>
      <svg className="cursor-tag-icon" width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true">
        <path
          d="M1 1L1 13L4 9.5L6 14.5L8 13.5L6 8.5H10L1 1Z"
          fill={color}
          stroke="white"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </svg>
      <span className="cursor-tag-label" style={{ backgroundColor: color }}>{text}</span>
    </div>
  );
}
