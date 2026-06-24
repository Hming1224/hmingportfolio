import type { ReactNode } from "react";

type NodeTone = "action" | "page" | "decision";

function FlowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M1 1 11 6 1 11" fill="none" stroke="#b8b8b8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  );
}

function FlowNode({
  x,
  y,
  size,
  visualSize = size,
  tone,
  children,
}: {
  x: number;
  y: number;
  size: number;
  visualSize?: number;
  tone: NodeTone;
  children: ReactNode;
}) {
  const fill = tone === "action" ? "#bde3ff" : tone === "page" ? "#e4ccff" : "#ffe8a3";
  const visualX = x - (visualSize - size) / 2;
  const visualY = y - (visualSize - size) / 2;
  return (
    <g>
      {tone === "action" ? (
        <circle cx={x + size / 2} cy={y + size / 2} r={visualSize / 2} fill={fill} />
      ) : tone === "decision" ? (
        <path
          d={`M${x + size / 2} ${visualY} L${visualX + visualSize} ${y + size / 2} L${x + size / 2} ${visualY + visualSize} L${visualX} ${y + size / 2}Z`}
          fill={fill}
        />
      ) : (
        <rect x={visualX} y={visualY} width={visualSize} height={visualSize} rx="6" fill={fill} />
      )}
      <foreignObject
        x={visualX + visualSize * 0.1}
        y={visualY + visualSize * 0.1}
        width={visualSize * 0.8}
        height={visualSize * 0.8}
      >
        <div className="laushu-task-node-copy">{children}</div>
      </foreignObject>
    </g>
  );
}

function Connector({
  d,
  marker,
  label,
  labelX,
  labelY,
  labelWidth = 180,
  labelHeight = 36,
}: {
  d: string;
  marker: string;
  label?: ReactNode;
  labelX?: number;
  labelY?: number;
  labelWidth?: number;
  labelHeight?: number;
}) {
  return (
    <g>
      <path d={d} className="laushu-task-connector" markerEnd={`url(#${marker})`} />
      {label ? (
        <foreignObject
          x={(labelX ?? 0) - labelWidth / 2}
          y={(labelY ?? 0) - labelHeight / 2}
          width={labelWidth}
          height={labelHeight}
        >
          <div className="laushu-task-edge-label">{label}</div>
        </foreignObject>
      ) : null}
    </g>
  );
}

