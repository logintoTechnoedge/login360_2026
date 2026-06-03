import { useState, useMemo } from "react"; 
import ContactBanner from "../sections/contact_banner";
import { usePopup } from "../hooks/usePopup";
import LeadForm from "../components/lead_form";
import { FaPencilAlt, FaPhone, FaWhatsapp } from "react-icons/fa";

const PLACEMENTS = [
  { id: 1,  name: "Rahul Kumar",       degree: "B.Tech",    passout: 2024, company: "Infosys",         role: "Systems Engineer",            salary: "4.5 LPA",  youtube: "3igjqW1_rSU" },
  { id: 2,  name: "Priya Sharma",      degree: "MCA",       passout: 2023, company: "TCS",             role: "Associate Software Engineer", salary: "6.5 LPA",  youtube: "byXfe3k6ToM" },
  { id: 3,  name: "Amit Reddy",        degree: "B.E",       passout: 2024, company: "Wipro",           role: "Project Engineer",            salary: "3.8 LPA",  youtube: "yQg9SRFwR4A" },
  { id: 4,  name: "Sneha Nair",        degree: "B.Sc (CS)", passout: 2022, company: "Accenture",       role: "Associate Developer",         salary: "7.2 LPA",  youtube: "4i5WcgYNq9g" },
  { id: 5,  name: "Kiran Patel",       degree: "B.Tech",    passout: 2023, company: "Amazon",          role: "SDE I",                       salary: "12.0 LPA", youtube: "Sltcv4RuNNc" },
  { id: 6,  name: "Arjun Rao",         degree: "M.Tech",    passout: 2024, company: "IBM",             role: "Software Developer",          salary: "9.0 LPA",  youtube: "Z7ZGnYvrcIY" },
  { id: 7,  name: "Divya Singh",       degree: "BCA",       passout: 2022, company: "Cognizant",       role: "Programmer Analyst",          salary: "4.2 LPA",  youtube: "NJWoy6FvYk8" },
  { id: 8,  name: "Vikram Iyer",       degree: "B.Tech",    passout: 2023, company: "Capgemini",       role: "Analyst",                     salary: "5.0 LPA",  youtube: "gLTJWVClIJk" },
  { id: 9,  name: "Pooja Mehta",       degree: "M.Tech",    passout: 2024, company: "HCL Technologies",role: "Technical Lead",              salary: "8.5 LPA",  youtube: "z3pkJytpfhA" },
  { id: 10, name: "Suresh Joshi",      degree: "B.Sc (IT)", passout: 2022, company: "Tech Mahindra",   role: "Software Engineer",           salary: "3.5 LPA",  youtube: "p9seA1sKvEw" },
  { id: 11, name: "Ananya Gupta",      degree: "BCA",       passout: 2023, company: "Infosys",         role: "Systems Engineer",            salary: "4.5 LPA",  youtube: "3igjqW1_rSU" },
  { id: 12, name: "Ravi Pillai",       degree: "B.Tech",    passout: 2024, company: "Wipro",           role: "Project Engineer",            salary: "5.5 LPA",  youtube: "byXfe3k6ToM" },
  { id: 13, name: "Meghna Das",        degree: "MCA",       passout: 2022, company: "Amazon",          role: "SDE I",                       salary: "11.0 LPA", youtube: "yQg9SRFwR4A" },
  { id: 14, name: "Sanjay Verma",      degree: "B.E",       passout: 2023, company: "TCS",             role: "Systems Analyst",             salary: "6.0 LPA",  youtube: "4i5WcgYNq9g" },
  { id: 15, name: "Kavitha Choudhary", degree: "B.Sc (CS)", passout: 2024, company: "Accenture",       role: "Software Engineer",           salary: "7.5 LPA",  youtube: "Sltcv4RuNNc" },
];

/* ── HELPERS ── */
const unique = (arr, key) => [...new Set(arr.map((i) => i[key]))].sort();

