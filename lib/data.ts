export interface Experience {
    company: string;
    location: string;
    positions: Position[];
}

export interface Position {
    title: string;
    period: string;
    achievements: string[];
    isProcessFocused: boolean;
}

export interface Project {
    title: string;
    description: string;
    impact: string;
    category: string;
}

export interface Skill {
    category: string;
    items: string[];
}

export const personalInfo = {
    name: "Abolfazl Shirkavand",
    title: "Digital Transformation & Process Excellence Leader",
    email: "abolfazl.shirkavand73@gmail.com",
    phone: "+351 964 450 951",
    location: "Lisbon, Portugal",
    linkedin: "https://www.linkedin.com/in/abolfazl-shirkavand/",
    summary:
        "Digital Transformation and Process Improvement expert with 8+ years of experience driving enterprise-wide automation, system integration, and operational excellence. Proven track record of building and leading cross-functional digital teams, delivering scalable cloud-based solutions, and redesigning business processes through data, AI, and technology.",
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
                    "Own the Application & Digital Transformation function, leading enterprise automation, system integration, and internal platform strategy",
                    "Established and led the Digital Transformation team across the organization",
                    "Define and govern the internal applications landscape, ensuring tool rationalization and long-term scalability",
                    "Translate business strategy into digital roadmaps, prioritizing initiatives based on value and organizational readiness",
                    "Lead transformation initiatives through structured process discovery and redesign",
                    "Oversee delivery of cloud-based and AI-enabled solutions that replace manual workflows",
                    "Act as partner to functional leaders, challenging legacy practices and driving adoption of optimized ways of working",
                    "Build and develop high-performing engineering teams, setting delivery standards and technical direction",
                ],
                isProcessFocused: true,
            },
            {
                title: "Digital Process Improvement Manager",
                period: "Jul 2024 – Apr 2025",
                achievements: [
                    "Led a team of >12 direct employees across IT, Application, and Digital Transformation functions",
                    "Defined and executed process reengineering strategies, aligning digital transformation with business goals",
                    "Directed 50+ process optimization and automation projects, achieving extensive reduction in manual effort",
                    "Oversaw development of scalable cloud-native automation tools and system integrations",
                    "Led enterprise-wide automation initiatives, integrating ERP, Jira, Notion, Slack, and third-party APIs",
                    "Drove AI-powered innovations, implementing predictive analytics and intelligent assistants",
                    "Championed data-driven culture with real-time dashboards in Tableau and Looker Studio",
                    "Standardized knowledge management, supervising creation of 150+ technical documents",
                ],
                isProcessFocused: true,
            },
            {
                title: "Digital Innovation Project Manager",
                period: "Oct 2023 – Jun 2024",
                achievements: [
                    "Led team of 5 for project-based operations within IT & Application teams",
                    "Managed end-to-end project lifecycles for innovation and system implementation",
                    "Implemented automation and optimization projects across multiple departments",
                    "Collaborated with senior stakeholders to align digital transformation projects with company-wide goals",
                    "Created web-based platforms for managing projects and observing KPIs",
                ],
                isProcessFocused: true,
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
                    "Owned supply chain workstream for New Product Introduction, coordinating cross-functional teams",
                    "Implemented pillars within Integrated Work System (IWS), driving standardization and continuous improvement",
                    "Led cost-saving initiatives, negotiating with suppliers and optimizing material sourcing (avg 12% decrease)",
                    "Designed centralized NPI tracking dashboards using Excel, VBA, and macros",
                    "Conducted 100+ supplier visits and negotiations, establishing contingency plans",
                    "Managed end-to-end NPI projects, reducing launch timelines from 5 months to 2 months",
                    "Streamlined production planning with MRP-based scheduling across multiple production lines",
                    "Improved inventory control, balancing stock levels to prevent shortages",
                    "Introduced KPI-driven performance tracking aligned with business objectives",
                ],
                isProcessFocused: true,
            },
            {
                title: "Management Trainee (Global Graduate)",
                period: "Mar 2020 – Jul 2021",
                achievements: [
                    "Rotated through Operations, Engineering, Finance, IT, and HR teams",
                    "Developed Excel-based automated dashboards for data-driven decision-making",
                    "Designed Spare Part Inventory Management System using Excel, macros, and VBA",
                    "Created MRP-based planning solution integrating 9 production lines, 5 warehouses, and 40+ SKUs",
                    "Conducted gap analysis and optimization, leading to standardized workflows",
                    "Implemented Predictive Maintenance pillar to reduce breakdowns and improve machine uptime",
                ],
                isProcessFocused: true,
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
                    "Led 10+ projects improving OCT, enhancing OEE, reducing MTBF, and eliminating quality defects",
                    "Supported supervisors to meet targets on supplier OTD, Material Defect Rate, and OTIF",
                    "Managed ERP processes for inventory tracking, material planning, and production scheduling",
                    "Designed Power BI dashboards for planning & production KPIs, reducing reporting time by 60%",
                    "Contributed to implementation of AM, CS&L, and PD pillars in WCM framework",
                ],
                isProcessFocused: true,
            },
            {
                title: "Operations Improvement Officer",
                period: "Sep 2016 – Aug 2017",
                achievements: [
                    "Supported ERP-driven inventory management and production planning",
                    "Conducted data analysis and developed Power BI dashboards for real-time reporting",
                    "Assisted in WCM implementation, optimizing supply chain workflows",
                    "Supported improvements in Order Cycle Time, OTIF, and Overall Efficiency",
                ],
                isProcessFocused: true,
            },
        ],
    },
];

