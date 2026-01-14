import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ImageSlider.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function ImageSlider({ images = [] }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    sliderRef.current.scrollLeft += e.deltaY;
  };

  if (!images.length) return null;

//   images.forEach(item => {
//   console.log(item.file_path);
// });

  return (
    <div className="img_slider_wrapper">
      <button className="slider_btn left" onClick={() => scroll("left")}>
        <ChevronLeft />
      </button>

      <div
        className="img_slider"
        ref={sliderRef}
        onWheel={handleWheel}
      >
        {images.map((item, index) => (
          <div className="img_card" key={index}>
            <img
              src={
                item.file_path
                  ? IMAGE_BASE_URL + item.file_path
                  : "/no-poster.png"
              }
              alt="slider"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button className="slider_btn right" onClick={() => scroll("right")}>
        <ChevronRight />
      </button>
    </div>
  );
}
