import React, { useState, useEffect } from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { filterByDuration, filterMovies } from "../../../utils/utils";
import { errorMessages } from "../../../utils/constants";

function SavedMovies({ favouriteMovies, onDeleteClick, handleErrorMessage, isLoading }) {

  const [isShowMoviesFavourite, setIsShowMoviesFavourite] = useState(favouriteMovies);
  const [isFilteredMovies, setFilteredMovies] = useState(isShowMoviesFavourite);
  const [isShortMovies, setIsShortMovies] = useState(false); 
  const [isNotFound, setNotFound] = useState(false);

  function handleSearchSubmit(value) {
    const filteredMoviesList = filterMovies(favouriteMovies, value, isShortMovies);
    if (filteredMoviesList.length === 0) {
      handleErrorMessage(errorMessages.notFound);
    } else {
      setFilteredMovies(filteredMoviesList);
      setIsShowMoviesFavourite(filteredMoviesList);
      setNotFound(false);
    }
  };

  function handleShortMovies() {
    if (!isShortMovies) {
      setIsShortMovies(true);
      localStorage.setItem('isShortFavouriteMovie', true);
      setIsShowMoviesFavourite(filterByDuration(isFilteredMovies));

      if (filterByDuration(isFilteredMovies).length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      setIsShortMovies(false);
      localStorage.setItem('isShortFavouriteMovie', false);
      setIsShowMoviesFavourite(isFilteredMovies);

      if (isFilteredMovies.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }
  };

  useEffect(() => {
    setFilteredMovies(favouriteMovies);
    if (favouriteMovies.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [favouriteMovies]);

  return(
    <>
      <Header isLoggedIn={true} />
      <main className="saved-movies">   
        <SearchForm
          onSearch={handleSearchSubmit}
          onCheckBox={handleShortMovies}
          isShortMovies={isShortMovies}
          favouriteMovies={favouriteMovies}
          setIsShowMoviesFavourites={setIsShowMoviesFavourite}
        />
        {isLoading ? <Preloader /> : !isNotFound && 
          <MoviesCardList
            movies={isShowMoviesFavourite}
            favouriteMovies={favouriteMovies}        
            onDeleteClick={onDeleteClick}          
          />
        }
        </main>
      <Footer />
    </>    
  )
};

export default SavedMovies;