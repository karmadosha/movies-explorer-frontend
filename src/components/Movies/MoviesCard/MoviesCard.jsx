import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import { MOVIES_URL_IMG } from "../../../utils/constants";
import { formatMovieDuration } from "../../../utils/utils";

function MoviesCard({ movie, favourites, onLikeClick, onDeleteClick }) {  
  const location = useLocation();
  const imageUrl = `${MOVIES_URL_IMG}${movie.image.url}`;  
  const movieSaveBtnClassName = (`movie__save-icon ${favourites ? 'movie__save-icon_active' : ''}`);

  function handleLike() {
    onLikeClick(movie);
  };

  function handleDelete() {
    onDeleteClick(movie);
  };

  function handleChangeMovieStatus() {   
    if (favourites) {  
    handleDelete();
    } else {
      handleLike();
    }   
  };  

  return(
    <li className="movie" key={movie.id}>
      <a href={movie.trailerLink}
        target="_blank"
        rel="noreferrer">
          <img
           className="movie__pic"
           src={location.pathname === '/movies' ? imageUrl : movie.image}
           alt={`Постер фильма ${movie.nameRU}`}
          />
      </a>
      <div className="movie__info">
        <div className="movie__info-group">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__duration">{formatMovieDuration(movie.duration)}</p>
        </div>
        {location.pathname === '/movies' 
          ? <button
            type="button" 
            className={movieSaveBtnClassName}
            aria-label="сохранить фильм"
            onClick={handleChangeMovieStatus} />
          : <button
            type="button"
            className="movie__delete-btn"
            aria-label="удалить фильм из сохраненных"
            onClick={handleDelete}
           />      
        } 
      </div>
    </li>
  )
};

export default MoviesCard;