import { useEffect, useState } from "react";
import { tmdbFetch } from "../api/tmdb";

export default function useVideos(mediaType, id) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mediaType || !id) return;

    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint =
          mediaType === "movie"
            ? `/movie/${id}/videos`
            : `/tv/${id}/videos`;

        const res = await tmdbFetch(endpoint);

        const sortedVideos =
          res?.results
            ?.filter(
              (v) =>
                v.site === "YouTube" &&
                (v.type === "Trailer" || v.type === "Teaser")
            )
            ?.sort((a, b) => {
              if (a.type === "Trailer" && b.type !== "Trailer") return -1;
              if (a.type !== "Trailer" && b.type === "Trailer") return 1;
              return 0;
            }) || [];

        setVideos(sortedVideos);
      } catch {
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [mediaType, id]);

  return { videos, loading, error };
}
