const BASE_URL = import.meta.env.VITE_APP_TMDB_API_BASE_URL;

const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_API_KEY}`,
    }
}


export async function tmdbFetch(ENDPOINTS) {
    const response = await fetch(`${BASE_URL}${ENDPOINTS}`, OPTIONS);
    if (!response.ok) {
        throw new Error(`TMDB Error: ${response.statusText}`);
    }
    return response.json();
}