import { useEffect, useState } from "react"
import { tmdbFetch } from "../api/tmdb";

export default function useRecommendation(media_type, id) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!media_type || !id) return;

        const endpoint = media_type === "movie" ? `/movie/${id}/recommendations` : `/tv/${id}/recommendations`;

        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const res = await tmdbFetch(endpoint);
                setData(res.results || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendations();

    },[media_type, id]);
  return { data, loading, error };
}
