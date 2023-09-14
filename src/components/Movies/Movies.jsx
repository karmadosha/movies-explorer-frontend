import React from "react";
import './Movies.css';
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import {movies} from "../../utils/constants";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

function Movies() {  
  const [isLoading, setIsLoading] = React.useState(false);
  return(
    <main>      
      <SearchForm />
      {isLoading 
        ? <Preloader /> 
        : <MoviesCardList movies={movies} />
      }      
    </main>
    
  )

};

export default Movies;