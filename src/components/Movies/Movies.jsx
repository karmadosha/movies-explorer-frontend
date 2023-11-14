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

function Movies({ onLikeClick, onDeleteClick, likedMovies, isLoading, setIsLoading }) {

  const [isShort, setIsShort] = useState(false);  
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [startingMovies, setStartingMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [error, setError] = useState(false); 

  function handleMoviesFilter(movies, userQuery, checkbox) {
    const moviesList = filterMovies(movies, userQuery, checkbox);

    if (moviesList.length === 0) {
      setError(true);           
    } else {
      setError(false);
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
            
          })
          .finally(() => setIsLoading(false));
      }
  }

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setStartingMovies(movies);
      if (localStorage.getItem('shortMovies') === true) {
        setFilteredMovies(filterByDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (filteredMovies.length === 0 && isShort) {
      setError(true);      
    } else {
      setError(false);      
    }  
  }, [filteredMovies.length, isShort]);

  useEffect(() => {
    const checkbox = JSON.parse(localStorage.getItem('shortMovies'));
    if (checkbox) {
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
    localStorage.setItem('shortMovies', !isShort);
  };

  return (
    <>
      <Header isLoggedIn={true} /> 
      <main className="movies">
        <SearchForm        
          onSearch={handleSearchSubmit}
          onCheckBox={handleShortMovies}          
          isShort={isShort}
          searchQuery={searchQuery}       
          isLoading={isLoading}
        />  
        {isLoading && !error && <Preloader />}
        {error
          ? <span className="movies__error">{errorMessages.notFound}</span>
          : <MoviesCardList 
              movies={filteredMovies}
              likedMovies={likedMovies}
              onLikeClick={onLikeClick}
              onDeleteClick={onDeleteClick}
            />
        }     
      </main>
      <Footer />
    </>        
  )
};

export default Movies;