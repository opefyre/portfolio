"use client";

import { motion } from "framer-motion";
import { personalInfo, experiences, skills, projects, education, certifications } from "@/lib/data";

export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-sm border-b border-[var(--border-light)]">
        <div className="container flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            A.S.
          </a>
          <div className="hidden md:flex items-center gap-10">
            {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors link-underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[var(--accent-warm)] font-medium tracking-widest uppercase text-sm mb-6">
                Process Excellence Leader
              </p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 text-[var(--text-primary)]">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-xl">
                {personalInfo.summary}
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="#contact" className="btn-primary">
                  Get in Touch
                  <span>→</span>
                </a>
                <a href="#experience" className="btn-secondary">
                  View Experience
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "8+", label: "Years Experience" },
                  { number: "50+", label: "Projects Delivered" },
                  { number: "12+", label: "Team Members Led" },
                  { number: "3", label: "Countries" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-8 bg-white border border-[var(--border-light)] hover:shadow-lg transition-shadow"
                  >
                    <div className="text-5xl font-semibold text-[var(--accent-warm)] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-4xl">
            <div className="accent-line mb-8" />
            <h2 className="text-5xl md:text-6xl mb-10">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                { title: "Process Excellence", desc: "Expert in continuous improvement methodologies, process discovery, AS-IS/TO-BE design, and operational optimization using Kaizen, PDCA, and 5S frameworks." },
                { title: "Digital Transformation", desc: "Leading enterprise-wide automation, system integration, and cloud-based solution delivery to replace manual workflows and increase efficiency." },
                { title: "Data-Driven Strategy", desc: "Building analytics platforms, KPI frameworks, and real-time dashboards using Power BI, Tableau, and BigQuery for strategic decision-making." },
                { title: "AI-Enabled Innovation", desc: "Leveraging AI and automation with OpenAI, Gemini, and custom AI agents to enhance productivity and decision quality." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="text-2xl mb-4 text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <div className="container">
          <div className="accent-line mb-8" />
          <h2 className="text-5xl md:text-6xl mb-16">Experience</h2>

          <div className="space-y-16">
            {experiences.map((exp, expIndex) => (
              <motion.div
                key={expIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-[300px_1fr] gap-12"
              >
                <div>
                  <h3 className="text-3xl mb-2">{exp.company}</h3>
                  <p className="text-[var(--text-muted)]">{exp.location}</p>
                </div>

                <div className="space-y-12">
                  {exp.positions.map((position, posIndex) => (
                    <div key={posIndex} className="border-l-2 border-[var(--accent-warm)] pl-8">
                      <h4 className="text-xl font-semibold mb-2">{position.title}</h4>
                      <p className="text-sm text-[var(--text-muted)] mb-6">{position.period}</p>
                      <ul className="space-y-3">
                        {position.achievements.slice(0, 4).map((achievement, achIndex) => (
                          <li key={achIndex} className="text-[var(--text-secondary)] leading-relaxed flex gap-3">
                            <span className="text-[var(--accent-warm)]">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="accent-line mb-8" />
          <h2 className="text-5xl md:text-6xl mb-16">Expertise</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((category, i) => (
              <motion.div
                key={i}
                className="card-elegant p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-xl mb-6 text-[var(--accent-deep)]">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, j) => (
                    <span key={j} className="tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <div className="accent-line mb-8" />
          <h2 className="text-5xl md:text-6xl mb-16">Selected Projects</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 6).map((project, i) => (
              <motion.div
                key={i}
                className="card-elegant p-8 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="tag mb-6">{project.category}</span>
                <h3 className="text-2xl mb-4 group-hover:text-[var(--accent-warm)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-6 border-t border-[var(--border-light)]">
                  <p className="text-sm text-[var(--text-muted)] mb-1">Impact</p>
                  <p className="font-medium text-[var(--accent-deep)]">{project.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="accent-line mb-8" />
              <h2 className="text-4xl mb-10">Education</h2>
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl mb-1">{edu.degree}</h3>
                    <p className="text-[var(--text-secondary)]">{edu.institution}</p>
                    <p className="text-sm text-[var(--text-muted)]">{edu.period}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="accent-line mb-8" />
              <h2 className="text-4xl mb-10">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-[var(--accent-warm)] rounded-full" />
                    <span className="text-[var(--text-secondary)]">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="accent-line mx-auto mb-8" />
            <h2 className="text-5xl md:text-6xl mb-8">Let&apos;s Connect</h2>
            <p className="text-xl text-[var(--text-secondary)] mb-12">
              Ready to drive digital transformation and process excellence in your organization?
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <a
                href={`mailto:${personalInfo.email}`}
                className="card-elegant p-6 text-center"
              >
                <div className="text-3xl mb-3">📧</div>
                <p className="text-sm text-[var(--text-muted)] mb-1">Email</p>
                <p className="font-medium">{personalInfo.email}</p>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-elegant p-6 text-center"
              >
                <div className="text-3xl mb-3">💼</div>
                <p className="text-sm text-[var(--text-muted)] mb-1">LinkedIn</p>
                <p className="font-medium">Connect with me</p>
              </a>
            </div>

            <div className="flex justify-center gap-8 text-[var(--text-muted)]">
              <div>
                <span className="mr-2">📱</span>
                {personalInfo.phone}
              </div>
              <div>
                <span className="mr-2">📍</span>
                {personalInfo.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--border-light)]">
        <div className="container flex justify-between items-center text-sm text-[var(--text-muted)]">
          <p>© 2026 {personalInfo.name}</p>
          <p>Process Excellence • Digital Transformation</p>
        </div>
      </footer>
    </main>
  );
}
