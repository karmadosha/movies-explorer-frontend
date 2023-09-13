import React from "react";
import './SavedMovies.css';
import Header from "../../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../../Footer/Footer";
import {savedMovies} from "../../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

function SavedMovies() {
  const isLoggedIn = true;
  const [isLoading, setIsLoading] = React.useState(false);
  
  return(
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <SearchForm />
      {isLoading 
        ? <Preloader />
        : <MoviesCardList movies={savedMovies} />
      }
      <Footer />
    </>
  )
};

export default SavedMovies;