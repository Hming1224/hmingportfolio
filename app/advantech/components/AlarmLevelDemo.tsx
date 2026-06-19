'use client';

import { useId } from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '../../../i18n/routing';
import { translateAdvantech } from '../i18n';

type Props = {
  tooltipLines: string[];
};

export default function AlarmLevelDemo({ tooltipLines }: Props) {
  const id = useId();
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);

  return (
    <div className="cs-alarm-demo">
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

      <div className="cs-alarm-toggle" role="group" aria-label={t("報警等級互動狀態")}>
        <label className="cs-alarm-toggle-btn cs-alarm-toggle-default" htmlFor={`${id}-default`}>
          <span>Default</span>
        </label>
        <label className="cs-alarm-toggle-btn cs-alarm-toggle-hover" htmlFor={`${id}-hover`}>
          <span>Hover</span>
        </label>
      </div>

      <div className="cs-alarm-panel cs-alarm-before">
        <div className="cs-alarm-state-row">
          <span className="cs-alarm-label">{t("報警等級")}</span>
          <span className="cs-alarm-help cs-alarm-help-muted">?</span>
          <span>{t("：")}</span>
          <span className="cs-alarm-chip cs-alarm-chip-danger">{t("嚴重")}</span>
        </div>
      </div>

      <span className="cs-alarm-arrow">→</span>

      <div className="cs-alarm-panel cs-alarm-after">
        <div className="cs-alarm-state-row">
          <span className="cs-alarm-label">{t("報警等級")}</span>
          <span className="cs-alarm-help-wrap">
            <span className="cs-alarm-help cs-alarm-help-active">?</span>
            <span className="cs-alarm-tip">
              {tooltipLines.map((line) => (
                <p key={line}>{t(line)}</p>
              ))}
              <span className="cs-alarm-tip-arrow" />
            </span>
          </span>
          <span>{t("：")}</span>
          <span className="cs-alarm-chip cs-alarm-chip-danger">{t("嚴重")}</span>
        </div>
      </div>
    </div>
  );
}
