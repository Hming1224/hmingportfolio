import Image from "next/image";
import { CaseCard, CaseGrid, CaseMedia, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

const evolutionSteps = [
  { title: "各自實作", body: "不同案例頁各自實作類似的 Before / After 版型，視覺相近但 code 完全獨立。這時如果直接抽共用，只會把還沒穩定的差異綁在一起。" },
  { title: "先 audit，再抽出敘事外框", body: "盤點後確認，真正重複的是版面配置與 RWD 行為，不是內容本身。所以我抽出 slot-based 的敘事外框，讓各頁保留自己的文案、圖片和說明節奏。" },
  { title: "再拆出視覺外殼", body: "第二步才把「有標籤的面板」拆成更底層的視覺外殼，並保留既有樣式掛鉤，讓已上線頁面可以在不改變畫面的情況下遷移。" },
];

export default async function EvolutionASection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-evolution-a" kicker={t("EVOLUTION A")} title={t("演化實例 A：Before / After 版型的三段抽象")}>
      <p className="cs-section-lead">{t("同一個版型寫了三次之後，才動手抽象——而且分三步走，不是一次到位。")}</p>
      <CaseGrid variant="three" className="ds-case-card-grid ds-case-stage-grid">
        {evolutionSteps.map((step, index) => (
          <CaseCard className="ds-case-stage-card" key={step.title}>
            <span className="ds-case-stage-chip" aria-hidden="true">{t("STEP ")}{String(index + 1).padStart(2, "0")}</span>
            <h3>{t(step.title)}</h3>
            <p>{t(step.body)}</p>
          </CaseCard>
        ))}
      </CaseGrid>
      <CaseMedia className="ds-case-media" caption={t("Before / After pattern 從三頁各自實作，演化成 slot-based narrative frame。")}>
        <Image
          src={`${ASSET}/solution/before-after-evolution.webp`}
          alt={t("Before and after diagram showing three local implementations evolving into shared narrative frame and panel shell.")}
          width={1600}
          height={900}
          sizes="(max-width: 768px) calc(100vw - 48px), calc(100vw - 96px)"
        />
      </CaseMedia>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          { term: t("Slot-based narrative frame"), description: t("這裡指固定版面結構、開放內容替換的敘事外框，讓不同案例能共用排列方式但保留自己的內容。") },
          { term: t("Local implementation"), description: t("Local implementation 是先在單一頁面完成實作，等模式穩定後再評估是否抽到共用層。") },
        ]}
      />
    </CaseSection>
  );
}
