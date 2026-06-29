import type { InputHTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  children,
  className,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { children: ReactNode; error?: boolean }) {
  return (
    <label className={cn("hm-choice", error && "is-error", className)}>
      <input {...props} type="checkbox" />
      <span className="hm-checkbox-control" aria-hidden="true">
        <Check size={14} strokeWidth={2.5} />
      </span>
      <span>{children}</span>
    </label>
  );
}
