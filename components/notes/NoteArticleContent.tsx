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