export const projects: Project[] = [
    {
        title: "Fleet Asset Management Software",
        description:
            "Inventory & task management software for fleet asset management and vehicle maintenance monitoring",
        impact:
            "Increased data reliability, decreased manual work, increased visibility and insights on inventory & assets",
        category: "System Implementation",
    },
    {
        title: "Contract Management System",
        description:
            "Software for managing company contracts with modules for contract management, automatic reminders for renewals, and analytics dashboard",
        impact:
            "Increased visibility and reliability, reduced legal risks, decreased time for reporting & insight provisioning",
        category: "System Implementation",
    },
    {
        title: "Payroll Automation Tool (Odoo-based)",
        description:
            "Dedicated automation tool for monthly payroll calculation, integrated with HRMS and Finance ERP",
        impact: "Decreased payroll calculation cycle from days to minutes",
        category: "Automation",
    },
    {
        title: "ERP Implementation & Migration",
        description:
            "Odoo implementation/migration/upgrade (Purchase, Inventory, Fleet, Payroll, HR) from v13 to v16 and v18",
        impact:
            "Enabled enterprise-wide process standardization and real-time visibility",
        category: "System Implementation",
    },
    {
        title: "Employee Internal Portal",
        description:
            "Centralized web-based application for employees to manage their requests",
        impact: "Streamlined internal request management and increased employee satisfaction",
        category: "Platform Development",
    },
    {
        title: "Procurement System Implementation",
        description: "End-to-end implementation of Penny procurement system for internal purchases",
        impact: "Standardized procurement process and improved vendor management",
        category: "System Implementation",
    },
    {
        title: "Ticketing System Implementation",
        description: "Jira-based ticketing system for several teams, integrated with Slack",
        impact: "Improved issue tracking, resolution time, and cross-team collaboration",
        category: "System Integration",
    },
    {
        title: "Monitoring Tools & Dashboards",
        description:
            "System usage & health monitoring for Infobip, Call Center apps (Ziwo, Maqsam) with automated alerts",
        impact: "Proactive issue detection and faster incident response",
        category: "Analytics & Monitoring",
    },
    {
        title: "Access Management Tool (Lumos)",
        description:
            "Dedicated platform for managing application access requests, approvals, and monthly audits",
        impact: "Enhanced security compliance and streamlined access governance",
        category: "System Implementation",
    },
    {
        title: "HRMS Integration Suite",
        description:
            "Multiple integration projects between HRMS (BambooHR, Keka, Odoo), Slack, Google Admin, and ERP systems",
        impact: "Eliminated manual data entry and ensured system-wide data consistency",
        category: "System Integration",
    },
];

export const skills: Skill[] = [
    {
        category: "Process Excellence",
        items: [
            "Operating Model Design",
            "Continuous Improvement (Kaizen, PDCA, VSM, 5W, 5G, 5S, 3Mu)",
            "Process Discovery & AS-IS/TO-BE Design",
            "Performance Management & KPI Frameworks",
            "Root Cause Analysis",
            "Process Standardization & Governance",
        ],
    },
    {
        category: "Digital Transformation",
        items: [
            "Enterprise Automation Strategy",
            "System Integration & Data Flow Design",
            "Application Rationalization",
            "Digital Roadmap Development",
            "Change Management",
            "Technology Enablement",
        ],
    },
    {
        category: "Project & Delivery Management",
        items: [
            "Agile, Waterfall, Hybrid Methodologies",
            "Jira, Notion, MS Project",
            "Portfolio Management",
            "Stakeholder Engagement",
            "Cross-functional Team Leadership",
        ],
    },
    {
        category: "Data & Analytics",
        items: [
            "Power BI, Tableau, Looker Studio",
            "BigQuery, SQL",
            "Advanced Excel (VBA, Macros)",
            "Data-Driven Decision Making",
            "Predictive Analytics",
        ],
    },
    {
        category: "Automation & Integration",
        items: [
            "Python, JavaScript, Google Apps Script",
            "APIs, Webhooks, Data Pipelines",
            "ERP Systems (SAP, Dynamics, Odoo)",
            "Cloud Platforms (GCP, Firebase)",
            "AI-Powered Automation (OpenAI, Gemini)",
        ],
    },
];

export const education = [
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

export const certifications = [
    "Google Project Management: Professional Certificate",
    "Master Digital Transformation",
    "Product Management Professional Certificate",
];

export const languages = [
    { language: "English", proficiency: "Full Professional Proficiency" },
    { language: "Spanish", proficiency: "Limited Working Proficiency" },
];
