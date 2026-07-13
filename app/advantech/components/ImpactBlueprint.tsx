import { BrainCircuit, Database, Factory, FileChartColumn, MonitorCog, Snowflake } from 'lucide-react';

interface ImpactBlueprintProps {
  ariaLabel: string;
  labels: {
    ecowatch: string;
    hvac: string;
    hub: string;
    crossSite: string;
    reports: string;
    machinePanel: string;
  };
}

export default function ImpactBlueprint({ ariaLabel, labels }: ImpactBlueprintProps) {
  return (
    <div className="cs-impact-blueprint" role="img" aria-label={ariaLabel}>
      <svg
        className="cs-impact-blueprint-lines"
        viewBox="0 0 720 430"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path id="impact-source-a" d="M144 126 C242 126 240 204 322 204" />
        <path id="impact-source-b" d="M144 304 C242 304 240 226 322 226" />
        <path id="impact-output-a" d="M398 204 C474 204 474 104 574 104" />
        <path id="impact-output-b" d="M398 215 C492 215 492 215 594 215" />
        <path id="impact-output-c" d="M398 226 C474 226 474 326 574 326" />
        <path className="is-signal signal-a" d="M144 126 C242 126 240 204 322 204" />
        <path className="is-signal signal-b" d="M144 304 C242 304 240 226 322 226" />
        <path className="is-signal signal-c" d="M398 204 C474 204 474 104 574 104" />
        <path className="is-signal signal-d" d="M398 215 C492 215 492 215 594 215" />
        <path className="is-signal signal-e" d="M398 226 C474 226 474 326 574 326" />
      </svg>

      <div className="cs-impact-blueprint-node" data-node="ecowatch">
        <span><Database aria-hidden="true" /></span>
        <strong>{labels.ecowatch}</strong>
      </div>
      <div className="cs-impact-blueprint-node" data-node="hvac">
        <span><Snowflake aria-hidden="true" /></span>
        <strong>{labels.hvac}</strong>
      </div>
      <div className="cs-impact-blueprint-node is-hub" data-node="hub">
        <span><BrainCircuit aria-hidden="true" /></span>
        <strong>{labels.hub}</strong>
      </div>
      <div className="cs-impact-blueprint-node" data-node="cross-site">
        <span><Factory aria-hidden="true" /></span>
        <strong>{labels.crossSite}</strong>
      </div>
      <div className="cs-impact-blueprint-node" data-node="reports">
        <span><FileChartColumn aria-hidden="true" /></span>
        <strong>{labels.reports}</strong>
      </div>
      <div className="cs-impact-blueprint-node" data-node="machine-panel">
        <span><MonitorCog aria-hidden="true" /></span>
        <strong>{labels.machinePanel}</strong>
      </div>
    </div>
  );
}
