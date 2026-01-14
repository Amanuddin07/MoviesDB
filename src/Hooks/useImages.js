import React, { useEffect, useState } from 'react'
import { tmdbFetch } from '../api/tmdb';

export default function useImage(media_type, id) {
    const [data, setData] = useState([]);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!media_type || !id) return;

        const endpoint = media_type === 'movie' ? `/movie/${id}/images` : `/tv/${id}/images`;
        const fetchImages = async () => {
            setLoading(true);
            try {
                const res = await tmdbFetch(endpoint);
                setData(res.backdrops || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, [media_type, id]);

  return { data, loading, error };
}
