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


function Movies({ onLikeClick, onDeleteClick, likedMovies, handleErrorMessage, isLoading, setIsLoading }) {

  const [isShort, setIsShort] = useState(false);  
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [startingMovies, setStartingMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');  

  function handleMoviesFilter(movies, keyword, checkbox) {
    const moviesList = filterMovies(movies, keyword, checkbox);

    if (moviesList.length === 0) {
      setError(errorMessages.notFound);
      handleErrorMessage(errorMessages.notFound);      
    } else {
      setError('');
    }
    setStartingMovies(moviesList);
    setFilteredMovies(checkbox ? filterByDuration(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('shortMoviesFiltered', JSON.stringify(filterByDuration(moviesList)));
  };

  function handleSearchSubmit(value) {
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);
    localStorage.setItem('shortMovies', isShort);
    
    if (localStorage.getItem('allMovies')) {
      const allMoviesList = JSON.parse(localStorage.getItem('allMovies'));
      handleMoviesFilter(allMoviesList, value, isShort);
    } else 
      if (!allMovies.length) {
        setIsLoading(true);
        getAllMovies()
          .then((res) => {
            setAllMovies(res);
            localStorage.setItem('allMovies', JSON.stringify(res));
            handleMoviesFilter(res, value, isShort);
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
      setStartingMovies(movies);
      if (localStorage.getItem('isShortMovies') === true) {
        setFilteredMovies(filterByDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (filteredMovies.length === 0 && isShort) {
      setError(errorMessages.notFound);
      handleErrorMessage(errorMessages.notFound);
    } else {
      setError('');      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies.length, isShort]);

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === true) {
      setIsShort(true);
      if (localStorage.getItem('shortMoviesFiltered')) {
        const shortMovies = JSON.parse(localStorage.getItem('shortMoviesFiltered'));
        setFilteredMovies(shortMovies);
      }
    } else {
      setIsShort(false);
    }
  }, []); 

  function handleShortMovies() {
    setIsShort(!isShort);
    if (!isShort) {
      setFilteredMovies(filterByDuration(startingMovies));
    } else {
      setFilteredMovies(startingMovies);
    }
    localStorage.setItem('shortMovies', isShort);
  };

  return (
    <>
      <Header isLoggedIn={true} /> 
      <main className="movies">
        <SearchForm        
          onSearch={handleSearchSubmit}
          onCheckBox={handleShortMovies}
          isShortMovies={isShort}
          searchQuery={searchQuery}
          isLoading={isLoading}
        />  
        {isLoading && !error && <Preloader />}          
        <MoviesCardList 
          movies={filteredMovies}
          likedMovies={likedMovies}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />        
      </main>
      <Footer />
    </>        
  )
};

export default Movies;