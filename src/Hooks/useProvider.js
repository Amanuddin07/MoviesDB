import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_TMDB_API_BASE_URL;
const API_KEY = "408e78555366b5e3fbccead8680b9b4f";


export default function useProvider(id) {
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProvider() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`
        );
        const data = await res.json();
        setProvider(data);
      } catch (err) {
        console.log("Error in credite Fetch", err);
        navigate("/connection-error")
      }
    }

    if(id) fetchProvider();
  }, [id]);

  return provider;
}