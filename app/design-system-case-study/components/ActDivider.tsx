import { cn } from "../../../lib/utils";

type ActDividerProps = {
  /** Act eyebrow number, e.g. "ACT 2". */
  actLabel: string;
  /** Act subtitle shown after the number, e.g. "轉折與框架". */
  kicker: string;
  /** Act title. */
  title: string;
  /** Supporting lead paragraph. */
  lead: string;
  /** Oversized decorative act number, e.g. "02". Falls back to digits parsed from actLabel. */
  displayNumber?: string;
  className?: string;
};

/**
 * Full-bleed act divider (幕間分隔) for the design-system case study.
 * Decorative only: no TOC id, not an anchor target.
 */
export default function ActDivider({
  actLabel,
  kicker,
  title,
  lead,
  displayNumber,
  className,
}: ActDividerProps) {
  const bigNumber = displayNumber ?? actLabel.replace(/\D/g, "") ?? "";

  return (
    <div className={cn("ds-case-act-divider", className)}>
      <div className="ds-case-act-divider__inner">
        <span className="ds-case-act-divider__kicker">
          {actLabel} · {kicker}
        </span>
        <h2 className="ds-case-act-divider__title">{title}</h2>
        <p className="ds-case-act-divider__lead">{lead}</p>
      </div>
      <span className="ds-case-act-divider__number" aria-hidden="true">
        {bigNumber}
      </span>
    </div>
  );
}
