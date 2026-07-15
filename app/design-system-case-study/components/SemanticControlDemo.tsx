"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";

type SemanticControlDemoProps = {
  buttonActionLabel: string;
  buttonLabel: string;
  copiedLabel: string;
  groupLabel: string;
  linkButtonLabel: string;
  linkButtonTargetLabel: string;
  linkLabel: string;
  linkTargetLabel: string;
};

export default function SemanticControlDemo({
  buttonActionLabel,
  buttonLabel,
  copiedLabel,
  groupLabel,
  linkButtonLabel,
  linkButtonTargetLabel,
  linkLabel,
  linkTargetLabel,
}: SemanticControlDemoProps) {
  const [copied, setCopied] = useState(false);

  async function copyContact() {
    await navigator.clipboard.writeText("hmingdesigner@gmail.com");
    setCopied(true);
  }

  return (
    <div className="ds-case-control-demo" role="group" aria-label={groupLabel}>
      <div>
        <span>{buttonLabel}</span>
        <Button type="button" onClick={copyContact}>{copied ? copiedLabel : buttonActionLabel}</Button>
      </div>
      <div>
        <span>{linkLabel}</span>
        <a href="#cs-sec-framework">{linkTargetLabel}</a>
      </div>
      <div>
        <span>{linkButtonLabel}</span>
        <Button href="#cs-sec-outcome">{linkButtonTargetLabel}</Button>
      </div>
    </div>
  );
}
