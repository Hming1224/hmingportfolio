"use client";

import {
  createContext,
  type KeyboardEvent,
  type ReactNode,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  openValues: string[];
  type: AccordionType;
  toggleValue: (value: string) => void;
  focusTrigger: (currentValue: string, direction: 1 | -1) => void;
};

type AccordionItemContextValue = {
  buttonId: string;
  open: boolean;
  panelId: string;
  value: string;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function toArray(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function Accordion({
  children,
  className,
  defaultValue,
  onValueChange,
  type = "single",
  value,
}: {
  children: ReactNode;
  className?: string;
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: AccordionType;
  value?: string | string[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(() => toArray(defaultValue));
  const openValues = value === undefined ? internalValue : toArray(value);

  const context = useMemo<AccordionContextValue>(() => {
    function setNext(next: string[]) {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(type === "single" ? next[0] ?? "" : next);
    }

    return {
      openValues,
      type,
      toggleValue(nextValue) {
        const isOpen = openValues.includes(nextValue);
        const next =
          type === "single"
            ? isOpen ? [] : [nextValue]
            : isOpen
              ? openValues.filter((item) => item !== nextValue)
              : [...openValues, nextValue];
        setNext(next);
      },
      focusTrigger(currentValue, direction) {
        const triggers = Array.from(
          rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]") ?? [],
        );
        const currentIndex = triggers.findIndex((trigger) => trigger.dataset.value === currentValue);
        if (currentIndex < 0 || !triggers.length) return;
        const nextIndex = (currentIndex + direction + triggers.length) % triggers.length;
        triggers[nextIndex]?.focus();
      },
    };
  }, [onValueChange, openValues, type, value]);

  return (
    <AccordionContext.Provider value={context}>
      <div className={cn("hm-accordion", className)} ref={rootRef}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  className,
  value,
}: {
  children: ReactNode;
  className?: string;
  value: string;
}) {
  const accordion = useContext(AccordionContext);
  const id = useId();

  if (!accordion) {
    throw new Error("AccordionItem must be used inside Accordion.");
  }

  const itemContext: AccordionItemContextValue = {
    buttonId: `${id}-trigger`,
    open: accordion.openValues.includes(value),
    panelId: `${id}-panel`,
    value,
  };

  return (
    <AccordionItemContext.Provider value={itemContext}>
      <div className={cn("hm-accordion-item", className)} data-state={itemContext.open ? "open" : "closed"}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const accordion = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);

  if (!accordion || !item) {
    throw new Error("AccordionHeader must be used inside AccordionItem.");
  }

  const accordionContext = accordion;
  const itemContext = item;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      accordionContext.focusTrigger(itemContext.value, 1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      accordionContext.focusTrigger(itemContext.value, -1);
    }
  }

  return (
    <h3 className={cn("hm-accordion-heading", className)}>
      <button
        aria-controls={itemContext.panelId}
        aria-expanded={itemContext.open}
        className="hm-accordion-trigger"
        data-accordion-trigger=""
        data-value={itemContext.value}
        id={itemContext.buttonId}
        onClick={() => accordionContext.toggleValue(itemContext.value)}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span>{children}</span>
        <ChevronDown aria-hidden="true" className="hm-accordion-icon" size={16} strokeWidth={2} />
      </button>
    </h3>
  );
}

export function AccordionPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const item = useContext(AccordionItemContext);

  if (!item) {
    throw new Error("AccordionPanel must be used inside AccordionItem.");
  }

  return (
    <div
      aria-labelledby={item.buttonId}
      className={cn("hm-accordion-panel", className)}
      hidden={!item.open}
      id={item.panelId}
      role="region"
    >
      {children}
    </div>
  );
}
