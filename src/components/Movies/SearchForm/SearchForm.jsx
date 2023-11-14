import React, { useEffect, useState } from "react";
import './SearchForm.css';
import { useLocation } from "react-router-dom";
import { errorMessages } from "../../../utils/constants";

function SearchForm({ onSearch, onCheckBox, isShort, likedMovies, setShowLikedMovies }) {
  const location = useLocation();    
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(false);

  function submitSearch(evt) {
    evt.preventDefault();
    if (searchInput.trim().length === 0) {
      setError(true);
      return;
    }
    setError(false);
    onSearch(searchInput);
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      const searchQuery = localStorage.getItem('searchQuery');      
      if (searchQuery) {
        setSearchInput(searchQuery);
      }     
    }
  }, [location.pathname]); 
  
  /*useEffect(() => {
    if (location.pathname === '/saved-movies' && !searchInput) {
      setShowLikedMovies(likedMovies);
    }
  }, [likedMovies, location.pathname, searchInput, setShowLikedMovies]);*/

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
            value={searchInput}
            onChange={(evt) => setSearchInput(evt.target.value)}            
           />
          <button
            type="submit"
            className="searchform__find-btn"
            aria-label="Найти фильм"
           />
        </div>         
        {error ? <span className='searchform__error_active'>{errorMessages.keyWord}</span> : ''}   
        <div className="searchform__filter-group">
          <label
            htmlFor="checkbox" 
            className="searchform__filter">
          <input
            type="checkbox" 
            id="checkbox" 
            className="searchform__checkbox"
            onChange={onCheckBox}           
            checked={isShort}
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