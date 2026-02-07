export interface Experience {
    company: string;
    location: string;
    positions: Position[];
}

export interface Position {
    title: string;
    period: string;
    achievements: string[];
}

export interface Project {
    title: string;
    description: string;
    impact: string;
    category: string;
    // Enhanced Fields for Deep Dive
    problem: string;
    solution: string;
    tech_stack: string[];
}

export interface Skill {
    category: string;
    items: string[];
}

export interface Certification {
    name: string;
    issuer?: string;
    year?: string;
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
}

export const personalInfo = {
    name: "Abosh Shirkavand",
    title: "Head of Digital Innovation & Process Excellence",
    email: "abolfazl.shirkavand73@gmail.com",
    phone: "+351 964 450 951",
    location: "Lisbon, Portugal",
    linkedin: "https://www.linkedin.com/in/abolfazl-shirkavand/",
    summary:
        "Digital Transformation and Operational Excellence leader with 8+ years of experience bridging the gap between industrial operations and modern technology. Expert in driving enterprise-wide efficiency, reducing waste, and optimizing performance through Lean Six Sigma methodologies, while simultaneously leading digital innovation, AI-enabled automation, and system integration. Proven track record in both manufacturing environments and tech-driven sectors, building cross-functional teams that deliver measurable ROI and scalable process improvements.",
};

// ... (existing code) ...

export const elixiaryVenture = {
    title: "Elixiary AI",
    tagline: "The World's Best AI Mixologist",
    description: "The ultimate destination for cocktail enthusiasts. Combining a production-grade AI generator with a massive library of curated recipes and a comprehensive education hub for aspiring mixologists.",
    website: "https://elixiary.com",
    modules: [
        { name: "Curated Cocktails", url: "https://elixiary.com/cocktails" },
        { name: "Education Hub", url: "https://elixiary.com/education" }
    ],
    metrics: [
        { label: "Tech Stack", value: "Next.js 15 + Firebase" },
        { label: "AI Engine", value: "Google Gemini + Genkit" },
        { label: "Infra", value: "Vercel + Cloudflare" },
    ],
    techStack: [
        "Next.js 15 (App Router)",
        "Firebase Genkit",
        "Google Gemini Pro",
        "Firestore",
        "Stripe Payments",
        "Tailwind CSS v4",
        "Brevo (Email)",
        "Cloudflare DNS",
        "Vercel Hosting",
        "Algolia Search"
    ],
    socials: {
        x: "https://x.com/elixiary",
        instagram: "https://www.instagram.com/elixiary.ai",
        tiktok: "https://www.tiktok.com/@elixiary.ai",
        github: "https://github.com/opefyre/elixiary-ai-firebase-studio",
        email: "mailto:hello@elixiary.com"
    }
};

