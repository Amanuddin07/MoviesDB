import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_APP_TMDB_API_BASE_URL;
const API_KEY = '408e78555366b5e3fbccead8680b9b4f';

export default function useCredit({ media_type = "movie", id }) {
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    async function fetchCredit() {
      try {
        const res = await fetch(
          `${BASE_URL}/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setCredit(data);
        // console.log(data.cast)
      } catch (err) {
        console.log("Error in credite Fetch", err);
      }
    }

    if(id) fetchCredit();
  }, [media_type, id]);

  return credit;
}
