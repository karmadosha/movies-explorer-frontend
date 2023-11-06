import React, { useEffect } from "react";
import './SearchForm.css';
import { useLocation } from "react-router-dom";
import useFormValidation from "../../../hooks/useFormValidation";

function SearchForm({ onSearch, onCheckBox, isShortMovies, setIsShowMoviesFavourites, favouriteMovies }) {
  const location = useLocation();
  const { values, handleChange, setValues, setIsValid, errors} = useFormValidation();  

  function submitSearch(evt) {
    evt.preventDefault();
    if (!values.query) {      
      return;
    }
      onSearch(values.query);
  };  

  useEffect(() => {
  if (location.pathname === '/movies') {
    const searchQuery = localStorage.getItem('searchQuery');
    if (searchQuery) {
      setValues({ query: searchQuery });
      setIsValid(true);
    }
  }
  }, [location, setIsValid, setValues]);

  useEffect(() => {
    if (location.pathname === '/saved-movies' && !values.query) {
      setIsShowMoviesFavourites(favouriteMovies);
    }
  }, [favouriteMovies, location, values.query, setIsShowMoviesFavourites]);

  return(
    <section className="searchform">
      <form className="searchform__container" onSubmit={submitSearch} >
        <div className="searchform__search-group">
          <input
           className="searchform__input"
           placeholder="Фильм" 
           type="text"           
           name="query"
           id="query"
           values={values.query || ''}
           onChange={handleChange}
           required
           />
          <button
           type="submit"
           className="searchform__find-btn"
           aria-label="Найти фильм"           
           />
        </div>         
        <span className='searchform__error_active'> 
          {errors.query || '' }
        </span>        
        <div className="searchform__filter-group">
          <label
           htmlFor="checkbox" 
           className="searchform__filter">
          <input
           type="checkbox" 
           id="checkbox" 
           className="searchform__checkbox"
           onChange={onCheckBox}
           checked={isShortMovies ? true : false}
          />
          <span className="searchform__checkbox-label" />
          </label>
          <p className="searchform__check-title">Короткометражки</p>
        </div>
      </form>
    </section>
  ); 
};

export default SearchForm;