export const experiences: Experience[] = [
    {
        company: "Snoonu",
        location: "Remote",
        positions: [
            {
                title: "Head of Digital Innovation",
                period: "Apr 2025 – Present",
                achievements: [
                    "Own the Application & Digital Transformation function, leading enterprise automation, system integration, and internal platform strategy.",
                    "Define and govern the internal applications landscape, ensuring tool rationalization, architectural coherence, and long-term scalability.",
                    "Translate business strategy into digital roadmaps, prioritizing initiatives based on value (ROI), complexity, and organizational readiness.",
                    "Oversee delivery of cloud-based and AI-enabled solutions that replace manual workflows, improving decision quality and operational throughput.",
                    "Build and develop high-performing engineering and solution teams, setting delivery standards, governance models, and technical direction.",
                    "Establish value realization metrics for digital initiatives, tracking measurable efficiency, productivity, and scalability gains."
                ],
            },
            {
                title: "Digital Process Improvement Manager",
                period: "Jul 2024 – Apr 2025",
                achievements: [
                    "Led a team of >12 direct employees across IT, Application, and Digital Transformation functions to drive strategic initiatives.",
                    "Directed 50+ process optimization and automation projects, achieving an extensive reduction in manual effort per department.",
                    "Oversaw the development and deployment of scalable cloud-native automation/integration tools for seamless system integration.",
                    "Led enterprise-wide automation initiatives, integrating ERP, Jira, Notion, Slack, and third-party APIs.",
                    "Drove AI-powered innovations, implementing predictive analytics, automation tools, and intelligent assistants using various LLMs.",
                    "Championed a data-driven culture, overseeing real-time dashboards in Tableau/Looker, leveraging BigQuery and SQL for strategic decisions."
                ],
            },
            {
                title: "Digital Innovation Project Manager",
                period: "Oct 2023 – Jun 2024",
                achievements: [
                    "Managed end-to-end project lifecycles for innovation, system implementation, and process improvement within scope and budget.",
                    "Implemented automation, optimization, and system integration projects across multiple departments.",
                    "Created several Web-based platforms for managing projects and observing project KPIs, as well as team performance.",
                    "Collaborated with senior stakeholders to align digital transformation projects with company-wide goals of process excellence."
                ],
            },
        ],
    },
    {
        company: "British American Tobacco (BAT)",
        location: "Hybrid",
        positions: [
            {
                title: "SC New Product Introduction Manager",
                period: "Aug 2021 – Feb 2023",
                achievements: [
                    "Owned supply chain workstream for NPI, coordinating cross-functional teams to enable timely scalable product launches.",
                    "Managed end-to-end NPI projects, reducing launch timelines from 5 months to 2 months through better planning.",
                    "Led cost-saving initiatives, reducing procurement expenses by avg 12% via supplier negotiations and sourcing optimization.",
                    "Designed centralized NPI tracking dashboards using Excel, VBA, and macros as a single source of truth.",
                    "Streamlined production planning with MRP-based scheduling for 40+ SKUs across multiple lines.",
                    "Conducted 100+ supplier visits and negotiations, establishing contingency plans to preventing shortages."
                ],
            },
            {
                title: "Management Trainee (Global Graduate)",
                period: "Mar 2020 – Jul 2021",
                achievements: [
                    "Rotated through Operations (Source to Deliver), Engineering, Finance, IT, and HR teams.",
                    "Created an MRP-based planning solution integrating 9 production lines and 5 warehouses to plan 40+ SKUs.",
                    "Designed Spare Part Inventory Management System using Excel/VBA with data validation.",
                    "Implemented Predictive Maintenance pillar in IWS to reduce breakdowns and improve machine uptime."
                ],
            },
        ],
    },
    {
        company: "Unilever",
        location: "On-site",
        positions: [
            {
                title: "Operations Improvement Specialist",
                period: "Sep 2017 – Feb 2020",
                achievements: [
                    "Led 10+ projects improving OCT, OEE, MTBF, and eliminating quality defects.",
                    "Designed Power BI dashboards for planning & production KPIs, reducing reporting time by 60%.",
                    "Managed ERP processes for inventory tracking, material planning, and production scheduling.",
                    "Contributed to WCM implementation (AM, CS&L, PD pillars), optimizing capacity utilization."
                ],
            },
            {
                title: "Operations Improvement Officer",
                period: "Sep 2016 – Aug 2017",
                achievements: [
                    "Supported ERP-driven inventory management and production planning.",
                    "Conducted data analysis and developed Power BI dashboards for real-time reporting.",
                    "Assisted in WCM implementation, optimizing Order Cycle Time and OTIF."
                ],
            },
        ],
    },
];

