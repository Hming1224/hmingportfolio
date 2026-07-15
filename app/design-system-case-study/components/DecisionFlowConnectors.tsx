"use client";

import { useEffect, useId, useRef, useState } from "react";

type DecisionLabels = {
  yes: string;
  no: string;
  incomplete: string;
  clear: string;
  reviewAgain: string;
};

type Segment = {
  id: string;
  d: string;
  arrow?: boolean;
};

type EdgeLabel = {
  id: keyof DecisionLabels;
  text: string;
  x: number;
  y: number;
};

type Layout = {
  width: number;
  height: number;
  segments: Segment[];
  labels: EdgeLabel[];
};

type NodePosition = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  cx: number;
  cy: number;
};

const emptyLayout: Layout = { width: 1, height: 1, segments: [], labels: [] };

const line = (x1: number, y1: number, x2: number, y2: number) =>
  `M ${x1} ${y1} L ${x2} ${y2}`;

const mid = (a: number, b: number) => (a + b) / 2;
const arrowGap = 6;

export default function DecisionFlowConnectors({ labels }: { labels: DecisionLabels }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const markerId = `ds-decision-arrow-${useId().replaceAll(":", "")}`;
  const [layout, setLayout] = useState<Layout>(emptyLayout);

  useEffect(() => {
    const svg = svgRef.current;
    const tree = svg?.parentElement;
    if (!svg || !tree) return;

    let frame = 0;

    const draw = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const treeRect = tree.getBoundingClientRect();
        const position = (key: string): NodePosition | null => {
          const node = tree.querySelector<HTMLElement>(`[data-decision-node="${key}"]`);
          if (!node) return null;
          const rect = node.getBoundingClientRect();
          const left = rect.left - treeRect.left;
          const right = rect.right - treeRect.left;
          const top = rect.top - treeRect.top;
          const bottom = rect.bottom - treeRect.top;
          return { left, right, top, bottom, cx: mid(left, right), cy: mid(top, bottom) };
        };

        const question = position("question");
        const human = position("human");
        const confirm = position("confirm");
        const incomplete = position("incomplete");
        const execute = position("execute");
        if (!question || !human || !confirm || !incomplete || !execute) return;

        const segments: Segment[] = [];
        const edgeLabels: EdgeLabel[] = [];
        const add = (id: string, x1: number, y1: number, x2: number, y2: number, arrow = false) => {
          segments.push({ id, d: line(x1, y1, x2, y2), arrow });
        };

        if (window.matchMedia("(max-width: 768px)").matches) {
          const leftSpine = Math.max(16, question.left - 28);
          const rightSpine = Math.min(tree.clientWidth - 8, incomplete.right + 12);
          const questionBranchY = mid(question.bottom, human.top);
          const confirmBranchY = mid(confirm.bottom, incomplete.top);

          // Yes: question → human, then human → specification confirmation.
          add("yes", question.cx, question.bottom, human.cx, human.top - arrowGap, true);
          add("human-confirm", human.cx, human.bottom, confirm.cx, confirm.top - arrowGap, true);

          // No: bypass the human-decision card and enter confirmation directly.
          add("no-start", question.cx, question.bottom, question.cx, questionBranchY);
          add("no-left", question.cx, questionBranchY, leftSpine, questionBranchY);
          add("no-down", leftSpine, questionBranchY, leftSpine, confirm.cy);
          add("no-enter", leftSpine, confirm.cy, confirm.left - arrowGap, confirm.cy, true);

          // Incomplete: clarify rules, then loop back to confirmation on the right.
          add("incomplete", confirm.cx, confirm.bottom, incomplete.cx, incomplete.top - arrowGap, true);
          add("return-out", incomplete.right, incomplete.cy, rightSpine, incomplete.cy);
          add("return-up", rightSpine, incomplete.cy, rightSpine, confirm.cy);
          add("return-enter", rightSpine, confirm.cy, confirm.right + arrowGap, confirm.cy, true);

          // Clear: bypass the clarification card and continue to AI execution.
          add("clear-start", confirm.cx, confirm.bottom, confirm.cx, confirmBranchY);
          add("clear-left", confirm.cx, confirmBranchY, leftSpine, confirmBranchY);
          add("clear-down", leftSpine, confirmBranchY, leftSpine, execute.cy);
          add("clear-enter", leftSpine, execute.cy, execute.left - arrowGap, execute.cy, true);

          edgeLabels.push(
            { id: "yes", text: labels.yes, x: question.cx, y: mid(question.bottom, human.top) },
            { id: "no", text: labels.no, x: mid(question.cx, leftSpine), y: questionBranchY },
            { id: "incomplete", text: labels.incomplete, x: confirm.cx, y: mid(confirm.bottom, incomplete.top) },
            { id: "clear", text: labels.clear, x: mid(confirm.cx, leftSpine), y: confirmBranchY },
          );
        } else {
          const leftJunction = mid(question.right, human.left);
          const rightJunction = mid(confirm.right, incomplete.left);
          const loopY = mid(incomplete.bottom, confirm.top);

          // Question fans out to Yes / No.
          add("question-trunk", question.right, question.cy, leftJunction, question.cy);
          add("yes-up", leftJunction, question.cy, leftJunction, human.cy);
          add("yes-enter", leftJunction, human.cy, human.left - arrowGap, human.cy, true);
          add("no-down", leftJunction, question.cy, leftJunction, confirm.cy);
          add("no-enter", leftJunction, confirm.cy, confirm.left - arrowGap, confirm.cy, true);

          // Human judgment and the clarification loop both converge on confirmation.
          add("human-confirm", human.cx, human.bottom, confirm.cx, confirm.top - arrowGap, true);
          add("return-down", incomplete.cx, incomplete.bottom, incomplete.cx, loopY);
          add("return-left", incomplete.cx, loopY, confirm.cx, loopY, true);

          // Confirmation fans out to clarification or execution.
          add("confirm-trunk", confirm.right, confirm.cy, rightJunction, confirm.cy);
          add("incomplete-up", rightJunction, confirm.cy, rightJunction, incomplete.cy);
          add("incomplete-enter", rightJunction, incomplete.cy, incomplete.left - arrowGap, incomplete.cy, true);
          add("clear-down", rightJunction, confirm.cy, rightJunction, execute.cy);
          add("clear-enter", rightJunction, execute.cy, execute.left - arrowGap, execute.cy, true);

          edgeLabels.push(
            { id: "yes", text: labels.yes, x: leftJunction, y: mid(question.cy, human.cy) },
            { id: "no", text: labels.no, x: leftJunction, y: mid(question.cy, confirm.cy) },
            { id: "incomplete", text: labels.incomplete, x: rightJunction, y: mid(incomplete.cy, loopY) },
            { id: "clear", text: labels.clear, x: rightJunction, y: mid(loopY, execute.cy) },
            { id: "reviewAgain", text: labels.reviewAgain, x: mid(incomplete.cx, confirm.cx), y: loopY },
          );
        }

        const next = {
          width: tree.clientWidth,
          height: tree.clientHeight,
          segments,
          labels: edgeLabels,
        };
        setLayout((current) => JSON.stringify(current) === JSON.stringify(next) ? current : next);
      });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(tree);
    window.addEventListener("resize", draw);
    const fontTimer = window.setTimeout(draw, 300);
    const motionTimer = window.setTimeout(draw, 700);
    document.fonts?.ready.then(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fontTimer);
      window.clearTimeout(motionTimer);
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [labels]);

  return (
    <>
      <svg
        ref={svgRef}
        className="ds-case-decision-connectors"
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="9"
            markerHeight="9"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        {layout.segments.map((segment) => (
          <path
            key={segment.id}
            className="ds-case-decision-connector"
            d={segment.d}
            pathLength="1"
            markerEnd={segment.arrow ? `url(#${markerId})` : undefined}
          />
        ))}
      </svg>
      {layout.labels.map((label) => (
        <span
          key={label.id}
          className={`ds-case-decision-edge-label ds-case-decision-edge-label--${label.id}`}
          style={{ left: label.x, top: label.y }}
          aria-hidden="true"
        >
          {label.text}
        </span>
      ))}
    </>
  );
}
