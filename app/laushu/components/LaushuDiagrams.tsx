/* Laushu 流程圖（server 元件，純 SVG viewBox 自適應）。 */
import type { ReactNode } from "react";

const PEOPLE = "/projects/laushu/people";
type Translator = (text: string) => string;

/** 圓形節點內的人物插圖（透明背景 PNG，置於圓內上半部） */
function NodeImage({
  href,
  cx,
  top,
  w,
  h,
}: {
  href: string;
  cx: number;
  top: number;
  w: number;
  h: number;
}) {
  return (
    <image
      href={href}
      x={cx - w / 2}
      y={top}
      width={w}
      height={h}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    />
  );
}

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path
          d="M1 1 9 5 1 9"
          fill="none"
          stroke="context-stroke"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>
  );
}

function Node({
  cx,
  cy,
  r,
  tone = "purple",
}: {
  cx: number;
  cy: number;
  r: number;
  tone?: "purple" | "deep";
}) {
  const fill = tone === "deep" ? "#b794e8" : "#ead9fb";
  return (
    <circle cx={cx} cy={cy} r={r} fill={fill} />
  );
}

function NodeLabel({
  cx,
  cy,
  lines,
}: {
  cx: number;
  cy: number;
  lines: string[];
}) {
  const lh = 30;
  const startY = cy - ((lines.length - 1) * lh) / 2 + 8;
  return (
    <text
      x={cx}
      y={startY}
      textAnchor="middle"
      className="cs-diagram-label cs-diagram-label--node"
      fill="#2c2440"
    >
      {lines.map((line, i) => (
        <tspan key={line} x={cx} dy={i === 0 ? 0 : lh}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function EdgeLabel({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="cs-diagram-label cs-diagram-label--edge" fill="#6b6878">
      {children}
    </text>
  );
}

/** 利害關係人流程：會計師 ↔ 公司 → 外包工作者 */
export function StakeholderFlow({ t }: { t: Translator }) {
  return (
    <div className="cs-diagram-frame cs-diagram-frame--flow">
      <svg
        viewBox="0 0 1180 380"
        className="cs-diagram-graphic cs-diagram-graphic--flow"
        role="img"
        aria-label={t("會計師、公司與外包工作者的勞報單流程")}
      >
        <ArrowDefs id="laushu-arrow-stake" />

        {/* 連線 */}
        <g stroke="#c7c2d6" strokeWidth="2" fill="none">
          {/* 會計師 ↔ 公司（雙向） */}
          <path d="M270 210 H450" markerEnd="url(#laushu-arrow-stake)" markerStart="url(#laushu-arrow-stake)" />
          {/* 公司 → 外包（發送，上弧） */}
          <path d="M674 98 C780 70 880 70 985 92" markerEnd="url(#laushu-arrow-stake)" />
          {/* 公司 → 外包（發出工資，中） */}
          <path d="M730 210 H910" markerEnd="url(#laushu-arrow-stake)" />
          {/* 外包 → 公司（確認，下弧） */}
          <path d="M985 328 C880 345 780 345 674 322" markerEnd="url(#laushu-arrow-stake)" />
        </g>

        {/* 節點 */}
        <Node cx={140} cy={210} r={110} />
        <Node cx={590} cy={210} r={120} tone="deep" />
        <Node cx={1040} cy={210} r={110} />

        <NodeImage href={`${PEOPLE}/accountant.png`} cx={140} top={72} w={108} h={148} />
        <NodeImage href={`${PEOPLE}/company.png`} cx={590} top={84} w={150} h={131} />
        <NodeImage href={`${PEOPLE}/worker.png`} cx={1040} top={70} w={130} h={150} />

        <NodeLabel cx={140} cy={255} lines={[t("會計事務所"), t("會計師")]} />
        <NodeLabel cx={590} cy={262} lines={[t("公司")]} />
        <NodeLabel cx={1040} cy={262} lines={[t("外包工作者")]} />

        {/* 邊標籤 */}
        <EdgeLabel x={360} y={194}>{t("協助彙整勞報單")}</EdgeLabel>
        <EdgeLabel x={360} y={240}>{t("回傳勞報單")}</EdgeLabel>
        <EdgeLabel x={825} y={59}>{t("發送勞報單")}</EdgeLabel>
        <EdgeLabel x={825} y={194}>{t("發出工資")}</EdgeLabel>
        <EdgeLabel x={825} y={370}>{t("確認勞報單")}</EdgeLabel>
      </svg>
    </div>
  );
}

/** 問卷／訪談結構：基本資料 → 會計師 */
export function SurveyFlow({ note, t }: { note: ReactNode; t: Translator }) {
  return (
    <div className="cs-survey-flow">
      <div className="cs-survey-node">
        <strong>{t("基本資料")}</strong>
        <span>{t("身份、年齡、年資")}</span>
        <span>{t("使用勞報單經驗")}</span>
      </div>
      <div className="cs-survey-flow-mid">
        <svg viewBox="0 0 200 40" className="cs-survey-arrow" aria-hidden="true">
          <ArrowDefs id="laushu-arrow-survey" />
          <path className="cs-survey-arrow-line" d="M4 20 H188" stroke="#c7c2d6" strokeWidth="2" fill="none" />
          <path className="cs-survey-arrow-line cs-survey-arrow-line--desktop" d="M4 20 H188" stroke="#c7c2d6" strokeWidth="2" fill="none" markerEnd="url(#laushu-arrow-survey)" />
        </svg>
        <div className="cs-survey-note">{note}</div>
        <svg viewBox="0 0 200 40" className="cs-survey-arrow cs-survey-arrow--mobile" aria-hidden="true">
          <ArrowDefs id="laushu-arrow-survey-mobile" />
          <path d="M4 20 H188" stroke="#c7c2d6" strokeWidth="2" fill="none" markerEnd="url(#laushu-arrow-survey-mobile)" />
        </svg>
      </div>
      <div className="cs-survey-node">
        <strong>{t("會計師")}</strong>
        <span>{t("了解建立勞報單經驗")}</span>
        <span>{t("了解建檔的過程感受")}</span>
      </div>
    </div>
  );
}

type SurveyBar = {
  label: string;
  value: number;
};

const donutColors = [
  "var(--laushu-primary-600)",
  "var(--laushu-primary-500)",
  "var(--laushu-primary-400)",
  "var(--laushu-primary-200)",
];

function SurveyBars({ title, items, t }: { title: string; items: SurveyBar[]; t: Translator }) {
  return (
    <section className="cs-survey-bars">
      <h4>{t(title)}</h4>
      <div className="cs-survey-bar-list">
        {items.map((item) => (
          <div className="cs-survey-bar-row" key={item.label}>
            <div className="cs-survey-bar-label">
              <span>{t(item.label)}</span>
              <strong>{item.value}%</strong>
            </div>
            <div className="cs-survey-bar" aria-hidden="true">
              <span className="cs-survey-bar-fill" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SurveyStats({
  profile,
  experience,
  volume,
  t,
}: {
  profile: SurveyBar[];
  experience: SurveyBar[];
  volume: SurveyBar[];
  t: Translator;
}) {
  return (
    <section className="cs-survey-panel cs-survey-panel--stats" aria-labelledby="laushu-survey-stats-title">
      <div className="cs-survey-block-head">
        <span>{t("問卷結果")}</span>
        <h3 id="laushu-survey-stats-title">{t("量化精選")}</h3>
      </div>

      <div className="cs-survey-stat-grid">
        <article className="cs-survey-stat-card">
          <strong>44</strong>
          <span>{t("份問卷收集")}</span>
        </article>
        <article className="cs-survey-stat-card">
          <strong>39</strong>
          <span>{t("份有效問卷")}</span>
        </article>
        <article className="cs-survey-stat-card">
          <strong>86.4%</strong>
          <span>{t("篩選題回答「是」")}</span>
        </article>
      </div>

      <div className="cs-survey-chart-grid">
        <section className="cs-survey-donut-card">
          <h4>{t("受訪者輪廓")}</h4>
          <div className="cs-survey-donut-layout">
            <div className="cs-survey-donut">
              <svg viewBox="0 0 120 120" role="img" aria-label={t("受訪者職業分布")}>
                <circle className="cs-survey-donut-track" cx="60" cy="60" r="46" pathLength="100" />
                {profile.map((item, index) => {
                  const currentOffset = profile
                    .slice(0, index)
                    .reduce((sum, previous) => sum + previous.value, 0);
                  return (
                    <circle
                      key={item.label}
                      className="cs-survey-donut-segment"
                      cx="60"
                      cy="60"
                      r="46"
                      pathLength="100"
                      stroke={donutColors[index]}
                      strokeDasharray={`${item.value} ${100 - item.value}`}
                      strokeDashoffset={-currentOffset}
                    />
                  );
                })}
              </svg>
              <div className="cs-survey-donut-center">
                <strong>39</strong>
                <span>{t("位填答")}</span>
              </div>
            </div>
            <ul className="cs-survey-donut-legend">
              {profile.map((item, index) => (
                <li key={item.label}>
                  <span className="cs-survey-donut-dot" style={{ background: donutColors[index] }} />
                  <span>{t(item.label)}</span>
                  <strong>{item.value}%</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="cs-survey-bar-groups">
          <SurveyBars title="處理經驗" items={experience} t={t} />
          <SurveyBars title="每次處理份數" items={volume} t={t} />
        </div>
      </div>

      <p className="cs-survey-summary">
        {t("樣本與原先規劃的 TA 相符，且多數填答者具一年以上實務經驗，能作為後續訪談篩選與研究方向的參考。")}
      </p>
    </section>
  );
}

export function SurveyInsight({
  stepQuotes,
  painQuotes,
  t,
}: {
  stepQuotes: string[];
  painQuotes: string[];
  t: Translator;
}) {
  return (
    <section className="cs-survey-panel cs-survey-panel--insight" aria-labelledby="laushu-survey-insight-title">
      <div className="cs-survey-block-head">
        <span>{t("核心洞察")}</span>
        <h3 id="laushu-survey-insight-title">{t("單一步驟不難，整體流程卻很耗時")}</h3>
      </div>
      <div className="cs-survey-insight-grid">
        <article className="cs-survey-insight-col">
          <span className="cs-survey-insight-label">{t("單步驟感受")}</span>
          <h4>{t("熟悉後多半不覺得困難")}</h4>
          <ul>
            {stepQuotes.map((quote) => <li key={quote}>{t(quote)}</li>)}
          </ul>
        </article>
        <article className="cs-survey-insight-col cs-survey-insight-col--pain">
          <span className="cs-survey-insight-label">{t("整體痛點")}</span>
          <h4>{t("量一大、要追蹤時就變麻煩")}</h4>
          <ul>
            {painQuotes.map((quote) => <li key={quote}>{t(quote)}</li>)}
          </ul>
        </article>
      </div>
      <p className="cs-survey-insight-summary">
        {t("拆開看，每個步驟都不難，甚至已習慣成自然；但合起來、數量增加、需要追蹤回簽進度時，整體就變得花時間又無趣。因此下一步透過深入訪談，先聚焦會自己經手勞報單的公司端。")}
      </p>
    </section>
  );
}