export const projects: Project[] = [
    {
        title: "Fleet Asset Management",
        description: "Inventory & task management software for fleet asset management and vehicle maintenance monitoring.",
        impact: "Increased data reliability, decreased manual work, increased visibility.",
        category: "Software Dev",
        problem: "Manual fleet tracking via spreadsheets led to data discrepancies, lost assets, and delayed maintenance, causing significant operational downtime.",
        solution: "Built a custom centralized web application for fleet monitoring, distinct assigning of tasks to drivers, and real-time fuel/maintenance logs.",
        tech_stack: ["React", "Node.js", "PostgreSQL", "Google Maps API"],
    },
    {
        title: "Contract Lifecycle System",
        description: "Software for managing company contracts with auto-reminders for renewals and expirations.",
        impact: "Reduced legal risks, decreased time for reporting & insight provisioning.",
        category: "Software Dev",
        problem: "Legal teams missed renewal deadlines due to decentralized storage of contracts in physical folders and disparate drive locations.",
        solution: "Developed an automated repository with smart OCR features, expiry notifications, and a dashboard for contract value analytics.",
        tech_stack: ["Next.js", "Firebase", "SendGrid", "OCR API"],
    },
    {
        title: "Payroll Automation Engine",
        description: "Odoo-based automation tool for monthly payroll calculation, integrated with HRMS and Finance ERP.",
        impact: "Decreased payroll calculation cycle from days to minutes.",
        category: "Automation",
        problem: "Monthly payroll processing involved manual CSV exports from three different systems (Biometric, HR, Banking), taking 3 full days to reconcile.",
        solution: "Engineered an Odoo module that pulls attendance data via API, calculates localized tax/deductions automatically, and generates bank-ready payment files.",
        tech_stack: ["Python", "Odoo", "PostgreSQL", "REST API"],
    },
    {
        title: "Strategic ERP Migration",
        description: "Migration/Upgrade of Odoo (Purchase, Inventory, Fleet, Payroll) from v13 to v18.",
        impact: "Enterprise-wide standardization and v18 feature adoption.",
        category: "ERP",
        problem: "Legacy Odoo v13 instance was slow, insecure, and lacked modern features, causing friction in Purchase and Inventory workflows.",
        solution: "Led the end-to-end migration strategy, including data cleaning, module refactoring for v18 compatibility, and user training for 200+ employees.",
        tech_stack: ["Odoo.sh", "Python", "XML", "PostgreSQL"],
    },
    {
        title: "Employee Service Portal",
        description: "Centralized web-based application for employees to manage their requests (internal desk).",
        impact: "Streamlined request management and ticket tracking.",
        category: "Internal Tools",
        problem: "Employees had to use emails, WhatsApp, and paper forms to request IT support or HR documents, leading to lost tickets.",
        solution: "Launched a self-service portal where employees can raise, track, and rate service requests, routed automatically to the right department.",
        tech_stack: ["React", "Firebase", "Tailwind CSS"],
    },
    {
        title: "Procurement System (Penny)",
        description: "End-to-end implementation of Penny procurement system for internal purchases.",
        impact: "Standardized procurement process and spend visibility.",
        category: "System Implementation",
        problem: "Maverick spending was rampant due to lack of enforced approval workflows and vendor management.",
        solution: "Implemented Penny P2P system, configuring approval matrices based on budget thresholds and integrating it with the finance ERP for auto-PO generation.",
        tech_stack: ["Penny", "API Integration", "ERP"],
    },
    {
        title: "Universal Ticketing (Jira)",
        description: "Jira-based system integrated with Slack for multiple teams (Tech & Non-Tech).",
        impact: "Improved resolution time & cross-functional collaboration.",
        category: "System Integration",
        problem: "Tech and non-tech teams worked in silos using different tools, making cross-functional project tracking impossible.",
        solution: "Unified all teams onto a master Jira instance with customized workflows, and built a Slack bot to allow ticket updates directly from chat.",
        tech_stack: ["Jira", "Slack API", "Automation for Jira"],
    },
    {
        title: "NOC Monitoring Dashboards",
        description: "Health monitoring for Infobip, Ziwo, Maqsam with auto-alerts for potential threats.",
        impact: "Proactive issue detection and reduced downtime response.",
        category: "Analytics",
        problem: "Support teams reacted to downtime only after customer complaints, damaging reputation.",
        solution: "Created a centralized 'Heartbeat' dashboard aggregating statuses from Infobip, Ziwo, and Maqsam APIs, triggering alerts to on-call engineers instantly.",
        tech_stack: ["Grafana", "Node.js", "Prometheus", "3rd Party APIs"],
    },
    {
        title: "Access Governance (Lumos)",
        description: "Platform for managing Application Access requests, approvals, and monthly audits.",
        impact: "Enhanced security compliance and reduced Shadow IT.",
        category: "System Implementation",
        problem: "Manual granting of software licenses resulted in 'Shadow IT' and paying for unused seats.",
        solution: "Deployed Lumos to automate access provisioning/deprovisioning based on role, saving 15% in SaaS costs via unused license reclamation.",
        tech_stack: ["Lumos", "Okta", "SCIM"],
    },
    {
        title: "Onboarding Automation",
        description: "Integrations: BambooHR/Keka/Odoo <> Slack <> Google Admin <> ERP.",
        impact: "Eliminated manual data entry for new hires.",
        category: "Integration",
        problem: "Onboarding a new employee required manual data entry into 5 separate systems.",
        solution: "Built an iPaaS workflow where creating an employee in BambooHR automatically provisions their Google Workspace, Slack, and Odoo accounts.",
        tech_stack: ["Make (Integromat)", "BambooHR API", "Google Admin SDK"],
    },
];

