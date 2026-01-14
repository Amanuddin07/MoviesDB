import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./videoSlider.css";

export default function VideoSlider({ videos = [] }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 500;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleWheel = (e) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    sliderRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className="video-slider-wrapper">
      <button className="video_nav left" onClick={() => scroll("left")}>
        <ChevronLeft />
      </button>

      <div
        className="video-slider"
        ref={sliderRef}
        onWheel={handleWheel}
      >
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ))}
      </div>

      <button className="video_nav right" onClick={() => scroll("right")}>
        <ChevronRight />
      </button>
    </div>
  );
}
