export default function ToggleDecoration({ className = '', variant = 'default' }: { className?: string; variant?: 'default' | 'ai-impact' }) {
  const suffix = variant === 'ai-impact' ? '-yellow-outline' : '';
  return (
    <div className={`toggle-decoration ${className}`}>
      <div className="toggle-decoration-inner">
        {/* On state: purple gradient bg, white thumb at right */}
        <div className="toggle-btn toggle-btn-on">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/decorations/toggle-on${suffix}.svg`} width={24} height={24} alt="" aria-hidden="true" />
        </div>
        {/* Off state: white bg with black border, purple thumb at left */}
        <div className="toggle-btn toggle-btn-off">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/decorations/toggle-off${suffix}.svg`} width={24} height={24} alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
