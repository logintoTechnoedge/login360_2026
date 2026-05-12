import { useState, useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const VIDEOS = [
  {
    id: "9bdfTR64aIE", 
    title: "Login360 Success Meet",
    start: 6,
  },
  {
    id: "SS1ct5n-tlM", 
    title: "Login360 Success Meet 3.0",
    start: 0,
  },
  {
    id: "8pjslZrBpes", 
    title: "Login360 with HR Navin",
    start: 0,
  },
];

function HeroVideo() {
  const [current, setCurrent] = useState(0);
  const [loadedMap, setLoadedMap] = useState({});
  const iframeKey = useRef(0);

  const goTo = (index) => {
    iframeKey.current += 1;
    setCurrent(index);
  };

  const prev = () => goTo((current - 1 + VIDEOS.length) % VIDEOS.length);
  const next = () => goTo((current + 1) % VIDEOS.length);

  const video = VIDEOS[current];
  const isLoaded = loadedMap[current];

  const src =
    `https://www.youtube.com/embed/${video.id}` +
    `?autoplay=1&start=${video.start}`;

  return (
    <section className="hero-video-section" aria-label="Video carousel">
      <div className="hero-video-carousel">

        {/* Main video frame */}
        <div className="hero-video-wrap">
          {!isLoaded && (
            <div className="hero-video-overlay">
              <div className="hero-video-spinner" />
            </div>
          )}
          <iframe
            key={iframeKey.current}
            width="560"
            height="315"
            src={src}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() =>
              setLoadedMap((prev) => ({ ...prev, [current]: true }))
            }
          />
        </div>

        {/* Dot indicators */}
        <div className="hero-video-dots" role="tablist" aria-label="Video navigation">
          {VIDEOS.map((v, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={v.title}
              className={`hero-video-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Prev / Next controls */}
        <div className="hero-video-controls">
          <button
            className="hero-video-btn"
            onClick={prev}
            aria-label="Previous video"
          >
            {/* &#8592; Prev */}<FaArrowCircleLeft className="hero-video-btn-icon"/>
          </button>
          <span className="hero-video-counter">
            {current + 1} / {VIDEOS.length}
          </span>
          <button
            className="hero-video-btn"
            onClick={next}
            aria-label="Next video"
          >
            {/* Next &#8594; */}<FaArrowCircleRight className="hero-video-btn-icon"/>
          </button>
        </div>

      </div>
    </section>
  );
}

export default HeroVideo;