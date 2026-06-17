// React-PDF document for the downloadable CV.
// Rendered at build time from Firestore data; output is public/resume.pdf.
//
// Brand: the cream-paper surface from the site footer (warm bone gradient
// background) with brand-blue accents and Instrument Serif italic for the
// editorial "67%" metric. Two-column on page 1 (sidebar + main); pages 2+
// continue full-width main column if experience overflows.

import React from "react";
import { Document, Page, View, Text, Link, StyleSheet } from "@react-pdf/renderer";

// ─── Types (mirrors lib/db.ts) ──────────────────────────────────────────
export interface CvPersonalInfo {
    name: string;
    title: string;
    location: string;
    linkedin: string;
    headline: string;
    signatureMetricValue: string;
    signatureMetricLabel: string;
    email?: string;
    phone?: string;
    portfolio?: string;
}
export interface CvPosition {
    title: string;
    period: string;
    achievements: string[];
}
export interface CvExperience {
    company: string;
    location: string;
    order: number;
    positions: CvPosition[];
}
export interface CvSkill {
    category: string;
    items: string[];
}
export interface CvCertification {
    name: string;
    issuer?: string;
    year?: string;
}
export interface CvEducation {
    degree: string;
    institution: string;
    period: string;
}
export interface CvProject {
    title: string;
    category: string;
    impact: string;
    outcomeShort?: string;
}
export interface CvData {
    personalInfo: CvPersonalInfo;
    experiences: CvExperience[];
    skills: CvSkill[];
    certifications: CvCertification[];
    education: CvEducation[];
    projects: CvProject[];
}

// ─── Tokens ─────────────────────────────────────────────────────────────
const c = {
    paper: "#F5EFE3",          // cream (matches footer surface)
    ink: "#0a0a0a",
    inkMuted: "rgba(10,10,10,0.6)",
    inkFaint: "rgba(10,10,10,0.42)",
    inkHair: "rgba(10,10,10,0.12)",
    blue: "#0EA5E9",            // slightly deeper than #38BDF8 — pops more in ink on paper
    blueSoft: "rgba(14,165,233,0.18)",
};
const f = {
    display: "Syne",
    editorial: "InstrumentSerif",
    body: "Manrope",
    mono: "JetBrainsMono",
};

// ─── Date helpers ───────────────────────────────────────────────────────
function earliestYear(period: string): string {
    const m = period.match(/\b(19|20)\d{2}\b/);
    return m ? m[0] : "—";
}
function stationEndYear(positions: CvPosition[]): string {
    if (positions.some((p) => /\b(present|current|now|ongoing)\b/i.test(p.period))) return "Present";
    const years = positions
        .flatMap((p) => Array.from(p.period.matchAll(/\b(19|20)\d{2}\b/g)).map((mm) => parseInt(mm[0], 10)))
        .filter((n) => !Number.isNaN(n));
    return years.length ? String(Math.max(...years)) : "—";
}

