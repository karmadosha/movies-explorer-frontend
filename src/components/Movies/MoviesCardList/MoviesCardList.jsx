import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { DESKTOP, TABLET, MOBILE, DESKTOP_MOVIES_COUNT, DESKTOP_MOVIES_ADD, TABLET_MOVIES_COUNT, MOBILE_MOVIES_COUNT, MOBILE_MOVIES_ADD } from "../../../utils/constants";
import { useWidth } from "../../../hooks/useWidth";
import { getLikedMovie } from "../../../utils/utils";

function MoviesCardList({ movies, likedMovies, onLikeClick, onDeleteClick }) {
  const location = useLocation();  
  
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [visibleMoviesAmount, setVisibleMoviesAmount] = useState({ start: 0, add: 0 });
  const [isRender, setRender] = useState(true);

  const screenWidth = useWidth();

  useEffect(() => {
    if (movies.length) {
      const result = movies.filter((item, index) => index < visibleMoviesAmount.start);
      setVisibleMovies(result);
    }
  }, [movies, visibleMoviesAmount.start]);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setVisibleMovies(likedMovies);
    }
  }, [likedMovies, location]);

  useEffect(() => {
    if (screenWidth >= DESKTOP ) {
      setVisibleMoviesAmount({ 
        start: DESKTOP_MOVIES_COUNT, 
        add: DESKTOP_MOVIES_ADD });
    } else if (screenWidth < DESKTOP && screenWidth >= TABLET) {
      setVisibleMoviesAmount({
        start: TABLET_MOVIES_COUNT,
        add: MOBILE_MOVIES_ADD
      })
    } else if (screenWidth < TABLET_MOVIES_COUNT && screenWidth >= MOBILE) {
      setVisibleMoviesAmount({
        start: MOBILE_MOVIES_COUNT,
        add: MOBILE_MOVIES_ADD
      })
    }
    return () => setRender(false);
  }, [screenWidth, isRender]);
  
  function showMore() {
    setVisibleMovies(movies.slice(0, visibleMovies.length + visibleMoviesAmount.add))
  };

  return (
    <section className="movies-list">  
      <div className="movies-list__container">
        {visibleMovies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={location.pathname === '/saved-movies' ? movie.movieId : movie.id}
              favourites={getLikedMovie(likedMovies, movie)}
              onLikeClick={onLikeClick}
              onDeleteClick={onDeleteClick}
            />
          )
        })}
        {visibleMovies.length < movies.length && location.pathname === '/movies' ? (
          <button className='movies-list__moreBtn' 
            type="button"
            aria-label="показать больше фильмов"
            onClick={showMore}
          >Ещё</button>
        ) : ''}
      </div>             
    </section>    
  );
};

export default MoviesCardList;