export function TaskFlowOneDiagram() {
  const marker = "task-flow-1-arrow";
  return (
    <svg viewBox="0 0 2140 1360" className="laushu-task-flow-svg laushu-task-flow-svg--one" role="img" aria-label="建立外包人員資料庫任務流程圖">
      <FlowDefs id={marker} />

      {/* 外包人員資料頁 → 三個主要任務 */}
      <Connector d="M196 524 H248 V188 H308" marker={marker} />
      <Connector d="M196 524 H308" marker={marker} />
      <Connector d="M196 524 H248 V1028 H308" marker={marker} />

      {/* 建立勞報單 */}
      <Connector d="M524 188 H596" marker={marker} />

      {/* 新增外包人員 */}
      <Connector d="M524 524 H596" marker={marker} />
      <Connector d="M812 524 H884" marker={marker} />
      <Connector d="M1100 524 H1172" marker={marker} />
      <Connector d="M1388 524 H1540" marker={marker} label="否" labelX={1464} labelY={500} />
      <Connector d="M1756 524 H1810 V342 H1876" marker={marker} />
      <Connector d="M1756 524 H1810 V706 H1876" marker={marker} />
      <Connector d="M1464 524 V860 H1540" marker={marker} label="是" labelX={1488} labelY={700} />

      {/* 儲存後回到建立頁；單純儲存後回到外包人員資料頁 */}
      <Connector d="M2092 342 H2116 V24 H704 V76" marker={marker} />
      <Connector d="M2092 706 H2116 V1336 H88 V636" marker={marker} />

      {/* 查看業務與個人資料 */}
      <Connector d="M524 1028 H596" marker={marker} />
      <Connector d="M812 1028 H850 V860 H884" marker={marker} />
      <Connector d="M1100 860 H1172" marker={marker} />
      <Connector d="M812 1028 H850 V1196 H884" marker={marker} />
      <Connector d="M1100 1196 H1172" marker={marker} />

      {/* Figma 回流：編輯人員頁 → 填寫身分資料；查看人員頁 → 人員業務頁 */}
      <Connector d="M1388 860 H1428 V660 H992 V636" marker={marker} />
      <Connector d="M1388 1196 H1418 V1320 H704 V1136" marker={marker} />

      <FlowNode x={0} y={436} size={176} visualSize={216} tone="page">外包人員資料頁</FlowNode>
      <FlowNode x={328} y={100} size={176} visualSize={216} tone="action">建立人員勞報單</FlowNode>
      <FlowNode x={616} y={100} size={176} visualSize={216} tone="page">建立勞報單頁</FlowNode>
      <FlowNode x={328} y={436} size={176} visualSize={216} tone="action">新增外包人員</FlowNode>
      <FlowNode x={616} y={436} size={176} visualSize={216} tone="page">新增人員頁</FlowNode>
      <FlowNode x={904} y={436} size={176} visualSize={216} tone="action">填寫身份資料</FlowNode>
      <FlowNode x={1192} y={436} size={176} visualSize={216} tone="decision">是否已有相同身分證字號</FlowNode>
      <FlowNode x={1560} y={436} size={176} visualSize={216} tone="action">上傳身分證存摺影本</FlowNode>
      <FlowNode x={1896} y={254} size={176} visualSize={216} tone="action">儲存並建立勞報單</FlowNode>
      <FlowNode x={1896} y={618} size={176} visualSize={216} tone="action">儲存</FlowNode>
      <FlowNode x={1560} y={772} size={176} visualSize={216} tone="action">系統提醒曾建立過</FlowNode>
      <FlowNode x={328} y={940} size={176} visualSize={216} tone="action">查看業務</FlowNode>
      <FlowNode x={616} y={940} size={176} visualSize={216} tone="page">人員業務頁</FlowNode>
      <FlowNode x={904} y={772} size={176} visualSize={216} tone="action">編輯個人資料</FlowNode>
      <FlowNode x={1192} y={772} size={176} visualSize={216} tone="page">編輯人員頁</FlowNode>
      <FlowNode x={904} y={1108} size={176} visualSize={216} tone="action">查看個人資料</FlowNode>
      <FlowNode x={1192} y={1108} size={176} visualSize={216} tone="page">查看人員頁</FlowNode>
    </svg>
  );
}

export function TaskFlowTwoDiagram() {
  const marker = "task-flow-2-arrow";
  return (
    <svg viewBox="0 0 1995 1132" className="laushu-task-flow-svg laushu-task-flow-svg--two" role="img" aria-label="建立勞務報酬單任務流程圖">
      <FlowDefs id={marker} />
      <g transform="translate(0 93)">

      {/* 勞務報酬單頁面 → 三種建立方式 */}
      <Connector d="M221 447 H253 V140 H285" marker={marker} />
      <Connector d="M221 447 H285" marker={marker} />
      <Connector d="M221 447 H253 V784 H285" marker={marker} />

      {/* 三條填寫流程匯流到「填寫完畢」 */}
      <Connector d="M501 140 H565" marker={marker} />
      <Connector d="M501 447 H565" marker={marker} />
      <Connector d="M501 784 H565" marker={marker} />
      <Connector d="M806 140 H870" marker={marker} />
      <Connector d="M806 447 H870" marker={marker} />
      <Connector d="M806 784 H870" marker={marker} />
      <Connector d="M1086 140 H1118 V447 H1150" marker={marker} />
      <Connector d="M1086 447 H1150" marker={marker} />
      <Connector d="M1086 784 H1118 V447 H1150" marker={marker} />

      {/* 填寫完畢 → 編輯信件 → 寄出確認信 */}
      <Connector d="M1366 447 H1430" marker={marker} />
      <Connector d="M1671 447 H1735" marker={marker} />

      {/* 儲存與取消：上方分成兩條獨立回流線 */}
      <Connector d="M978 32 V0 H101 V327" marker={marker} label="儲存並返回" labelX={540} labelY={-42} />
      <Connector d="M1571 327 V0 H1010 V28" marker={marker} label="取消" labelX={1275} labelY={-42} />
      <Connector
        d="M1843 555 V937 H101 V567"
        marker={marker}
        label="返回勞務報酬單頁面，且發送信件給外包人員"
        labelX={930}
        labelY={988}
        labelWidth={420}
        labelHeight={54}
      />

      <FlowNode x={0} y={347} size={201} visualSize={241} tone="page">勞務報酬單頁面</FlowNode>
      <FlowNode x={305} y={52} size={176} visualSize={216} tone="action">建立勞報單（所得人填寫）</FlowNode>
      <FlowNode x={305} y={359} size={176} visualSize={216} tone="action">建立勞報單（公司客戶填寫・新增外包人員）</FlowNode>
      <FlowNode x={305} y={696} size={176} visualSize={216} tone="action">建立勞報單（公司客戶填寫・既有外包人員）</FlowNode>
      <FlowNode x={585} y={40} size={201} visualSize={241} tone="page">建立勞務報酬單頁面</FlowNode>
      <FlowNode x={585} y={347} size={201} visualSize={241} tone="page">建立勞務報酬單頁面</FlowNode>
      <FlowNode x={585} y={684} size={201} visualSize={241} tone="page">建立勞務報酬單頁面</FlowNode>
      <FlowNode x={890} y={52} size={176} visualSize={216} tone="action">填寫資料：基本資料、勞報內容與金額、付款資訊</FlowNode>
      <FlowNode x={890} y={359} size={176} visualSize={216} tone="action">填寫資料：基本資料、勞報內容與金額、付款資訊</FlowNode>
      <FlowNode x={890} y={696} size={176} visualSize={216} tone="action">填寫資料：接待姓名、勞報內容與金額</FlowNode>
      <FlowNode x={1170} y={359} size={176} visualSize={216} tone="action">點擊「填寫完畢」</FlowNode>
      <FlowNode x={1450} y={347} size={201} visualSize={241} tone="page">編輯發送信件頁面</FlowNode>
      <FlowNode x={1755} y={359} size={176} visualSize={216} tone="action">點選「寄出確認信」</FlowNode>
      </g>
    </svg>
  );
}

