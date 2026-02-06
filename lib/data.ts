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
    title: "Digital Transformation & Process Excellence Expert",
    email: "abolfazl.shirkavand73@gmail.com",
    phone: "+351 964 450 951",
    location: "Lisbon, Portugal",
    linkedin: "https://www.linkedin.com/in/abolfazl-shirkavand/",
    summary:
        "Digital Transformation and Process Improvement expert with 8+ years of experience driving enterprise-wide automation, system integration, and operational excellence. Proven track record of building and leading cross-functional digital teams, delivering scalable cloud-based solutions, and redesigning business processes through data, AI, and technology. Strong expertise in application rationalization, internal platform ownership, AI-enabled automation, and end-to-end process discovery.",
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
                    "Established and led the Digital Transformation team, responsible for enterprise automation and internal product delivery.",
                    "Define and govern the internal applications landscape, ensuring tool rationalization and long-term scalability.",
                    "Translate business strategy into digital roadmaps, prioritizing initiatives based on value and organizational readiness.",
                    "Lead transformation initiatives through structured process discovery and redesign.",
                    "Oversee delivery of cloud-based and AI-enabled solutions that replace manual workflows.",
                    "Act as partner to functional leaders, challenging legacy practices and driving adoption of optimized ways of working.",
                    "Build and develop high-performing engineering teams, setting delivery standards and technical direction.",
                    "Establish metrics to track value realization from digital initiatives (efficiency, productivity, scalability)."
                ],
            },
            {
                title: "Digital Process Improvement Manager",
                period: "Jul 2024 – Apr 2025",
                achievements: [
                    "Led a team of >12 employees across IT, Application, and Digital Transformation functions.",
                    "Directed 50+ process optimization and automation projects, achieving extensive reduction in manual effort.",
                    "Oversaw development of scalable cloud-native automation/integration tools.",
                    "Led enterprise-wide automation integrating ERP, Jira, Notion, Slack, and third-party APIs.",
                    "Drove AI-powered innovations: predictive analytics, automation tools, and intelligent assistants.",
                    "Championed data-driven culture with real-time dashboards in Tableau and Looker Studio.",
                    "Standardized knowledge management, supervising creation of 150+ technical documents."
                ],
            },
            {
                title: "Digital Innovation Project Manager",
                period: "Oct 2023 – Jun 2024",
                achievements: [
                    "Led a team of 5 for project-based operations within IT & Application teams.",
                    "Managed end-to-end project lifecycles for innovation and system implementation.",
                    "Implemented automation and optimization projects across multiple departments.",
                    "Created web-based platforms for managing projects and observing project KPIs."
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
                    "Owned supply chain workstream for NPI, coordinating cross-functional teams.",
                    "Implemented IWS pillars, driving standardization and continuous improvement.",
                    "Led cost-saving initiatives, reducing procurement expenses by avg 12%.",
                    "Designed centralized NPI tracking dashboards using Excel, VBA, and macros.",
                    "Managed end-to-end NPI projects, reducing launch timelines from 5 months to 2 months.",
                    "Streamlined production planning with MRP-based scheduling for 40+ SKUs.",
                    "Conducted 100+ supplier visits and negotiations to prevent shortages."
                ],
            },
            {
                title: "Management Trainee (Global Graduate)",
                period: "Mar 2020 – Jul 2021",
                achievements: [
                    "Rotated through Operations, Engineering, Finance, IT, and HR.",
                    "Designed Spare Part Inventory Management System using Excel/VBA.",
                    "Created MRP-based planning solution integrating 9 production lines and 5 warehouses.",
                    "Implemented Predictive Maintenance pillar in IWS to reduce breakdowns."
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
                    "Designed Power BI dashboards reducing reporting time by 60%.",
                    "Managed ERP processes for inventory tracking and production scheduling.",
                    "Contributed to WCM implementation (AM, CS&L, PD pillars)."
                ],
            },
            {
                title: "Operations Improvement Officer",
                period: "Sep 2016 – Aug 2017",
                achievements: [
                    "Supported ERP-driven inventory management and production planning.",
                    "Developed Power BI dashboards for real-time reporting.",
                    "Assisted in WCM implementation, optimizing Order Cycle Time and OTIF."
                ],
            },
        ],
    },
];

