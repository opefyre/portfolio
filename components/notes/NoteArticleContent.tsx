import { AiJobsChart, type AiJobsChartName } from "./AiJobsCharts";

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
    if (!chartNames.includes(match[1] as AiJobsChartName)) throw new Error(`Unknown interactive note figure: ${match[1]}`);
    parts.push(<AiJobsChart key={index} name={match[1] as AiJobsChartName} caption={decodeCaption(match[2])} />);
    end = index + match[0].length;
  }
  if (end < html.length) parts.push(<div className="note-copy" key={`copy-${end}`} dangerouslySetInnerHTML={{ __html: html.slice(end) }} />);
  return <div className="prose">{parts}</div>;
}
