/* Laushu 流程圖（server 元件，純 SVG viewBox 自適應）。
   文字以 <text> 子字串呈現，交由 localizeLaushuTree 自動中翻英。 */
import type { ReactNode } from "react";

const PEOPLE = "/projects/laushu/people";

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
      className="laushu-flow-node-label"
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
    <text x={x} y={y} textAnchor={anchor} className="laushu-flow-edge-label" fill="#6b6878">
      {children}
    </text>
  );
}

/** 利害關係人流程：會計師 ↔ 公司 → 外包工作者 */
export function StakeholderFlow() {
  return (
    <div className="laushu-diagram">
      <svg
        viewBox="0 0 1180 380"
        className="laushu-flow-svg"
        role="img"
        aria-label="會計師、公司與外包工作者的勞報單流程"
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

        <NodeLabel cx={140} cy={255} lines={["會計事務所", "會計師"]} />
        <NodeLabel cx={590} cy={262} lines={["公司"]} />
        <NodeLabel cx={1040} cy={262} lines={["外包工作者"]} />

        {/* 邊標籤 */}
        <EdgeLabel x={360} y={194}>協助彙整勞報單</EdgeLabel>
        <EdgeLabel x={360} y={240}>回傳勞報單</EdgeLabel>
        <EdgeLabel x={825} y={59}>發送勞報單</EdgeLabel>
        <EdgeLabel x={825} y={194}>發出工資</EdgeLabel>
        <EdgeLabel x={825} y={370}>確認勞報單</EdgeLabel>
      </svg>
    </div>
  );
}

/** 解決方案流程：公司 → 外包工作者（發送 / 發出工資 / 確認） */
export function SolutionFlow() {
  return (
    <div className="laushu-diagram">
      <svg
        viewBox="0 0 900 360"
        className="laushu-flow-svg"
        role="img"
        aria-label="公司發送勞報單給外包工作者的流程"
      >
        <ArrowDefs id="laushu-arrow-sol" />
        <g stroke="#c7c2d6" strokeWidth="2" fill="none">
          <path d="M300 110 C420 55 540 55 640 108" markerEnd="url(#laushu-arrow-sol)" />
          <path d="M310 180 H600" markerEnd="url(#laushu-arrow-sol)" />
          <path d="M640 252 C540 305 420 305 300 250" markerEnd="url(#laushu-arrow-sol)" />
        </g>

        <Node cx={170} cy={180} r={120} tone="deep" />
        <Node cx={730} cy={180} r={110} />

        <NodeImage href={`${PEOPLE}/company.png`} cx={170} top={52} w={150} h={131} />
        <NodeImage href={`${PEOPLE}/worker.png`} cx={730} top={40} w={130} h={150} />

        <NodeLabel cx={170} cy={232} lines={["公司"]} />
        <NodeLabel cx={730} cy={232} lines={["外包工作者"]} />

        <EdgeLabel x={470} y={62}>發送勞報單</EdgeLabel>
        <EdgeLabel x={455} y={166}>發出工資</EdgeLabel>
        <EdgeLabel x={470} y={300}>確認勞報單</EdgeLabel>
      </svg>
    </div>
  );
}

