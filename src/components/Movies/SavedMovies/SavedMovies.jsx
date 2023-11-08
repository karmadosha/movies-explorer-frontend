import React, { useState, useEffect } from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { filterByDuration, filterMovies } from "../../../utils/utils";
import { errorMessages } from "../../../utils/constants";

function SavedMovies({ likedMovies, onDeleteClick, handleErrorMessage, isLoading }) {

  const [showLikedMovies, setShowLikedMovies] = useState(likedMovies);
  const [isFilteredMovies, setFilteredMovies] = useState(showLikedMovies);
  const [shortMovies, setShortMovies] = useState(false); 
  const [isNotFound, setNotFound] = useState(false);

  function handleSearchSubmit(value) {
    const filteredMoviesList = filterMovies(likedMovies, value, shortMovies);
    if (filteredMoviesList.length === 0) {
      handleErrorMessage(errorMessages.notFound);
    } else {
      setFilteredMovies(filteredMoviesList);
      setShowLikedMovies(filteredMoviesList);
      setNotFound(false);
    }
  };

  function handleShortMovies() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem('shortSavedMovies', true);
      setShowLikedMovies(filterByDuration(isFilteredMovies));

      if (filterByDuration(isFilteredMovies).length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      setShortMovies(false);
      localStorage.setItem('shortSavedMovies', false);
      setShowLikedMovies(isFilteredMovies);

      if (isFilteredMovies.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }
  };

  useEffect(() => {
    setFilteredMovies(likedMovies);
    if (likedMovies.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [likedMovies]);

  return(
    <>
      <Header isLoggedIn={true} />
      <main className="saved-movies">   
        <SearchForm
          onSearch={handleSearchSubmit}
          onCheckBox={handleShortMovies}
          shortMovies={shortMovies}
          likedMovies={likedMovies}
          setShowLikedMovies={setShowLikedMovies}
        />
        {isLoading ? <Preloader /> : !isNotFound && 
          <MoviesCardList
            movies={showLikedMovies}
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