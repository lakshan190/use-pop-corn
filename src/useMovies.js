import { useEffect, useRef, useState } from "react";

const KEY = "876fa193";

export function useMovies(query) {
  //CUSTOM HOOKS ARE FUNCTIONS NOT COMPONENTS DONT ACCEPT ARGUMENTS WITH {}
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      //this is a browser API

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          //always reset the error to empty string on startup or the error state will be kept
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
          //the search property is capital coming from the API
        } catch (err) {
          console.error(err);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        //rather than putting !query.length its better to put if the length is less than 3 then no point in searching at all.
        setMovies([]);
        setError("");
        return;
      }

      //   handleCloseMovie();
      //   callback1?.();
      //this is added here to close the movieDetails box when the user searches for a new movie

      fetchMovies();
      //we are just calling the function dont use return keyword this function isnt returning anything only thing a useEffect can return is a cleanup function

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
