'use client';

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, type AnimatePresenceProps } from 'framer-motion';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
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
  const [value, setValue] = useState(defaultValue);
  const contextValue = useMemo(() => ({ value, setValue }), [value]);

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
  const { value: activeValue } = useTabsContext();
  const active = activeValue === value;

  return (
    <div className={className} data-state={active ? 'active' : 'inactive'} {...props}>
      {active ? (
        <motion.span className="tabs-active-highlight" layoutId="tabs-active-highlight" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
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
  mode?: AnimatePresenceProps['mode'];
}

export function TabsPanels({ mode = 'wait', className = '', children, ...props }: TabsPanelsProps) {
  const { value } = useTabsContext();
  const panels = Children.toArray(children).filter(isValidElement) as ReactElement<TabsPanelProps>[];
  const activePanel = panels.find((panel) => panel.props.value === value);

  return (
    <div className={className} {...props}>
      <AnimatePresence mode={mode} initial={false}>
        {activePanel ? (
          <motion.div
            key={value}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {activePanel}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
