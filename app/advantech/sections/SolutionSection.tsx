/* eslint-disable @next/next/no-img-element -- connector SVGs are resized at runtime by FeatureConnectors JS (it rewrites img.src), so raw <img> is intentional here */
import type { ReactNode } from "react";
import { CaseFeatureRow, CaseSection } from "../../../components/case-study";
import ProposalTabs from "../components/ProposalTabs";
import FeatureImageLightbox from "../components/FeatureImageLightbox";
import FeatureConnectors from "../../../components/case-study/FeatureConnectors";
import AlarmLevelDemo from "../components/AlarmLevelDemo";
import VimeoPlayer from "../components/VimeoPlayer";
import { proposalScenario1Tabs, proposalScenario2Tabs } from "../data";
import { localizeAdvantechTree } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

function FeatureStep({
  alt,
  flipped = false,
  note,
  src,
}: {
  alt: string;
  flipped?: boolean;
  note: ReactNode;
  src: string;
}) {
  return (
    <CaseFeatureRow
      flipped={flipped}
      media={<FeatureImageLightbox src={src} alt={alt} width={960} height={540} />}
      note={note}
      variant="process"
    />
  );
}

export default async function SolutionSection() {
  const { locale, t } = await getAdvantechTranslator();
  return localizeAdvantechTree(locale,
    <CaseSection
      id="cs-sec-solution"
      surface
      className="cs-solution-section"
      kicker={t("設計方案")}
      title={t("從情境發想、迭代到最終 AI 聊天機器人體驗。")}
    >
      <p className="cs-body-muted" style={{ marginBottom: 56 }}>
        依據前述定義的設計情境，後續迭代將聚焦在幾個會直接影響決策判斷的介面：AI Chatbot、超約預警分析視窗、設備能耗異常分析視窗，以及其中的圖表、資料表與 AI 建議區塊。
      </p>

      {/* ── Ideation Block ── */}
      <div className="cs-sol-block">
        <h3 className="cs-sol-blk-title cs-copy-title">2 種情境的設計發想</h3>
        <p className="cs-sol-blk-desc cs-text-muted-blue cs-copy-body">先從兩個情境拆出核心使用任務與 AI 介入點，定義後續迭代要驗證的頁面入口、通知方式與建議回饋。</p>

        {/* Scenario 1 */}
        <div className="cs-sol-flow" style={{ backgroundImage: "url('/projects/advantech/solution/flow-sc1.webp')" }}>
          <div className="cs-sol-flow-info">
            <p className="cs-sol-flow-label cs-copy-title" style={{ color: "#1a87de" }}>Scenario 1</p>
            <p className="cs-sol-flow-name cs-copy-title">需求管理決策助手：超約預警</p>
          </div>
        </div>
        <ProposalTabs defaultTab={0} tabs={proposalScenario1Tabs} />

        {/* Scenario 2 */}
        <div className="cs-sol-flow" style={{ backgroundImage: "url('/projects/advantech/solution/flow-sc2.webp')" }}>
          <div className="cs-sol-flow-info">
            <p className="cs-sol-flow-label cs-copy-title" style={{ color: "#1e84a6" }}>Scenario 2</p>
            <p className="cs-sol-flow-name cs-copy-title" style={{ color: "#083b4c" }}>設備能效主動維護：模式識別</p>
          </div>
        </div>
        <ProposalTabs defaultTab={0} tabs={proposalScenario2Tabs} />
      </div>

      {/* ── Iteration Block ── */}
      <div className="cs-sol-block">
        <h3 className="cs-sol-blk-title cs-copy-title">兩種情境的頁面與元件迭代</h3>
        <p className="cs-sol-blk-desc cs-text-muted-blue cs-copy-body">迭代時主要檢視資訊優先級是否清楚、資料呈現是否符合廠務人員的判讀習慣，以及使用者能否在最少的操作成本下，從異常提示一路理解原因並採取下一步行動。</p>

        {/* Board 1: Scenario 1 - AI Chatbot 元件 */}
        <div className="cs-sol-board cs-stack-box">
          <div className="cs-sol-bdhd cs-flex-cluster">
            <span className="cs-sol-badge cs-inline-pill" style={{ background: "#ebf6fe", color: "#0072bd" }}>Scenario 1</span>
            <p className="cs-sol-bdtitle cs-copy-title">AI Chatbot 元件</p>
          </div>
          <div className="cs-sol-dr cs-flex-cluster">
            <p className="cs-sol-drlabel cs-copy-title">修正視窗寬度</p>
            <p className="cs-sol-drbody cs-copy-body">最初，ECOWatch 與 HVAC 的預設聊天視窗寬度設定為 360px。然而，當使用者需要查看詳細分析內容時，必須點擊按鈕展開聊天視窗，這增加了額外操作步驟，也中斷了整體使用體驗。為了提升可用性，我們將預設聊天視窗寬度<strong>從 360px 調整為 640px</strong>，使其與展開後的版本一致，讓使用者能更直接、順暢地瀏覽分析內容。</p>
          </div>
          <div className="cs-sol-dr cs-flex-cluster">
            <p className="cs-sol-drlabel cs-copy-title">需量走勢圖精細化</p>
            <div className="cs-sol-drbody cs-copy-body">
              <p style={{ margin: 0 }}>原本的圖表主要呈現單一時間點的異常狀況，使用者只能看到局部的超約警示與數值，較難理解該異常在整體用電趨勢中的位置，也無法快速判斷後續是否仍存在超約風險。</p>
              <p style={{ margin: "1em 0 0" }}>調整後的圖表擴展為完整的需量分析視覺化，補上更清楚的時間軸、kW 單位、目標需量線與預測需量線，讓使用者能同時掌握歷史用電趨勢與未來預測變化。透過不同顏色區分谷時段、尖時段與預測區段，並加入圖例說明與關鍵數值標記，使用者可以更直覺地判讀高風險時段、比較目標值與預測值，進一步支援後續的能源調度與決策。</p>
            </div>
          </div>
          <div className="cs-sol-ba cs-flex-cluster">
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">Before</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <div style={{ width: "calc(min(607px, 100%) * 360 / 607)", display: "flex", flexDirection: "column" }}>
                  <FeatureImageLightbox src="/projects/advantech/solution/iter-chatbot-before.webp" alt="AI Chatbot before: 360px chat window" width={360} height={461} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="360px" />
                  <div className="cs-sol-redline cs-flex-cluster" style={{ width: "100%" }}>
                    <span className="cs-sol-redline-label cs-copy-title">360px</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs-sol-arrow cs-flex-cluster" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">After</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <div style={{ width: "min(607px, 100%)", display: "flex", flexDirection: "column" }}>
                  <FeatureImageLightbox src="/projects/advantech/solution/iter-chatbot-after.webp" alt="AI Chatbot after: 640px chat window" width={607} height={452} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="607px" />
                  <div className="cs-sol-redline cs-flex-cluster" style={{ width: "100%" }}>
                    <span className="cs-sol-redline-label cs-copy-title">640px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Board 2: Scenario 1 - 超約預警分析視窗 */}
        <div className="cs-sol-board cs-stack-box">
          <div className="cs-sol-bdhd cs-flex-cluster">
            <span className="cs-sol-badge cs-inline-pill" style={{ background: "#ebf6fe", color: "#0072bd" }}>Scenario 1</span>
            <p className="cs-sol-bdtitle cs-copy-title">超約預警分析視窗</p>
          </div>
          <div className="cs-sol-dr cs-flex-cluster">
            <p className="cs-sol-drlabel cs-copy-title">AI 建議排版順序修正</p>
            <p className="cs-sol-drbody cs-copy-body">原本 AI 建議區塊被放在 modal 的最後一列，使用者需要先瀏覽完設備清單與表格內容後才會看到「建議執行方針」，容易被視為補充資訊。調整後將 AI 建議移到 modal 的第一列優先顯示，讓使用者一打開超約預警分析時，就能先看到 AI 深度分析結果、超約原因與建議處理方式。</p>
          </div>
          <div className="cs-sol-ba cs-flex-cluster">
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">Before</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s1a-before.webp" alt="Before" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
            <div className="cs-sol-arrow cs-flex-cluster" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">After</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s1a-after.webp" alt="After" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
          </div>
          <div className="cs-sol-dr cs-flex-cluster">
            <p className="cs-sol-drlabel cs-copy-title">趨勢預測分析排版修正</p>
            <p className="cs-sol-drbody cs-copy-body">原本的版面將大量文字分析與圖表並排呈現，使用者需要一邊閱讀左側長段落，一邊對照右側圖表資訊，整體閱讀動線較分散。調整後將版面改為由上而下的閱讀順序，先在上方呈現最重要的分析摘要，讓使用者一進入畫面就能快速掌握目前風險狀況，強化了資訊層級、閱讀順序與重點辨識效率。</p>
          </div>
          <div className="cs-sol-ba cs-flex-cluster">
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">Before</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s1b-before.webp" alt="Before" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
            <div className="cs-sol-arrow cs-flex-cluster" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">After</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s1b-after.webp" alt="After" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
          </div>
          <div className="cs-sol-dr cs-flex-cluster">
            <p className="cs-sol-drlabel cs-copy-title">修正設備識別資訊</p>
            <p className="cs-sol-drbody cs-copy-body">原本表格使用「設備編號」作為主要識別資訊，與廠務人員實際查找設備的習慣不一致，且超過 10 筆以上的資料讓使用者需要花更多時間瀏覽。調整後將「設備編號」改為使用者更熟悉的「代號」，並將排名精簡為前 10 筆高耗能設備，讓使用者能更快掌握優先改善對象。</p>
          </div>
          <div className="cs-sol-ba cs-flex-cluster">
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">Before</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s1c-before.webp" alt="Before" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
            <div className="cs-sol-arrow cs-flex-cluster" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">After</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s1c-after.webp" alt="After" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
          </div>
        </div>

        {/* Board 3: Scenario 2 - 設備能耗異常分析視窗 */}
        <div className="cs-sol-board cs-stack-box">
          <div className="cs-sol-bdhd cs-flex-cluster">
            <span className="cs-sol-badge cs-inline-pill" style={{ background: "#eef8ff", color: "#1e84a6" }}>Scenario 2</span>
            <p className="cs-sol-bdtitle cs-copy-title" style={{ color: "#083b4c" }}>設備能耗異常分析視窗</p>
          </div>
          <div className="cs-sol-dr cs-flex-cluster">
            <p className="cs-sol-drlabel cs-copy-title">修正數據來源</p>
            <p className="cs-sol-drbody cs-copy-body">原本使用「歷史能耗數據」作為設備異常判斷的主要圖表，偏向呈現耗電量與效能關係，但這些資料並不是廠務人員在日常巡檢中最直接用來判斷設備異常的依據。調整後改為呈現「歷史運轉狀態」，以冷卻水與冰水的進出水溫度變化作為主要分析指標，更符合廠務人員日常巡檢時會查看的設備數據。</p>
          </div>
          <div className="cs-sol-ba cs-flex-cluster">
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">Before</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s2a-before.webp" alt="Before" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
            <div className="cs-sol-arrow cs-flex-cluster" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">After</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s2a-after.webp" alt="After" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
          </div>
          <div className="cs-sol-dr cs-flex-cluster">
            <p className="cs-sol-drlabel cs-copy-title">修正故障備忘錄</p>
            <p className="cs-sol-drbody cs-copy-body">原本的故障備忘錄以簡單表格呈現，資訊較扁平，使用者只能看到單一原因與處理方式，較難判斷故障過去發生的頻率與不同可能原因之間的優先順序。調整後加入 AI 深度分析區塊，先整理歷史異常處理方式，讓使用者能快速掌握可能的故障原因，將過去維修紀錄轉化為可參考的診斷摘要。</p>
          </div>
          <div className="cs-sol-ba cs-flex-cluster">
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">Before</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s2b-before.webp" alt="Before" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
            <div className="cs-sol-arrow cs-flex-cluster" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
            <div className="cs-sol-bapanel cs-stack-box">
              <div className="cs-sol-bahd cs-flex-cluster">After</div>
              <div className="cs-sol-bacontent cs-flex-cluster">
                <FeatureImageLightbox src="/projects/advantech/solution/iter-s2b-after.webp" alt="After" width={480} height={432} className="cs-sol-iteration-zoom" imageClassName="cs-sol-iteration-zoom-img" sizes="480px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Final Feature Block ── */}
      <div className="cs-sol-block">
        <h3 className="cs-sol-blk-title cs-copy-title">最終 3 種 feature 的介面細節</h3>
        <p className="cs-sol-blk-desc cs-text-muted-blue cs-copy-body">最終介面聚焦在告警提示、進階分析與建議生成，讓使用者能從異常發現一路走到決策行動。</p>
        <FeatureConnectors />

        {/* Feature 1.1 */}
        <div className="cs-sol-fgroup cs-sol-fgroup-f11">
          <div className="cs-sol-fc">
            <div className="cs-sol-fchead">
              <p className="cs-sol-ftitle">Feature 1.1｜自主需量分析</p>
            </div>
            <div className="cs-sol-fcbody">
              <p className="cs-sol-fsub">由使用者自主操控介面，從預測、超約預警到 AI 建議，讓能源管理不只看圖表，而是能直接支援決策。</p>
              <div className="cs-sol-dpts cs-stack-box">
                <div className="cs-sol-dpt cs-stack-box">
                  <p className="cs-sol-dpt-l cs-copy-title">超約風險分析</p>
                  <p className="cs-sol-dpt-b cs-copy-body">在需量曲線中標記預測高峰、超約風險區間與 AI 說明，讓使用者快速理解問題發生時間點。</p>
                </div>
                <div className="cs-sol-dpt cs-stack-box">
                  <p className="cs-sol-dpt-l cs-copy-title">對話式建議</p>
                  <p className="cs-sol-dpt-b cs-copy-body">使用者可以透過 AI Chatbot 查詢需量預測、取得超約提醒，並進一步詢問節能建議或高耗能設備排名，快速掌握能源狀況與下一步行動。</p>
                </div>
              </div>
            </div>
          </div>
          <FeatureStep
            src="/projects/advantech/solution/final-f11-01.webp"
            alt="Feature 1.1 需量分析畫面"
            note={<p>點擊「超約預警」按鈕</p>}
          />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-1.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          flipped
          src="/projects/advantech/solution/final-f11-02.webp"
          alt="Feature 1.1 AI Chatbot 觸發"
          note={<p>跳出 AI chatbot，並且自動輸入：請問今日需量預測分析？</p>}
        />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-2.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          src="/projects/advantech/solution/final-f11-03.webp"
          alt="Feature 1.1 AI 需量分析回覆"
          note={<p>AI chatbot 從資料庫中讀取相關資訊，並整合 LLM 回答框架，提供需量分析與折線圖表。另外，提供問題模組供用戶持續深入提問。</p>}
        />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-1.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          flipped
          src="/projects/advantech/solution/final-f11-04.webp"
          alt="Feature 1.1 AI 超約建議"
          note={<p>點擊「請提供給我避免需量超約的建議。」按鈕，作為新的輸入資訊。AI Chatbot 繼續從資料庫中讀取相關資訊後轉換成結構化文字回覆。</p>}
        />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-2.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          src="/projects/advantech/solution/final-f11-05.webp"
          alt="Feature 1.1 高耗能設備排名"
          note={<p>點擊「請提供給我高耗能設備排名。」按鈕，作為新的輸入資訊。AI Chatbot 繼續從資料庫中讀取相關資訊後轉換成圖表，依據耗能排名顯示最需要修復的設備列表。</p>}
        />
        </div>

        <div className="cs-sol-fhr" />

        {/* Feature 1.2 */}
        <div className="cs-sol-fgroup cs-sol-fgroup-f12">
          <div className="cs-sol-fc">
            <div className="cs-sol-fchead">
              <p className="cs-sol-ftitle">Feature 1.2｜主動通知預警</p>
            </div>
            <div className="cs-sol-fcbody">
              <p className="cs-sol-fsub">由系統後台間段式預測，將問題嚴重程度分級預告用戶，促成決策者快速擬定解決方案。</p>
              <div className="cs-sol-dpts cs-stack-box">
                <div className="cs-sol-dpt cs-stack-box">
                  <p className="cs-sol-dpt-l cs-copy-title">超約風險分析</p>
                  <p className="cs-sol-dpt-b cs-copy-body">在需量曲線中標記預測高峰、超約風險區間與 AI 說明，讓使用者快速理解問題發生時間點。</p>
                </div>
                <div className="cs-sol-dpt cs-stack-box">
                  <p className="cs-sol-dpt-l cs-copy-title">主動通知</p>
                  <p className="cs-sol-dpt-b cs-copy-body">當即時用電預測超約時，透過系統通知提醒風險與建議行動。</p>
                </div>
              </div>
            </div>
          </div>
          <FeatureStep
            src="/projects/advantech/solution/final-f12-01.webp"
            alt="Feature 1.2 系統通知"
            note={<p>點擊通知按鈕</p>}
          />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-1.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          flipped
          src="/projects/advantech/solution/final-f12-02.webp"
          alt="Feature 1.2 報警等級"
          note={
            <>
            <div className="cs-sol-dpts cs-stack-box">
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">報警等級</p>
                <div className="cs-sol-dpt-b cs-copy-body" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                  <span>分為三個等級：</span>
                  <span style={{ background: "#FBC7C9", border: "1px solid #DF001A", borderRadius: 4, padding: "0 8px", color: "#DF001A", fontWeight: 700, lineHeight: "22px" }}>嚴重</span>
                  <span>、</span>
                  <span style={{ background: "#FFDAA9", border: "1px solid #FF9300", borderRadius: 4, padding: "0 8px", color: "#FF9300", fontWeight: 700, lineHeight: "22px" }}>中度</span>
                  <span>、</span>
                  <span style={{ background: "#F8E8BA", border: "1px solid #EBC147", borderRadius: 4, padding: "0 8px", color: "#C9A53C", fontWeight: 700, lineHeight: "22px" }}>低度</span>
                </div>
              </div>
            </div>
            {/* Hover 互動示意圖 */}
            <AlarmLevelDemo
              tooltipLines={[
                "嚴重：超約將於 1 小時內發生",
                "中度：超約將於 2 小時內發生",
                "低度：超約將於 3 小時內發生",
              ]}
            />
            </>
          }
        />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-2.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          src="/projects/advantech/solution/final-f12-03.webp"
          alt="Feature 1.2 AI 分析"
          note={
            <div className="cs-sol-dpts cs-stack-box">
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">AI 分析摘要</p>
                <p className="cs-sol-dpt-b cs-copy-body">快速摘要預測異常的時間點，提供處理對策。</p>
              </div>
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">趨勢預測分析</p>
                <p className="cs-sol-dpt-b cs-copy-body">提供報警等級、超約時間點、需量走勢圖分析。</p>
              </div>
            </div>
          }
        />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-1.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          flipped
          src="/projects/advantech/solution/final-f12-04.webp"
          alt="Feature 1.2 高耗能設備"
          note={
            <div className="cs-sol-dpts cs-stack-box">
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">前 15% 高耗能設備排名</p>
                <p className="cs-sol-dpt-b cs-copy-body">根據當前用電量進行排名，提供前 15% 高耗能設備名稱與位置。</p>
              </div>
            </div>
          }
        />
        </div>

        <div className="cs-sol-fhr" />

        {/* Feature 2 */}
        <div className="cs-sol-fgroup cs-sol-fgroup-f2">
          <div className="cs-sol-fc cs-sol-fc--teal">
            <div className="cs-sol-fchead">
              <p className="cs-sol-ftitle">Feature 2｜模式識別</p>
            </div>
            <div className="cs-sol-fcbody">
              <p className="cs-sol-fsub">設備能耗即時監控，當發生問題時可提供該設備的數據、事件進行分析，提供廠務人員及時修繕建議與故障排除方案。</p>
              <div className="cs-sol-dpts cs-stack-box">
                <div className="cs-sol-dpt cs-stack-box">
                  <p className="cs-sol-dpt-l cs-copy-title">短期異常診斷</p>
                  <p className="cs-sol-dpt-b cs-copy-body">設備運轉出現狀況時，可透過 AI 提供問題摘要、從進出水溫度數據、事件資料找出問題來源，並搭配故障排除手冊解決難題。</p>
                </div>
                <div className="cs-sol-dpt cs-stack-box">
                  <p className="cs-sol-dpt-l cs-copy-title">主動通知</p>
                  <p className="cs-sol-dpt-b cs-copy-body">當設備能耗異常時，透過系統通知提醒風險與建議行動。</p>
                </div>
              </div>
            </div>
          </div>
          <FeatureStep
            src="/projects/advantech/solution/final-f2-01.webp"
            alt="Feature 2 模式識別主畫面"
            note={<p>點擊通知按鈕</p>}
          />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-1.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          flipped
          src="/projects/advantech/solution/final-f2-02.webp"
          alt="Feature 2 設備報警等級"
          note={
            <>
            <div className="cs-sol-dpts cs-stack-box">
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">報警等級</p>
                <div className="cs-sol-dpt-b cs-copy-body" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                  <span>分為三個等級：</span>
                  <span style={{ background: "#FBC7C9", border: "1px solid #DF001A", borderRadius: 4, padding: "0 8px", color: "#DF001A", fontWeight: 700, lineHeight: "22px" }}>嚴重</span>
                  <span>、</span>
                  <span style={{ background: "#FFDAA9", border: "1px solid #FF9300", borderRadius: 4, padding: "0 8px", color: "#FF9300", fontWeight: 700, lineHeight: "22px" }}>中度</span>
                  <span>、</span>
                  <span style={{ background: "#F8E8BA", border: "1px solid #EBC147", borderRadius: 4, padding: "0 8px", color: "#C9A53C", fontWeight: 700, lineHeight: "22px" }}>低度</span>
                </div>
              </div>
            </div>
            {/* Hover 互動示意圖 */}
            <AlarmLevelDemo
              tooltipLines={[
                "嚴重：設備用電高出 30% 以上",
                "中度：設備用電耗能 20%–30%",
                "低度：設備用電耗能 20% 以下",
              ]}
            />
            </>
          }
        />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-2.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          src="/projects/advantech/solution/final-f2-03.webp"
          alt="Feature 2 AI 異常分析"
          note={
            <div className="cs-sol-dpts cs-stack-box">
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">AI 分析摘要</p>
                <p className="cs-sol-dpt-b cs-copy-body">擷取異常點位、設備狀況及處理對策等重要資訊提供給設備管理人員。</p>
              </div>
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">歷史運轉狀態</p>
                <p className="cs-sol-dpt-b cs-copy-body">呈現詳細異常事件說明，提供異常設備過去一個月冰水與冷卻水的進出水溫度變化圖，於圖表中顯示該設備發生異常問題的時間點。</p>
              </div>
            </div>
          }
        />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-1.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          flipped
          src="/projects/advantech/solution/final-f2-04.webp"
          alt="Feature 2 事件分析"
          note={
            <div className="cs-sol-dpts cs-stack-box">
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">事件分析</p>
                <p className="cs-sol-dpt-b cs-copy-body">包含該設備過去發生的詳細事件紀錄，列表中涵蓋事件類別、預期影響、發生時間。</p>
              </div>
            </div>
          }
        />
        <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech/solution/connector-2.svg" alt="" suppressHydrationWarning /></div>
        <FeatureStep
          src="/projects/advantech/solution/final-f2-05.webp"
          alt="Feature 2 故障排除建議"
          note={
            <div className="cs-sol-dpts cs-stack-box">
              <div className="cs-sol-dpt cs-stack-box">
                <p className="cs-sol-dpt-l cs-copy-title">故障的建議處理方式</p>
                <p className="cs-sol-dpt-b cs-copy-body">AI 透過維修手冊的資料，結合點位的實際發生異常紀錄，總結故障代碼，指出主要發生原因，並提供排除異常的解決方法。</p>
              </div>
            </div>
          }
        />
        </div>
      </div>

      {/* ── UI Video Block ── */}
      <div className="cs-sol-block" style={{ marginBottom: 0 }}>
        <h3 className="cs-sol-blk-title cs-copy-title">UI 影片展示</h3>
        <p className="cs-sol-blk-desc cs-text-muted-blue cs-copy-body">UI 影片呈現兩個 feature 的完整操作：從觸發告警、查看圖表分析，到取得系統建議與後續處理。</p>
        <div className="cs-sol-vc cs-stack-box" style={{ background: "#f6faff", borderColor: "#0072bd" }}>
          <p className="cs-sol-vtitle cs-copy-title" style={{ color: "#093060" }}>超約預警操作流程</p>
          <div className="cs-sol-vimg">
            <VimeoPlayer
              videoId="1197912187"
              poster="/projects/advantech/solution/video-sc1.webp"
              title="超約預警操作流程"
            />
          </div>
        </div>
        <div className="cs-sol-vc cs-stack-box" style={{ background: "#eef8ff", borderColor: "#135e78" }}>
          <p className="cs-sol-vtitle cs-copy-title" style={{ color: "#083b4c" }}>模式識別操作流程</p>
          <div className="cs-sol-vimg">
            <VimeoPlayer
              videoId="1197912188"
              poster="/projects/advantech/solution/video-sc2.webp"
              title="模式識別操作流程"
            />
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
