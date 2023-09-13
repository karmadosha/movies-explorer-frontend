import React from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import './BurgerMenu.css';
import profileIcon from '../../images/profile.svg';

function BurgerMenu({ onClose }) {  
  const location = useLocation();

  return (
    <div className="burger">
      <div className="burger__container">
        <button className="burger__close-btn" type="button" onClick={onClose} />
        <nav className="burger__links">
          <NavLink to="/" className={location.pathname === "/" ? 'burger__link burger__link_active' : 'burger__link'}>Главная</NavLink>
          <NavLink to="/movies" className={location.pathname === "/movies" ? 'burger__link burger__link_active' : 'burger__link'}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={location.pathname === "/saved-movies" ? 'burger__link burger__link_active' : 'burger__link'}>Сохраненные фильмы</NavLink>
        </nav>
        <Link to="/profile" className="burger__profile-link">
          <img src={profileIcon} alt="ссылка на профиль" />
        </Link>
      </div>
    </div>    

  )
};

export default BurgerMenu;