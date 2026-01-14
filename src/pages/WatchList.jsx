import { useParams } from "react-router-dom";
import MovieCard from "../Components/common/MovieCard";
import useWatchList from "../Hooks/useWatchList";

export default function WatchList() {
  const { watchList } = useWatchList();
  const movies = Object.values(watchList);

  const { media_type } = useParams();

  return (
    <div className="homePage d-flex flex-column align-items-center">
      <h1 className="my-2">Watchlist</h1>

      <div className="container moviesList">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <h2 className="animate-pulse text-center loading-txt">Your Watchlist is empty........</h2>
        )}
      </div>
    </div>
  );
}
