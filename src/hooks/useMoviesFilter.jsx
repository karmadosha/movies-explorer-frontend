import { useState, useEffect} from "react";
import { SHORT_MOVIE } from "../utils/constants";
import { formatMovieDuration } from "../utils/utils";

function useMoviesFilter(movies, query, checked = false) {
  const [filteredMovies, setFilteredMovies] = useState();

  useEffect(() => {
    const newMovies = [...movies].filter((movie) => {
      const nameFilter = 
      movie.nameEN.toLowerCase().includes(query.toLowerCase().trim()) ||
      movie.nameRU.toLowerCase().includes(query.toLowerCase().trim());

      if (checked) {
        return nameFilter && formatMovieDuration(movie.duration) <= SHORT_MOVIE;
      }

      return nameFilter;
    });

    setFilteredMovies(newMovies);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  return { filteredMovies};

};

export default useMoviesFilter;