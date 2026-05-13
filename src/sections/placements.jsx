const REELS = [
    { id: "DNhf3H-Juum",  label: "Karthika – Frontend Developer"       },
    { id: "DNcpfa2xUrx",  label: "Ismail – ML Engineer"       },
    { id: "DNZ5quvJ5DO",  label: "Guroosuntar – Junior Executive"     },
    { id: "DO2ddn2khY5",  label: "Akash – SEO Executive"     },
    { id: "DMhLQplJaWJ",  label: "Jeevanarayan – Software Engineer"         },
    { id: "DW_WM47ibsr",  label: "Swathi – UI UX"       },
  ];
  
  function Placements() {
    return (
      <section className="section" id="feedback">
        <div className="section-head reveal">
          <span className="section-tag">Placements</span>
          <h2>Real Students. Real Placements</h2>
          <p>Watch our alumni share their placement success stories</p>
        </div>
  
        <div className="reels-grid reveal">
          {REELS.map((reel) => (
            <div className="reel-card" key={reel.id}>
              <div className="reel-frame">
                <iframe
                  src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                  loading="lazy"
                  allowFullScreen
                  allowTransparency
                  scrolling="no"
                  title={reel.label}
                />
              </div>
              <div className="reel-label">{reel.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Placements;