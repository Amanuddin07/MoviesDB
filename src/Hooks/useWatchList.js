import { useEffect, useState } from "react";

const KEY = "watchList";

export default function useWatchList(movie, id) {
  const [watchList, setWatchList] = useState(() => {
    const storedList = localStorage.getItem(KEY);
    return storedList ? JSON.parse(storedList) : {};
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(watchList));
  }, [watchList]);

  const addToWatchList = (movie) => {
    if (!movie?.id) return;

    setWatchList((prev) => ({
      ...prev,
      [movie.id]: movie,
    }));
  };

  const removeFromWatchList = (id) => {
    setWatchList((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const isInWatchList = (id) => {
    return Boolean(watchList[id]);
  };

  return {
    watchList,
    addToWatchList,
    removeFromWatchList,
    isInWatchList,
  };
}
