import type { ReactNode } from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  action,
  className,
  description,
  title,
}: {
  action?: ReactNode;
  className?: string;
  description?: string;
  title: string;
}) {
  return (
    <div className={cn("hm-empty-state", className)}>
      <PackageOpen aria-hidden="true" size={28} strokeWidth={1.5} />
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
