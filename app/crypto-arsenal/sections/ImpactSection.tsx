import { getCryptoArsenalTranslator } from "../i18n-server";
import { impactStats, impactTimes, impactQuotes } from "../data";

export default async function ImpactSection() {
  const { t, locale } = await getCryptoArsenalTranslator();
  const quote = (text: string) =>
    locale === "zh-TW" ? `「${text}」` : `“${text}”`;
  return (
    <section id="cs-sec-impact" className="cs-section ca-section-alt">
      <span className="ca-tag">{t("設計成效")}</span>
      <h2 className="ca-h2">{t("用內部測試與流程指標驗證")}</h2>
      <p className="ca-lead ca-narrow">
        {t(
          "實習階段沒有資源做正式的大規模用戶測試，所以我用兩種方式檢驗這套平倉與止盈止損流程好不好上手：一是找 5 位內部成員做任務式可用性測試，二是直接看流程本身的指標——例如完成一次操作要幾步、需不需要跳出平台。",
        )}
      </p>
      <div className="ca-impact">
        {impactStats.map((stat) => (
          <div className="ca-impact-card" key={stat.label}>
            <span className="ca-impact-value">{t(stat.value)}</span>
            <h3 className="ca-impact-label">{t(stat.label)}</h3>
            <p className="ca-impact-body">{t(stat.body)}</p>
          </div>
        ))}
      </div>
      <div className="ca-impact-compare">
        <span className="ca-impact-compare-cap">
          {t("操作時間對比：原本得跳去交易所來回，新版在 CA 內直接完成")}
        </span>
        <table className="ca-impact-times">
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
                <td className="ca-impact-before">
                  {row.before}
                  {t("秒")}
                </td>
                <td className="ca-impact-after">
                  {row.after}
                  {t("秒")}
                </td>
                <td className="ca-impact-cut">{row.cut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ca-impact-quotes">
        {impactQuotes.map((item) => (
          <article className="ca-impact-quote" key={item.text}>
            <p className="ca-impact-quote-text">{quote(t(item.text))}</p>
            <div className="ca-impact-quote-who">
              <span className="ca-impact-quote-name">{t(item.who)}</span>
              <span className="ca-impact-quote-line" aria-hidden="true" />
              <span className="ca-impact-quote-role">{t(item.role)}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="ca-impact-method">
        {t(
          "驗證方式：以 5 名內部成員進行任務式可用性測試（請受測者在無提示下完成指定的平倉 / 止盈止損任務）。上述數字為內部測試與設計流程觀察，非線上後台營運數據。",
        )}
      </p>
    </section>
  );
}
