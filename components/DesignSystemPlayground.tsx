"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "./ui/Button";

type Dictionary = {
  tokenToggle: string;
  tokenHide: string;
  loadingLabel: string;
  buttonPrimary: string;
  buttonSecondary: string;
  buttonDanger: string;
  buttonLoading: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputHelper: string;
  navbarLabel: string;
  navbarPrimary: string;
  tagTitle: string;
  tags: string[];
  cardEyebrow: string;
  cardTitle: string;
  cardBody: string;
  cardMeta: string;
  cardAction: string;
  tokenSearchPlaceholder: string;
};

type TokenGroup = {
  id: string;
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
};

type TokenReferenceRow = {
  token: string;
  value: string;
  type: string;
  scope: string;
  usage: string;
  filter: string;
};

export default function DesignSystemPlayground({
  dictionary,
  tokenGroups,
  tokenReferenceRows = [],
  tokenReferenceFilters = [],
  tokenReferenceTitle,
  tokenReferenceDescription,
  tokenReferenceColumns = ["Token", "Value", "Type", "Scope", "Usage"],
  part = "all",
}: {
  dictionary: Dictionary;
  tokenGroups: TokenGroup[];
  tokenReferenceRows?: TokenReferenceRow[];
  tokenReferenceFilters?: Array<{ value: string; label: string }>;
  tokenReferenceTitle?: string;
  tokenReferenceDescription?: string;
  tokenReferenceColumns?: string[];
  part?: "components" | "tokens" | "all";
}) {
  const [expandedTokenGroup, setExpandedTokenGroup] = useState<string | null>(
    tokenGroups[0]?.id ?? null,
  );
  const [tokenFilter, setTokenFilter] = useState<string>(tokenReferenceFilters[0]?.value ?? "all");
  const [tokenQuery, setTokenQuery] = useState("");

  const tokenSections = useMemo(() => tokenGroups, [tokenGroups]);
  const filteredTokenRows = useMemo(() => {
    return tokenReferenceRows.filter((row) => {
      const matchesFilter = tokenFilter === "all" || row.filter === tokenFilter;
      const normalizedQuery = tokenQuery.trim().toLowerCase();
      const haystack = `${row.token} ${row.value} ${row.type} ${row.scope} ${row.usage}`.toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [tokenFilter, tokenQuery, tokenReferenceRows]);
  const showComponents = part === "components" || part === "all";
  const showTokens = part === "tokens" || part === "all";

  return (
    <>
      {showComponents ? (
        <div className="ds-playground-stack">
          <div className="ds-component-showcase-grid">
            <article className="ds-component-card ds-component-card-wide">
              <div className="ds-component-card-header">
                <div>
                  <h3>{dictionary.buttonPrimary}</h3>
                  <p>{dictionary.loadingLabel}</p>
                </div>
              </div>
              <div className="ds-button-row">
                <Button>{dictionary.buttonPrimary}</Button>
                <Button variant="secondary">{dictionary.buttonSecondary}</Button>
                <Button variant="danger">{dictionary.buttonDanger}</Button>
                <Button loading loadingLabel={dictionary.loadingLabel}>
                  {dictionary.buttonLoading}
                </Button>
              </div>
            </article>

            <article className="ds-component-card">
              <div className="ds-component-card-header">
                <div>
                  <h3>{dictionary.inputLabel}</h3>
                  <p>{dictionary.inputHelper}</p>
                </div>
              </div>
              <label className="ds-floating-field">
                <input type="text" placeholder=" " defaultValue="" />
                <span>{dictionary.inputPlaceholder}</span>
              </label>
            </article>

            <article className="ds-component-card ds-project-card-demo">
              <p className="ds-card-eyebrow">{dictionary.cardEyebrow}</p>
              <h3>{dictionary.cardTitle}</h3>
              <p>{dictionary.cardBody}</p>
              <div className="ds-project-tag-row">
                {dictionary.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="ds-project-card-footer">
                <span>{dictionary.cardMeta}</span>
                <Button>{dictionary.cardAction}</Button>
              </div>
            </article>
          </div>

          <div className="ds-component-showcase-grid ds-component-showcase-grid-secondary">
            <article className="ds-component-card ds-navbar-demo-card">
              <div className="ds-demo-navbar">
                <span className="ds-demo-brand">Hming</span>
                <nav>
                  <a href="#components">Work</a>
                  <a href="#colors">About</a>
                  <a href="#tokens">System</a>
                </nav>
                <Button size="sm">{dictionary.navbarPrimary}</Button>
              </div>
              <p className="ds-demo-caption">{dictionary.navbarLabel}</p>
            </article>

            <article className="ds-component-card">
              <div className="ds-component-card-header">
                <div>
                  <h3>{dictionary.tagTitle}</h3>
                  <p>{dictionary.inputHelper}</p>
                </div>
              </div>
              <div className="ds-project-tag-row is-spacious">
                {dictionary.tags.map((tag) => (
                  <span key={`${tag}-tag`}>{tag}</span>
                ))}
              </div>
            </article>
          </div>
        </div>
      ) : null}

      {showTokens ? (
        <div className="ds-token-stack">
          <div className="ds-token-groups">
            {tokenSections.map((group) => {
              const expanded = expandedTokenGroup === group.id;
              return (
                <section key={group.id} className="ds-token-card">
                  <button
                    type="button"
                    className="ds-token-toggle"
                    aria-expanded={expanded}
                    onClick={() => setExpandedTokenGroup(expanded ? null : group.id)}
                  >
                    <div>
                      <h3>{group.title}</h3>
                      <p>{group.description}</p>
                    </div>
                    <span>
                      {expanded ? dictionary.tokenHide : dictionary.tokenToggle}
                      <ChevronDown aria-hidden="true" className={expanded ? "is-rotated" : undefined} size={18} />
                    </span>
                  </button>
                  {expanded ? (
                    <div className="ds-token-table-wrap">
                      <table className="ds-token-table">
                        <thead>
                          <tr>
                            {group.columns.map((column) => (
                              <th key={column} scope="col">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.map((row) => (
                            <tr key={row.join("-")}>
                              {row.map((cell, index) => (
                                <td key={`${cell}-${index}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>

          {tokenReferenceRows.length > 0 ? (
            <section className="ds-token-reference-card">
              <div className="ds-token-reference-head">
                <div>
                  <h3>{tokenReferenceTitle}</h3>
                  <p>{tokenReferenceDescription}</p>
                </div>
                <div className="ds-token-controls">
                  <div className="ds-token-filter-row">
                    {tokenReferenceFilters.map((filter) => (
                      <button
                        key={filter.value}
                        type="button"
                        className={filter.value === tokenFilter ? "is-active" : undefined}
                        onClick={() => setTokenFilter(filter.value)}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <label className="ds-token-search">
                    <input
                      type="search"
                      value={tokenQuery}
                      placeholder={dictionary.tokenSearchPlaceholder}
                      onChange={(event) => setTokenQuery(event.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="ds-token-reference-table-wrap">
                <table className="ds-token-table ds-token-reference-table">
                  <thead>
                    <tr>
                      {tokenReferenceColumns.map((column) => (
                        <th key={column} scope="col">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTokenRows.map((row) => (
                      <tr key={row.token}>
                        <td>{row.token}</td>
                        <td>{row.value}</td>
                        <td>{row.type}</td>
                        <td>{row.scope}</td>
                        <td>{row.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
