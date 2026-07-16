"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";

type SemanticExampleKind = "button" | "link" | "linkButton" | "cta";

type SemanticTableExampleProps = {
  copiedLabel: string;
  kind: SemanticExampleKind;
  label: string;
};

export default function SemanticTableExample({
  copiedLabel,
  kind,
  label,
}: SemanticTableExampleProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText("hmingdesigner@gmail.com");
    setCopied(true);
  }

  if (kind === "button") {
    return (
      <Button size="sm" type="button" onClick={copyEmail}>
        {copied ? copiedLabel : label}
      </Button>
    );
  }

  if (kind === "link") {
    return <a className="ds-case-table__example-link" href="#cs-sec-framework">{label}</a>;
  }

  if (kind === "linkButton") {
    return <Button href="#cs-sec-outcome" size="sm">{label}</Button>;
  }

  return <Button href="/design-system" size="sm">{label}</Button>;
}