export const education: Education[] = [
    {
        degree: "Master's in Technology and Engineering Management",
        institution: "URV",
        period: "2022 – 2023",
    },
    {
        degree: "Master of Business Administration (MBA)",
        institution: "UT",
        period: "2020 – 2021",
    },
    {
        degree: "Bachelor of Science in Engineering",
        institution: "IUST",
        period: "2012 – 2016",
    },
];

export const certifications: Certification[] = [
    { name: "Google Project Management: Professional Certificate" },
    { name: "Master Digital Transformation" },
    { name: "Product Management Professional Certificate" },
    { name: "Google Cloud Digital Leader" },
    { name: "Aha! Product Management Professional" },
    { name: "Mastering Jira Administration" },
];

export const skills: Skill[] = [
    {
        category: "Process Excellence",
        items: ["Six Sigma", "Kaizen", "PDCA", "VSM", "5S", "Root Cause Analysis", "Business Process Mapping", "Operational Excellence", "Supply Chain Optimization"],
    },
    {
        category: "Project & Program Management",
        items: ["Agile/Scrum", "Waterfall", "Jira Administration", "Risk Management", "Stakeholder Management", "Project Delivery", "Budget Management", "Scope Development"],
    },
    {
        category: "Digital Transformation",
        items: ["Change Management", "Digital Strategy", "Operating Model Design", "Tech Governance", "Process Implementation", "Systems Improvement", "Strategic Planning"],
    },
    {
        category: "Enterprise Systems", // ERP & Core
        items: ["SAP", "Microsoft Dynamics", "Odoo", "SAGE", "Slack Automation", "Google Workspace", "Inventory Management", "MRP", "Production Planning"],
    },
    {
        category: "Technical Stack", // Cloud, Code, Automation
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Firebase", "GCP", "Python", "SQL", "APIs", "Webhooks", "N8N"],
    },
    {
        category: "Data & Analytics",
        items: ["Power BI", "Tableau", "Looker Studio", "BigQuery", "Data Analysis", "Demand Forecasting", "KPI Frameworks"],
    }
];

export const languages = [
    { language: "Spanish", level: "Limited Working" },
];

export const elixiaryVenture = {
    title: "Elixiary AI",
    tagline: "The World's Best AI Mixologist",
    description: "The ultimate destination for cocktail enthusiasts. Beyond its core AI generation engine, it features a massive library of curated recipes and a comprehensive education hub for aspiring mixologists.",
    website: "https://elixiary.com",
    modules: [
        { name: "Curated Recipes", url: "https://elixiary.com/cocktails" },
        { name: "Education Hub", url: "https://elixiary.com/education" }
    ],
    metrics: [
        { label: "Tech Stack", value: "Next.js 15 + Firebase" },
        { label: "AI Engine", value: "Google Gemini + Genkit" },
        { label: "Infra", value: "Vercel + Cloudflare" },
    ],
    techStack: [
        "Next.js 15 (App Router)",
        "Firebase Genkit",
        "Google Gemini Pro",
        "Firestore",
        "Stripe Payments",
        "Tailwind CSS v4",
        "Brevo (Email)",
        "Cloudflare DNS",
        "Vercel Hosting",
        "Algolia Search"
    ],
    socials: {
        x: "https://x.com/elixiary",
        instagram: "https://www.instagram.com/elixiary.ai",
        tiktok: "https://www.tiktok.com/@elixiary.ai",
        github: "https://github.com/opefyre/elixiary-ai-firebase-studio",
        email: "mailto:hello@elixiary.com"
    }
};
