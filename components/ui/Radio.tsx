import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Radio({
  children,
  className,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { children: ReactNode; error?: boolean }) {
  return (
    <label className={cn("hm-choice", error && "is-error", className)}>
      <input {...props} type="radio" />
      <span className="hm-radio-control" aria-hidden="true" />
      <span>{children}</span>
    </label>
  );
}
