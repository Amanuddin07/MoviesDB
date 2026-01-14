import React from "react";
import { useParams } from "react-router-dom";
import useTMDB from "../Hooks/useTMDB";
import { ENDPOINTS } from "../api/endpoints";
import MovieCard from "../Components/common/MovieCard";
import Loading from "../Components/ui/Loading";

export default function SearchPage() {
  const { q } = useParams();

  const { data: results, loading } = useTMDB(
    `${ENDPOINTS.SEARCH.path}?query=${q}`
  );

  if (loading) return <Loading />;

  const validResults = results?.filter(
    (movie) => (movie?.title || movie?.name) && movie?.poster_path
  );

  return (
    <div className="homePage d-flex flex-column align-items-center">
      <h3 className="my-2">Search results for "{q}"</h3>

      <div className="container moviesList">
        {validResults?.map((movie) => {
          console.log(movie);
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}
