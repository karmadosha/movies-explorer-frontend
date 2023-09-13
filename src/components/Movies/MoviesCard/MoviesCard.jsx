import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard({ movie, onDeleteClick }) {
  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);
  function handleSaveClick() {
    setIsSaved(true);
  };
  const movieSaveBtnClassName = (`movie__save-icon ${isSaved === true ? 'movie__save-icon_active' : ''}`);
  
  function handleDeleteClick() {
    onDeleteClick();
  };

  function formatMovieDuration(number) {
    const hours = Math.floor(number / 60);
    const minutes = Math.round(((number / 60) - hours) * 60);
    if (hours === 0) {return `${minutes}мин.`}
    else return( `${hours}ч. ${minutes}мин.`);
  };

  return(
    <li className="movie">
      <img
       className="movie__pic"
       src={movie.image}
       alt={movie.name}
       /*onClick={handleMovieClick}*/ />
      
      <div className="movie__info">
        <div className="movie__info-group">
          <h2 className="movie__title">{movie.name}</h2>
          <p className="movie__duration">{formatMovieDuration(movie.duration)}</p>
        </div>
        {location.pathname === '/movies' ? 
          <button
            type="button" 
            className={movieSaveBtnClassName}
            aria-label="сохранить фильм"
            onClick={handleSaveClick} /> : 
          <button
            type="button"
            className="movie__delete-btn"
            aria-label="удалить фильм из сохраненных"
            onClick={handleDeleteClick} />      
        } 
      </div>
    </li>
  )
};

export default MoviesCard;