export function TaskFlowThreeDiagram() {
  const marker = "task-flow-3-arrow";
  const size = 257;
  return (
    <svg viewBox="0 0 3994 617" className="laushu-task-flow-svg laushu-task-flow-svg--three" role="img" aria-label="合併多張勞務報酬單任務流程圖">
      <FlowDefs id={marker} />

      {/* 第一段依 Figma 為反向：建立勞報單頁 → 建立外包人員資訊 */}
      <Connector d="M370 128.5 H261" marker={marker} />

      {/* 主流程 */}
      <Connector d="M635 128.5 H744" marker={marker} />
      <Connector d="M1009 128.5 H1117" marker={marker} />
      <Connector d="M1382 128.5 H1491" marker={marker} />
      <Connector d="M1756 128.5 H1864" marker={marker} />
      <Connector d="M2129 128.5 H2238" marker={marker} />
      <Connector d="M2503 128.5 H2612" marker={marker} />
      <Connector d="M2877 128.5 H2986" marker={marker} label="是" labelX={2932} labelY={102} />
      <Connector d="M3251 128.5 H3359" marker={marker} />
      <Connector d="M3624 128.5 H3733" marker={marker} label="是" labelX={3678} labelY={102} />

      {/* 兩個判斷的「否」分支與單張確認後匯入寄送簽收 */}
      <Connector d="M2744 261 V489 H3359" marker={marker} label="否" labelX={3052} labelY={489} />
      <Connector d="M3491 261 V356" marker={marker} label="否" labelX={3491} labelY={309} />
      <Connector d="M3866 261 V489 H3624" marker={marker} />

      <FlowNode x={0} y={0} size={size} tone="action">承辦人建立外包人員資訊</FlowNode>
      <FlowNode x={374} y={0} size={size} tone="page">承辦人建立勞報單頁</FlowNode>
      <FlowNode x={748} y={0} size={size} tone="action">活動結束，承辦人執行支付款項</FlowNode>
      <FlowNode x={1121} y={0} size={size} tone="page">搜尋外包者姓名</FlowNode>
      <FlowNode x={1495} y={0} size={size} tone="page">同一個外包者多張勞報單結果畫面</FlowNode>
      <FlowNode x={1868} y={0} size={size} tone="action">合併</FlowNode>
      <FlowNode x={2242} y={0} size={size} tone="page">選擇單張、確認合併</FlowNode>
      <FlowNode x={2616} y={0} size={size} tone="decision">是否超過兩萬</FlowNode>
      <FlowNode x={2990} y={0} size={size} tone="page">文字提醒：代扣二代健保</FlowNode>
      <FlowNode x={3363} y={0} size={size} tone="decision">是否拆單</FlowNode>
      <FlowNode x={3737} y={0} size={size} tone="page">單張確認頁</FlowNode>
      <FlowNode x={3363} y={360} size={size} tone="action">寄送簽收</FlowNode>
    </svg>
  );
}
