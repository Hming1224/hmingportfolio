interface AiWidgetFrameProps {
  label?: string;
  className?: string;
}

export default function AiWidgetFrame({ label = 'Fun demo', className = '' }: AiWidgetFrameProps) {
  return (
    <div className={`ai-widget-wrap ${className}`}>
      <div className="ai-widget-visual">
        {label && <span className="wireframe-label">{label}</span>}
        <div className="ai-widget-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/decorations/claude-icon.svg" className="ai-widget-icon" width={25} height={25} alt="Claude" />
          <div className="ai-widget-content">
            <div className="ai-widget-lines">
              <div className="ai-widget-line ai-widget-line--lg" />
              <div className="ai-widget-line ai-widget-line--md" />
              <div className="ai-widget-line ai-widget-line--sm" />
            </div>
            <div className="ai-widget-badge">
              <span>/Skill</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/decorations/skill-send.svg" width={7} height={7} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
