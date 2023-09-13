import React from "react";
import './Movies.css';
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import {movies} from "../../utils/constants";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

function Movies() {
  const isLoggedIn = true; //временно для отображения залогиненной навигации
  const [isLoading, setIsLoading] = React.useState(false);
  return(
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <SearchForm />
      {isLoading 
        ? <Preloader /> 
        : <MoviesCardList movies={movies} />
      }
      <Footer />
    </>
    
  )

};

export default Movies;