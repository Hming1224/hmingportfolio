import { CaseCard, CaseGrid, CaseMedia, CaseMetricGrid, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { impactStats, impactTimes, impactQuotes } from "../data";

export default async function ImpactSection() {
  const { t, locale } = await getCryptoArsenalTranslator();
  const quote = (text: string) =>
    locale === "zh-TW" ? `「${text}」` : `“${text}”`;
  return (
    <section id="cs-sec-impact" className="cs-section-surface">
      <CaseSectionHeader kicker={t("設計成效")} title={t("與交易所相同步數、操作時間減 58%，把既有操作習慣無縫接進 CA")} />
      <p className="cs-section-lead">
        {t(
          "實習階段沒有資源做正式的大規模用戶測試，所以我用兩種方式檢驗這套平倉與止盈止損流程好不好上手：一是找 5 位內部成員做任務式可用性測試，二是直接看流程本身的指標，例如：完成一次操作要幾步、每個流程平均操作花費的時間等。",
        )}
      </p>
      <CaseMetricGrid>
        {impactStats.map((stat) => (
          <CaseCard key={stat.label} variant="metric">
            <span className="cs-metric-value">{t(stat.value)}</span>
            <h3 className="cs-metric-label">{t(stat.label)}</h3>
            <p className="cs-metric-body">{t(stat.body)}</p>
          </CaseCard>
        ))}
      </CaseMetricGrid>
      <CaseMedia className="cs-media--small-gap" variant="scroll">
        <span className="cs-media-label">
          {t("操作時間對比：原本得跳去交易所來回，新版在 CA 內直接完成")}
        </span>
        <table className="cs-data-table">
          <thead>
            <tr>
              <th scope="col">{t("操作流程")}</th>
              <th scope="col">{t("原本（CA → 交易所）")}</th>
              <th scope="col">{t("新版（CA 內）")}</th>
              <th scope="col">{t("縮短")}</th>
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
                <td className="cs-data-table-value--positive">{row.cut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CaseMedia>
      <CaseGrid variant="two" className="cs-grid--quote-list">
        {impactQuotes.map((item) => (
          <CaseCard key={item.text}>
            <p className="cs-quote-text">{quote(t(item.text))}</p>
            <div className="cs-quote-meta">
              <span className="cs-quote-name">{t(item.who)}</span>
              <span className="cs-quote-line" aria-hidden="true" />
              <span className="cs-quote-role">{t(item.role)}</span>
            </div>
          </CaseCard>
        ))}
      </CaseGrid>
      <p className="cs-section-note">
        {t(
          "驗證方式：以 5 名內部成員進行任務式可用性測試（請受測者在無提示下完成指定的平倉 / 止盈止損任務）。上述數字為內部測試與設計流程觀察，非線上後台營運數據。",
        )}
      </p>
    </section>
  );
}
