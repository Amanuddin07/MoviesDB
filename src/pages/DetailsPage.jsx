import { useEffect, useState } from "react";
import useTMDB from "../Hooks/useTMDB";
import { useParams } from "react-router-dom";
import LoadingDetails from "../Components/ui/LoadingDetails";
import useCredit from "../Hooks/useCredit";
import useProvider from "../Hooks/useProvider";
import SeasonCard from "../Components/common/SeasonCard";
import { FaPlay } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import useTrailer from "../Hooks/useTrailer";
import CastCardSlider from "../Components/common/CastCardSlider";
import useRecommendation from "../Hooks/useRecommendation";
import RecommendationSlider from "../Components/common/Recommendition/Recommendition";
import ImageSlider from "../Components/common/ImageSlider/ImageSlider";
import useImage from "../Hooks/useImages";
import VideoSlider from "../Components/common/VideoSlider/VideoSlider";
import useVideos from "../Hooks/useVideos";
import VideoCardLoader from "../Components/ui/VideosCardLoader";
import useWatchList from "../Hooks/useWatchList";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function DetailsPage() {
  const { id, media_type } = useParams();

  const { addToWatchList, watchList, isInWatchList, removeFromWatchList } =
    useWatchList();

  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "",
  });

  const showAlert = (message, type) => {
    setAlert({ visible: true, message, type });

    setTimeout(() => {
      setAlert({ visible: false, message: "", type: "" });
    }, 3000);
  };

  const credit = useCredit({ media_type, id });

  const provider = useProvider(id);

  const [showTrailer, setShowTrailer] = useState(false);
  const trailerKey = useTrailer(media_type, id);
  const {
    data: recommendations,
    loading: recLoading,
    error: recError,
  } = useRecommendation(media_type, id);
  const {
    data: images,
    loading: imgLoading,
    error: imgError,
  } = useImage(media_type, id);
  const {
    videos,
    loading: videosLoading,
    error: videosError,
  } = useVideos(media_type, id);


  const providers =
    provider?.results?.IN?.rent ||
    provider?.results?.IN?.flatrate ||
    provider?.results?.IN?.buy ||
    provider?.results?.US?.flatrate ||
    provider?.results?.US?.buy ||
    provider?.results?.US?.rent ||
    null;

  const endpoint =
    media_type === "movie"
      ? `/movie/${id}`
      : media_type === "tv"
      ? `/tv/${id}`
      : null;

  const { data: movies, loading } = useTMDB(endpoint);

  const year =
    movies?.release_date?.slice(0, 4) || movies?.first_air_date?.slice(0, 4);

  const releaseDate = movies?.release_date || movies?.first_air_date;
  const runtime = (movies?.runtime / 60).toFixed(2);

  // Number Converter
  const formatLargeNumber = (value) => {
    if (!value) return "N/A";

    if (value >= 1e12) return `${(value / 1e12).toFixed(2)} T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)} B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`;

    return value.toLocaleString();
  };

  const rating = movies?.vote_average ?? 0;

  const getRatingClass = (rating) => {
    if (rating === 0) return "rating-none";
    if (rating < 5) return "rating-red";
    if (rating < 7) return "rating-yellow";
    return "rating-green";
  };

  const directors =
    media_type === "tv"
      ? movies?.created_by?.map((d) => d.name) || []
      : credit?.crew?.filter((p) => p.job === "Director").map((p) => p.name) ||
        [];

  const streamingPlatforms =
    media_type === "tv"
      ? movies?.networks?.map((n) => n.name) || []
      : providers?.map((p) => p.provider_name) || [];

  useEffect(() => {
    if (movies) {
      const title = movies.title || movies.name;
      document.title = title ? `${title}` : "MovieDB Details";
    }
  }, [movies]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowTrailer(false);
      }
    };

    if (showTrailer) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showTrailer]);

  return (
    <div className="detailsPage">
      {loading ? (
        <LoadingDetails />
      ) : (
        <>
          {alert.visible && (
            <div className={`custom-alert ${alert.type}`}>{alert.message}</div>
          )}

          {/* DETAILS SECTION */}
          <div className={`trailer_overly ${showTrailer ? "active" : ""}`}>
            <div className="trailer_window">
              <div className="trailer_titlebar">
                <span>Play Trailer</span>
                <button onClick={() => setShowTrailer(false)}>
                  <MdOutlineClose />
                </button>
              </div>

              <div className="trailer_body">
                {showTrailer && (
                  <iframe
                    className="trailer_iframe"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    title="Trailer"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className="details_container container-fluid d-flex gap-5"
            style={{
              backgroundImage: `url(${IMAGE_BASE_URL}${movies?.backdrop_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* LEFT POSTER */}
            <div className="poster-left">
              <img
                className="poster_img"
                src={`${IMAGE_BASE_URL}${movies?.poster_path}`}
                alt=""
              />

              {(movies?.networks?.length > 0 || providers?.length > 0) && (
                <div className="networks text-center">
                  <h6>Now Streaming</h6>

                  <div className="d-flex gap-4 align-items-center justify-content-center">
                    {movies?.networks?.length > 0
                      ? movies.networks
                          .slice(0, 2)
                          .map((n) => (
                            <img
                              key={n.id}
                              src={`${IMAGE_BASE_URL}${n.logo_path}`}
                              alt={n.name}
                              style={{ width: "100px" }}
                            />
                          ))
                      : providers
                          ?.slice(0, 2)
                          .map((n) => (
                            <img
                              key={n.provider_id}
                              src={`${IMAGE_BASE_URL}${n.logo_path}`}
                              alt={n.provider_name}
                              style={{ width: "40px" }}
                            />
                          ))}
                  </div>
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="poster_details">
              <h2 className="title m-0">
                {movies?.title || movies?.name}
                {year && <span className="release_date"> ({year})</span>}
              </h2>

              <div className="facts">
                <div className="genres">
                  {movies?.genres?.map((genre) => (
                    <span className="genre mr-2" key={genre.id}>
                      {genre.name}
                    </span>
                  ))}
                </div>

                {releaseDate && (
                  <h6>
                    {media_type === "movie" ? "Release:" : "First Air:"}{" "}
                    {releaseDate}
                    {movies?.status ? ` | ${movies.status}` : ""}
                  </h6>
                )}

                {movies?.runtime > 0 && (
                  <p>
                    <b>Runtime:</b> {runtime}h
                  </p>
                )}

                {movies?.budget > 0 && (
                  <p className="m-0">
                    <b>Budget:</b> {formatLargeNumber(movies.budget)}
                  </p>
                )}

                {movies?.revenue > 0 && (
                  <p className="mt-0">
                    <b>Box office collection:</b>{" "}
                    {formatLargeNumber(movies.revenue)}
                  </p>
                )}

                {movies?.number_of_seasons && (
                  <p className="m-0">
                    <b>Number of Seasons:</b> {movies.number_of_seasons}
                  </p>
                )}

                {movies?.number_of_episodes && (
                  <p className="m-0">
                    <b>Total Episodes:</b> {movies.number_of_episodes}
                  </p>
                )}

                <div className="rating_container">
                  <p className="m-0">Rating:</p>
                  <span className={`vote_average ${getRatingClass(rating)}`}>
                    {rating.toFixed(1)}
                  </span>
                  <div className="action d-flex gap-2 align-items-center justify-center">
                    <div className="play_trailer">
                      <button
                        type="button"
                        className="play_btn"
                        onClick={() => setShowTrailer(true)}
                      >
                        <FaPlay />
                        Play Trailer
                      </button>
                    </div>
                    <div className="wishlist">
                      <button
                        onClick={() => {
                          if (isInWatchList(movies?.id)) {
                            removeFromWatchList(movies?.id);
                            showAlert("Removed from watchlist", "remove");
                          } else {
                            addToWatchList(movies);
                            showAlert("Added to watchlist", "add");
                          }
                        }}
                      >
                        {isInWatchList(movies?.id) ? (
                          <FaBookmark className="bookMark" />
                        ) : (
                          <FaRegBookmark className="bookMark" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="descrip">
                  <h5 className="tagline opacity-80">{movies?.tagline}</h5>
                  <h6 className="fw-bold">Overview</h6>
                  <p>{movies?.overview}</p>
                </div>

                <p>
                  <b>Produced by:</b>{" "}
                  {movies?.production_companies?.map((c) => c.name).join(", ")}
                </p>

                {directors.length > 0 && (
                  <h6>
                    <b>Directed by:</b> {directors.join(", ")}
                  </h6>
                )}

                {movies?.belongs_to_collection ? (
                  <div>
                    <h6>
                      <b>Belongs to collection:</b>{" "}
                      {movies?.belongs_to_collection?.name || "N/A"}
                    </h6>
                  </div>
                ) : null}

                {streamingPlatforms.length > 0 && (
                  <div>
                    <h6>
                      <b>Streaming Platform:</b>{" "}
                      {streamingPlatforms.slice(0, 5).join(", ")}
                    </h6>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEASONS */}
          {media_type === "tv" && movies?.seasons?.length > 0 && (
            <div className="container-fluid season_container">
              <div className="seasons_card">
                <h4 className="mb-3 text-white">Seasons</h4>
                <div className="d-flex season gap-4 flex-wrap">
                  {movies.seasons
                    .filter((season) => season.name !== "Specials")
                    .map((season) => (
                      <SeasonCard
                        key={season.id}
                        season={season}
                        tvId={movies.id}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}

          {credit?.cast?.length > 0 ? (
            <div className="container-fluid cast_container my-2">
              <h3 className="text-center">Cast</h3>
              <CastCardSlider cast={credit?.cast} />
            </div>
          ) : null}

          <div className="container-fluid recommendations_container my-2">
            {!recLoading && recommendations.length > 0 && (
              <>
                <h3 className="text-center">Images</h3>
                <ImageSlider images={images} mediaType={media_type} id={id} />
              </>
            )}
          </div>

          <div className="container-fluid recommendations_container my-2">
            <h3 className="text-center">Videos</h3>

            {/* Loader */}
            {videosLoading && (
              <div className="d-flex gap-3 px-2 overflow-hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ minWidth: "360px" }}>
                    <VideoCardLoader />
                  </div>
                ))}
              </div>
            )}

            {/* Videos */}
            {!videosLoading && !videosError && videos?.length > 0 && (
              <VideoSlider videos={videos} mediaType={media_type} id={id} />
            )}

            {/* Empty state */}
            {!videosLoading && !videosError && videos?.length === 0 && (
              <p className="text-center opacity-75">No videos available</p>
            )}

            {/* Error state */}
            {!videosLoading && videosError && (
              <p className="text-center text-danger">Failed to load videos</p>
            )}
          </div>

          <div className="container-fluid recommendations_container my-2">
            {!recLoading && recommendations.length > 0 && (
              <>
                <h3 className="text-center">Recommendation</h3>
                <RecommendationSlider
                  recommendations={recommendations}
                  mediaType={media_type}
                  id={id}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
