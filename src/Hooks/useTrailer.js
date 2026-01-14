import { useEffect, useState } from "react";
import { tmdbFetch } from "../api/tmdb";

export default function useTrailer(media_type, id) {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!media_type || !id) return;

    const endpoint =
      media_type === "movie"
        ? `/movie/${id}/videos`
        : `/tv/${id}/videos`;

    (async () => {
      try {
        const res = await tmdbFetch(endpoint);
        const videos = res.results || [];

        // 1. Prefer Trailer
        let video = videos.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );

        // 2. Fallback to Teaser if Trailer not found
        if (!video) {
          video = videos.find(
            (v) => v.site === "YouTube" && v.type === "Teaser"
          );
        }

        setTrailerKey(video?.key || null);
      } catch {
        setTrailerKey(null);
      }
    })();
  }, [media_type, id]);

  return trailerKey;
}
