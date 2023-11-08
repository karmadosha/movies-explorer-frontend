import { SHORT_MOVIE } from "./constants";

export const formatMovieDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.round(((duration / 60) - hours) * 60);
  if (hours === 0) {return `${minutes}мин.`}
  else return( `${hours}ч. ${minutes}мин.`);
};

export const filterByDuration = (movies) => {
  return movies.filter((movie) => movie.duration < SHORT_MOVIE);
};

export const getLikedMovie = (list, movie) => {
  return list.find((m) => {
    return m.movieId === (movie.id || movie.movieId);
  })
};

export const filterMovies = (movies, keyword, shortMovies) => {
  const moviesBySearch = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = keyword.toLowerCase().trim();
    return (
      movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1
    );
  });
  
  if (shortMovies === true) {
    return filterByDuration(moviesBySearch);
  } else {
    return moviesBySearch;
  }  
};