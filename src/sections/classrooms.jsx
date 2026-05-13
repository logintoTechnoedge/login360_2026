import { useState } from "react";

const CLASSES = [
  { id: "EZK2vW9u620", label: "Data Science – Machine Learning"       },
  { id: "Pki54nQGrlQ", label: "Python – Conditional Statements"  },
  { id: "unTmLqyoT7M", label: "Fullstack Development"       },
  { id: "7hHA-d053ck", label: "Interview Preperation"     },
  { id: "uOSsEra1TQM", label: "Quiz - Competition"     },
  { id: "tpb310xSV7E", label: "Resume Building"  },
];

function ClsCard({ id, label }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="cls-card">
      <div className="cls-frame">
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
      <div className="cls-label">{label}</div>
    </div>
  );
}

function Classrooms() {
  return (
    <section className="section alt" id="classroom">
      <div className="section-head reveal">
        <span className="section-tag">🎥 Classroom</span>
        <h2>Inside Our Live Classes 🎥</h2>
        <p>Interactive, hands-on sessions with industry-experienced trainers</p>
      </div>

      <div className="class-grid reveal">
        {CLASSES.map((c) => (
          <ClsCard key={c.id} {...c} />
        ))}
      </div>
    </section>
  );
}

export default Classrooms;