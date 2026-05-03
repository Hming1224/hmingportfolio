import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contact" className="contact-page-section" aria-labelledby="contact-title">
      <div className="contact-hero-image" aria-hidden="true">
        <Image
          src="https://framerusercontent.com/images/NB9UIWMSY1Vp8KhJ1oEDFdGQI.jpg"
          alt=""
          fill
          sizes="100vw"
        />
      </div>

      <div className="contact-panel-band">
        <div className="contact-card">
          <div className="contact-heading">
            <h2 id="contact-title">對我的作品或經歷有興趣嗎？</h2>
            <p>底下留言與我聯繫！</p>
          </div>

          <form className="contact-form" method="POST">
            <div className="contact-field-row">
              <input type="text" name="name" placeholder="請輸入你的名字" aria-label="你的名字" />
              <input type="email" name="email" placeholder="請輸入你的信箱" aria-label="你的信箱" />
            </div>
            <textarea
              name="message"
              placeholder="請詳述對於我個人經歷、設計作品、合作意願的想法"
              aria-label="訊息內容"
            />
            <button type="submit">送出訊息</button>
          </form>
        </div>
      </div>
    </section>
  );
}