const COMPANY_COLORS = {
  Infosys:           "#00437f",
  TCS:               "#cc0000",
  Wipro:             "#4a148c",
  Capgemini:         "#003087",
  Cognizant:         "#00568a",
  "HCL Technologies":"#005f9e",
  Accenture:         "#a100ff",
  IBM:               "#0f62fe",
  Amazon:            "#FF9900",
  "Tech Mahindra":   "#e64a19",
};
const companyColor = (c) => COMPANY_COLORS[c] ?? "#ff6b35";

const SORT_OPTIONS = [
  { value: "latest",      label: "Sort: Latest First"    },
  { value: "oldest",      label: "Sort: Oldest First"    },
  { value: "salary_high", label: "Sort: Highest Package" },
  { value: "salary_low",  label: "Sort: Lowest Package"  },
  { value: "company",     label: "Sort: Company A–Z"     },
  { value: "name",        label: "Sort: Name A–Z"        },
];

const parseSalary = (s) => parseFloat(s.replace(" LPA", ""));

/* ════════════════════════════════════════════
   SUB-COMPONENTS
════════════════════════════════════════════ */

/* ── Single placement card ── */
function VideoCard({ placement }) {
  const [playing, setPlaying] = useState(false);
  const color = companyColor(placement.company);

  return (
    <div className="ap-card">
      {/* Header: video thumbnail / iframe */}
      <div
        className="ap-card-header"
        style={{ background: `linear-gradient(135deg, ${color}dd, ${color}88)` }}
      >
        {playing ? (
          <iframe
            className="ap-card-iframe"
            src={`https://www.youtube.com/embed/${placement.youtube}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={placement.name}
          />
        ) : (
          <div className="ap-thumb-wrap" onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${placement.youtube}/mqdefault.jpg`}
              alt={placement.name}
              loading="lazy"
            />
            <div className="ap-play-btn">▶</div>
          </div>
        )}
        <div className="ap-card-name-bar">{placement.name}</div>
      </div>

      {/* Body */}
      <div className="ap-card-body">
        <InfoRow icon="🎓" text={<><strong>{placement.degree}</strong></>} />
        <InfoRow icon="💼" text={<><strong>{placement.role}</strong></>} />
        <InfoRow icon="📅" text={<>Passout: <strong>{placement.passout}</strong></>} />

        {/* Company badge — dynamic bg + border color via inline style */}
        <div
          className="ap-company-badge"
          style={{
            background: `linear-gradient(135deg, ${color}14, #fff)`,
            borderColor: `${color}44`,
          }}
        >
          <div className="ap-company-logo" style={{ background: color }}>
            {placement.company[0]}
          </div>
          <div>
            <div className="ap-company-name" style={{ color }}>{placement.company}</div>
            <div className="ap-placed-label">✅ Placed</div>
          </div>
        </div>

        <div className="ap-salary-tag">💰 {placement.salary}</div>
      </div>
    </div>
  );
}

/* ── Icon + text row inside a card ── */
function InfoRow({ icon, text }) {
  return (
    <div className="ap-info-row">
      <span className="ap-info-icon">{icon}</span>
      <span className="ap-info-text">{text}</span>
    </div>
  );
}

