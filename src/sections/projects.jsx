import { useState } from "react";

const PROJECTS = [
  {
    id: "ecommerce",
    emoji: "🛒",
    outcome: "Resume-Ready",
    name: "E-Commerce App",
    desc: "Full-featured online store with product listings, cart, checkout, payment integration, and admin dashboard.",
    stack: ["React", "Spring Boot", "MySQL", "Stripe API"],
  },
  {
    id: "jobportal",
    emoji: "💼",
    outcome: "Industry-Level",
    name: "Job Portal",
    desc: "Job seekers browse listings, apply, and track applications. Employers post jobs and manage candidates end-to-end.",
    stack: ["Python", "Django", "React", "PostgreSQL"],
  },
  {
    id: "dashboard",
    emoji: "📈",
    outcome: "Data Analyst Project",
    name: "Data Dashboard",
    desc: "Interactive analytics dashboard with real-time KPIs, charts, filters, and drill-down capabilities for business decisions.",
    stack: ["Power BI", "Python", "SQL", "Tableau"],
  },
  {
    id: "chatbot",
    emoji: "🤖",
    outcome: "AI Project",
    name: "AI Chatbot",
    desc: "Context-aware conversational AI chatbot with NLP, intent recognition, and multi-turn dialog support.",
    stack: ["Python", "NLP", "Flask", "TensorFlow"],
  },
  // {
  //   id: "sms",
  //   emoji: "🎓",
  //   outcome: "Full Stack Project",
  //   name: "Student Management System",
  //   desc: "Complete student lifecycle management: admissions, attendance, marks, reports, and notifications.",
  //   stack: ["Java", "Spring MVC", "React", "MySQL", "JWT Auth"],
  // },
];

const DEMOS = [
  { id: "ecommerce", demoId: "lXkMkw2SIME", demoLabel: "Java Game Development" },
  { id: "jobportal", demoId: "5ehUZptMNL0", demoLabel: "Job Portal Demo" },
  { id: "dashboard", demoId: "Dgo4616Gul0", demoLabel: "Finance Health" },
  { id: "chatbot",   demoId: "B4RN3Nv57Js", demoLabel: "Inventory Management" },
  { id: "sms",       demoId: "aqN6q4ouGr8", demoLabel: "Luxury Boutique" },
  { id: "ecommerce", demoId: "jNgrtulWPgI", demoLabel: "E-Commerce Demo" },
];

function ProjectCard({ project }) {

  return (
    <div
      className={`proj-card reveal${project.wide ? " proj-card--wide" : ""}${open ? " proj-card--open" : ""}`}
      onClick={() => setOpen((o) => !o)}  
    >
      <div className="proj-top">
        <span className="proj-emoji">{project.emoji}</span>
        <span className="proj-outcome">{project.outcome}</span>
      </div>
      <div className="proj-name">{project.name}</div>
      <div className="proj-desc">{project.desc}</div>
      <div className="proj-stack">
        {project.stack.map((s) => (
          <span key={s} className="stack-tag">{s}</span>
        ))}
      </div>

    </div>
  );
}

function DemoCard({ id, label }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="demo-card">
      <div className="demo-frame">
        {!loaded && (
          <div className="vid-skel">
            <div className="play-btn">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          loading="lazy"
          allowFullScreen
          title={label}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
        />
      </div>
      <div className="demo-label">{label}</div>
    </div>
  );
}

function Projects({ page, openPopup }) {
  return (
    <section className="section" id="projects">
      <div className="section-head reveal">
        <span className="section-tag">💻 Projects</span>
        <h2>
          Build Real Projects &amp;<br />
          <span className="highlight">Become Job-Ready</span> 💻
        </h2>
        <p>Students build real-time industry projects that go directly into their resume</p>
      </div>

      {/* ── Project Cards ── */}
      <div className="project-cards">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {/* ── Demo Videos ── */}
      <div className="proj-demos-wrap">
        <div className="section-head reveal" style={{ marginBottom: 16 }}>
          <h3 className="proj-demos-title">🎬 Watch Project Demos</h3>
        </div>
        <div className="proj-demos reveal">
          {DEMOS.map((d) => (
            <DemoCard key={d.id} id={d.demoId} label={d.demoLabel} />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="proj-cta reveal">
        <button
          className="btn-g"
          onClick={() =>
            openPopup({
              heading: "Start Building Projects Today",
              btnText: "Start Today",
              formType: `${page} Start Today`,
            })
          }
        >
          🚀 Start Building Projects Today
        </button>
      </div>
    </section>
  );
}

export default Projects;