import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export const metadata = { title: "Lens lab", robots: { index: false } };

// Dead code in production builds, so the bench (and its dev-only capture
// hooks) never ships.
const LensLab =
  process.env.NODE_ENV === "production" ? null : dynamic(() => import("@/components/lens/LensLab").then((m) => m.LensLab));

/** Development test bench for the Abosh Lens. Not part of the production site. */
export default function LensLabPage() {
  if (!LensLab) notFound();
  return <LensLab />;
}
