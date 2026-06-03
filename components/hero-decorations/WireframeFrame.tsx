interface WireframeFrameProps {
  label: string;
  size?: 'large' | 'small';
  className?: string;
}

export default function WireframeFrame({ label, size = 'large', className = '' }: WireframeFrameProps) {
  return (
    <div className={`wireframe-frame wireframe-frame-${size} ${className}`}>
      <span className="wireframe-label">{label}</span>
    </div>
  );
}
