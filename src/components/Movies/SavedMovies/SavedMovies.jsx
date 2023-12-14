import React, { useState, useEffect } from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { filterByDuration, filterMovies } from "../../../utils/utils";
import { errorMessages } from "../../../utils/constants";

function SavedMovies({ likedMovies, onDeleteClick, isShort }) {

  const [filteredMovies, setFilteredMovies] = useState(likedMovies);
  const [shortMovies, setShortMovies] = useState(false); 
  const [error, setError] = useState(false);

  function handleSearchSubmit(value) {
    const filteredMoviesList = filterMovies(likedMovies, value, shortMovies);
    if (filteredMoviesList.length === 0) {
      setError(true);
    } else {
      setFilteredMovies(filteredMoviesList);      
      setError(false);
    }
  };

  function handleShortMovies() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem('shortSavedMovies', true);
      setFilteredMovies(filterByDuration(filteredMovies));

      if (filterByDuration(filteredMovies).length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    } else {
      setShortMovies(false);
      localStorage.setItem('shortSavedMovies', false);
      setFilteredMovies(filteredMovies);

      if (filteredMovies.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  useEffect(() => {
    setFilteredMovies(likedMovies);
    if (likedMovies.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [likedMovies]);  

  return(
    <>
      <Header isLoggedIn={true} />
      <main className="saved-movies">   
        <SearchForm
          onSearch={handleSearchSubmit}
          onCheckBox={handleShortMovies}
          shortMovies={isShort}
          likedMovies={likedMovies}
        />              
        {error
          ? <span className="saved-movies__error">{errorMessages.notFound}</span>
          : <MoviesCardList
              movies={filteredMovies}
              likedMovies={likedMovies}        
              onDeleteClick={onDeleteClick}          
            />
        }
        </main>
      <Footer />
    </>    
  )
  
};

export default SavedMovies;