'use client';

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
} from 'react';

interface TabsContextValue {
  highlightId: string;
  value: string;
  setValue: (value: string) => void;
  /** 切換前的 active highlight 位置，供新 highlight 做 FLIP 滑動動畫 */
  pendingFromRectRef: MutableRefObject<DOMRect | null>;
  activeSpanRef: MutableRefObject<HTMLSpanElement | null>;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs components must be used inside <Tabs>.');
  }

  return context;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
}

export function Tabs({ defaultValue, className = '', children, ...props }: TabsProps) {
  const id = useId();
  const [value, setValueState] = useState(defaultValue);
  const pendingFromRectRef = useRef<DOMRect | null>(null);
  const activeSpanRef = useRef<HTMLSpanElement | null>(null);
  const contextValue = useMemo(
    () => ({
      highlightId: `tabs-active-highlight-${id}`,
      value,
      // 換頁前先記下目前 highlight 的位置，新 highlight 掛載時據此起跑
      setValue: (next: string) => {
        pendingFromRectRef.current = activeSpanRef.current?.getBoundingClientRect() ?? null;
        setValueState(next);
      },
      pendingFromRectRef,
      activeSpanRef,
    }),
    [id, value],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsHighlight({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export type TabsSize = 'medium' | 'small';

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  compactOnMobile?: boolean;
  size?: TabsSize;
}

export function TabsList({
  className = '',
  children,
  compactOnMobile = false,
  size = 'medium',
  ...props
}: TabsListProps) {
  return (
    <div
      className={className}
      data-compact-on-mobile={compactOnMobile || undefined}
      data-size={size}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsHighlightItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsHighlightItem({ value, className = '', children, ...props }: TabsHighlightItemProps) {
  const { value: activeValue, pendingFromRectRef, activeSpanRef } = useTabsContext();
  const active = activeValue === value;
  const spanRef = useRef<HTMLSpanElement | null>(null);

  // FLIP：新 highlight 掛載時，從舊 highlight 的位置平移／縮放回自己的位置。
  // useLayoutEffect 在繪製前執行，量測與起跑同一幀完成，不會閃爍。
  useLayoutEffect(() => {
    const el = spanRef.current;
    if (!active || !el) return;
    activeSpanRef.current = el;

    const from = pendingFromRectRef.current;
    pendingFromRectRef.current = null;
    if (!from) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const to = el.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const sx = to.width ? from.width / to.width : 1;
    const sy = to.height ? from.height / to.height : 1;
    if (dx === 0 && dy === 0 && sx === 1 && sy === 1) return;

    const animation = el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        { transform: 'translate(0, 0) scale(1, 1)' },
      ],
      { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
    return () => animation.cancel();
  }, [active, activeSpanRef, pendingFromRectRef]);

  return (
    <div className={className} data-state={active ? 'active' : 'inactive'} {...props}>
      {active ? (
        <span ref={spanRef} className="tabs-active-highlight" style={{ transformOrigin: '0 0' }} />
      ) : null}
      {children}
    </div>
  );
}

export interface TabsTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTab({ value, className = '', children, ...props }: TabsTabProps) {
  const { value: activeValue, setValue } = useTabsContext();
  const active = activeValue === value;

  return (
    <button
      aria-selected={active}
      className={className}
      data-state={active ? 'active' : 'inactive'}
      onClick={() => setValue(value)}
      role="tab"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsPanel({ className = '', children, ...props }: TabsPanelProps) {
  return (
    <div className={className} role="tabpanel" {...props}>
      {children}
    </div>
  );
}

export interface TabsPanelsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  /** 舊 API 相容：framer-motion 時代的 AnimatePresence mode，現以 CSS 進場動畫取代，僅淡入不做退場 */
  mode?: 'wait' | 'sync' | 'popLayout';
}

export function TabsPanels({ mode, className = '', children, ...props }: TabsPanelsProps) {
  void mode; // 舊 API 相容：接受但不使用（動畫已改 CSS 進場）
  const { value } = useTabsContext();
  const panels = Children.toArray(children).filter(isValidElement) as ReactElement<TabsPanelProps>[];
  const activePanel = panels.find((panel) => panel.props.value === value);

  return (
    <div className={className} {...props}>
      {activePanel ? (
        <div key={value} className="tabs-panel-enter">
          {activePanel}
        </div>
      ) : null}
    </div>
  );
}