export const projects: Project[] = [
    {
        title: "Fleet Asset Management Software",
        description: "Inventory & task management software for fleet asset management.",
        impact: "Increased data reliability, decreased manual work, increased visibility.",
        category: "Software Dev",
        problem: "Manual fleet tracking via spreadsheets led to data discrepancies, lost assets, and delayed maintenance, causing significant operational downtime.",
        solution: "Built a custom centralized web application for fleet monitoring, distinct assigning of tasks to drivers, and real-time fuel/maintenance logs.",
        tech_stack: ["React", "Node.js", "PostgreSQL", "Google Maps API"],
    },
    {
        title: "Contract Management System",
        description: "Software for managing company contracts with auto-reminders and analytics.",
        impact: "Reduced legal risks, decreased reporting time.",
        category: "Software Dev",
        problem: "Legal teams missed renewal deadlines due to decentralized storage of contracts in physical folders and disparate drive locations.",
        solution: "Developed an automated repository with smart OCR features, expiry notifications via Slack/Email, and a dashboard for contract value analytics.",
        tech_stack: ["Next.js", "Firebase", "SendGrid", "OCR API"],
    },
    {
        title: "Payroll Automation Tool",
        description: "Odoo-based automation tool for monthly payroll calculation integrated with HRMS.",
        impact: "Decreased cycle from days to minutes.",
        category: "Automation",
        problem: "Monthly payroll processing involved manual CSV exports from three different systems (Biometric, HR, Banking), taking 3 full days to reconcile.",
        solution: "Engineered an Odoo module that pulls attendance data via API, calculates localized tax/deductions automatically, and generates bank-ready payment files.",
        tech_stack: ["Python", "Odoo", "PostgreSQL", "REST API"],
    },
    {
        title: "ERP Migration (Odoo)",
        description: "Migration/Upgrade of Odoo (Purchase, Inventory, Fleet, Payroll) v13 to v18.",
        impact: "Enterprise-wide standardization.",
        category: "ERP",
        problem: "Legacy Odoo v13 instance was slow, insecure, and lacked modern features, causing friction in Purchase and Inventory workflows.",
        solution: "Led the end-to-end migration strategy, including data cleaning, module refactoring for v18 compatibility, and user training for 200+ employees.",
        tech_stack: ["Odoo.sh", "Python", "XML", "PostgreSQL"],
    },
    {
        title: "Employee Internal Portal",
        description: "Centralized web-based application for employee requests.",
        impact: "Streamlined request management.",
        category: "Internal Tools",
        problem: "Employees had to use emails, WhatsApp, and paper forms to request IT support or HR documents, leading to lost tickets.",
        solution: "Launched a self-service portal (Internal Desk) where employees can raise, track, and rate service requests, routed automatically to the right department.",
        tech_stack: ["React", "Firebase", "Tailwind CSS"],
    },
    {
        title: "Procurement System (Penny)",
        description: "End-to-end implementation of Penny procurement system.",
        impact: "Standardized procurement process.",
        category: "System Implementation",
        problem: "Maverick spending was rampant due to lack of enforced approval workflows and vendor management.",
        solution: "Implemented Penny P2P system, configuring approval matrices based on budget thresholds and integrating it with the finance ERP for auto-PO generation.",
        tech_stack: ["Penny", "API Integration", "ERP"],
    },
    {
        title: "Ticketing System (Jira)",
        description: "Jira-based system integrated with Slack for multiple teams.",
        impact: "Improved resolution time & collaboration.",
        category: "System Integration",
        problem: "Tech and non-tech teams worked in silos using different tools, making cross-functional project tracking impossible.",
        solution: "Unified all teams onto a master Jira instance with customized workflows, and built a Slack bot to allow ticket updates directly from chat.",
        tech_stack: ["Jira", "Slack API", "Automation for Jira"],
    },
    {
        title: "Monitoring Dashboards",
        description: "Health monitoring for Infobip, Ziwo, Maqsam with auto-alerts.",
        impact: "Proactive issue detection.",
        category: "Analytics",
        problem: "Support teams reacted to downtime only after customer complaints, damaging reputation.",
        solution: "Created a centralized 'Heartbeat' dashboard aggregating statuses from Infobip, Ziwo, and Maqsam APIs, triggering alerts to on-call engineers instantly.",
        tech_stack: ["Grafana", "Node.js", "Prometheus", "3rd Party APIs"],
    },
    {
        title: "Access Management (Lumos)",
        description: "Platform for application access requests and audits.",
        impact: "Enhanced security compliance.",
        category: "System Implementation",
        problem: "Manual granting of software licenses resulted in 'Shadow IT' and paying for unused seats.",
        solution: "Deployed Lumos to automate access provisioning/deprovisioning based on role, saving 15% in SaaS costs via unused license reclamation.",
        tech_stack: ["Lumos", "Okta", "SCIM"],
    },
    {
        title: "HRMS Integration Suite",
        description: "Integrations: BambooHR/Keka/Odoo <> Slack <> Google Admin <> ERP.",
        impact: "Eliminated manual data entry.",
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
];

export const skills: Skill[] = [
    {
        category: "Process Excellence",
        items: ["Kaizen", "PDCA", "VSM", "5S", "Root Cause Analysis", "Process Discovery", "AS-IS/TO-BE Design"],
    },
    {
        category: "Enterprise Systems",
        items: ["SAP", "Microsoft Dynamics", "Odoo", "SAGE", "Slack", "MS Teams"],
    },
    {
        category: "Automation & Dev",
        items: ["Python", "Google Apps Script", "JavaScript", "SQL", "APIs", "Webhooks"],
    },
    {
        category: "Data & BI",
        items: ["Power BI", "Tableau", "Looker Studio", "BigQuery", "Advanced Excel (VBA)"],
    },
    {
        category: "Cloud & AI",
        items: ["GCP", "Firebase", "OpenAI API", "Gemini", "Cloudflare"],
    },
];

export const languages = [
    { language: "English", level: "Full Professional" },
    { language: "Spanish", level: "Limited Working" },
];
