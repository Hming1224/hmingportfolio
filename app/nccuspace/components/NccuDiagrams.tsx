/* NCCUSpace 案例頁圖表（server 元件，純 SVG / CSS，無互動）。
   所有可見文字都以字串子節點呈現，交由 localizeNccuTree 自動中翻英。
   配色：藍圓＝行為、黃矩形＝介面、紫菱形＝系統 / 決策、綠＝預約流程頁。 */
import type { ReactNode } from "react";

/* ── 共用 SVG 基礎元件 ── */

function ArrowDefs({ id, color = "#b9b3ad" }: { id: string; color?: string }) {
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
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>
  );
}

function Lines({
  cx,
  cy,
  lines,
  fill = "#2f2a26",
  lh = 22,
  size,
}: {
  cx: number;
  cy: number;
  lines: string[];
  fill?: string;
  lh?: number;
  size?: number;
}) {
  const startY = cy - ((lines.length - 1) * lh) / 2;
  return (
    <text
      x={cx}
      y={startY}
      textAnchor="middle"
      dominantBaseline="middle"
      className="nccu-flow-label"
      fill={fill}
      style={size ? { fontSize: size } : undefined}
    >
      {lines.map((line, i) => (
        <tspan key={line} x={cx} dy={i === 0 ? 0 : lh}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/** 藍色圓形 = 使用者行為 */
function Behavior({ cx, cy, r = 60, lines }: { cx: number; cy: number; r?: number; lines: string[] }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="#cfe8fb" />
      <Lines cx={cx} cy={cy} lines={lines} />
    </>
  );
}

/** 黃色矩形 = 介面 */
function Screen({
  cx,
  cy,
  w = 150,
  h = 110,
  lines,
}: {
  cx: number;
  cy: number;
  w?: number;
  h?: number;
  lines: string[];
}) {
  return (
    <>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={10} fill="#fbcf52" />
      <Lines cx={cx} cy={cy} lines={lines} />
    </>
  );
}

/** 紫色菱形 = 系統 / 決策 */
function Decision({ cx, cy, s = 78, lines }: { cx: number; cy: number; s?: number; lines: string[] }) {
  return (
    <>
      <polygon points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`} fill="#e7caf3" />
      <Lines cx={cx} cy={cy} lines={lines} />
    </>
  );
}

/** 綠色矩形 = 預約流程頁 */
function PageNode({
  cx,
  cy,
  w = 200,
  h = 150,
  lines,
}: {
  cx: number;
  cy: number;
  w?: number;
  h?: number;
  lines: string[];
}) {
  return (
    <>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={8} fill="#13a463" />
      <Lines cx={cx} cy={cy} lines={lines} fill="#ffffff" />
    </>
  );
}

function EdgeLabel({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="nccu-flow-edge" fill="#7a7770">
      {children}
    </text>
  );
}

function FlowFrame({
  width,
  height,
  aria,
  arrowId,
  children,
}: {
  width: number;
  height: number;
  aria: string;
  arrowId: string;
  children: ReactNode;
}) {
  return (
    <div className="nccu-flow-scroll">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="nccu-flow-svg"
        style={{ minWidth: width / 1.7 }}
        role="img"
        aria-label={aria}
      >
        <ArrowDefs id={arrowId} />
        {children}
      </svg>
    </div>
  );
}

/* ── 用例一：一目瞭然看到可預約時間與空間 ── */
export function UseCase1Flow() {
  const a = "url(#nccu-arrow-c1)";
  const y = 120;
  const xs = [95, 320, 545, 790, 1035, 1235, 1460, 1690, 1925, 2150];
  return (
    <FlowFrame width={2260} height={300} aria="用例一介面流程：一目瞭然看到可預約時間與空間" arrowId="nccu-arrow-c1">
      <g stroke="#c4beb6" strokeWidth="1.8" fill="none" markerEnd={a}>
        <path d={`M${xs[0] + 60} ${y}H${xs[1] - 75}`} />
        <path d={`M${xs[1] + 75} ${y}H${xs[2] - 60}`} />
        <path d={`M${xs[2] + 60} ${y}H${xs[3] - 75}`} />
        <path d={`M${xs[3] + 75} ${y}H${xs[4] - 60}`} />
        <path d={`M${xs[4] + 60} ${y}H${xs[5] - 60}`} />
        <path d={`M${xs[5] + 60} ${y}H${xs[6] - 78}`} />
        <path d={`M${xs[6] + 78} ${y}H${xs[7] - 60}`} />
        <path d={`M${xs[7] + 60} ${y}H${xs[8] - 75}`} />
        <path d={`M${xs[8] + 75} ${y}H${xs[9] - 60}`} />
        {/* 否：回到選擇分館 */}
        <path d={`M${xs[6]} ${y + 78}V245H${xs[2]}V${y + 62}`} />
      </g>
      <Behavior cx={xs[0]} cy={y} lines={["打開場地", "管理系統"]} />
      <Screen cx={xs[1]} cy={y} lines={["場地管理系統"]} />
      <Behavior cx={xs[2]} cy={y} lines={["選擇分館", "空間分類", "預約人數"]} />
      <Screen cx={xs[3]} cy={y} lines={["系統提供符合", "人數的討論室"]} />
      <Behavior cx={xs[4]} cy={y} lines={["查看各空間", "可預約時段"]} />
      <Behavior cx={xs[5]} cy={y} lines={["點日期", "日期 D+7"]} />
      <Decision cx={xs[6]} cy={y} lines={["是否有想要", "的預約時段"]} />
      <Behavior cx={xs[7]} cy={y} lines={["點按想", "預約時段"]} />
      <Screen cx={xs[8]} cy={y} lines={["系統跳出預約", "資訊提示框"]} />
      <Behavior cx={xs[9]} cy={y} lines={["確認預約"]} />
      <EdgeLabel x={(xs[6] + xs[7]) / 2} y={y - 14}>是</EdgeLabel>
      <EdgeLabel x={(xs[2] + xs[6]) / 2} y={262}>否</EdgeLabel>
    </FlowFrame>
  );
}

/* ── 用例二：篩選時空、找到符合需求空間後預約 ── */
export function UseCase2Flow() {
  const a = "url(#nccu-arrow-c2)";
  const y = 120;
  const xs = [95, 300, 510, 720, 940, 1170, 1410, 1640, 1865];
  return (
    <FlowFrame width={1975} height={300} aria="用例二介面流程：篩選時間空間找到符合需求的空間後進行預約" arrowId="nccu-arrow-c2">
      <g stroke="#c4beb6" strokeWidth="1.8" fill="none" markerEnd={a}>
        <path d={`M${xs[0] + 60} ${y}H${xs[1] - 78}`} />
        <path d={`M${xs[1] + 78} ${y}H${xs[2] - 60}`} />
        <path d={`M${xs[2] + 60} ${y}H${xs[3] - 75}`} />
        <path d={`M${xs[3] + 75} ${y}H${xs[4] - 75}`} />
        <path d={`M${xs[4] + 75} ${y}H${xs[5] - 60}`} />
        <path d={`M${xs[5] + 60} ${y}H${xs[6] - 60}`} />
        <path d={`M${xs[6] + 60} ${y}H${xs[7] - 75}`} />
        <path d={`M${xs[7] + 75} ${y}H${xs[8] - 60}`} />
        {/* 是：已登入直接到登記頁面 */}
        <path d={`M${xs[1]} ${y + 78}V245H${xs[4]}V${y + 55}`} />
      </g>
      <Behavior cx={xs[0]} cy={y} lines={["預約空間"]} />
      <Decision cx={xs[1]} cy={y} lines={["是否登入"]} />
      <Behavior cx={xs[2]} cy={y} lines={["登入"]} />
      <Screen cx={xs[3]} cy={y} lines={["登入頁"]} />
      <Screen cx={xs[4]} cy={y} lines={["登記頁面"]} />
      <Behavior cx={xs[5]} cy={y} lines={["確認", "預約資訊"]} />
      <Behavior cx={xs[6]} cy={y} lines={["輸入共同", "使用者學號"]} />
      <Screen cx={xs[7]} cy={y} lines={["預約成功頁面"]} />
      <Behavior cx={xs[8]} cy={y} lines={["預約成功"]} />
      <EdgeLabel x={(xs[1] + xs[2]) / 2} y={y - 14}>否</EdgeLabel>
      <EdgeLabel x={(xs[1] + xs[4]) / 2} y={262}>是</EdgeLabel>
    </FlowFrame>
  );
}

/* ── 用例三：確認預約資訊並修改 / 取消 ── */
export function UseCase3Flow() {
  const a = "url(#nccu-arrow-c3)";
  const yT = 130;
  const xs = [95, 290, 470, 640, 805, 965, 1145];
  const branchX = [1145, 1370, 1585, 1790, 2010];
  return (
    <FlowFrame width={2120} height={470} aria="用例三介面流程：確認預約資訊並修改或取消" arrowId="nccu-arrow-c3">
      <g stroke="#c4beb6" strokeWidth="1.8" fill="none" markerEnd={a}>
        <path d={`M${xs[0] + 58} ${yT}H${xs[1] - 78}`} />
        <path d={`M${xs[1] + 78} ${yT}H${xs[2] - 58}`} />
        <path d={`M${xs[2] + 58} ${yT}H${xs[3] - 65}`} />
        <path d={`M${xs[3] + 65} ${yT}H${xs[4] - 78}`} />
        <path d={`M${xs[4] + 78} ${yT}H${xs[5] - 58}`} />
        <path d={`M${xs[5] + 58} ${yT}H${xs[6] - 65}`} />
        {/* 查看借用紀錄 → 信箱收信 */}
        <path d={`M${xs[0]} ${yT + 60}V330H${xs[1]}V300`} />
        {/* 是：已登入直接到借用紀錄 */}
        <path d={`M${xs[3]} ${yT + 78}V300H${xs[6] - 30}V${yT + 65}`} />
        {/* 借用紀錄 → 修改分支（上） */}
        <path d={`M${xs[6] + 65} ${yT}H${branchX[1] - 58}`} />
        <path d={`M${branchX[1] + 58} ${yT}H${branchX[2] - 78}`} />
        <path d={`M${branchX[2] + 78} ${yT}H${branchX[3] - 58}`} />
        <path d={`M${branchX[3] + 58} ${yT}H${branchX[4] - 65}`} />
        {/* 修改否：回借用紀錄 */}
        <path d={`M${branchX[2]} ${yT - 70}V55H${xs[6]}V${yT - 65}`} />
        {/* 借用紀錄 → 取消分支（下） */}
        <path d={`M${xs[6]} ${yT + 65}V330H${branchX[1] - 58}`} />
        <path d={`M${branchX[1] + 58} 330H${branchX[2] - 78}`} />
        <path d={`M${branchX[2] + 78} 330H${branchX[3] - 58}`} />
        <path d={`M${branchX[3] + 58} 330V${yT + 70}H${branchX[4]}V${yT + 60}`} />
        {/* 取消否：回借用紀錄 */}
        <path d={`M${branchX[2]} 400V435H${xs[6]}V${yT + 65}`} />
      </g>
      <Behavior cx={xs[0]} cy={yT} lines={["查看借用紀錄"]} r={58} />
      <Decision cx={xs[1]} cy={yT} s={70} lines={["是否登入"]} />
      <Behavior cx={xs[2]} cy={yT} r={58} lines={["登入頁"]} />
      <Behavior cx={xs[3]} cy={yT} r={58} lines={["登入"]} />
      <Decision cx={xs[4]} cy={yT} s={70} lines={["是否登入"]} />
      <Behavior cx={xs[5]} cy={yT} r={58} lines={["借用紀錄"]} />
      <Screen cx={xs[6]} cy={yT} w={130} h={100} lines={["借用紀錄"]} />
      <Screen cx={xs[1]} cy={330} w={130} h={92} lines={["信箱收信"]} />
      {/* 修改分支 */}
      <Behavior cx={branchX[1]} cy={yT} r={58} lines={["修改", "借用紀錄"]} />
      <Decision cx={branchX[2]} cy={yT} s={70} lines={["是否修改"]} />
      <Behavior cx={branchX[3]} cy={yT} r={58} lines={["修改學號"]} />
      <Screen cx={branchX[4]} cy={yT} w={150} h={110} lines={["借用紀錄頁面", "（更新後）"]} />
      {/* 取消分支 */}
      <Behavior cx={branchX[1]} cy={330} r={58} lines={["取消", "借用紀錄"]} />
      <Decision cx={branchX[2]} cy={330} s={70} lines={["是否取消"]} />
      <Behavior cx={branchX[3]} cy={330} r={58} lines={["確認取消"]} />
      <EdgeLabel x={(xs[4] + xs[5]) / 2} y={yT - 14}>否</EdgeLabel>
      <EdgeLabel x={(xs[3] + xs[6]) / 2} y={295}>是</EdgeLabel>
      <EdgeLabel x={(branchX[2] + xs[6]) / 2} y={48}>否</EdgeLabel>
      <EdgeLabel x={(branchX[3] + branchX[4]) / 2} y={yT - 14}>成功修改</EdgeLabel>
      <EdgeLabel x={(branchX[3] + branchX[4]) / 2} y={324}>成功取消</EdgeLabel>
      <EdgeLabel x={(branchX[2] + xs[6]) / 2} y={428}>否</EdgeLabel>
    </FlowFrame>
  );
}

/* ── 資訊架構：從上到下流程圖 ── */
export function IAFlow() {
  const a = "url(#nccu-arrow-ia)";
  const colL = 230;
  const colR = 470;
  return (
    <div className="nccu-ia-scroll">
      <svg viewBox="0 0 640 1320" className="nccu-ia-svg" role="img" aria-label="NCCUSpace 預約流程資訊架構，由上到下">
        <ArrowDefs id="nccu-arrow-ia" />
        <g stroke="#c4beb6" strokeWidth="1.6" fill="none" markerEnd={a}>
          {/* P1 分支 */}
          <path d={`M${colL} 92V120`} />
          <path d={`M${colL} 92H${colR}V120`} />
          {/* 左欄主鏈 */}
          <path d={`M${colL} 168V200`} />
          <path d={`M${colL} 248V280`} />
          <path d={`M${colL} 328V360`} />
          <path d={`M${colL} 408V440`} />
          <path d={`M${colL} 488V520`} />
          <path d={`M${colL} 568V600`} />
          <path d={`M${colL} 648V680`} />
          <path d={`M${colL} 728V768`} />
          {/* 預約流程頁-2 分支 */}
          <path d={`M170 880V910`} />
          <path d={`M290 880V910`} />
          <path d="M170 958V1000H230" />
          <path d="M290 958V1000H230" />
          {/* → 預約流程頁-3 */}
          <path d={`M${colL} 1040V1080`} />
          <path d={`M${colL} 1128V1160`} />
          <path d="M160 1208V1236" />
          <path d="M300 1208V1236" />
          {/* 個人紀錄回流（虛線） */}
          <path d="M540 250V58H320" strokeDasharray="6 6" />
        </g>
        <PageNode cx={colL} cy={60} w={210} h={64} lines={["預約流程頁-1"]} />
        <Screen cx={colL} cy={148} w={150} h={54} lines={["輸入帳號", "密碼登入"]} />
        <Screen cx={colR} cy={148} w={170} h={54} lines={["看預約規則", "和流程"]} />
        <Screen cx={colL} cy={228} w={150} h={44} lines={["選擇場館"]} />
        <Screen cx={colR} cy={228} w={150} h={44} lines={["個人紀錄"]} />
        <Screen cx={colL} cy={308} w={150} h={44} lines={["選擇討論室"]} />
        <Screen cx={colL} cy={388} w={150} h={44} lines={["篩選人數"]} />
        <Screen cx={colL} cy={468} w={150} h={54} lines={["選擇可預約", "的時間"]} />
        <Screen cx={colL} cy={548} w={150} h={44} lines={["選擇日期"]} />
        <Screen cx={colL} cy={628} w={150} h={44} lines={["選擇時段"]} />
        <Screen cx={colL} cy={708} w={150} h={44} lines={["選擇至少 30 分鐘"]} />
        <Screen cx={colL} cy={800} w={170} h={54} lines={["獲得可預約的", "討論室推薦"]} />
        <PageNode cx={colL} cy={942} w={210} h={64} lines={["預約流程頁-2"]} />
        <Screen cx={170} cy={1020} w={130} h={54} lines={["輸入共同使", "用者的學號"]} />
        <Screen cx={300} cy={1020} w={130} h={54} lines={["修改共同使", "用者的學號"]} />
        <PageNode cx={colL} cy={1108} w={210} h={64} lines={["預約流程頁-3"]} />
        <Screen cx={colL} cy={1188} w={170} h={44} lines={["確認預約資訊"]} />
        <Screen cx={160} cy={1268} w={120} h={44} lines={["收信"]} />
        <Screen cx={300} cy={1268} w={150} h={54} lines={["進入個人紀錄", "確認資訊"]} />
      </svg>
    </div>
  );
}

/* ── 品牌形象 mind map ── */
export function BrandMindmap() {
  const a = "url(#nccu-arrow-brand)";
  return (
    <div className="nccu-flow-scroll">
      <svg viewBox="0 0 1180 560" className="nccu-brand-svg" style={{ minWidth: 720 }} role="img" aria-label="NCCUSpace 品牌形象關鍵字">
        <ArrowDefs id="nccu-arrow-brand" color="#c9c3ba" />
        <g stroke="#cfc8bd" strokeWidth="1.6" fill="none">
          <path d="M155 165 L300 250" />
          <path d="M155 250 L300 270" />
          <path d="M155 335 L300 290" />
          <path d="M470 270 H540" />
          <path d="M740 270 H810" />
          <path d="M905 235 L1000 150" />
          <path d="M945 270 H1010" />
          <path d="M905 305 L1000 390" />
          <path d="M640 310 L620 345" />
          <path d="M620 405 L445 470" />
          <path d="M620 405 V470" />
          <path d="M620 405 L795 470" />
        </g>
        {/* 色票 */}
        <g>
          <rect x={70} y={120} width={86} height={86} rx={18} fill="#55c2ac" />
          <text x={113} y={168} textAnchor="middle" className="nccu-brand-swatch" fill="#ffffff">#55C2AC</text>
          <rect x={70} y={227} width={86} height={86} rx={18} fill="#8c6c64" />
          <text x={113} y={275} textAnchor="middle" className="nccu-brand-swatch" fill="#ffffff">#8C6C64</text>
          <rect x={70} y={334} width={86} height={86} rx={18} fill="#f4f0f0" stroke="#e3ddd6" />
          <text x={113} y={382} textAnchor="middle" className="nccu-brand-swatch" fill="#8a857d">#F4F0F0</text>
        </g>
        {/* 三大主題節點（米黃） */}
        <BrandChip x={300} y={245} w={170} h={60} lines={["政大自然景色"]} strong />
        <BrandChip x={540} y={240} w={200} h={70} lines={["NCCUSpace"]} center />
        <BrandChip x={810} y={245} w={170} h={60} lines={["圖書館學術"]} strong />
        <BrandChip x={545} y={345} w={150} h={60} lines={["便利預約"]} strong />
        {/* 圖書館學術子項 */}
        <BrandChip x={1010} y={120} w={120} h={56} lines={["現代"]} />
        <BrandChip x={1010} y={242} w={120} h={56} lines={["簡約"]} />
        <BrandChip x={1010} y={362} w={120} h={56} lines={["俐落"]} />
        {/* 便利預約子項 */}
        <BrandChip x={370} y={470} w={150} h={56} lines={["篩選機制"]} />
        <BrandChip x={545} y={470} w={150} h={56} lines={["簡化步驟"]} />
        <BrandChip x={720} y={470} w={150} h={56} lines={["視覺化表格"]} />
      </svg>
    </div>
  );
}

function BrandChip({
  x,
  y,
  w,
  h,
  lines,
  strong = false,
  center = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  strong?: boolean;
  center?: boolean;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={h / 2}
        fill={center ? "#ffffff" : "#fbe7a8"}
        stroke={center ? "#e3ddd6" : "none"}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className={strong || center ? "nccu-brand-node nccu-brand-node--strong" : "nccu-brand-node"}
        fill={center ? "#8c6c64" : "#3a3026"}
      >
        {lines.join("")}
      </text>
    </>
  );
}

/* ── 親和圖：預約前 / 中 / 後 行為洞見看板 ── */
const affinityData = [
  {
    phase: "預約前",
    insights: ["需要個人且可討論的空間", "有自主學習掌握資訊的能力"],
    voices: [
      "需要可以私人討論、講話的空間",
      "第一次使用時會先研究怎麼使用",
      "會優先使用自己的私人空間",
      "預約前會先查詢流程和認識空間",
      "因為人數不足及無空間可以預約",
      "曾參加圖書館導覽認識空間資源",
      "下午時段想找個空間可以討論和讀書",
    ],
  },
  {
    phase: "預約中",
    insights: ["多數使用網頁版進行預約", "實際預約流程與預想不同", "希望能預約到想要的時段", "借用時需要了解空間配置"],
    voices: [
      "一開始使用會想先選討論室",
      "時段是預約的第一考量",
      "會根據過往經驗選擇使用的討論室",
      "不知道有其他行動版可用",
      "樓層選擇不符合自己的使用流程",
      "想要一次比對可使用的討論室空間",
      "希望能預約到完整的時段",
      "預約時會想知道樓層與空間資訊",
    ],
  },
  {
    phase: "預約後",
    insights: ["初次使用會需要報到指引", "整體體驗流程順暢"],
    voices: [
      "實際到現場會需要預約報到指引",
      "系統能讓使用者知道已成功預約",
      "相較過往經驗，覺得政大的流程更順暢",
    ],
  },
];

export function AffinityBoard() {
  return (
    <div className="nccu-affinity">
      {affinityData.map((col) => (
        <div className="nccu-affinity-col" key={col.phase}>
          <div className="nccu-affinity-head">{col.phase}</div>
          <div className="nccu-affinity-insights">
            {col.insights.map((t) => (
              <p className="nccu-affinity-insight" key={t}>{t}</p>
            ))}
          </div>
          <div className="nccu-affinity-voices">
            {col.voices.map((t) => (
              <p className="nccu-affinity-voice" key={t}>{t}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 用例需求排序（由左至右：重要程度高 → 低）── */
const priorityTiers = [
  {
    level: "一定要",
    sub: "高重要度",
    needs: ["顯示討論室位置介紹", "掌握可預約的時間和空間", "顯示空間的預約規則、流程", "系統提供視覺化資訊", "系統提供快速檢索功能（時間、空間）"],
  },
  {
    level: "有更好",
    sub: "中重要度",
    needs: ["增加預約彈性", "比較預約空間資訊", "預約提醒機制"],
  },
  {
    level: "可有可無",
    sub: "低重要度",
    needs: ["預約機制可採用公平機制", "系統可提供視覺化地理位置", "系統提供詳細流程步驟供參考"],
  },
];

export function UseCasePriorityTable() {
  return (
    <div className="nccu-priority">
      {priorityTiers.map((tier, i) => (
        <div className={`nccu-priority-col nccu-priority-col--${i}`} key={tier.level}>
          <div className="nccu-priority-head">
            <strong>{tier.level}</strong>
            <span>{tier.sub}</span>
          </div>
          <ul>
            {tier.needs.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ── 卡片分類法：用例任務 → 行為分群 → 介面 ── */
export function CardSortLegend() {
  const steps = [
    { tone: "blue", label: "用例任務", note: "拆解後的子行為" },
    { tone: "yellow", label: "行為分群", note: "相近行為歸成一組" },
    { tone: "green", label: "介面", note: "整合成預約流程頁" },
  ];
  return (
    <div className="nccu-cardsort">
      {steps.map((s, i) => (
        <div className="nccu-cardsort-step" key={s.label}>
          <div className={`nccu-cardsort-chip nccu-cardsort-chip--${s.tone}`}>
            <strong>{s.label}</strong>
            <span>{s.note}</span>
          </div>
          {i < steps.length - 1 ? <span className="nccu-cardsort-arrow" aria-hidden="true">→</span> : null}
        </div>
      ))}
    </div>
  );
}

/* ── 分層選單：三個預約流程頁 × 介面功能 / 重要用例 ── */
const nestedColumns = [
  {
    page: "預約流程頁-1",
    fn: "篩選符合需求的討論室",
    primary: [
      "使用者能夠瀏覽各個討論室的空間與配置",
      "使用者可以挑選討論室可使用的時段",
      "使用者能看到明確的預約規則與流程介紹",
      "使用者可以選擇符合需求的人數、時段、空間",
      "使用者能夠看到一目瞭然的時間與空間資訊",
    ],
    secondary: [],
  },
  {
    page: "預約流程頁-2",
    fn: "輸入學號登記空間",
    primary: [],
    secondary: ["（次要）使用者能獲得候補順序", "（次要）使用者能依照過往預約記錄快速預約討論室空間"],
  },
  {
    page: "預約流程頁-3",
    fn: "確認預約資訊",
    primary: ["使用者能夠確認預約資訊並修改登記學號"],
    secondary: ["（次要）使用者可以收取想預約的空間已釋出的信件或簡訊提醒"],
  },
];

export function NestedListBoard() {
  return (
    <div className="nccu-nested">
      <div className="nccu-nested-grid">
        <div className="nccu-nested-rl">網頁介面</div>
        {nestedColumns.map((col) => (
          <div className="nccu-nested-page" key={col.page}>{col.page}</div>
        ))}

        <div className="nccu-nested-rl">介面功能</div>
        {nestedColumns.map((col) => (
          <div className="nccu-nested-fn" key={col.page}>{col.fn}</div>
        ))}

        <div className="nccu-nested-rl">重要用例</div>
        {nestedColumns.map((col) => (
          <div className="nccu-nested-cases" key={col.page}>
            {col.primary.map((t) => (
              <p className="nccu-nested-case nccu-nested-case--primary" key={t}>{t}</p>
            ))}
            {col.secondary.map((t) => (
              <p className="nccu-nested-case nccu-nested-case--secondary" key={t}>{t}</p>
            ))}
          </div>
        ))}
      </div>
      <p className="nccu-nested-foot">
        <span className="nccu-nested-dot nccu-nested-dot--primary" aria-hidden="true" />
        <span>重要用例</span>
        <span className="nccu-nested-dot nccu-nested-dot--secondary" aria-hidden="true" />
        <span>次要用例</span>
      </p>
    </div>
  );
}

/* ── SUS 易用性量表結果 ── */
const susRows = [
  ["我願意時常使用這個網站", "4", "5"],
  ["我覺得這個網站過於複雜", "3", "1"],
  ["我認為這個網站很容易使用", "4", "5"],
  ["我需要專業人員協助才能使用這個網站", "4", "1"],
  ["我覺得這個網站的功能整合得很好", "5", "5"],
  ["我覺得這個網站有很多不一致的地方", "1", "1"],
  ["我相信大部分人很快就能學會使用這個網站", "3", "5"],
  ["我覺得這個網站使用起來很麻煩", "1", "1"],
  ["我覺得我在網站操作上完全沒問題", "3", "4"],
  ["在使用網站前，我必須學習很多先備知識才能使用", "2", "1"],
];

export function SusTable() {
  return (
    <div className="nccu-table-wrap">
      <table className="nccu-sus-table">
        <thead>
          <tr>
            <th scope="col" className="nccu-sus-q">SUS 易用性問題</th>
            <th scope="col">P1</th>
            <th scope="col">P2</th>
          </tr>
        </thead>
        <tbody>
          {susRows.map((row, i) => (
            <tr key={row[0]}>
              <th scope="row"><span className="nccu-sus-num">{`${i + 1}.`}</span>{row[0]}</th>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
