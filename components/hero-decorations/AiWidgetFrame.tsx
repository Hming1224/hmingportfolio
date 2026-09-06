interface AiWidgetFrameProps {
  label?: string;
  className?: string;
  variant?: 'default' | 'ai-impact';
}

export default function AiWidgetFrame({ label = 'Fun demo', className = '', variant = 'default' }: AiWidgetFrameProps) {
  const suffix = variant === 'ai-impact' ? '-yellow-outline' : '';
  return (
    <div className={`ai-widget-wrap ${className}`}>
      <div className="ai-widget-visual">
        {label && <span className="wireframe-label">{label}</span>}
        <div className="ai-widget-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/decorations/claude-icon${suffix}.svg`} className="ai-widget-icon" width={25} height={25} alt="" aria-hidden="true" />
          <div className="ai-widget-content">
            <div className="ai-widget-lines">
              <div className="ai-widget-line ai-widget-line--lg" />
              <div className="ai-widget-line ai-widget-line--md" />
              <div className="ai-widget-line ai-widget-line--sm" />
            </div>
            <div className="ai-widget-badge">
              <span>/Skill</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/decorations/skill-send${suffix}.svg`} width={7} height={7} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
