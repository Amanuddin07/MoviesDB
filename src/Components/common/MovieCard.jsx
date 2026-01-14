import { Link } from "react-router-dom";
import { useState } from "react";
import useSlug from "../../Hooks/useSlug";

export default function MovieCard({ movie }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const title = movie?.title || movie?.name || "Untitled";
  const release_date =
    movie?.release_date || movie?.first_air_date || "Untitled";
  const slug = useSlug(title);

  const mediaType =
  movie?.media_type ||
  (movie?.first_air_date || movie?.number_of_seasons ? "tv" : "movie");


  return (
    <Link
      to={`/${mediaType}/details/${movie.id}/${slug}`}
      className="movieCard"
    >
      <img
        className={`movieCard_img ${imgLoaded ? "loaded" : ""}`}
        draggable="false"
        loading="lazy"
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "/no-image.png"
        }
        alt={title}
        onLoad={() => setImgLoaded(true)}
      />

      {imgLoaded && (
        <div className="movieCard_details">
          <h5>{title}</h5>
          <p>
            <b>Release:</b> {release_date}
          </p>
        </div>
      )}
    </Link>
  );
}