/** 問卷／訪談結構：基本資料 → 會計師 */
export function SurveyFlow({ note }: { note: ReactNode }) {
  return (
    <div className="laushu-survey-flow">
      <div className="laushu-survey-node">
        <strong>基本資料</strong>
        <span>身份、年齡、年資</span>
        <span>使用勞報單經驗</span>
      </div>
      <div className="laushu-survey-mid">
        <svg viewBox="0 0 200 40" className="laushu-survey-arrow" aria-hidden="true">
          <ArrowDefs id="laushu-arrow-survey" />
          <path d="M4 20 H188" stroke="#c7c2d6" strokeWidth="2" fill="none" markerEnd="url(#laushu-arrow-survey)" />
        </svg>
        <div className="laushu-survey-note">{note}</div>
      </div>
      <div className="laushu-survey-node">
        <strong>會計師</strong>
        <span>了解建立勞報單經驗</span>
        <span>了解建檔的過程感受</span>
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

function SurveyBars({ title, items }: { title: string; items: SurveyBar[] }) {
  return (
    <section className="laushu-survey-bars">
      <h4>{title}</h4>
      <div className="laushu-bar-list">
        {items.map((item) => (
          <div className="laushu-bar-row" key={item.label}>
            <div className="laushu-bar-label">
              <span>{item.label}</span>
              <strong>{item.value}%</strong>
            </div>
            <div className="laushu-bar" aria-hidden="true">
              <span className="laushu-bar-fill" style={{ width: `${item.value}%` }} />
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
}: {
  profile: SurveyBar[];
  experience: SurveyBar[];
  volume: SurveyBar[];
}) {
  return (
    <section className="laushu-survey-stats" aria-labelledby="laushu-survey-stats-title">
      <div className="laushu-survey-block-head">
        <span>問卷結果</span>
        <h3 id="laushu-survey-stats-title">量化精選</h3>
      </div>

      <div className="laushu-stat-grid">
        <article className="laushu-stat-card">
          <strong>44</strong>
          <span>份問卷收集</span>
        </article>
        <article className="laushu-stat-card">
          <strong>39</strong>
          <span>份有效問卷</span>
        </article>
        <article className="laushu-stat-card">
          <strong>86.4%</strong>
          <span>篩選題回答「是」</span>
        </article>
      </div>

      <div className="laushu-survey-chart-grid">
        <section className="laushu-donut-card">
          <h4>受訪者輪廓</h4>
          <div className="laushu-donut-layout">
            <div className="laushu-donut">
              <svg viewBox="0 0 120 120" role="img" aria-label="受訪者職業分布">
                <circle className="laushu-donut-track" cx="60" cy="60" r="46" pathLength="100" />
                {profile.map((item, index) => {
                  const currentOffset = profile
                    .slice(0, index)
                    .reduce((sum, previous) => sum + previous.value, 0);
                  return (
                    <circle
                      key={item.label}
                      className="laushu-donut-segment"
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
              <div className="laushu-donut-center">
                <strong>38</strong>
                <span>位填答</span>
              </div>
            </div>
            <ul className="laushu-donut-legend">
              {profile.map((item, index) => (
                <li key={item.label}>
                  <span className="laushu-donut-dot" style={{ background: donutColors[index] }} />
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="laushu-survey-bar-groups">
          <SurveyBars title="處理經驗" items={experience} />
          <SurveyBars title="每次處理份數" items={volume} />
        </div>
      </div>

      <p className="laushu-survey-summary">
        樣本與原先規劃的 TA 相符，且多數填答者具一年以上實務經驗，能作為後續訪談篩選與研究方向的參考。
      </p>
    </section>
  );
}

export function SurveyInsight({
  stepQuotes,
  painQuotes,
}: {
  stepQuotes: string[];
  painQuotes: string[];
}) {
  return (
    <section className="laushu-insight" aria-labelledby="laushu-survey-insight-title">
      <div className="laushu-survey-block-head">
        <span>核心洞察</span>
        <h3 id="laushu-survey-insight-title">單一步驟不難，整體流程卻很耗時</h3>
      </div>
      <div className="laushu-insight-grid">
        <article className="laushu-insight-col">
          <span className="laushu-insight-label">單步驟感受</span>
          <h4>熟悉後多半不覺得困難</h4>
          <ul>
            {stepQuotes.map((quote) => <li key={quote}>{quote}</li>)}
          </ul>
        </article>
        <article className="laushu-insight-col laushu-insight-col-pain">
          <span className="laushu-insight-label">整體痛點</span>
          <h4>量一大、要追蹤時就變麻煩</h4>
          <ul>
            {painQuotes.map((quote) => <li key={quote}>{quote}</li>)}
          </ul>
        </article>
      </div>
      <p className="laushu-insight-summary">
        拆開看，每個步驟都不難，甚至已習慣成自然；但合起來、數量增加、需要追蹤回簽進度時，整體就變得花時間又無趣。因此下一步透過深入訪談，先聚焦會自己經手勞報單的公司端。
      </p>
    </section>
  );
}
