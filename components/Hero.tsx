import AvatarProfile from './AvatarProfile';
import SplitText from './animate-ui/primitives/texts/SplitText';
import { HighlightText } from './animate-ui/primitives/texts/highlight';

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="avatar-profile-wrap">
        <div className="avatar-profile-stage">
          <AvatarProfile
            imageSrc="/avatar/avatar-gray.png"
            hoverImageSrc="/avatar/avatar-yellow.png"
            imageAlt="Brian Huang"
          />
        </div>
      </div>

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
          <p className="headline">
            一名熱衷{' '}
            <HighlightText
              className="hero-highlight hero-highlight-purple"
              delay={0.35}
              text="觀察生活細節"
              textClassName="accent accent-purple"
            />{' '}
            &amp; 嘗試{' '}
            <HighlightText
              className="hero-highlight hero-highlight-blue"
              delay={0.55}
              text="解決真實問題"
              textClassName="accent accent-blue"
            />{' '}
            的設計師
          </p>
        </div>

        <p className="intro">
          從機械工程跨域專案管理，我是個熱愛學習新知的青年。目前具備2年以上互動體驗與UX/UI設計專案經驗。我的作品不只解決用戶的痛點，也創造可以幫助用戶成長的產品。以人為本的設計是我擁抱的思維，同時我也擅長用設計軟體發揮創意！
        </p>

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
