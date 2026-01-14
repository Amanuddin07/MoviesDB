import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Recommendition.css";
import useSlug from "../../../Hooks/useSlug";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function RecommendationSlider({
  recommendations = [],
  mediaType = "movie",
}) {
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

  if (!recommendations.length) return null;

  return (
    <div className="rec_slider_wrapper">
      <button className="slider_btn left" onClick={() => scroll("left")}>
        <ChevronLeft />
      </button>

      <div className="rec_slider" ref={sliderRef} onWheel={handleWheel}>
        {recommendations.map((item) => {
          const slug = useSlug(item.title || item.name);

          return (
            <Link
              key={item.id}
              to={`/${mediaType}/details/${item.id}/${slug}`}
              className="rec_card"
            >
              <img
                src={
                  item.poster_path
                    ? IMAGE_BASE_URL + item.poster_path
                    : "/no-poster.png"
                }
                alt={item.title || item.name}
              />
              <p>{item.title || item.name}</p>
            </Link>
          );
        })}
      </div>

      <button className="slider_btn right" onClick={() => scroll("right")}>
        <ChevronRight />
      </button>
    </div>
  );
}
