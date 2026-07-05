"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import type { DesignSystemTokenRow } from "@/lib/design-system-data";
import type { DesignSystemLocale } from "@/lib/design-system-docs";
import styles from "./DesignSystemExplorer.module.css";

type TokenReferenceBrowserProps = {
  locale: DesignSystemLocale;
  rows: DesignSystemTokenRow[];
};

const typeOrder: DesignSystemTokenRow["type"][] = [
  "color",
  "type",
  "spacing",
  "radius",
  "shadow",
  "motion",
  "layout",
];

function localized(locale: DesignSystemLocale, english: string, chinese: string) {
  return locale === "zh-TW" ? chinese : english;
}

function getUsage(row: DesignSystemTokenRow, locale: DesignSystemLocale) {
  return locale === "zh-TW" ? row.usageZh ?? row.usage : row.usage;
}

function firstTokenValue(row: DesignSystemTokenRow) {
  return row.value.split(" / ")[0];
}

function tokenPreviewStyle(row: DesignSystemTokenRow) {
  const value = firstTokenValue(row);
  const canUseTokenVariable = row.token.startsWith("--") && !row.token.includes(" / ");
  const cssValue = value.startsWith("#") || value.startsWith("rgb") || value.startsWith("var(")
    ? value
    : canUseTokenVariable
      ? `var(${row.token})`
      : "var(--hm-surface)";

  return {
    "--token-preview": cssValue,
    "--token-size": value,
    "--token-radius": value,
    "--token-shadow": row.value,
    "--token-duration": value,
    "--token-type-size": value,
  } as CSSProperties;
}

function renderTokenPreview(row: DesignSystemTokenRow, locale: DesignSystemLocale) {
  if (row.type === "color") {
    return (
      <span
        aria-label={localized(locale, "Color preview", "色彩預覽")}
        className={styles.tokenPreviewSwatch}
        style={tokenPreviewStyle(row)}
      />
    );
  }

  if (row.type === "spacing") {
    return <span className={styles.tokenPreviewBar} style={tokenPreviewStyle(row)} />;
  }

  if (row.type === "radius") {
    return <span className={styles.tokenPreviewRadius} style={tokenPreviewStyle(row)} />;
  }

  if (row.type === "shadow") {
    return <span className={styles.tokenPreviewShadow} style={tokenPreviewStyle(row)} />;
  }

  if (row.type === "motion") {
    return <span className={styles.tokenPreviewMotion} style={tokenPreviewStyle(row)} />;
  }

  if (row.type === "type") {
    return <strong className={styles.tokenPreviewType} style={tokenPreviewStyle(row)}>Aa</strong>;
  }

  return <span className={styles.tokenPreviewEmpty}>-</span>;
}

function typeLabel(type: DesignSystemTokenRow["type"], locale: DesignSystemLocale) {
  if (locale === "en") return type === "type" ? "typography" : type;

  const labels: Record<DesignSystemTokenRow["type"], string> = {
    color: "色彩",
    type: "字體",
    spacing: "間距",
    radius: "圓角",
    shadow: "陰影",
    motion: "動效",
    layout: "版面",
  };

  return labels[type];
}

export default function TokenReferenceBrowser({ locale, rows }: TokenReferenceBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<"all" | DesignSystemTokenRow["type"]>("all");
  const availableTypes = typeOrder.filter((type) => rows.some((row) => row.type === type));

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesType = activeType === "all" || row.type === activeType;
      if (!matchesType) return false;
      if (!normalizedQuery) return true;

      return [
        row.token,
        row.value,
        row.type,
        row.scope,
        row.usage,
        row.usageZh ?? "",
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
    });
  }, [activeType, query, rows]);

  return (
    <div className={styles.tokenReferenceBrowser}>
      <div className={styles.tokenReferenceControls}>
        <div className={styles.tokenReferenceSearch}>
          <label htmlFor="token-reference-search">
            {localized(locale, "Search tokens", "搜尋 tokens")}
          </label>
          <input
            id="token-reference-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={localized(locale, "Search token, type, scope, or usage", "搜尋 token、類型、範圍或用途")}
            type="search"
            value={query}
          />
        </div>
        <p className={styles.tokenReferenceCount} aria-live="polite">
          {localized(
            locale,
            `${filteredRows.length} of ${rows.length} tokens`,
            `${filteredRows.length} / ${rows.length} 個 tokens`,
          )}
        </p>
      </div>

      <div className={styles.tokenFilterChips} aria-label={localized(locale, "Filter tokens by type", "依類型篩選 tokens")}>
        <button
          aria-pressed={activeType === "all"}
          className={activeType === "all" ? styles.isActiveTokenFilter : undefined}
          onClick={() => setActiveType("all")}
          type="button"
        >
          {localized(locale, "All", "全部")}
        </button>
        {availableTypes.map((type) => (
          <button
            aria-pressed={activeType === type}
            className={activeType === type ? styles.isActiveTokenFilter : undefined}
            key={type}
            onClick={() => setActiveType(type)}
            type="button"
          >
            {typeLabel(type, locale)}
          </button>
        ))}
      </div>

      <div className={styles.tokenTableWrap}>
        <table className={styles.tokenTable}>
          <thead>
            <tr>
              <th>{localized(locale, "Token", "Token")}</th>
              <th>{localized(locale, "Value", "值")}</th>
              <th>{localized(locale, "Preview", "預覽")}</th>
              <th>{localized(locale, "Type", "類型")}</th>
              <th>{localized(locale, "Scope", "範圍")}</th>
              <th>{localized(locale, "Usage", "用途")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.token}>
                <td><code>{row.token}</code></td>
                <td><code>{row.value}</code></td>
                <td className={styles.tokenPreviewCell}>{renderTokenPreview(row, locale)}</td>
                <td>{typeLabel(row.type, locale)}</td>
                <td>{row.scope}</td>
                <td>{getUsage(row, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRows.length === 0 ? (
        <p className={styles.tokenEmptyState}>
          {localized(locale, "No tokens match this search.", "沒有符合搜尋條件的 tokens。")}
        </p>
      ) : null}
    </div>
  );
}
