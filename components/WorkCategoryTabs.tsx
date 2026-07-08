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
  defaultValue?: string;
};

export default function WorkCategoryTabs({
  tabs,
  ariaLabel,
  className,
  defaultValue,
}: WorkCategoryTabsProps) {
  const initialValue = defaultValue ?? tabs[0]?.value ?? "";
  const rootClassName = ["project-tabs", className].filter(Boolean).join(" ");

  return (
    <Tabs defaultValue={initialValue} className={rootClassName}>
      <TabsHighlight className="project-tabs-highlight">
        <TabsList className="project-tabs-list" aria-label={ariaLabel}>
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
