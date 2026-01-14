import { useEffect, useRef, useState } from "react";
import useTMDB from "../Hooks/useTMDB";
import { ENDPOINTS } from "../api/endpoints";
import Loading from "../Components/ui/Loading";
import MovieCard from "../Components/common/MovieCard";

export default function TvPage() {
  const PAGE_TITLE = "Tv Shows";

  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);

  const { data: movies, loading } = useTMDB(
    `${ENDPOINTS.TV.path}?page=${page}`
  );

  const loadRef = useRef(null);
  const isFetching = useRef(false);

  /* Set page title */
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  /* Append movies safely */
  useEffect(() => {
    if (!movies?.length) return;

    setAllMovies(prev => {
      const map = new Map(prev.map(m => [m.id, m]));
      movies.forEach(m => map.set(m.id, m));
      return Array.from(map.values());
    });

    isFetching.current = false;
  }, [movies]);

  /* Infinite scroll */
  useEffect(() => {
    if (!loadRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && !isFetching.current) {
          isFetching.current = true;
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loadRef.current);
    return () => observer.disconnect();
  }, [loading]);

  /* First page loader only */
  if (loading && page === 1) return <Loading />;

  return (
    <div className="homePage d-flex flex-column align-items-center">
      <h1 className="my-2">{PAGE_TITLE}</h1>

      <div className="container moviesList">
        {allMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            media_type="tv"
          />
        ))}
      </div>

      <div ref={loadRef} style={{ height: "1px" }} />

      {loading && <p>Loading more...</p>}
    </div>
  );
}
