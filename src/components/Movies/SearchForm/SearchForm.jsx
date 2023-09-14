import React from "react";
import './SearchForm.css';

function SearchForm() {
  function handleClickFindBtn(evt) {
    evt.preventDefault();
  };
  return(
    <section className="searchform">
      <form className="searchform__container">
        <div className="searchform__search-group">
          <input className="searchform__input" placeholder="Фильм" type="text" name="film" required />
          <button type="submit" onClick={handleClickFindBtn} className="searchform__find-btn" aria-label="Найти фильм"/>
        </div> 
        <div className="searchform__filter-group">
          <label for="checkbox" className="searchform__filter">
          <input type="checkbox" id="checkbox" className="searchform__checkbox"/>
          <span className="searchform__checkbox-label" />
          </label>
          <p className="searchform__check-title">Короткометражки</p>
        </div>
      </form> 
    </section>
  ); 
};

export default SearchForm;