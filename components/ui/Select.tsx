"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SelectOption = { label: string; value: string };

export function Select({
  disabled = false,
  error = false,
  name,
  onChange,
  options,
  placeholder = "Select an option",
  value = "",
}: {
  disabled?: boolean;
  error?: boolean;
  name: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("hm-select", open && "is-open", error && "is-error")}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
          return;
        }
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
        event.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        const items = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []);
        const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
        const step = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex = Math.min(items.length - 1, Math.max(0, currentIndex + step));
        items[nextIndex]?.focus();
      }}
    >
      <input type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        type="button"
        className="hm-select-trigger"
        aria-controls={`${id}-listbox`}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={!selected ? "is-placeholder" : undefined}>{selected?.label ?? placeholder}</span>
        <ChevronDown aria-hidden="true" size={18} strokeWidth={1.5} />
      </button>
      {open ? (
        <div id={`${id}-listbox`} className="hm-select-menu" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              {option.value === value ? <Check aria-hidden="true" size={16} strokeWidth={2} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
