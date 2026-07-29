import { Skill } from "@/lib/db";
import SectionHeader from "@/components/UI/SectionHeader";
import GlassTerminal from "@/components/UI/GlassTerminal";

export default function ExpertiseSection({ skills }: { skills: Skill[] }) {
    return (
        <section className="container-wide section-padding">
            <div id="expertise" className="container-wide scroll-mt-32">
                <SectionHeader
                    kicker="COMPETENCIES"
                    title="Skills & competencies"
                />

                <div className="mt-12 md:mt-24 w-full flex justify-center px-1 sm:px-4 md:px-0">
                    <GlassTerminal skills={skills} />
                </div>
            </div>
        </section>
    );
}
