import React, { useEffect, useState } from "react";
import './Movies.css';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "./Preloader/Preloader";
import { errorMessages } from "../../utils/constants";
import { filterMovies, filterByDuration } from "../../utils/utils";
import { getAllMovies } from "../../utils/MoviesApi";


function Movies({ onLikeClick, onDeleteClick, favouriteMovies, handleErrorMessage, isLoading, setIsLoading }) {

  const [isShortMovies, setIsShortMovies] = useState(false);  
  const [isFilteredMovies, setFilteredMovies] = useState([]);
  const [isInitialMovies, setInitialMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');  

  function handleMoviesFilter(movies, userQuery, checkbox) {
    const moviesList = filterMovies(movies, userQuery, checkbox);

    if (moviesList.length === 0) {
      setError(errorMessages.notFound);
      handleErrorMessage(errorMessages.notFound);      
    } else {
      setError('');
    }
    setInitialMovies(moviesList);
    setFilteredMovies(checkbox ? filterByDuration(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('shortMoviesFiltered', JSON.stringify(filterByDuration(moviesList)));
  };

  function handleSearchSubmit(value) {
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);
    localStorage.setItem('isShortMovies', isShortMovies);
    
    if (localStorage.getItem('allMovies')) {
      const allMoviesList = JSON.parse(localStorage.getItem('allMovies'));
      handleMoviesFilter(allMoviesList, value, isShortMovies);
    } else 
      if (!allMovies.length) {
        setIsLoading(true);
        getAllMovies()
          .then((res) => {
            setAllMovies(res);
            localStorage.setItem('allMovies', JSON.stringify(res));
            handleMoviesFilter(res, value, isShortMovies);
          })
          .catch((err) => {
            console.log(err);
            handleErrorMessage(errorMessages.searchError);
          })
          .finally(() => setIsLoading(false));
      }
  }

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (localStorage.getItem('isShortMovies') === true) {
        setFilteredMovies(filterByDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (isFilteredMovies.length === 0 && isShortMovies) {
      setError(errorMessages.notFound);
      handleErrorMessage(errorMessages.notFound);
    } else {
      setError('');      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilteredMovies.length, isShortMovies]);

  useEffect(() => {
    if (localStorage.getItem('isShortMovies') === true) {
      setIsShortMovies(true);
      if (localStorage.getItem('shortMoviesFiltered')) {
        const shortMovies = JSON.parse(localStorage.getItem('shortMoviesFiltered'));
        setFilteredMovies(shortMovies);
      }
    } else {
      setIsShortMovies(false);
    }
  }, []); 

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      setFilteredMovies(filterByDuration(isInitialMovies));
    } else {
      setFilteredMovies(isInitialMovies);
    }
    localStorage.setItem('isShortMovies', isShortMovies);
  };

  return (
    <>
      <Header isLoggedIn={true} /> 
      <main className="movies">
        <SearchForm        
          onSearch={handleSearchSubmit}
          onCheckBox={handleShortMovies}
          isShortMovies={isShortMovies}
          searchQuery={searchQuery}
          isLoading={isLoading}
        />  
        {isLoading && !error && <Preloader />}          
        <MoviesCardList 
          movies={isFilteredMovies}
          favouriteMovies={favouriteMovies}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />        
      </main>
      <Footer />
    </>        
  )
};

export default Movies;