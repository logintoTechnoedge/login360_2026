import { FaGraduationCap, FaBriefcase, FaStar, FaCheckCircle, FaCalendarAlt, FaPencilAlt } from "react-icons/fa";

const TRUST_CARDS = [
  { icon: <FaGraduationCap size={24} />, value: "5000+", label: "Students Trained",   cls: "c-amber"  },
  { icon: <FaBriefcase size={24} />,     value: "3000+", label: "Students Placed",    cls: "c-amber" },
  { icon: <FaStar size={24} />,          value: "4.8★",  label: "Google Rating",      cls: "c-amber" },
  { icon: <FaCheckCircle size={24} />,   value: "100%",  label: "Placement Support",  cls: "c-amber" },
];

function Stats({ onBookDemo, onApply , page , openPopup }) {
  return (
    <section className="section intro" id="intro">
      <div className="intro-badge reveal">
        🏆 Chennai's #1 Placement-Focused Institute
      </div>

      <h1 className="reveal">
        Become a <span className="highlight">IT Professional</span>
        <br />& Get Placed in 3–4 Months 
      </h1>

      <p className="intro-sub reveal">
        No Coding Knowledge? We train you <strong>from absolute scratch</strong> and
        provide <strong>100% Placement Support</strong> until you land your dream IT job.
      </p>

      <div className="trust-grid reveal">
        {TRUST_CARDS.map((c) => (
          <div className={`trust-card ${c.cls}`} key={c.label}>
            <span className="ti">{c.icon}</span>
            <div className="tn">{c.value}</div>
            <div className="tl">{c.label}</div>
          </div>
        ))}
      </div>
        
      <div className="cta-duo reveal">
        <button className="btn-p" onClick={() => openPopup({ heading: `Book Free Demo Class`, btnText: "Book now", formType: `${page} Book Demo` })}>
          <FaCalendarAlt size={15} /> Book Free Demo Class
        </button>
        <button className="btn-s" onClick={() => openPopup({ heading: `Apply Now for your Profession`, btnText: "Apply now", formType: `${page} Demo Apply` })}>
          <FaPencilAlt size={14} /> Apply Now
        </button>
      </div>
    </section>
  );
}

export default Stats;