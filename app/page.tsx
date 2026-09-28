import { Hero } from "@/components/home/Hero";
import { HomeNotes } from "@/components/home/HomeNotes";
import { Results } from "@/components/home/Results";
import { Works } from "@/components/home/Works";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getNotes } from "@/lib/notes";

export default function Home() {
  return (
    <>
      <Hero />
      <Works />
      <Results />
      <HomeNotes notes={getNotes()} />
      <SiteFooter />
    </>
  );
}
