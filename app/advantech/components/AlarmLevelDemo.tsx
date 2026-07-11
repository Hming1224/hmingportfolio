'use client';

import { useId, useState } from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '../../../i18n/routing';
import { translateAdvantech } from '../i18n';

type Props = {
  tooltipLines: string[];
  interactive?: boolean;
};

export default function AlarmLevelDemo({ tooltipLines, interactive = false }: Props) {
  const id = useId();
  const [mode, setMode] = useState<'default' | 'hover'>('default');
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);

  if (interactive) {
    return (
      <div className="cs-alarm-demo cs-alarm-demo--interactive cs-flex-cluster">
        <div className="cs-alarm-toggle cs-stack-box" role="group" aria-label={t("報警等級互動狀態")}>
          <button className="cs-alarm-toggle-btn cs-flex-cluster" type="button" aria-pressed={mode === 'default'} onClick={() => setMode('default')}>
            Default
          </button>
          <button className="cs-alarm-toggle-btn cs-flex-cluster" type="button" aria-pressed={mode === 'hover'} onClick={() => setMode('hover')}>
            Hover
          </button>
        </div>

        {mode === 'default' ? (
          <div className="cs-alarm-panel cs-flex-cluster">
            <div className="cs-alarm-state-row cs-flex-cluster">
              <span className="cs-alarm-label">{t("報警等級")}</span>
              <span className="cs-alarm-help cs-alarm-help-muted cs-inline-pill">?</span>
              <span>{t("：")}</span>
              <span className="cs-alarm-chip cs-alarm-chip-danger cs-inline-pill">{t("嚴重")}</span>
            </div>
          </div>
        ) : (
          <div className="cs-alarm-panel cs-alarm-after cs-alarm-after--interactive cs-flex-cluster">
            <div className="cs-alarm-state-row cs-flex-cluster">
              <span className="cs-alarm-label">{t("報警等級")}</span>
              <span className="cs-alarm-help-wrap">
                <span className="cs-alarm-help cs-alarm-help-active cs-inline-pill">?</span>
                <span className="cs-alarm-tip">
                  {tooltipLines.map((line) => <p key={line}>{t(line)}</p>)}
                  <span className="cs-alarm-tip-arrow" />
                </span>
              </span>
              <span>{t("：")}</span>
              <span className="cs-alarm-chip cs-alarm-chip-danger cs-inline-pill">{t("嚴重")}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cs-alarm-demo cs-flex-cluster">
      <input
        className="cs-alarm-mode cs-alarm-mode-default"
        id={`${id}-default`}
        name={`${id}-alarm-mode`}
        type="radio"
        defaultChecked
      />
      <input
        className="cs-alarm-mode cs-alarm-mode-hover"
        id={`${id}-hover`}
        name={`${id}-alarm-mode`}
        type="radio"
      />

      <div className="cs-alarm-toggle cs-stack-box" role="group" aria-label={t("報警等級互動狀態")}>
        <label className="cs-alarm-toggle-btn cs-alarm-toggle-default cs-flex-cluster" htmlFor={`${id}-default`}>
          <span>Default</span>
        </label>
        <label className="cs-alarm-toggle-btn cs-alarm-toggle-hover cs-flex-cluster" htmlFor={`${id}-hover`}>
          <span>Hover</span>
        </label>
      </div>

      <div className="cs-alarm-panel cs-alarm-before cs-flex-cluster">
        <div className="cs-alarm-state-row cs-flex-cluster">
          <span className="cs-alarm-label">{t("報警等級")}</span>
          <span className="cs-alarm-help cs-alarm-help-muted cs-inline-pill">?</span>
          <span>{t("：")}</span>
          <span className="cs-alarm-chip cs-alarm-chip-danger cs-inline-pill">{t("嚴重")}</span>
        </div>
      </div>

      <span className="cs-alarm-arrow cs-flex-cluster">→</span>

      <div className="cs-alarm-panel cs-alarm-after cs-flex-cluster">
        <div className="cs-alarm-state-row cs-flex-cluster">
          <span className="cs-alarm-label">{t("報警等級")}</span>
          <span className="cs-alarm-help-wrap">
            <span className="cs-alarm-help cs-alarm-help-active cs-inline-pill">?</span>
            <span className="cs-alarm-tip">
              {tooltipLines.map((line) => (
                <p key={line}>{t(line)}</p>
              ))}
              <span className="cs-alarm-tip-arrow" />
            </span>
          </span>
          <span>{t("：")}</span>
          <span className="cs-alarm-chip cs-alarm-chip-danger cs-inline-pill">{t("嚴重")}</span>
        </div>
      </div>
    </div>
  );
}
