import { CaseCard, CaseMedia } from "../../../components/case-study";
import { LaushuHead } from "../components/LaushuPrimitives";
import { getLaushuTranslator } from "../i18n-server";

const IMG = "/projects/laushu";

const demoItems = [
  { title: "Flow 1：建立外包人員資料庫", body: "快速新增、查找與管理外包人員資料，降低後續建立勞報單時的重複輸入。", video: `${IMG}/demo/EXKqZMroni8.mp4`, poster: `${IMG}/demo/demo-01-poster.jpg`, duration: "00:12" },
  { title: "Flow 2：建立勞務報酬單", body: "協助公司建立勞務報酬單，發送系統連結給外包人員填寫資料並完成回簽。", video: `${IMG}/demo/EzwEWYr2QgQ.mp4`, poster: `${IMG}/demo/demo-02-poster.jpg`, duration: "00:22" },
  { title: "Flow 3：合併多張勞務報酬單", body: "合併多筆勞報資料並清楚呈現細項，減少回簽次數與稅務整理時間。", video: `${IMG}/demo/WpLXr671epg.mp4`, poster: `${IMG}/demo/demo-03-poster.jpg`, duration: "00:44" },
];

export default async function DemoSection() {
  const { t } = await getLaushuTranslator();

  return (
    <section id="cs-sec-demo" className="cs-section laushu-demo-section">
      <LaushuHead eyebrow={t("最終成果")} title={t("UI 互動影片介紹")} />
      <div className="cs-video-showcase-list">
        {demoItems.map((item, index) => (
          <CaseCard className="cs-video-showcase-card" key={item.title}>
            <CaseMedia className="cs-video-showcase-media-wrap" contentClassName="cs-video-showcase-media" variant="full">
              <div className="cs-video-showcase-meta">
                <span>{`0${index + 1}`}</span>
                <span>{item.duration}</span>
              </div>
              <video className="cs-video-showcase-video" controls preload="metadata" poster={item.poster} playsInline>
                <source src={item.video} type="video/mp4" />
              </video>
            </CaseMedia>
            <div className="cs-video-showcase-copy">
              <h3>{t(item.title)}</h3>
              <p>{t(item.body)}</p>
            </div>
          </CaseCard>
        ))}
      </div>
    </section>
  );
}
