"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "./ui/Button";
import { Alert } from "./ui/Alert";
import { Checkbox } from "./ui/Checkbox";
import { EmptyState } from "./ui/EmptyState";
import { Modal } from "./ui/Modal";
import { Radio } from "./ui/Radio";
import { Select } from "./ui/Select";
import { Skeleton } from "./ui/Skeleton";
import { Toast } from "./ui/Toast";

type Dictionary = {
  tokenToggle: string;
  tokenHide: string;
  loadingLabel: string;
  selectPlaceholder: string;
  selectValueLabel: string;
  checkboxLabel: string;
  radioAlpha: string;
  radioBeta: string;
  alertInfo: string;
  alertSuccess: string;
  alertWarning: string;
  alertError: string;
  openModal: string;
  launchToast: string;
  modalTitle: string;
  modalBody: string;
  modalClose: string;
  toastMessage: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyAction: string;
  buttonsTitle: string;
  buttonsBody: string;
  buttonsPrimary: string;
  buttonsSecondary: string;
  buttonsDanger: string;
  selectionTitle: string;
  selectionBody: string;
  feedbackTitle: string;
  feedbackBody: string;
  loadingTitle: string;
  loadingBody: string;
};

type TokenGroup = {
  id: string;
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
};

export default function DesignSystemPlayground({
  dictionary,
  tokenGroups,
  part = "all",
}: {
  dictionary: Dictionary;
  tokenGroups: TokenGroup[];
  part?: "components" | "tokens" | "all";
}) {
  const [selectedRole, setSelectedRole] = useState("design-lead");
  const [selectedTrack, setSelectedTrack] = useState("alpha");
  const [checked, setChecked] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [expandedTokenGroup, setExpandedTokenGroup] = useState<string | null>(
    tokenGroups[0]?.id ?? null,
  );

  const tokenSections = useMemo(() => tokenGroups, [tokenGroups]);
  const showComponents = part === "components" || part === "all";
  const showTokens = part === "tokens" || part === "all";

  return (
    <>
      {showComponents && (
      <div className="ds-playground-grid">
        <div className="ds-component-card">
          <div className="ds-component-card-header">
            <div>
              <h3>{dictionary.buttonsTitle}</h3>
              <p>{dictionary.buttonsBody}</p>
            </div>
          </div>
          <div className="ds-button-row">
            <Button>{dictionary.buttonsPrimary}</Button>
            <Button variant="secondary">{dictionary.buttonsSecondary}</Button>
            <Button variant="danger">{dictionary.buttonsDanger}</Button>
            <Button loading loadingLabel={dictionary.loadingLabel}>
              Hidden
            </Button>
          </div>
        </div>

        <div className="ds-component-card">
          <div className="ds-component-card-header">
            <div>
              <h3>{dictionary.selectionTitle}</h3>
              <p>{dictionary.selectionBody}</p>
            </div>
          </div>
          <div className="ds-form-grid">
            <div className="ds-form-field">
              <span>{dictionary.selectValueLabel}</span>
              <Select
                name="role"
                options={[
                  { label: "Design Lead", value: "design-lead" },
                  { label: "Product Designer", value: "product-designer" },
                  { label: "Hiring Manager", value: "hiring-manager" },
                ]}
                placeholder={dictionary.selectPlaceholder}
                value={selectedRole}
                onChange={setSelectedRole}
              />
            </div>
            <div className="ds-choice-grid">
              <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)}>
                {dictionary.checkboxLabel}
              </Checkbox>
              <Radio
                checked={selectedTrack === "alpha"}
                name="track"
                onChange={() => setSelectedTrack("alpha")}
              >
                {dictionary.radioAlpha}
              </Radio>
              <Radio
                checked={selectedTrack === "beta"}
                name="track"
                onChange={() => setSelectedTrack("beta")}
              >
                {dictionary.radioBeta}
              </Radio>
            </div>
          </div>
        </div>

        <div className="ds-component-card">
          <div className="ds-component-card-header">
            <div>
              <h3>{dictionary.feedbackTitle}</h3>
              <p>{dictionary.feedbackBody}</p>
            </div>
          </div>
          <div className="ds-feedback-stack">
            <Alert tone="info">{dictionary.alertInfo}</Alert>
            <Alert tone="success">{dictionary.alertSuccess}</Alert>
            <Alert tone="warning">{dictionary.alertWarning}</Alert>
            <Alert tone="error">{dictionary.alertError}</Alert>
          </div>
          <div className="ds-inline-actions">
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              {dictionary.openModal}
            </Button>
            <Button onClick={() => setToastVisible(true)}>{dictionary.launchToast}</Button>
          </div>
        </div>

        <div className="ds-component-card">
          <div className="ds-component-card-header">
            <div>
              <h3>{dictionary.loadingTitle}</h3>
              <p>{dictionary.loadingBody}</p>
            </div>
          </div>
          <div className="ds-skeleton-layout" aria-hidden="true">
            <Skeleton className="ds-skeleton-avatar" />
            <div className="ds-skeleton-copy">
              <Skeleton className="ds-skeleton-line ds-skeleton-line-lg" />
              <Skeleton className="ds-skeleton-line" />
              <Skeleton className="ds-skeleton-line ds-skeleton-line-sm" />
            </div>
          </div>
          <EmptyState
            title={dictionary.emptyTitle}
            description={dictionary.emptyDescription}
            action={<Button variant="secondary">{dictionary.emptyAction}</Button>}
          />
        </div>
      </div>
      )}

      {showTokens && (
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
      )}

      {showComponents && (
      <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={dictionary.modalTitle}
        closeLabel={dictionary.modalClose}
      >
        <div className="ds-modal-body">
          <p>{dictionary.modalBody}</p>
          <Button onClick={() => setModalOpen(false)}>{dictionary.modalClose}</Button>
        </div>
      </Modal>

      {toastVisible ? (
        <Toast
          message={dictionary.toastMessage}
          tone="success"
          onClose={() => setToastVisible(false)}
        />
      ) : null}
      </>
      )}
    </>
  );
}
