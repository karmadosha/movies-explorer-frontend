import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onMovieDelete, onSaveClick }) { 
  
  return(
    <section className="movies-list">
      <ul className="movies-list__container">
        {movies.map((movie, index) => (
          <MoviesCard 
            movie={movie}
            key={index}
            onMovieDelete={onMovieDelete}
            onMovieSave={onSaveClick}
          />
      ))}
      </ul>   
      {movies.length > 14 &&
        <button type="button" className="movies-list__moreBtn">Ещё</button>
      }      
    </section>
    
  )
};

export default MoviesCardList;