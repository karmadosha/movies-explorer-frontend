import React from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import {savedMovies} from "../../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

function SavedMovies() {
  
  const [isLoading, setIsLoading] = React.useState(false);
  
  return(
    <main>      
      <SearchForm />
      {isLoading 
        ? <Preloader />
        : <MoviesCardList movies={savedMovies} />
      }      
    </main>
  )
};

export default SavedMovies;