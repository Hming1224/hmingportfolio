"use client";

import type { ReactNode } from "react";
import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
  type TabsSize,
} from "./animate-ui/primitives/base/tabs";

export type WorkCategoryTab = {
  value: string;
  label: string;
  content: ReactNode;
};

type WorkCategoryTabsProps = {
  tabs: WorkCategoryTab[];
  ariaLabel?: string;
  className?: string;
  compactOnMobile?: boolean;
  defaultValue?: string;
  size?: TabsSize;
};

export default function WorkCategoryTabs({
  tabs,
  ariaLabel,
  className,
  compactOnMobile = false,
  defaultValue,
  size = "medium",
}: WorkCategoryTabsProps) {
  const initialValue = defaultValue ?? tabs[0]?.value ?? "";
  const rootClassName = ["project-tabs", className].filter(Boolean).join(" ");

  return (
    <Tabs defaultValue={initialValue} className={rootClassName}>
      <TabsHighlight className="project-tabs-highlight">
        <TabsList
          aria-label={ariaLabel}
          className="project-tabs-list"
          compactOnMobile={compactOnMobile}
          size={size}
        >
          {tabs.map((tab) => (
            <TabsHighlightItem
              value={tab.value}
              className="project-tabs-item"
              key={tab.value}
            >
              <TabsTab value={tab.value} className="project-tabs-tab">
                {tab.label}
              </TabsTab>
            </TabsHighlightItem>
          ))}
        </TabsList>
      </TabsHighlight>

      <TabsPanels mode="wait">
        {tabs.map((tab) => (
          <TabsPanel key={tab.value} value={tab.value}>
            {tab.content}
          </TabsPanel>
        ))}
      </TabsPanels>
    </Tabs>
  );
}
