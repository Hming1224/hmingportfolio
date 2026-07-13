import { CaseCard, CaseGrid, CaseMedia, CaseMetricGrid, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { impactFindings, impactPriorities, impactStats, impactTimes } from "../data";

export default async function ImpactSection() {
  const { t, locale } = await getCryptoArsenalTranslator();
  const quote = (text: string) =>
    locale === "zh-TW" ? `「${text}」` : `“${text}”`;
  return (
    <section id="cs-sec-impact" className="cs-section-surface">
      <CaseSectionHeader kicker={t("設計成效")} title={t("延續熟悉的交易邏輯，三項核心任務平均縮短 58%")} />
      <p className="cs-section-lead">
        {t(
          "我的驗證假設是：如果 CA 延續交易者熟悉的操作邏輯與用詞，使用者應能直接在策略頁完成平倉與止盈止損，不必切回交易所。",
        )}
      </p>
      <p className="cs-section-lead">
        {t(
          "我邀請 5 位具合約交易經驗的內部成員進行簡單易用性測試，完成限價平倉、市價平倉與止盈止損三項任務，主要記錄操作時間、整體易用性與現場回饋。",
        )}
      </p>
      <CaseMetricGrid>
        {impactStats.map((stat) => (
          <CaseCard key={stat.label} variant="metric" className="ca-impact-summary-card">
            <span className="cs-metric-value">{t(stat.value)}</span>
            <h3 className="cs-metric-label">{t(stat.label)}</h3>
            <p className="cs-metric-body">{t(stat.body)}</p>
          </CaseCard>
        ))}
      </CaseMetricGrid>
      <CaseMedia className="cs-media--small-gap" variant="scroll">
        <div className="ca-impact-table-intro">
          <h3 className="cs-subsection-title ca-impact-table-title">{t("三項任務操作時間比較")}</h3>
          <p>{t("原流程需切換至交易所並重新定位持倉；新版可直接從 CA 策略頁完成。")}</p>
        </div>
        <table className="cs-data-table">
          <thead>
            <tr>
              <th scope="col">{t("任務")}</th>
              <th scope="col">{t("原流程")}</th>
              <th scope="col">{t("新版")}</th>
            </tr>
          </thead>
          <tbody>
            {impactTimes.map((row) => (
              <tr key={row.flow}>
                <th scope="row">{t(row.flow)}</th>
                <td className="cs-data-table-value--muted">
                  {row.before}
                  {t("秒")}
                </td>
                <td className="cs-data-table-value--strong">
                  {row.after}
                  {t("秒")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CaseMedia>
      <h3 className="cs-subsection-title cs-subsection-title--top-gap">{t("質化洞察與支持回饋")}</h3>
      <CaseGrid variant="two" className="ca-impact-findings">
        {impactFindings.map((finding) => (
          <CaseCard key={finding.title} className={`ca-impact-finding-card is-${finding.tone}`}>
            <div className="ca-impact-finding-summary">
              <h4>{t(finding.title)}</h4>
              <p>{t(finding.body)}</p>
            </div>
            <div className="ca-impact-finding-evidence">
              <span className="ca-impact-finding-evidence-label">{t("支持這項洞察的回饋")}</span>
              {finding.quotes.map((item) => (
                <blockquote key={item.text} className="ca-impact-feedback-summary">
                  <p>{quote(t(item.text))}</p>
                  <footer>{t(item.label)}</footer>
                </blockquote>
              ))}
            </div>
          </CaseCard>
        ))}
      </CaseGrid>
      <h3 className="cs-subsection-title cs-subsection-title--top-gap">{t("下一輪優先改善")}</h3>
      <CaseGrid variant="three" className="ca-impact-priorities">
        {impactPriorities.map((item) => (
          <CaseCard key={item.title} className="ca-impact-priority-card">
            <h4>{t(item.title)}</h4>
            <p>{t(item.body)}</p>
          </CaseCard>
        ))}
      </CaseGrid>
      <p className="cs-section-note">
        {t(
          "本次由 5 位具合約交易經驗的內部成員進行簡單易用性測試，結果用於檢查操作流程與找出後續改善方向。",
        )}
      </p>
    </section>
  );
}
