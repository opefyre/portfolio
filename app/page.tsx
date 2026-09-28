import { Hero } from "@/components/home/Hero";
import { HomeNotes } from "@/components/home/HomeNotes";
import { Programs } from "@/components/home/Programs";
import { Works } from "@/components/home/Works";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getNotes } from "@/lib/notes";

export default function Home() {
  return (
    <>
      <Hero />
      <Works />
      <Programs />
      <HomeNotes notes={getNotes()} />
      <SiteFooter />
    </>
  );
}
