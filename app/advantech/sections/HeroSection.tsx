import Image from "next/image";

export default function HeroSection() {
  return (
    <section>
        <div className="cs-hero-cover">
          <div className="cs-hero-cover-img">
            <Image
              src="/projects/advantech/cover/hero-cover.webp"
              alt="WISE-iEMS ECOWatch UI"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="cs-hero-info">
          <div className="cs-hero-meta">
            <span className="cs-badge">Early Design Project</span>
            <span className="cs-tags">WEB・B2B・AI Chatbot・UX Design・UI Design</span>
          </div>
          <h1 className="cs-title">
            以生成式 AI 聊天機器人驅動智慧能源與空調維運系統介面設計
          </h1>
          <div className="cs-info-row">
            <div className="cs-info-card">
              <span className="cs-info-label">時間進程</span>
              <span className="cs-info-value">2024.06 – 2024.08</span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">我的角色</span>
              <span className="cs-info-value">UIUX 設計師</span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">團隊成員</span>
              <span className="cs-info-value">2 位設計師、2 位後端工程師、1 位 PM</span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">負責項目</span>
              <div className="cs-info-tasks">
                <span>競品分析</span>
                <span>終端使用者訪談</span>
                <span>線匡稿</span>
                <span>原型設計</span>
                <span>提案與功能迭代</span>
                <span>產品行銷影片</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
