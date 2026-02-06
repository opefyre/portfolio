"use client";

import { motion } from "framer-motion";
import { Github, Mail, Instagram } from "lucide-react";
import { elixiaryVenture } from "@/lib/data";

// Custom Icons for X (Twitter) and TikTok as they aren't standard in all icon sets or need specific styling
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

export default function ConnectRow() {
    const SOCIALS = [
        { name: "X", url: elixiaryVenture.socials.x, icon: XIcon },
        { name: "Instagram", url: elixiaryVenture.socials.instagram, icon: Instagram },
        { name: "TikTok", url: elixiaryVenture.socials.tiktok, icon: TikTokIcon },
        { name: "GitHub", url: elixiaryVenture.socials.github, icon: Github },
        { name: "Email", url: elixiaryVenture.socials.email, icon: Mail },
    ];

    return (
        <section className="py-24 border-t border-border mt-12 bg-page">
            <div className="container-wide flex flex-col items-center">
                <h3 className="text-lg font-bold mb-8 text-primary">Connect</h3>

                <div className="flex items-center gap-8 md:gap-12">
                    {SOCIALS.map((social) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-tertiary hover:text-primary transition-colors duration-300"
                            aria-label={social.name}
                        >
                            <social.icon className="w-6 h-6 md:w-8 md:h-8" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
