import SplitText from './animate-ui/primitives/texts/SplitText';
import DecryptedText from './animate-ui/primitives/texts/DecryptedText';
import CursorTag from './hero-decorations/CursorTag';
import WireframeFrame from './hero-decorations/WireframeFrame';
import AnnotationPin from './hero-decorations/AnnotationPin';
import StickyNote from './hero-decorations/StickyNote';

export default function Hero() {
  return (
    <section className="hero" id="about">
      {/* Floating decorations — hidden on mobile */}
      <CursorTag
        text="Brian Huang"
        color="#4B7BEC"
        className="hero-decoration hero-cursor-brian"
      />
      <CursorTag
        text="Engineers"
        color="#26DE81"
        className="hero-decoration hero-cursor-engineers"
      />
      <CursorTag
        text="PM"
        color="#FD9644"
        className="hero-decoration hero-cursor-pm"
      />

      <WireframeFrame
        label="Portfolio / Hero"
        size="large"
        className="hero-decoration hero-frame-large"
      />
      <WireframeFrame
        label="About"
        size="small"
        className="hero-decoration hero-frame-small"
      />

      <AnnotationPin
        number={1}
        text="跨域背景（機械→設計）"
        className="hero-decoration hero-pin-1"
      />
      <AnnotationPin
        number={2}
        text="解決真實問題"
        className="hero-decoration hero-pin-2"
      />
      <AnnotationPin
        number={3}
        text="德語 N4"
        className="hero-decoration hero-pin-3"
      />

      <StickyNote
        text="觀察生活細節"
        color="#FFF3CD"
        rotation={-5}
        className="hero-decoration hero-sticky-1"
      />
      <StickyNote
        text="PM 跨職能溝通"
        color="#D0F0F9"
        rotation={4}
        className="hero-decoration hero-sticky-2"
      />

      {/* Main copy */}
      <div className="hero-copy">
        <div className="hero-title">
          <SplitText
            tag="h1"
            text="哈囉！我是黃宣銘 Brian Huang"
            delay={42}
            duration={0.72}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 34 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="inherit"
          />

          <div className="hero-taglines">
            <p className="hero-tagline">
              <DecryptedText
                text="以系統性思考問題"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={70}
                useOriginalCharsOnly
                viewDelay={800}
                className="accent accent-purple"
                encryptedClassName="hero-tagline-encrypted"
              />
            </p>
            <p className="hero-tagline">
              <DecryptedText
                text="以人為本做設計"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={70}
                useOriginalCharsOnly
                viewDelay={1200}
                className="accent accent-blue"
                encryptedClassName="hero-tagline-encrypted"
              />
            </p>
            <p className="hero-tagline">
              <DecryptedText
                text="協同 AI 打造產品"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={70}
                useOriginalCharsOnly
                viewDelay={1600}
                className="accent accent-cyan"
                encryptedClassName="hero-tagline-encrypted"
              />
            </p>
          </div>
        </div>

        <div className="hero-actions">
          <a className="button button-secondary" href="#projects">
            查看作品
          </a>
          <a className="button button-dark" href="/about-me">
            我的歷程
          </a>
        </div>
      </div>
    </section>
  );
}
