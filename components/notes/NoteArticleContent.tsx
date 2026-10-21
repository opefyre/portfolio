import { CoverageGapChart } from "./CoverageGapCharts";
import { PaaRoundThreeChart, type PaaRoundThreeName } from "./PaaRoundThreeCharts";
import { PaaRoundTwoChart, type PaaRoundTwoName } from "./PaaRoundTwoCharts";
import { PaaForecastMethods } from "./PaaForecastMethods";
import { FinalFundamental, type FinalFundamentalName } from "./FinalFundamentals";
import { CommitmentExample, type CommitmentExampleName } from "./CommitmentExamples";
import { WorkingRecords, type WorkingRecordsName } from "./WorkingRecords";
import { RoutesRisksTime, type RoutesRisksTimeName } from "./RoutesRisksTime";
import { FlowBalance, type FlowBalanceName } from "./FlowBalance";
import { SupplyCareTrace, type SupplyCareTraceName } from "./SupplyCareTrace";
import { PatternFigure, type PatternFigureName } from "./PatternFigures";
import { OperatingRule, type OperatingRuleName } from "./OperatingRules";
import { DeliveryConcept, type DeliveryConceptName } from "./DeliveryConcepts";
import { FieldConcept, type FieldConceptName } from "./FieldConcepts";
import { CoreConcept, type CoreConceptName } from "./CoreConcepts";
import { PlanningBasic, type PlanningBasicName } from "./PlanningBasics";
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
    if (match[1] === "gap-confidence" || match[1] === "gap-schedule") {
      parts.push(<CoverageGapChart key={index} name={match[1]} caption={decodeCaption(match[2])} />);
    } else if (["paa3-customer-cost", "paa3-throughput-mix"].includes(match[1])) {
      parts.push(<PaaRoundThreeChart key={index} name={match[1] as PaaRoundThreeName} caption={decodeCaption(match[2])} />);
    } else if (["paa2-capacity-mix", "paa2-landed-allocation"].includes(match[1])) {
      parts.push(<PaaRoundTwoChart key={index} name={match[1] as PaaRoundTwoName} caption={decodeCaption(match[2])} />);
    } else if (chartNames.includes(match[1] as AiJobsChartName)) {
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
    } else if (["inventory-position-dates", "takt-station-pace", "resource-load-plans"].includes(match[1])) {
      parts.push(<PlanningBasic key={index} name={match[1] as PlanningBasicName} caption={decodeCaption(match[2])} />);
    } else if (["promise-routes", "failure-patterns", "master-record-history"].includes(match[1])) {
      parts.push(<CoreConcept key={index} name={match[1] as CoreConceptName} caption={decodeCaption(match[2])} />);
    } else if (["inventory-review-replay", "rollout-stakeholders", "gemba-order-journey"].includes(match[1])) {
      parts.push(<FieldConcept key={index} name={match[1] as FieldConceptName} caption={decodeCaption(match[2])} />);
    } else if (["ownership-arrangements", "vmi-ownership", "gage-reading-patterns", "delivery-approach-routes"].includes(match[1])) {
      parts.push(<DeliveryConcept key={index} name={match[1] as DeliveryConceptName} caption={decodeCaption(match[2])} />);
    } else if (["drp-network", "jidoka-response", "governed-stock-definition", "data-definition-change"].includes(match[1])) {
      parts.push(<OperatingRule key={index} name={match[1] as OperatingRuleName} caption={decodeCaption(match[2])} />);
    } else if (["demand-components", "estimate-builds", "order-exchange-route"].includes(match[1])) {
      parts.push(<PatternFigure key={index} name={match[1] as PatternFigureName} caption={decodeCaption(match[2])} />);
    } else if (["purchasing-portfolio", "equipment-care-week", "requirements-evidence-map"].includes(match[1])) {
      parts.push(<SupplyCareTrace key={index} name={match[1] as SupplyCareTraceName} caption={decodeCaption(match[2])} />);
    } else if (["planning-fence-calendar", "ctq-requirements-tree", "ctq-delivery-check", "phase-gate-record"].includes(match[1])) {
      parts.push(<CommitmentExample key={index} name={match[1] as CommitmentExampleName} caption={decodeCaption(match[2])} />);
    } else if (["cash-cycle-timing", "eight-d-verification", "migration-reconciliation"].includes(match[1])) {
      parts.push(<WorkingRecords key={index} name={match[1] as WorkingRecordsName} caption={decodeCaption(match[2])} />);
    } else if (["crossdock-window", "sampling-oc-curve", "schedule-compression"].includes(match[1])) {
      parts.push(<RoutesRisksTime key={index} name={match[1] as RoutesRisksTimeName} caption={decodeCaption(match[2])} />);
    } else if (["pooling-correlation", "heijunka-buffer", "data-freshness-clock"].includes(match[1])) {
      parts.push(<FlowBalance key={index} name={match[1] as FlowBalanceName} caption={decodeCaption(match[2])} />);
    } else if (["doe-interaction", "scrum-work-map", "software-route-cost", "handover-evidence-map", "cloud-responsibility-stack", "it-ot-paths", "lesson-reuse-map", "project-npv-comparison", "warehouse-access-matrix", "debt-change-history", "debt-effort-comparison"].includes(match[1])) {
      parts.push(<FinalFundamental key={index} name={match[1] as FinalFundamentalName} caption={decodeCaption(match[2])} />);
    } else if (match[1] === "planning-decision") {
      parts.push(<PlanningDecision key={index} caption={decodeCaption(match[2])} />);
    } else if (match[1] === "paa-forecast-methods") {
      parts.push(<PaaForecastMethods key={index} caption={decodeCaption(match[2])} />);
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
