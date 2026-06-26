import Image from "next/image";
import { CaseSection } from "../../../components/case-study";
import { localizeAdvantechTree } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

export default async function InterviewSection() {
  const { locale } = await getAdvantechTranslator();
  return localizeAdvantechTree(locale,
    <CaseSection id="cs-sec-interview" surface title="透過專案訪談，理解能源與廠務管理的實際工作流程">
      <p className="cs-body-muted" style={{ marginBottom: 36 }}>
        訪談內部廠務人員與系統整合商（SI），釐清終端使用者在設備能耗盤查、能源分析與報告產出中的痛點，並找出生成式 AI 在 iEMS 中能切入的工作節點。
      </p>

      {/* Persona Cards */}
      <div className="cs-iv-personas cs-flex-cluster">
        <div className="cs-iv-persona cs-flex-cluster">
          <div className="cs-iv-persona-img cs-object-box">
            <Image src="/projects/advantech/research/interview-persona-factory.webp" alt="內部廠務人員" fill style={{ objectFit: "cover" }} unoptimized />
          </div>
          <div>
            <h3 className="cs-iv-persona-name cs-copy-title">內部廠務人員</h3>
            <p className="cs-iv-persona-desc cs-copy-body">透過內部廠務人員了解終端使用者真實需求與使用痛點，聚焦場地事務管理、設施維護、園區活動服務與園區機電設備。</p>
          </div>
        </div>
        <div className="cs-iv-persona cs-flex-cluster">
          <div className="cs-iv-persona-img cs-object-box">
            <Image src="/projects/advantech/research/interview-persona-si.webp" alt="系統整合商" fill style={{ objectFit: "cover" }} unoptimized />
          </div>
          <div>
            <h3 className="cs-iv-persona-name cs-copy-title">系統整合商（SI）</h3>
            <p className="cs-iv-persona-desc cs-copy-body">透過系統整合商了解「機械加工設備製造業」與「電子產品驗證服務業」使用者常見需求與期待，補足不同產業導入情境。</p>
          </div>
        </div>
      </div>

      {/* 01 Factory Workflow */}
      <div className="cs-sub-section">
        <h3 className="cs-sub-section-heading">01 / 內部廠務人員：設備能耗盤查工作流</h3>
        <p className="cs-sub-section-desc cs-text-muted-blue">資深廠務管理人員在設備能耗盤查中，需要從設備異常查找、報修、維修到後續追蹤一路處理，但目前許多判斷仍依賴人工經驗與分散資料。</p>
        <div className="cs-iv-workflow cs-flex-cluster">
          <div className="cs-iv-stage cs-stack-box">
            <h4 className="cs-iv-stage-title cs-copy-title">設備異常查找</h4>
            <div className="cs-iv-pain cs-stack-box"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc cs-copy-body">依賴人工設定閾值告警；依賴能管專家或設備商定期盤點設備運轉能效。</p></div>
            <div className="cs-iv-ai cs-stack-box"><span className="cs-iv-ai-label">AI 應用機會</span><ul className="cs-marker-list"><li>模式識別學習歷史能耗數據，標記異常熱點</li><li>交叉比對設備歷史能耗與背景環境數據</li><li>預測分析可能出現的能耗異常並提前預警</li></ul></div>
          </div>
          <div className="cs-iv-arrow cs-flex-cluster"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><mask id="am1" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="41"><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="white" /></mask><g mask="url(#am1)"><path d="M0.0129123 0.0211436H47.1355V40.5023H0.0129123V0.0211436Z" fill="#0070C0" /></g></svg></div>
          <div className="cs-iv-stage cs-stack-box">
            <h4 className="cs-iv-stage-title cs-copy-title">設備報修 / 維修</h4>
            <div className="cs-iv-pain cs-stack-box"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc cs-copy-body">異常排除缺乏標準處理流程；原廠通報處理時間過長；在地設備商未必提供維修支援。</p></div>
            <div className="cs-iv-ai cs-stack-box"><span className="cs-iv-ai-label">AI 應用機會</span><ul className="cs-marker-list"><li>建議客服系統自主排除問題，加速異常流程</li><li>主動提供異常報告、可能原因與 SOP 維護流程</li><li>快速擴充各家廠牌文件與版本更新，佈建標準流程</li></ul></div>
          </div>
          <div className="cs-iv-arrow cs-flex-cluster"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><mask id="am2" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="41"><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="white" /></mask><g mask="url(#am2)"><path d="M0.0129123 0.0211436H47.1355V40.5023H0.0129123V0.0211436Z" fill="#0070C0" /></g></svg></div>
          <div className="cs-iv-stage cs-stack-box">
            <h4 className="cs-iv-stage-title cs-copy-title">後續跟進</h4>
            <div className="cs-iv-pain cs-stack-box"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc cs-copy-body">需要人工追蹤並記錄問題排除結果與改善效益。</p></div>
            <div className="cs-iv-ai cs-iv-ai-grow cs-stack-box"><span className="cs-iv-ai-label">AI 應用機會</span><ul className="cs-marker-list"><li>自動產出問題紀錄、對應解決方案與效益分析報告</li><li>針對事件生成文字分析與圖表繪製</li></ul></div>
          </div>
        </div>
      </div>

      {/* 02 SI Workflow */}
      <div className="cs-sub-section">
        <h3 className="cs-sub-section-heading">02 / 系統整合商：能源分析工作流</h3>
        <p className="cs-sub-section-desc cs-text-muted-blue">SI 訪談指出，能源分析工作常卡在資料串接、判讀空間與報告產出。當資料不能直接對應設備與能源管理資訊時，使用者很難快速形成可執行的節能決策。</p>
        <div className="cs-iv-workflow cs-flex-cluster">
          <div className="cs-iv-stage cs-stack-box">
            <h4 className="cs-iv-stage-title cs-copy-title">調用資料</h4>
            <div className="cs-iv-pain cs-stack-box"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc cs-copy-body">設備資料與能源管理資訊斷聯，無法統整比對並可視化呈現。</p></div>
            <div className="cs-iv-ai cs-stack-box"><span className="cs-iv-ai-label">AI 應用機會</span><ul className="cs-marker-list"><li>能耗數值結合設備運行狀態</li><li>彙整生產、天氣等資訊評估合理能耗</li><li>依需求比對分析結果並提供決策建議</li></ul></div>
          </div>
          <div className="cs-iv-arrow cs-flex-cluster"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><mask id="am3" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="41"><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="white" /></mask><g mask="url(#am3)"><path d="M0.0129123 0.0211436H47.1355V40.5023H0.0129123V0.0211436Z" fill="#0070C0" /></g></svg></div>
          <div className="cs-iv-stage cs-stack-box">
            <h4 className="cs-iv-stage-title cs-copy-title">資料分析</h4>
            <div className="cs-iv-pain cs-stack-box"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc cs-copy-body">缺少判斷空間，不易判讀設備能耗是否正常。</p></div>
            <div className="cs-iv-ai cs-stack-box"><span className="cs-iv-ai-label">AI 應用機會</span><ul className="cs-marker-list"><li>主動告警異常程度分級</li><li>有效管理個別機台與工單對應能耗基線</li><li>將專家經驗彙整為 AI 生成建議</li></ul></div>
          </div>
          <div className="cs-iv-arrow cs-flex-cluster"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><mask id="am4" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="41"><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="white" /></mask><g mask="url(#am4)"><path d="M0.0129123 0.0211436H47.1355V40.5023H0.0129123V0.0211436Z" fill="#0070C0" /></g></svg></div>
          <div className="cs-iv-stage cs-stack-box">
            <h4 className="cs-iv-stage-title cs-copy-title">報告產出</h4>
            <div className="cs-iv-pain cs-stack-box"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc cs-copy-body">產出過程耗時，儀錶板畫面難以直接應用於報告書。</p></div>
            <div className="cs-iv-ai cs-stack-box"><span className="cs-iv-ai-label">AI 應用機會</span><ul className="cs-marker-list"><li>快速產生申報用報告雛形</li><li>整合數值分析工具，如迴歸分析</li><li>提供需量與容需分析方案評估建議，擬定最佳策略</li></ul></div>
          </div>
        </div>
      </div>

      {/* 訪談綜合洞察 */}
      <div className="cs-synthesis">
        <div className="cs-synthesis-hd">訪談綜合洞察</div>
        <div className="cs-synthesis-body cs-flex-cluster">
          <div className="cs-synthesis-insights cs-stack-box">
            {[
              { n: "01", title: "資料與工作流程斷裂", desc: "設備資料、能耗資料、環境資料與維修紀錄分散，使用者需要人工串接才能判斷問題。" },
              { n: "02", title: "判斷依賴經驗", desc: "異常判讀、節能策略與維修建議常依賴專家經驗，缺少可複用的標準流程。" },
              { n: "03", title: "輸出難以直接行動", desc: "報告、問題紀錄與改善效益需要人工整理，導致追蹤與決策成本偏高。" },
            ].map((item) => (
              <div key={item.n} className="cs-synthesis-insight">
                <div className="cs-synthesis-card cs-stack-box">
                  <div className="cs-synthesis-card-heading cs-flex-cluster">
                    <div className="cs-synthesis-badge cs-inline-pill">{item.n}</div>
                    <p className="cs-synthesis-card-title cs-copy-title">{item.title}</p>
                  </div>
                  <p className="cs-synthesis-card-desc cs-copy-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cs-synthesis-photo cs-object-box">
            <Image src="/projects/advantech/research/interview-synthesis-photo.webp" alt="訪談現場" fill style={{ objectFit: "cover" }} unoptimized />
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