// ─── Stylesheet ─────────────────────────────────────────────────────────
const s = StyleSheet.create({
    // page wrapper
    page: {
        backgroundColor: c.paper,
        color: c.ink,
        fontFamily: f.body,
        fontSize: 8.8,
        lineHeight: 1.4,
        paddingTop: 32,
        paddingBottom: 26,
        paddingLeft: 36,
        paddingRight: 36,
    },

    // header band
    header: { marginBottom: 10 },
    headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
    name: { fontFamily: f.display, fontWeight: 700, fontSize: 22, letterSpacing: -0.5, color: c.ink },
    cvStamp: { fontFamily: f.mono, fontSize: 7.5, color: c.inkFaint, letterSpacing: 1.2 },
    headerTitle: { fontFamily: f.body, fontSize: 10.5, color: c.inkMuted, marginTop: 8 },
    headerMeta: { fontFamily: f.mono, fontSize: 7.5, color: c.inkFaint, letterSpacing: 0.8, marginTop: 6 },
    headerRule: { height: 1.2, backgroundColor: c.blue, marginTop: 8, marginBottom: 10 },

    // grid
    grid: { flexDirection: "row", gap: 18 },
    sidebar: { width: 165 },
    main: { flex: 1 },

    // section primitives
    kicker: {
        fontFamily: f.mono,
        fontSize: 7,
        color: c.blue,
        letterSpacing: 1.4,
        marginBottom: 4,
        marginTop: 9,
    },
    kickerFirst: { marginTop: 0 },
    divider: { height: 0.6, backgroundColor: c.inkHair, marginVertical: 8 },

    // 67% metric block
    metricValue: {
        fontFamily: f.editorial,
        fontStyle: "italic",
        fontSize: 40,
        color: c.blue,
        lineHeight: 1,
        marginTop: -2,
    },
    metricLabel: {
        fontFamily: f.body,
        fontSize: 8.2,
        color: c.ink,
        lineHeight: 1.35,
        marginTop: 5,
        marginBottom: 4,
    },

    // sidebar text rows
    rowLabel: { fontFamily: f.body, fontSize: 9, color: c.ink, marginBottom: 1 },
    rowSub: { fontFamily: f.body, fontSize: 8.5, color: c.inkMuted },
    link: { color: c.ink, textDecoration: "none" },
    chipList: { marginTop: 2 },
    chipRow: {
        fontFamily: f.body,
        fontSize: 8.5,
        color: c.ink,
        marginBottom: 2,
        flexDirection: "row",
    },
    chipBullet: { color: c.blue, marginRight: 5, fontSize: 8.5 },

    // main column — station
    station: { marginBottom: 10 },
    stationHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
    stationKicker: { fontFamily: f.mono, fontSize: 7, color: c.blue, letterSpacing: 1.4 },
    stationYears: { fontFamily: f.editorial, fontStyle: "italic", fontSize: 12, color: c.blue },
    company: { fontFamily: f.display, fontWeight: 600, fontSize: 12, color: c.ink, marginTop: 1 },
    companyMeta: { fontFamily: f.mono, fontSize: 7, color: c.inkFaint, letterSpacing: 0.6, marginTop: 1, marginBottom: 4 },

    position: { marginTop: 4 },
    positionHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
    positionTitle: { fontFamily: f.body, fontWeight: 600, fontSize: 9.5, color: c.ink },
    positionPeriod: { fontFamily: f.mono, fontSize: 7, color: c.inkMuted, letterSpacing: 0.4 },
    achievements: { marginTop: 3, paddingLeft: 2 },
    achievementRow: { flexDirection: "row", marginBottom: 1.5 },
    achievementBullet: { color: c.blue, marginRight: 5, fontSize: 7.5 },
    achievement: { flex: 1, fontFamily: f.body, fontSize: 8.6, color: c.ink, lineHeight: 1.4 },

    // academia
    eduRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    eduYear: { fontFamily: f.editorial, fontStyle: "italic", fontSize: 10.5, color: c.blue, width: 60 },
    eduBody: { flex: 1 },
    eduDegree: { fontFamily: f.body, fontWeight: 600, fontSize: 9.5, color: c.ink },
    eduInst: { fontFamily: f.mono, fontSize: 7, color: c.inkMuted, letterSpacing: 0.4, marginTop: 1 },

    // selected projects
    projectRow: { marginBottom: 7 },
    projectHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
    projectIdx: { fontFamily: f.mono, fontSize: 7, color: c.blue, letterSpacing: 0.4, width: 24 },
    projectTitle: { flex: 1, fontFamily: f.body, fontWeight: 600, fontSize: 9.5, color: c.ink },
    projectCategory: { fontFamily: f.mono, fontSize: 7, color: c.inkMuted, letterSpacing: 0.6, marginLeft: 6 },
    projectOutcome: {
        fontFamily: f.body,
        fontSize: 8.4,
        color: c.inkMuted,
        lineHeight: 1.4,
        marginTop: 1.5,
        marginLeft: 24,
    },

    // footer (every page)
    pageFooter: {
        position: "absolute",
        bottom: 18,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        fontFamily: f.mono,
        fontSize: 6.5,
        color: c.inkFaint,
        letterSpacing: 1.2,
    },
    pageNum: { fontFamily: f.mono, fontSize: 6.5, color: c.inkFaint, letterSpacing: 1.2 },
});

// ─── Reusable bits ──────────────────────────────────────────────────────
function Kicker({ children, first }: { children: string; first?: boolean }) {
    return <Text style={[s.kicker, first ? s.kickerFirst : {}]}>{`[ ${children} ]`}</Text>;
}

function BulletRow({ children }: { children: string }) {
    return (
        <View style={s.chipRow}>
            <Text style={s.chipBullet}>›</Text>
            <Text style={{ flex: 1 }}>{children}</Text>
        </View>
    );
}

function Achievement({ children }: { children: string }) {
    return (
        <View style={s.achievementRow}>
            <Text style={s.achievementBullet}>•</Text>
            <Text style={s.achievement}>{children}</Text>
        </View>
    );
}

