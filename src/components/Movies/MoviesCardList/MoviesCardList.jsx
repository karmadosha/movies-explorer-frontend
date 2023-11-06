import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { DESKTOP, TABLET, MOBILE, DESKTOP_MOVIES_COUNT, DESKTOP_MOVIES_ADD, TABLET_MOVIES_COUNT, MOBILE_MOVIES_COUNT, MOBILE_MOVIES_ADD } from "../../../utils/constants";
import { useWidth } from "../../../hooks/useWidth";
import { getFavouriteMovie } from "../../../utils/utils";

function MoviesCardList({ movies, favouriteMovies, onLikeClick, onDeleteClick }) {
  const location = useLocation();  
  
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [moviesToShowAmount, setMoviesToShowAmount] = useState({ start: 0, add: 0 });
  const [isRender, setRender] = useState(true);

  const screenWidth = useWidth();

  useEffect(() => {
    if (movies.length) {
      const result = movies.filter((item, index) => index < moviesToShowAmount.start);
      setMoviesToShow(result);
    }
  }, [movies, moviesToShowAmount.start]);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setMoviesToShow(favouriteMovies);
    }
  }, [favouriteMovies, location]);

  useEffect(() => {
    if (screenWidth >= DESKTOP ) {
      setMoviesToShowAmount({ 
        start: DESKTOP_MOVIES_COUNT, 
        add: DESKTOP_MOVIES_ADD });
    } else if (screenWidth < DESKTOP && screenWidth >= TABLET) {
      setMoviesToShowAmount({
        start: TABLET_MOVIES_COUNT,
        add: MOBILE_MOVIES_ADD
      })
    } else if (screenWidth < TABLET_MOVIES_COUNT && screenWidth >= MOBILE) {
      setMoviesToShowAmount({
        start: MOBILE_MOVIES_COUNT,
        add: MOBILE_MOVIES_ADD
      })
    }
    return () => setRender(false);
  }, [screenWidth, isRender]);
  
  function showMore() {
    setMoviesToShow(movies.slice(0, moviesToShow.length + moviesToShowAmount.add))
  };

  return (
    <section className="movies-list">  
      <div className="movies-list__container">
        {moviesToShow.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={location.pathname === '/saved-movies' ? movie.movieId : movie.id}
              favourites={getFavouriteMovie(favouriteMovies, movie)}
              onLikeClick={onLikeClick}
              onDeleteClick={onDeleteClick}
            />
          )
        })}
        {moviesToShow.length < movies.length && location.pathname === '/movies' ? (
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