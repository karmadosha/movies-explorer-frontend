import React from "react";
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/logo-header.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
  const location = useLocation();
  const headerClassName = (`header ${location.pathname === "/" ? "header__landing" : "header__movies"}`);

  return (
    <header className={headerClassName}>
      <div>
        <Link to="/" className="header__logo">
          <img alt="Логотип проекта Movies-explorer" src={headerLogo} />
        </Link>
      </div>      
        <Navigation isLoggedIn={isLoggedIn} />      
    </header>
  )
}

export default Header;