// ─── Header (page 1) ────────────────────────────────────────────────────
function shortenUrl(u: string | undefined): string {
    if (!u) return "";
    return u.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function HeaderBlock({ p }: { p: CvPersonalInfo }) {
    const cvStamp = `CV · ${new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }).toUpperCase()}`;
    const portfolioShort = shortenUrl(p.portfolio);
    const linkedinShort = shortenUrl(p.linkedin);
    const metaParts = [
        p.location,
        portfolioShort,
        linkedinShort,
        p.email,
        p.phone,
    ].filter(Boolean);
    return (
        <View style={s.header}>
            <View style={s.headerTop}>
                <Text style={s.name}>{p.name}</Text>
                <Text style={s.cvStamp}>{cvStamp}</Text>
            </View>
            <Text style={s.headerTitle}>{p.title}</Text>
            <Text style={s.headerMeta}>{metaParts.join("  ·  ")}</Text>
            <View style={s.headerRule} />
        </View>
    );
}

// ─── Sidebar ────────────────────────────────────────────────────────────
function Sidebar({ data }: { data: CvData }) {
    const { personalInfo: p, skills, certifications } = data;
    // Top competencies = skill category names (the website's "GlassTerminal" tabs)
    const topCompetencies = skills.slice(0, 6).map((sk) => sk.category);
    // Top certifications = up to 6, sorted newest first
    const topCerts = [...certifications]
        .sort((a, b) => (parseInt(b.year ?? "0", 10) || 0) - (parseInt(a.year ?? "0", 10) || 0))
        .slice(0, 6);
    const linkedinShort = p.linkedin.replace(/^https?:\/\//, "").replace(/\/$/, "");

    return (
        <View style={s.sidebar}>
            <Kicker first>AT A GLANCE</Kicker>
            <Text style={s.metricValue}>{p.signatureMetricValue}</Text>
            <Text style={s.metricLabel}>{p.signatureMetricLabel}</Text>

            <Kicker>LOCATION</Kicker>
            <Text style={s.rowLabel}>{p.location}</Text>

            <Kicker>CONTACT</Kicker>
            {p.portfolio ? (
                <Link style={[s.rowLabel, s.link]} src={p.portfolio}>
                    {shortenUrl(p.portfolio)}
                </Link>
            ) : null}
            <Link style={[s.rowLabel, s.link, p.portfolio ? { marginTop: 1 } : {}]} src={p.linkedin}>
                {linkedinShort}
            </Link>
            {p.email ? (
                <Link style={[s.rowLabel, s.link, { marginTop: 1 }]} src={`mailto:${p.email}`}>
                    {p.email}
                </Link>
            ) : null}
            {p.phone ? (
                <Link
                    style={[s.rowLabel, s.link, { marginTop: 1 }]}
                    src={`tel:${p.phone.replace(/[^+\d]/g, "")}`}
                >
                    {p.phone}
                </Link>
            ) : null}

            {topCompetencies.length ? (
                <>
                    <Kicker>TOP COMPETENCIES</Kicker>
                    <View style={s.chipList}>
                        {topCompetencies.map((cat) => (
                            <BulletRow key={cat}>{cat}</BulletRow>
                        ))}
                    </View>
                </>
            ) : null}

            {topCerts.length ? (
                <>
                    <Kicker>CERTIFICATIONS</Kicker>
                    <View style={s.chipList}>
                        {topCerts.map((cert) => (
                            <BulletRow key={cert.name}>
                                {cert.year ? `${cert.name}  ${cert.year}` : cert.name}
                            </BulletRow>
                        ))}
                    </View>
                </>
            ) : null}
        </View>
    );
}

// ─── Main column ────────────────────────────────────────────────────────
function MainColumn({ data }: { data: CvData }) {
    // CV: most recent role first (reverse of the website's chronological timeline).
    const sortedExperiences = [...data.experiences].sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
    const sortedEducation = [...data.education].sort((a, b) => {
        const ay = parseInt(earliestYear(a.period), 10) || 0;
        const by = parseInt(earliestYear(b.period), 10) || 0;
        return by - ay;
    });

    return (
        <View style={s.main}>
            <Kicker first>PROFESSIONAL HISTORY</Kicker>
            {sortedExperiences.map((exp, idx) => {
                const lastPos = exp.positions[exp.positions.length - 1];
                const startYear = earliestYear(lastPos?.period ?? "");
                const endYear = stationEndYear(exp.positions);
                const [firstPos, ...restPositions] = exp.positions;
                return (
                    <View key={`${exp.company}-${idx}`} style={s.station}>
                        {/* Station header + first position stay together — prevents an orphaned company name at the bottom of a page. */}
                        <View wrap={false}>
                            <View style={s.stationHead}>
                                <Text style={s.stationKicker}>
                                    STATION {String(idx + 1).padStart(2, "0")} / {String(sortedExperiences.length).padStart(2, "0")}
                                </Text>
                                <Text style={s.stationYears}>
                                    {startYear}
                                    {endYear && endYear !== startYear ? ` – ${endYear}` : ""}
                                </Text>
                            </View>
                            <Text style={s.company}>{exp.company}</Text>
                            <Text style={s.companyMeta}>{exp.location}</Text>

                            {firstPos ? (
                                <View style={s.position}>
                                    <View style={s.positionHead}>
                                        <Text style={s.positionTitle}>{firstPos.title}</Text>
                                        <Text style={s.positionPeriod}>{firstPos.period}</Text>
                                    </View>
                                    {firstPos.achievements.length ? (
                                        <View style={s.achievements}>
                                            {firstPos.achievements.map((a, aIdx) => (
                                                <Achievement key={aIdx}>{a}</Achievement>
                                            ))}
                                        </View>
                                    ) : null}
                                </View>
                            ) : null}
                        </View>

                        {/* Subsequent positions can break individually */}
                        {restPositions.map((pos, pIdx) => (
                            <View key={pIdx} style={s.position} wrap={false}>
                                <View style={s.positionHead}>
                                    <Text style={s.positionTitle}>{pos.title}</Text>
                                    <Text style={s.positionPeriod}>{pos.period}</Text>
                                </View>
                                {pos.achievements.length ? (
                                    <View style={s.achievements}>
                                        {pos.achievements.map((a, aIdx) => (
                                            <Achievement key={aIdx}>{a}</Achievement>
                                        ))}
                                    </View>
                                ) : null}
                            </View>
                        ))}
                    </View>
                );
            })}

            <Kicker>ACADEMIA</Kicker>
            {sortedEducation.map((edu, idx) => (
                <View key={idx} style={s.eduRow} wrap={false}>
                    <Text style={s.eduYear}>{earliestYear(edu.period)}</Text>
                    <View style={s.eduBody}>
                        <Text style={s.eduDegree}>{edu.degree}</Text>
                        <Text style={s.eduInst}>
                            {edu.institution} · {edu.period}
                        </Text>
                    </View>
                </View>
            ))}

            {data.projects.length ? <SelectedProjects projects={data.projects} /> : null}
        </View>
    );
}

const PROJECT_COUNT = 12;

function SelectedProjects({ projects }: { projects: CvProject[] }) {
    const picked = projects.slice(0, PROJECT_COUNT);
    return (
        <View break>
            <Kicker first>SELECTED PROJECTS</Kicker>
            {picked.map((proj, idx) => {
                const outcome = (proj.outcomeShort || proj.impact || "").trim();
                return (
                    <View key={`${proj.title}-${idx}`} style={s.projectRow} wrap={false}>
                        <View style={s.projectHead}>
                            <Text style={s.projectIdx}>P.{String(idx + 1).padStart(2, "0")}</Text>
                            <Text style={s.projectTitle}>{proj.title}</Text>
                            {proj.category ? (
                                <Text style={s.projectCategory}>{proj.category.toUpperCase()}</Text>
                            ) : null}
                        </View>
                        {outcome ? <Text style={s.projectOutcome}>{outcome}</Text> : null}
                    </View>
                );
            })}
        </View>
    );
}

// ─── Document ────────────────────────────────────────────────────────────
export function CvDocument({ data }: { data: CvData }) {
    const year = new Date().getFullYear();
    return (
        <Document
            title={`${data.personalInfo.name} — CV`}
            author={data.personalInfo.name}
            subject="Curriculum Vitae"
            creator="opefyre/portfolio"
        >
            <Page size="A4" style={s.page} wrap>
                <HeaderBlock p={data.personalInfo} />
                <View style={s.grid}>
                    <Sidebar data={data} />
                    <MainColumn data={data} />
                </View>

                <View style={s.pageFooter} fixed>
                    <Text>© {year} · {data.personalInfo.name.toUpperCase()}</Text>
                    <Text
                        render={({ pageNumber, totalPages }) =>
                            totalPages > 1 ? `PAGE ${pageNumber} / ${totalPages}` : ""
                        }
                        style={s.pageNum}
                    />
                </View>
            </Page>
        </Document>
    );
}
