import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

export default function SeasonCard({ season, tvId }) {
  if (!season) return null;

  return (
    <div
      className="SeasonCard"
    >
      <img
        className="SeasonCard_img border"
        draggable="false"
        loading="lazy"
        src={
          season.poster_path
            ? `${IMAGE_BASE_URL}${season.poster_path}`
            : "/no-image.png"
        }
        alt={season.name}
      />

      <div className="movieCard_details">
        <h5>{season.name}</h5>

        {season.air_date && (
          <p>
            <b>Air Date:</b> {season.air_date}
          </p>
        )}

        <p>
          <b>Episodes:</b> {season.episode_count}
        </p>
      </div>
    </div>
  );
}
