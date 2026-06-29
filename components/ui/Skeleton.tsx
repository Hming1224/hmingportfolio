import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <span className={cn("hm-skeleton", className)} style={style} aria-hidden="true" />;
}
