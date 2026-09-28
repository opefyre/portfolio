import { Building } from "@/components/home/Building";
import { Hero } from "@/components/home/Hero";
import { NotesPreview } from "@/components/home/NotesPreview";
import { Now } from "@/components/home/Now";
import { Outside } from "@/components/home/Outside";
import { Path } from "@/components/home/Path";
import { Problems } from "@/components/home/Problems";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getEducation, getExperiences, getProfile, getProjects } from "@/lib/data";
import { getNotes } from "@/lib/notes";

export default async function Home() {
  const [profile, projects, experiences, education] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
    getEducation(),
  ]);
  const notes = getNotes();
  const [first, ...rest] = profile.name.split(" ");

  return (
    <>
      <Hero first={first} last={rest.join(" ")} />
      <Building />
      <Problems projects={projects} total={projects.length} />
      <Path experiences={experiences} education={education} />
      <Outside />
      <Now />
      <NotesPreview notes={notes} />
      <SiteFooter />
    </>
  );
}
