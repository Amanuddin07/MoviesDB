import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function CastCardSlider({ cast = [] }) {
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
    e.preventDefault(); // stop window scroll
    sliderRef.current.scrollLeft += e.deltaY;
  };

  if (!cast.length) return null;

  return (
    <div className="relative w-full">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="cast_arrow_btn absolute left-3 top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        onWheel={handleWheel}
        className="flex gap-6 cast_slider overflow-x-auto px-14 py-4
                   scroll-smooth scrollbar-hide"
      >
        {cast.map((person) => (
          <div
            key={person.id}
            className="cast_card min-w-[170px] rounded-3xl overflow-hidden"
          >
            <div className="relative h-[260px]">
              <img
                src={
                  person.profile_path
                    ? `${IMAGE_BASE_URL}${person.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={person.name}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0
               bg-gradient-to-t
               from-black/80 via-black/30 to-transparent"
              />
            </div>

            <div className="p-1 text-center">
              <p className="text-sm font-semibold">{person.name}</p>
              <p className="text-xs opacity-70">{person.character}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="cast_arrow_btn absolute right-3 top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
