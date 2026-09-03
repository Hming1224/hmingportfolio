import AiWidgetFrame from './AiWidgetFrame';
import CursorTag from './CursorTag';
import StickyNote from './StickyNote';
import ToggleDecoration from './ToggleDecoration';
import WalPencilDecoration from './WalPencilDecoration';
import WireframeFrame from './WireframeFrame';

export type HeroDecorationVariant = 'default' | 'ai-impact';

export default function HeroDecorationStage({
  variant = 'default',
}: {
  variant?: HeroDecorationVariant;
}) {
  const aiImpact = variant === 'ai-impact';

  return (
    <div className="hero-decoration-stage" data-hero-variant={variant} aria-hidden="true">
      <CursorTag text="User Insights" color="#4B7BEC" variant={variant} className="hero-decoration hero-cursor-brian" />
      <CursorTag
        text="Engineering Feasibility"
        color="#26DE81"
        icon={aiImpact ? '/decorations/cursor-engineers-yellow-outline.svg' : '/decorations/cursor-engineers.svg'}
        variant={variant}
        className="hero-decoration hero-cursor-engineers"
      />
      <CursorTag
        text="Business Goals"
        color="#FD9644"
        icon={aiImpact ? '/decorations/cursor-pm-yellow-outline.svg' : '/decorations/cursor-pm.svg'}
        variant={variant}
        className="hero-decoration hero-cursor-pm"
      />

      <div className="hero-bottom-group">
        <WireframeFrame label="Session : Build Wow!" variant={variant} className="hero-decoration hero-frame-large" />
        <ToggleDecoration variant={variant} className="hero-decoration hero-toggle" />
        <AiWidgetFrame label="Fun demo" variant={variant} className="hero-decoration hero-ai-widget" />
        <WalPencilDecoration variant={variant} className="hero-decoration hero-wal-pencil" />
      </div>

      <div className="hero-sticky-group">
        <div className="hero-decoration hero-sticky-1 hero-sticky-art"><StickyNote text="Art & Aesthetics" subtitle="Visual Craft" subtitleColor="#7f714c" color="#FFE299" rotation={-3} /></div>
        <div className="hero-decoration hero-sticky-2 hero-sticky-hci"><StickyNote text="HCI Research" subtitle="User Research" subtitleColor="#695e7f" color="#D3BDFF" rotation={4} /></div>
        <div className="hero-decoration hero-sticky-3 hero-sticky-co-work"><StickyNote text="Co-work with AI" subtitle="AI Collaboration" subtitleColor="#597a77" color="#B3F4EF" rotation={-4} /></div>
        <div className="hero-decoration hero-sticky-4 hero-sticky-mech"><StickyNote text="Mechanical Eng." subtitle="Systems Thinking" subtitleColor="#546d7f" color="#A8DAFF" rotation={3} /></div>
        <div className="hero-decoration hero-sticky-5 hero-sticky-product-spec"><StickyNote text="Product Spec" subtitle="Product Strategy" subtitleColor="#7f5751" color="#FFAFA3" rotation={-5} /></div>
        <div className="hero-decoration hero-sticky-6 hero-sticky-how-might"><StickyNote text="How Might We...?" subtitle="Problem Framing" subtitleColor="#7f6954" color="#FFD3A8" rotation={5} /></div>
      </div>
    </div>
  );
}
