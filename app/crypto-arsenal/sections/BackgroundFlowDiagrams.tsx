"use client";

import { useEffect, useRef, useState } from "react";

type TradingFlowLabels = {
  aria: string;
  buyFiat: string;
  cryptoSwap: string;
  crypto: string;
  selectMonitor: string;
  executeOrder: string;
  trader: string;
  exchange: string;
  blockchain: string;
  strategy: string;
};

type EcosystemFlowLabels = {
  aria: string;
  useBots: string;
  buildBots: string;
  botReturns: string;
  botRevenueShare: string;
  trader: string;
  arsenal: string;
  developer: string;
};

function ArrowDefs() {
  return (
    <defs>
      <marker id="ca-flow-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M1 1 9 5 1 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  );
}

function FlowIcon({ href, x, y, size }: { href: string; x: number; y: number; size: number }) {
  return (
    <image href={href} x={x - size / 2} y={y - size / 2} width={size} height={size} />
  );
}

function FlowLabel({
  children,
  x,
  y,
  anchor = "middle",
  strong = false,
  blue = false,
}: {
  children: React.ReactNode;
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  strong?: boolean;
  blue?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={strong ? "ca-flow-label ca-flow-label-strong" : "ca-flow-label"}
      fill={blue ? "#376adc" : strong ? "#252a47" : "#6c6e77"}
    >
      {children}
    </text>
  );
}

function splitSvgLabel(text: string, maxWidth: number) {
  const maxChars = Math.max(22, Math.floor(maxWidth / 6.7));
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function FlowWrappedLabel({
  children,
  x,
  y,
  maxWidth,
}: {
  children: string;
  x: number;
  y: number;
  maxWidth: number;
}) {
  const lines = splitSvgLabel(children, maxWidth);

  return (
    <text x={x} y={y} textAnchor="middle" className="ca-flow-label" fill="#6c6e77">
      {lines.map((line, index) => (
        <tspan key={line} x={x} dy={index === 0 ? 0 : 18}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

const FLOW_GAP = 32;
const TRADING_WIDTH = 1382;
const TRADING_HEIGHT = 270;
const ECOSYSTEM_WIDTH = 1382;
const ECOSYSTEM_HEIGHT = 210;

function useSvgWidth(fallbackWidth: number) {
  const ref = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(fallbackWidth);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const updateWidth = () => {
      setWidth(svg.getBoundingClientRect().width || fallbackWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(svg);
    return () => observer.disconnect();
  }, [fallbackWidth]);

  return { ref, width };
}

function createScaleX(width: number, originalWidth: number, edgePadding: number) {
  const available = Math.max(width - edgePadding * 2, 1);
  const source = originalWidth - edgePadding * 2;
  return (x: number) => edgePadding + ((x - edgePadding) / source) * available;
}

export function TradingFlowDiagram({ labels }: { labels: TradingFlowLabels }) {
  const { ref, width } = useSvgWidth(TRADING_WIDTH);
  const scaleX = createScaleX(width, TRADING_WIDTH, 42.6);

  const trader = { x: 42.6, y: 40, size: 44.7 };
  const exchange = { x: 842.3, y: 40, size: 44.7 };
  const blockchain = { x: 1340, y: 40, size: 44.7 };
  const strategy = { x: 433.4, y: 219, size: 44.7 };
  const arsenal = { x: scaleX(841.65), y: 201.4, width: 52.83, height: 52.83 };

  const traderX = scaleX(trader.x);
  const exchangeX = scaleX(exchange.x);
  const blockchainX = scaleX(blockchain.x);
  const strategyNarrowOffset = Math.max(0, (650 - width) * 0.45);
  const strategyX = scaleX(strategy.x) - strategyNarrowOffset;

  const traderRight = traderX + trader.size / 2;
  const exchangeLeft = exchangeX - exchange.size / 2;
  const exchangeRight = exchangeX + exchange.size / 2;
  const blockchainLeft = blockchainX - blockchain.size / 2;
  const strategyLeft = strategyX - strategy.size / 2;
  const strategyRight = strategyX + strategy.size / 2;
  const arsenalLeft = arsenal.x - arsenal.width / 2;
  const arsenalTop = arsenal.y;
  return (
    <svg
      ref={ref}
      className="ca-diagram-graphic"
      viewBox={`0 0 ${width} ${TRADING_HEIGHT}`}
      height={TRADING_HEIGHT}
      role="img"
      aria-label={labels.aria}
      style={{ height: TRADING_HEIGHT }}
    >
      <ArrowDefs />
      <g stroke="#c4cbe0" strokeWidth="1.5" fill="none" markerEnd="url(#ca-flow-arrow)">
        <path d={`M${traderRight + FLOW_GAP} 23.3H${exchangeLeft - FLOW_GAP}`} />
        <path d={`M${exchangeLeft - FLOW_GAP} 56.8H${traderRight + FLOW_GAP}`} />
        <path d={`M${exchangeRight + FLOW_GAP} 40H${blockchainLeft - FLOW_GAP}`} markerStart="url(#ca-flow-arrow)" />
        <path d={`M${traderX} 112V${strategy.y}H${strategyLeft - FLOW_GAP}`} />
        <path d={`M${strategyRight + FLOW_GAP} ${strategy.y}H${arsenalLeft - FLOW_GAP}`} />
      </g>
      <path d={`M${exchangeX} ${arsenal.y - 52.83 / 2 - 20}V118`} stroke="#376adc" strokeWidth="1.8" fill="none" markerEnd="url(#ca-flow-arrow)" />

      <FlowLabel x={(traderRight + exchangeLeft) / 2} y={13}>{labels.buyFiat}</FlowLabel>
      <FlowLabel x={(traderRight + exchangeLeft) / 2} y={76}>{labels.cryptoSwap}</FlowLabel>
      <FlowLabel x={(exchangeRight + blockchainLeft) / 2} y={25}>{labels.crypto}</FlowLabel>
      <FlowLabel x={traderX + 22} y={137} anchor="start">{labels.selectMonitor}</FlowLabel>
      <FlowLabel x={exchangeX + 22} y={142} anchor="start" strong blue>{labels.executeOrder}</FlowLabel>

      <FlowIcon href="/projects/crypto-arsenal/background/icons/trader.svg" x={traderX} y={trader.y} size={trader.size} />
      <FlowIcon href="/projects/crypto-arsenal/background/icons/exchange.svg" x={exchangeX} y={exchange.y} size={exchange.size} />
      <FlowIcon href="/projects/crypto-arsenal/background/icons/blockchain.svg" x={blockchainX} y={blockchain.y} size={blockchain.size} />
      <FlowIcon href="/projects/crypto-arsenal/background/icons/bot.svg" x={strategyX} y={strategy.y} size={strategy.size} />
      <FlowLabel x={traderX} y={91} strong>{labels.trader}</FlowLabel>
      <FlowLabel x={exchangeX} y={91} strong>{labels.exchange}</FlowLabel>
      <FlowLabel x={blockchainX} y={91} strong>{labels.blockchain}</FlowLabel>
      <FlowLabel x={strategyX} y={262} strong>{labels.strategy}</FlowLabel>

      <g>
        <FlowIcon href="/projects/crypto-arsenal/background/icons/arsenal.svg" x={scaleX(841.65)} y={arsenal.y} size={52.83} />
        <FlowLabel x={scaleX(841.65)} y={252} strong blue>Crypto Arsenal</FlowLabel>
      </g>
    </svg>
  );
}

export function EcosystemFlowDiagram({ labels }: { labels: EcosystemFlowLabels }) {
  const { ref, width } = useSvgWidth(ECOSYSTEM_WIDTH);
  const scaleX = createScaleX(width, ECOSYSTEM_WIDTH, 48.2);

  const trader = { x: 48.2, y: 33.5, size: 48.76 };
  const arsenal = { x: 691, y: 33.5, size: 52.83 };
  const developer = { x: 1333.8, y: 33.5, size: 48.76 };
  const money = { x: 691, y: 161.5, size: 44.7 };

  const traderX = scaleX(trader.x);
  const arsenalX = scaleX(arsenal.x);
  const developerX = scaleX(developer.x);
  const moneyX = scaleX(money.x);

  const traderRight = traderX + trader.size / 2;
  const arsenalLeft = arsenalX - arsenal.size / 2;
  const arsenalRight = arsenalX + arsenal.size / 2;
  const developerLeft = developerX - developer.size / 2;
  const moneyLeft = moneyX - money.size / 2;
  const moneyRight = moneyX + money.size / 2;
  const bottomLabelInset = 12;
  const returnsLabelStart = traderX + bottomLabelInset;
  const returnsLabelEnd = moneyLeft - FLOW_GAP - bottomLabelInset;
  const revenueLabelStart = moneyRight + FLOW_GAP + bottomLabelInset;
  const revenueLabelEnd = developerX - bottomLabelInset;

  return (
    <svg
      ref={ref}
      className="ca-diagram-graphic"
      viewBox={`0 0 ${width} ${ECOSYSTEM_HEIGHT}`}
      height={ECOSYSTEM_HEIGHT}
      role="img"
      aria-label={labels.aria}
      style={{ height: ECOSYSTEM_HEIGHT }}
    >
      <ArrowDefs />
      <g stroke="#c4cbe0" strokeWidth="1.5" fill="none" markerEnd="url(#ca-flow-arrow)">
        <path d={`M${traderRight + FLOW_GAP} 27.4H${arsenalLeft - FLOW_GAP}`} />
        <path d={`M${developerLeft - FLOW_GAP} 27.4H${arsenalRight + FLOW_GAP}`} />
        <path d={`M${traderX} 102V${money.y}H${moneyLeft - FLOW_GAP}`} />
        <path d={`M${developerX} 102V${money.y}H${moneyRight + FLOW_GAP}`} />
      </g>

      <FlowLabel x={(traderRight + arsenalLeft) / 2} y={14}>{labels.useBots}</FlowLabel>
      <FlowLabel x={(developerLeft + arsenalRight) / 2} y={14}>{labels.buildBots}</FlowLabel>
      <FlowWrappedLabel
        x={(returnsLabelStart + returnsLabelEnd) / 2}
        y={186}
        maxWidth={returnsLabelEnd - returnsLabelStart}
      >
        {labels.botReturns}
      </FlowWrappedLabel>
      <FlowWrappedLabel
        x={(revenueLabelStart + revenueLabelEnd) / 2}
        y={186}
        maxWidth={revenueLabelEnd - revenueLabelStart}
      >
        {labels.botRevenueShare}
      </FlowWrappedLabel>

      <FlowIcon href="/projects/crypto-arsenal/background/icons/trader.svg" x={traderX} y={trader.y} size={trader.size} />
      <FlowIcon href="/projects/crypto-arsenal/background/icons/arsenal.svg" x={arsenalX} y={arsenal.y} size={arsenal.size} />
      <FlowIcon href="/projects/crypto-arsenal/background/icons/developer.svg" x={developerX} y={developer.y} size={developer.size} />
      <FlowLabel x={traderX} y={83} strong>{labels.trader}</FlowLabel>
      <FlowLabel x={arsenalX} y={86} strong blue>{labels.arsenal}</FlowLabel>
      <FlowLabel x={developerX} y={83} strong>{labels.developer}</FlowLabel>

      <g>
        <FlowIcon href="/projects/crypto-arsenal/background/icons/money-bg.svg" x={moneyX} y={money.y} size={money.size} />
        <FlowIcon href="/projects/crypto-arsenal/background/icons/money-ring.svg" x={moneyX} y={money.y} size={26.41} />
        <text x={moneyX} y="167.5" textAnchor="middle" className="ca-flow-currency">$</text>
      </g>
    </svg>
  );
}
