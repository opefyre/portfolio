"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Server, Zap, Mail, Instagram, Github } from "lucide-react";

// Custom Icons
const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

import SectionHeader from "@/components/UI/SectionHeader";

interface Module {
    name: string;
    url: string;
}

interface Socials {
    github: string;
    x: string;
    instagram: string;
    tiktok: string;
    email: string;
}

interface ElixiaryVenture {
    title: string;
    tagline: string;
    description: string;
    modules: Module[];
    techStack: string[];
    website: string;
    socials: Socials;
}

export default function ElixiaryFeature({ elixiaryVenture }: { elixiaryVenture: ElixiaryVenture }) {
    return (
        <section className="container-wide section-padding">
            <SectionHeader
                title="Featured Venture"
                subtitle="Building production-grade AI applications from scratch."
            />

            <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 dark:bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 dark:bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 items-center relative z-10">

                    {/* Left: Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider"
                            >
                                <Zap className="w-3 h-3" />
                                <span>Flagship Project</span>
                            </motion.div>

                            <h3 className="text-4xl md:text-5xl font-display font-medium text-primary leading-tight">
                                {elixiaryVenture.title}
                            </h3>
                            <p className="text-xl md:text-2xl text-brand-blue font-light">
                                {elixiaryVenture.tagline}
                            </p>
                            <p className="text-secondary text-lg leading-relaxed max-w-xl">
                                {elixiaryVenture.description}
                            </p>

                            {/* Key Modules */}
                            <div className="flex flex-wrap gap-3">
                                {elixiaryVenture.modules.map((mod: Module) => (
                                    <a
                                        key={mod.name}
                                        href={mod.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-lg bg-brand-purple/5 border border-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider hover:bg-brand-purple/10 transition-colors flex items-center gap-2"
                                    >
                                        {mod.name} <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Tech Stack Grid */}
                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-tertiary">Infrastructure & Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {elixiaryVenture.techStack.map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 rounded-md bg-page border border-border text-secondary text-sm hover:border-brand-blue/30 hover:text-brand-blue transition-colors cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href={elixiaryVenture.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                            >
                                Visit Live App <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Social Connect Row */}
                        <div className="pt-8 border-t border-border">
                            <h4 className="text-xs uppercase tracking-widest text-tertiary mb-4">Connect with Elixiary</h4>
                            <div className="flex items-center gap-6">
                                {[
                                    { name: "GitHub", url: elixiaryVenture.socials.github, icon: Github },
                                    { name: "X", url: elixiaryVenture.socials.x, icon: XIcon },
                                    { name: "Instagram", url: elixiaryVenture.socials.instagram, icon: Instagram },
                                    { name: "TikTok", url: elixiaryVenture.socials.tiktok, icon: TikTokIcon },
                                    { name: "Email", url: elixiaryVenture.socials.email, icon: Mail },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-tertiary hover:text-brand-blue transition-colors duration-300"
                                        aria-label={social.name}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Abstract Visualization / Stats */}
                    <div className="relative h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-page/50 to-card rounded-2xl border border-border p-8">
                        {/* Abstract representation of AI/Cloud Architecture */}
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-card-hover border border-brand-purple/20">
                                    <Cpu className="w-8 h-8 text-brand-purple mb-4" />
                                    <div className="text-2xl font-bold text-primary">Genkit</div>
                                    <div className="text-xs text-secondary mt-1">AI Logic Layer</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-card-hover border border-emerald-500/20">
                                    <Server className="w-8 h-8 text-emerald-500 mb-4" />
                                    <div className="text-2xl font-bold text-primary">Vercel</div>
                                    <div className="text-xs text-secondary mt-1">Edge Runtime</div>
                                </div>
                            </div>
                            <div className="space-y-4 mt-8">
                                <div className="p-6 rounded-2xl bg-card-hover border border-orange-500/20">
                                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold mb-4">λ</div>
                                    <div className="text-2xl font-bold text-primary">Firebase</div>
                                    <div className="text-xs text-secondary mt-1">Backend-as-a-Service</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-card-hover border border-blue-500/20">
                                    <Zap className="w-8 h-8 text-brand-blue mb-4" />
                                    <div className="text-2xl font-bold text-primary">Stripe</div>
                                    <div className="text-xs text-secondary mt-1">Payment Infrastructure</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
