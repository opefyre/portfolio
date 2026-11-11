/**
 * Published Vrolen YouTube videos that Notes embed with `::video <id> | <caption>`.
 * Titles and upload dates are copied from the channel (youtube.com/@vrolenapp);
 * they feed the player label and the VideoObject structured data.
 * Thumbnails live in public/notes/videos/<id>.webp.
 */
export type Video = { title: string; uploaded: string; short?: boolean };

export const videos: Record<string, Video> = {
  GQtL71bBuOQ: { title: "Why a 5-Minute Task Takes 2 Days", uploaded: "2026-09-29" },
  rs1NfE8DNAc: { title: "5 Whys Explained: A Practical Root Cause Analysis Example", uploaded: "2026-09-29" },
  "34Z2IQJOeDU": { title: "Takt Time vs Cycle Time vs Lead Time: One Order, Three Clocks", uploaded: "2026-09-30" },
  ChviX09hIMU: { title: "Little's Law Explained: Why Starting More Work Makes Everything Later", uploaded: "2026-09-30" },
  E70VqFV5q68: { title: "Push vs Pull Systems Explained: Why More Work Can Make Things Worse", uploaded: "2026-09-30" },
  wwWQBDz4tSQ: { title: "How to Find the Bottleneck in a Process (With an Example)", uploaded: "2026-10-02" },
  uXEOuxC1tus: { title: "Value Stream Mapping Explained: A Practical Office Example", uploaded: "2026-10-02" },
  "SEuF-QHagcA": { title: "8 Wastes of Lean Explained: Why Busy Doesn't Mean Productive", uploaded: "2026-10-03" },
  "wGdb-NOrHF8": { title: "OEE Explained: Availability, Performance and Quality (Worked Example)", uploaded: "2026-10-04" },
  "UsFA-kIoGho": { title: "Pareto Charts: Which Complaint Should You Fix First?", uploaded: "2026-10-05" },
  siad5jjF4II: { title: "Fishbone Diagram Explained: A Practical Root Cause Analysis Example", uploaded: "2026-10-06" },
  p5687M5EoGM: { title: "PDCA Cycle Explained: Improve a Process Step by Step", uploaded: "2026-10-07" },
  VgeTYssQsnA: { title: "5S Explained: More Than Cleaning Your Workspace", uploaded: "2026-10-08" },
  _EG1a4nhQnw: { title: "Poka-Yoke Explained: Simple Ways to Prevent Mistakes", uploaded: "2026-10-09" },
  wBenhxg4BSs: { title: "Kaizen Explained: How Small Improvements Actually Work", uploaded: "2026-10-10" },
  TD2RB5fikFE: { title: "DMAIC Explained: The Five Phases with One Example", uploaded: "2026-10-11" },
  Khlp3JJMtJo: { title: "Lean vs Six Sigma Explained: What's the Difference?", uploaded: "2026-10-12" },
  QNiBS2n4cyg: { title: "Kanban WIP Limits Explained: What to Do When Your Board Is Full", uploaded: "2026-10-13" },
  F5GjLjVR8Fw: { title: "FMEA Explained: How to Stop a Failure Before It Happens (Worked Example)", uploaded: "2026-10-14" },
  GAGUYZaLAcU: { title: "Control Charts Explained: How to Catch Problems Early (Worked Example)", uploaded: "2026-10-16" },
  DhpWCN2AhzU: { title: "8D Problem Solving Explained: Fix a Customer Complaint for Good (8D Report Example)", uploaded: "2026-10-19" },
  elmJJMYzLnk: { title: "A3 Problem Solving Explained: Solve a Recurring Problem on One Page (Worked Example)", uploaded: "2026-10-22" },
  q5z6Nbm8kB4: { title: "SIPOC Explained: See the Whole Process Before You Fix It (Worked Example)", uploaded: "2026-10-25" },
  "8_VDXl2bk90": { title: "Standard Work Explained: Same Job, Same Result, Every Shift (Lean Example)", uploaded: "2026-10-28" },
  "Ivx9hJuI-dw": { title: "SMED Explained: Cut Changeover Time from One Hour to Under 10 Minutes", uploaded: "2026-10-31" },
  "TcrhgnnC-vw": { title: "Process Capability Explained: Cp and Cpk, Step by Step with One Example", uploaded: "2026-11-03" },
  rM49sKY8ICo: { title: "Gemba Walk Explained: How to Find the Real Problem, Step by Step", uploaded: "2026-11-06" },
  "4NkI8UdQ7hg": { title: "Gage R&R Explained: Can You Trust Your Measurements? (Worked Example)", uploaded: "2026-11-09" },
};

export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
