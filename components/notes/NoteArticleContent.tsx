import { RecordFigure, type RecordName } from "./RecordFigures";
import { MethodFigure, type MethodName } from "./MethodFigures";
import { PerformanceFigure, type PerformanceName } from "./PerformanceFigures";
import { DecisionFigure, type DecisionName } from "./DecisionFigures";
import { BoundaryFigure, type BoundaryName } from "./BoundaryFigures";
import { MeasurementFigure, type MeasurementName } from "./MeasurementFigures";
import { PracticeFigure, type PracticeName } from "./PracticeFigures";
import { SystemsFigure, type SystemsName } from "./SystemsFigures";
import { ImprovementFigure, type ImprovementName } from "./ImprovementFigures";
import { SupplyPlanningFigure, type SupplyPlanningName } from "./SupplyPlanningFigures";
import { FoundationFigure, type FoundationFigureName } from "./FoundationFigures";
import { FundamentalsExample, type FundamentalsName } from "./FundamentalsExamples";

import { AbcXyzInventory } from "./AbcXyzInventory";

import { OperationsExample, type OperationsExampleName } from "./OperationsExamples";

import { AiJobsChart, type AiJobsChartName } from "./AiJobsCharts";

import { AiControlChart, type AiControlChartName } from "./AiControlCharts";

import { PlanningDecision } from "./PlanningDecision";
import { ForecastCalculator } from "./ForecastCalculator";

const controlNames: AiControlChartName[] = ["ai-control-theories", "ai-control-evidence", "ai-control-horizons", "ai-control-authority"];

const chartNames: AiJobsChartName[] = ["ai-jobs-adoption", "ai-jobs-work", "ai-jobs-employment", "ai-jobs-baseline", "ai-jobs-history", "ai-jobs-demand"];

function decodeCaption(s: string) {
  return s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

/** Keep ordinary notes on their existing server-rendered path. */
export function NoteArticleContent({ html }: { html: string }) {
  if (!html.includes("data-note-interactive=")) {
    return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  const pattern = /<div data-note-interactive="([\w-]+)" data-caption="([^"]*)"><\/div>/g;
  const parts: React.ReactNode[] = [];
  let end = 0;
  for (const match of html.matchAll(pattern)) {
    const index = match.index!;
    if (index > end) parts.push(<div className="note-copy" key={`copy-${end}`} dangerouslySetInnerHTML={{ __html: html.slice(end, index) }} />);
    if (chartNames.includes(match[1] as AiJobsChartName)) {
      parts.push(<AiJobsChart key={index} name={match[1] as AiJobsChartName} caption={decodeCaption(match[2])} />);
    } else if (controlNames.includes(match[1] as AiControlChartName)) {
      parts.push(<AiControlChart key={index} name={match[1] as AiControlChartName} caption={decodeCaption(match[2])} />);
    } else if (["scale-ai-rollout", "stockout-demand", "robot-task-cost"].includes(match[1])) {
      parts.push(<OperationsExample key={index} name={match[1] as OperationsExampleName} caption={decodeCaption(match[2])} />);
    } else if (match[1] === "abc-inventory-value" || match[1] === "abc-xyz-inventory") {
      parts.push(<AbcXyzInventory key={index} name={match[1]} caption={decodeCaption(match[2])} />);
    } else if (["standard-work-cycle", "wbs-deliverables", "mrp-netting"].includes(match[1])) {
      parts.push(<FundamentalsExample key={index} name={match[1] as FundamentalsName} caption={decodeCaption(match[2])} />);
    } else if (["digital-invoice-map", "data-quality-records", "pareto-measures"].includes(match[1])) {
      parts.push(<FoundationFigure key={index} name={match[1] as FoundationFigureName} caption={decodeCaption(match[2])} />);
    } else if (["bullwhip-batching", "eoq-costs", "sop-supply-gap"].includes(match[1])) {
      parts.push(<SupplyPlanningFigure key={index} name={match[1] as SupplyPlanningName} caption={decodeCaption(match[2])} />);
    } else if (["pdca-trial", "kanban-loop", "charter-authority"].includes(match[1])) {
      parts.push(<ImprovementFigure key={index} name={match[1] as ImprovementName} caption={decodeCaption(match[2])} />);
    } else if (["scope-change-options", "manufacturing-order-records", "process-event-traces"].includes(match[1])) {
      parts.push(<SystemsFigure key={index} name={match[1] as SystemsName} caption={decodeCaption(match[2])} />);
    } else if (["lean-waste-order", "five-s-station", "portfolio-capacity"].includes(match[1])) {
      parts.push(<PracticeFigure key={index} name={match[1] as PracticeName} caption={decodeCaption(match[2])} />);
    } else if (["twin-state-freshness", "service-metric-cycles", "yield-unit-history"].includes(match[1])) {
      parts.push(<MeasurementFigure key={index} name={match[1] as MeasurementName} caption={decodeCaption(match[2])} />);
    } else if (["sipoc-maintenance-boundary", "otif-promise-ledger", "dependency-endpoints"].includes(match[1])) {
      parts.push(<BoundaryFigure key={index} name={match[1] as BoundaryName} caption={decodeCaption(match[2])} />);
    } else if (["order-strategy-timing", "a3-quote-evidence", "risk-issue-recovery"].includes(match[1])) {
      parts.push(<DecisionFigure key={index} name={match[1] as DecisionName} caption={decodeCaption(match[2])} />);
    } else if (["inventory-turns-days", "indicator-order-history", "acceptance-order-evidence"].includes(match[1])) {
      parts.push(<PerformanceFigure key={index} name={match[1] as PerformanceName} caption={decodeCaption(match[2])} />);
    } else if (["fifo-fefo-lots", "poka-yoke-coverage", "assumption-window"].includes(match[1])) {
      parts.push(<MethodFigure key={index} name={match[1] as MethodName} caption={decodeCaption(match[2])} />);
    } else if (["cycle-count-ledger", "quality-cost-threshold", "etl-elt-records"].includes(match[1])) {
      parts.push(<RecordFigure key={index} name={match[1] as RecordName} caption={decodeCaption(match[2])} />);
    } else if (match[1] === "planning-decision") {
      parts.push(<PlanningDecision key={index} caption={decodeCaption(match[2])} />);
    } else if (match[1] === "forecast-calculator") {
      parts.push(<ForecastCalculator key={index} caption={decodeCaption(match[2])} />);
    } else {
      throw new Error(`Unknown interactive note figure: ${match[1]}`);
    }
    end = index + match[0].length;
  }
  if (end < html.length) parts.push(<div className="note-copy" key={`copy-${end}`} dangerouslySetInnerHTML={{ __html: html.slice(end) }} />);
  return <div className="prose">{parts}</div>;
}
