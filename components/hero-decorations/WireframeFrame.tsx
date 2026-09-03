interface WireframeFrameProps {
  label: string;
  size?: 'large' | 'small';
  className?: string;
  variant?: 'default' | 'ai-impact';
}

export default function WireframeFrame({ label, className = '', variant = 'default' }: WireframeFrameProps) {
  const suffix = variant === 'ai-impact' ? '-yellow-outline' : '';
  return (
    <div className={`wireframe-frame-wrap ${className}`}>
      <div className="wireframe-frame-visual">
        <span className="wireframe-label">{label}</span>
        <div className="session-frame">
          <div className="session-frame-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/decorations/session-code-icon${suffix}.svg`} className="session-code-icon" width={30} height={30} alt="" aria-hidden="true" />
            <div className="session-content">
              <div className="session-lines">
                <div className="session-line session-line--full" />
                <div className="session-line session-line--lg" />
                <div className="session-line session-line--sm" />
              </div>
              <div className="session-badge">
                <span>/Agent</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/decorations/agent-send${suffix}.svg`} width={12} height={12} alt="" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
