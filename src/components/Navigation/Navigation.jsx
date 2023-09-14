import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import profileIcon from '../../images/profile-icon.svg';
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Navigation({ isLoggedIn }) {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };  

  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <div className="navigation__movies">
          <ul className="navigation__movies-links">
            <li>
              <Link to="/movies" className={location.pathname === '/movies' ? 'navigation__movies-link navigation__movies-link_active' : 'navigation__movies-link'}>Фильмы</Link>
            </li>
            <li>
              <Link to="/saved-movies" className={location.pathname === '/saved-movies' ? 'navigation__movies-link navigation__movies-link_active' : 'navigation__movies-link'}>Сохраненные фильмы</Link> 
            </li>
          </ul>          
          <div className="navigation__profile">
            <Link to="/profile" className= "navigation__profile-link">Аккаунт
              <img className="navigation__profile-icon"
                src={profileIcon}
                alt="ссылка на профиль" />
            </Link>
          </div>
        </div>
      ) : (
        <ul className="navigation__menu-promo">
          <li>
            <Link to="/signup" className="navigation__promo-link">Регистрация</Link>
          </li>
          <li>
            <Link to="/signin" className="navigation__promo-link navigation__promo-link_green">Войти</Link>
          </li>
        </ul>
      )}
      {isLoggedIn &&
      (!isBurgerMenuOpen ? (
    <div>
      <button
       type="button" 
       aria-label="кнопка меню" className="navigation__burger-btn" 
       onClick={toggleBurgerMenu}/>
    </div>
    ) : (
      <BurgerMenu onClose={toggleBurgerMenu} />
    ))}
    </nav> 
  )
}

export default Navigation;