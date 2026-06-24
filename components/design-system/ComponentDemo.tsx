"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { Alert } from "../ui/Alert";
import { Checkbox } from "../ui/Checkbox";
import { EmptyState } from "../ui/EmptyState";
import { Modal } from "../ui/Modal";
import { Radio } from "../ui/Radio";
import { Select } from "../ui/Select";
import { Skeleton } from "../ui/Skeleton";
import { Toast } from "../ui/Toast";
import ZoomableImage from "../case-study/ZoomableImage";

const options = [
  { label: "Product design", value: "product" },
  { label: "UX research", value: "research" },
  { label: "Design system", value: "system" },
];

export default function ComponentDemo({ type }: { type?: string }) {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  if (!type) {
    return <p className="ds-doc-demo-note">This pattern is documented from its live portfolio usage.</p>;
  }

  if (type === "button") {
    return (
      <div className="ds-button-row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button loading loadingLabel="Loading">Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    );
  }

  if (type === "copy") {
    return (
      <Button
        variant="secondary"
        onClick={async () => {
          await navigator.clipboard.writeText("--hm-purple: #5d62d8;");
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied" : "Copy token"}
      </Button>
    );
  }

  if (type === "input" || type === "textarea") {
    return (
      <label className="ds-floating-field ds-doc-field">
        {type === "textarea" ? <textarea placeholder=" " rows={4} /> : <input type="text" placeholder=" " />}
        <span>{type === "textarea" ? "Project context" : "Email address"}</span>
      </label>
    );
  }

  if (type === "select") {
    return (
      <div className="ds-doc-control-width">
        <Select
          name="design-discipline"
          options={options}
          value={selectValue}
          onChange={setSelectValue}
          placeholder="Choose a discipline"
        />
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="ds-doc-choice-stack">
        <Checkbox defaultChecked>Selected option</Checkbox>
        <Checkbox>Available option</Checkbox>
        <Checkbox disabled>Disabled option</Checkbox>
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div className="ds-doc-choice-stack">
        <Radio name="demo-radio" defaultChecked>Product designer</Radio>
        <Radio name="demo-radio">Product manager</Radio>
        <Radio name="demo-radio" disabled>Unavailable</Radio>
      </div>
    );
  }

  if (type === "tabs") {
    return (
      <div className="ds-doc-tabs" role="tablist" aria-label="Case study views">
        {["Overview", "Research", "Solution"].map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? "is-active" : undefined}
            key={tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }

  if (type === "tags") {
    return (
      <div className="ds-project-tag-row">
        <span>Product design</span>
        <span>UX research</span>
        <span>AI collaboration</span>
      </div>
    );
  }

  if (type === "alert") {
    return (
      <div className="ds-doc-feedback-stack">
        <Alert tone="success">Design tokens are synchronized.</Alert>
        <Alert tone="warning">Review responsive behavior before release.</Alert>
        <Alert tone="error">Required field is missing.</Alert>
        <Alert tone="info">Documentation uses production components.</Alert>
      </div>
    );
  }

  if (type === "toast") {
    return (
      <>
        <Button onClick={() => setToastVisible(true)}>Show toast</Button>
        {toastVisible ? (
          <Toast message="Changes saved." tone="success" onClose={() => setToastVisible(false)} />
        ) : null}
      </>
    );
  }

  if (type === "modal") {
    return (
      <>
        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal open={modalOpen} title="Review design-system change" onClose={() => setModalOpen(false)}>
          <p className="ds-doc-modal-copy">Focus stays inside this dialog. Press Escape or use Close.</p>
          <div className="ds-inline-actions">
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Close</Button>
          </div>
        </Modal>
      </>
    );
  }

  if (type === "skeleton") {
    return (
      <div className="ds-doc-skeleton-stack" aria-label="Loading preview">
        <Skeleton style={{ width: "42%", height: 18 }} />
        <Skeleton style={{ width: "100%", height: 72 }} />
        <Skeleton style={{ width: "76%", height: 18 }} />
      </div>
    );
  }

  if (type === "empty") {
    return (
      <EmptyState
        title="No matching component"
        description="Clear filters or browse another category."
        action={<Button size="sm">Clear filters</Button>}
      />
    );
  }

  if (type === "zoom") {
    return (
      <div className="ds-doc-zoom-wrap">
        <ZoomableImage
          alt="Design system project cover"
          src="/projects/advantech/cover/cover.webp"
          width={1280}
          height={720}
          labels={{ close: "Close", separator: ": ", zoom: "Zoom image" }}
        />
      </div>
    );
  }

  return <p className="ds-doc-demo-note">Live behavior is visible in the linked production source.</p>;
}
