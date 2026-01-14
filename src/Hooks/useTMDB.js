import { useEffect, useState } from "react";
import { tmdbFetch } from "../api/tmdb";
import { useNavigate } from "react-router-dom";


export default function useTMDB(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!endpoint) return
        (async () => {
            setLoading(true); setError(null);
            try {
                const response = await tmdbFetch(endpoint);
                setData(response);
                setError(null);
            } catch (err) {
                setError(err.message || "error fetching TMDB");
                navigate("/connection-error")
            } finally {
                setLoading(false);
            }
        })();
    }, [endpoint])

    return {
        data: data?.results || data,
        loading,
        error,
        totalPages: data?.total_pages,
        totalResults: data?.total_results,
    };
}
