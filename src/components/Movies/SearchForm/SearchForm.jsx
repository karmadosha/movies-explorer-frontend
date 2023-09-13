import React from "react";
import './SearchForm.css';

function SearchForm() {
  function handleClickFindBtn(evt) {
    evt.preventDefault();
  };
  return(
    <section className="searchform">
      <form className="searchform__container">        
        <input className="searchform__input" placeholder="Фильм" type="text" name="film" required />
        <button type="submit" onClick={handleClickFindBtn} className="searchform__find-btn" aria-label="Найти фильм"/>
      </form>       
      <div className="searchform__filter-group">
        <label for="checkbox" className="searchform__filter">
        <input type="checkbox" id="check" className="searchform__checkbox"/>
        <span className="searchform__checkbox-label" />
        </label>
        <p className="searchform__check-title">Короткометражки</p>
      </div>
                
    </section>
  ); 
};

export default SearchForm;