/* ── Sidebar checkbox filter group ── */
function FilterCheckboxGroup({ title, options, selected, onChange }) {
  const toggle = (val) =>
    onChange(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val]
    );

  return (
    <div className="ap-filter-section">
      <div className="ap-filter-title">{title}</div>
      <div className="ap-check-list">
        {options.map((opt) => (
          <label key={opt} className="ap-check-item">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
            />
            <span className="ap-check-label">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

/* ── Active filter chip ── */
function Chip({ label, onRemove }) {
  return (
    <span className="ap-chip">
      {label}
      <button className="ap-chip-close" onClick={onRemove} aria-label={`Remove ${label} filter`}>
        ✕
      </button>
    </span>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function AllPlacements() {

  const { popup, openPopup, closePopup } = usePopup();
  /* ── Filter state ── */
  const [search,       setSearch]       = useState("");
  const [selDegrees,   setSelDegrees]   = useState([]);
  const [selYears,     setSelYears]     = useState([]);
  const [selCompanies, setSelCompanies] = useState([]);
  const [selRoles,     setSelRoles]     = useState([]);
  const [sortBy,       setSortBy]       = useState("latest");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  /* ── Derived filter option lists ── */
  const allDegrees   = unique(PLACEMENTS, "degree");
  const allYears     = unique(PLACEMENTS, "passout").map(String).reverse();
  const allCompanies = unique(PLACEMENTS, "company");
  const allRoles     = unique(PLACEMENTS, "role");

  /* ── Filtered + sorted data ── */
  const filtered = useMemo(() => {
    let arr = PLACEMENTS.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q)    ||
        p.company.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q)    ||
        p.degree.toLowerCase().includes(q);

      return (
        matchSearch &&
        (!selDegrees.length   || selDegrees.includes(p.degree))          &&
        (!selYears.length     || selYears.includes(String(p.passout)))   &&
        (!selCompanies.length || selCompanies.includes(p.company))       &&
        (!selRoles.length     || selRoles.includes(p.role))
      );
    });

    return [...arr].sort((a, b) => {
      if (sortBy === "latest")      return b.passout - a.passout;
      if (sortBy === "oldest")      return a.passout - b.passout;
      if (sortBy === "salary_high") return parseSalary(b.salary) - parseSalary(a.salary);
      if (sortBy === "salary_low")  return parseSalary(a.salary) - parseSalary(b.salary);
      if (sortBy === "company")     return a.company.localeCompare(b.company);
      if (sortBy === "name")        return a.name.localeCompare(b.name);
      return 0;
    });
  }, [search, selDegrees, selYears, selCompanies, selRoles, sortBy]);

  const clearAll = () => {
    setSearch(""); setSelDegrees([]); setSelYears([]);
    setSelCompanies([]); setSelRoles([]);
  };

  const activeFilterCount =
    selDegrees.length + selYears.length + selCompanies.length + selRoles.length + (search ? 1 : 0);
  const hasFilters = activeFilterCount > 0;

  /* ── Stats ── */
  const highestPkg = Math.max(...PLACEMENTS.map((p) => parseSalary(p.salary)));
  const avgPkg     = (PLACEMENTS.reduce((s, p) => s + parseSalary(p.salary), 0) / PLACEMENTS.length).toFixed(1);
  const companyCount = new Set(PLACEMENTS.map((p) => p.company)).size;

  /* ════════════════════════════════════════
     RENDER
  ════════════════════════════════════════ */
  return (
    <div className="ap-page">

      {/* ── HERO ── */}
      <section className="ap-hero">
        <div className="ap-hero-content">
          <span className="ap-hero-badge">🏆 Placement Success Stories</span>
          <h1 className="ap-hero-title">
            Our Students Are <span>Thriving</span> Everywhere
          </h1>
          <p className="ap-hero-subtitle">
            Real stories. Real companies. Real salaries. Browse all our placed students and get inspired.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="ap-stats-bar">
        <div className="ap-stats-inner">
          {[
            { num: `${PLACEMENTS.length}+`, label: "Students Placed"  },
            { num: `${companyCount}+`,       label: "Companies Hiring" },
            { num: `${highestPkg} LPA`,      label: "Highest Package"  },
            { num: `${avgPkg} LPA`,          label: "Average Package"  },
          ].map((s) => (
            <div key={s.label} className="ap-stat-item">
              <span className="ap-stat-num">{s.num}</span>
              <span className="ap-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="ap-main-wrap">

        {/* Mobile filter toggle */}
        <button
          className="ap-mobile-filter-btn"
          onClick={() => setSidebarOpen((p) => !p)}
        >
          {sidebarOpen ? "✕ Close Filters" : "⚙ Filters"}
          {hasFilters && (
            <span className="ap-filter-count-badge">{activeFilterCount}</span>
          )}
        </button>

        {/* ── SIDEBAR ── */}
        <aside className={`ap-sidebar${sidebarOpen ? " ap-sidebar--open" : ""}`}>
          <div className="ap-sidebar-header">
            <span>🔎 Filters</span>
            {hasFilters && (
              <button className="ap-clear-btn" onClick={clearAll}>Clear All</button>
            )}
          </div>

          {/* Search */}
          <div className="ap-filter-section">
            <div className="ap-filter-title">Search</div>
            <div className="ap-search-box">
              <span className="ap-search-icon">🔍</span>
              <input
                className="ap-search-input"
                placeholder="Name, company, role…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <FilterCheckboxGroup title="Degree"       options={allDegrees}   selected={selDegrees}   onChange={setSelDegrees}   />
          <FilterCheckboxGroup title="Passout Year" options={allYears}     selected={selYears}     onChange={setSelYears}     />
          <FilterCheckboxGroup title="Company"      options={allCompanies} selected={selCompanies} onChange={setSelCompanies} />
          <FilterCheckboxGroup title="Role"         options={allRoles}     selected={selRoles}     onChange={setSelRoles}     />
        </aside>

        {/* ── CONTENT ── */}
        <div className="ap-content">

          {/* Toolbar */}
          <div className="ap-toolbar">
            <div className="ap-toolbar-left">
              Showing <strong>{filtered.length}</strong> placement{filtered.length !== 1 ? "s" : ""}
            </div>
            <select
              className="ap-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="ap-chip-row">
              {search && <Chip label={`"${search}"`} onRemove={() => setSearch("")} />}
              {selDegrees.map((d)   => <Chip key={d} label={d} onRemove={() => setSelDegrees((p)   => p.filter((v) => v !== d))} />)}
              {selYears.map((y)     => <Chip key={y} label={y} onRemove={() => setSelYears((p)     => p.filter((v) => v !== y))} />)}
              {selCompanies.map((c) => <Chip key={c} label={c} onRemove={() => setSelCompanies((p) => p.filter((v) => v !== c))} />)}
              {selRoles.map((r)     => <Chip key={r} label={r} onRemove={() => setSelRoles((p)     => p.filter((v) => v !== r))} />)}
            </div>
          )}

          {/* Grid or empty state */}
          {filtered.length > 0 ? (
            <div className="ap-grid">
              {filtered.map((p) => <VideoCard key={p.id} placement={p} />)}
            </div>
          ) : (
            <div className="ap-empty">
              <div className="ap-empty-icon">🔍</div>
              <h3>No results found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button className="ap-clear-btn-lg" onClick={clearAll}>Clear Filters</button>
            </div>
          )}

          {/* Callback CTA */}
          <div className="ap-cta-box">
            <h3 className="ap-cta-title">🚀 Ready to Start Your Success Journey?</h3>
            <p className="ap-cta-subtitle">
              Request a callback from our placement team and get personalized guidance on your career path.
            </p>
            <div className="ap-cta-form">
              {/* <input className="ap-cta-input" type="text" placeholder="Your name" />
              <input className="ap-cta-input" type="tel"  placeholder="Phone number" /> */}
                <button className="btn btn-accent btn-lg" onClick={() => openPopup({ heading: `Request a Call Back`, btnText: "Request a Call Back", formType: "placement_callback" })}>
                    <FaPencilAlt size={15} /> Request a Call Back
                </button>
                <a href="tel:+918056477261" className="btn btn-ghost btn-lg bg-blue">
                    <FaPhone size={15} /> Call Us Now
                </a>
                <a href="https://wa.me/918056477261" className="btn btn-success btn-lg">
                    <FaWhatsapp size={17} /> WhatsApp Us
                </a>
            </div>
          </div>

        </div>{/* end .ap-content */}
      </div>{/* end .ap-main-wrap */}

      {popup && (
        <LeadForm isPopup={true} config={popup} onClose={closePopup} page="Placements"/>
      )}          

    </div>
  );
}