import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const PLACEMENTS = [
  {
    videoId: "YRaN8Re1_iE",
    title:   "Placed Student 1",
    name:    "Rajesh Kumar",
    company: "TCS",
    initials:"RK",
    gradient:"linear-gradient(135deg,#0B5ED7,#1a6ef5)",
  },
  {
    videoId: "q_mdWphcl08",
    title:   "Placed Student 2",
    name:    "Priya Devi",
    company: "Infosys",
    initials:"PD",
    gradient:"linear-gradient(135deg,#00C897,#0B5ED7)",
  },
  {
    videoId: "YUo3UIxMkj4",
    title:   "Placed Student 3",
    name:    "Lenin",
    company: "Wipro",
    initials:"AK",
    gradient:"linear-gradient(135deg,#FACC15,#f97316)",
  },
  {
    videoId: "VhrYyfR3BCo",
    title:   "Placed Student 4",
    name:    "Sowmya M",
    company: "HCL",
    initials:"SM",
    gradient:"linear-gradient(135deg,#8b5cf6,#0B5ED7)",
  },
  {
    videoId: "VoqLmu9Y6g8",
    title:   "Placed Student 5",
    name:    "Rajesh Kumar",
    company: "Xenovex",
    initials:"RK",
    gradient:"linear-gradient(135deg,#0B5ED7,#1a6ef5)",
  },
  {
    videoId: "pQQDVpLeC2Y",
    title:   "Placed Student 6",
    name:    "Priya Devi",
    company: "Infosys",
    initials:"PD",
    gradient:"linear-gradient(135deg,#00C897,#0B5ED7)",
  },
];

function VidCard({ videoId, title, name, company, initials, gradient }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="vid-card reveal">
      <div className="vid-frame">
        {!loaded && (
          <div className="vid-skel">
            <div className="play-btn">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?si=X6VCxsqsVPugSIRp`}
          loading="lazy"
          allowFullScreen
          title={title}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      </div>

      <div className="vid-info">
        <div className="vid-av" style={{ background: gradient }}>{initials}</div>
        <div>
          <div className="vid-name">{name}</div>
          <div className="vid-meta">
            <span className="placed-tag">
              <FaCheckCircle size={12} /> Placed at {company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Placements() {
  return (
    <section className="section alt" id="placements">
      <div className="section-head reveal">
        <span className="section-tag">Placements</span>
        <h2>Real Students. Real Placements</h2>
        <p>Watch our alumni share their placement success stories</p>
      </div>

      <div className="vid-list">
        {PLACEMENTS.map((p) => (
          <VidCard key={p.videoId} {...p} />
        ))}
      </div>
    </section>
  );
}

export default Placements;