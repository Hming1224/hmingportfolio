'use client';

import { useLocale } from 'next-intl';
import type { Locale } from '../../../i18n/routing';
import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from '../../../components/animate-ui/primitives/base/tabs';
import { translateAdvantech } from '../i18n';

type Props = {
  tooltipLines: string[];
};

export default function AlarmLevelDemo({ tooltipLines }: Props) {
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);

  return (
    <Tabs className="cs-alarm-demo cs-flex-cluster" defaultValue="default">
      <TabsHighlight className="project-tabs-highlight cs-alarm-tabs">
        <TabsList
          aria-label={t('報警等級互動狀態')}
          className="project-tabs-list cs-alarm-toggle"
          compactOnMobile
          size="medium"
        >
          <TabsHighlightItem className="project-tabs-item" value="default">
            <TabsTab className="project-tabs-tab" value="default">Default</TabsTab>
          </TabsHighlightItem>
          <TabsHighlightItem className="project-tabs-item" value="hover">
            <TabsTab className="project-tabs-tab" value="hover">Hover</TabsTab>
          </TabsHighlightItem>
        </TabsList>
      </TabsHighlight>

      <TabsPanels className="cs-alarm-panels" mode="wait">
        <TabsPanel value="default">
          <div className="cs-alarm-panel cs-flex-cluster">
            <div className="cs-alarm-state-row cs-flex-cluster">
              <span className="cs-alarm-label">{t('報警等級')}</span>
              <span className="cs-alarm-help cs-alarm-help-muted cs-inline-pill">?</span>
              <span>{t('：')}</span>
              <span className="cs-alarm-chip cs-alarm-chip-danger cs-inline-pill">{t('嚴重')}</span>
            </div>
          </div>
        </TabsPanel>

        <TabsPanel value="hover">
          <div className="cs-alarm-panel cs-alarm-after cs-flex-cluster">
            <div className="cs-alarm-state-row cs-flex-cluster">
              <span className="cs-alarm-label">{t('報警等級')}</span>
              <span className="cs-alarm-help-wrap">
                <span className="cs-alarm-help cs-alarm-help-active cs-inline-pill">?</span>
                <span className="cs-alarm-tip">
                  {tooltipLines.map((line) => (
                    <span key={line}>{t(line)}</span>
                  ))}
                  <span className="cs-alarm-tip-arrow" />
                </span>
              </span>
              <span>{t('：')}</span>
              <span className="cs-alarm-chip cs-alarm-chip-danger cs-inline-pill">{t('嚴重')}</span>
            </div>
          </div>
        </TabsPanel>
      </TabsPanels>
    </Tabs>
  );
}
