import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Welcome.css';
import logo from "../../images/logo-header.svg";

function WelcomeTop() {
  const location = useLocation();
  const welcomeText = (location.pathname === "/signup" ? "Добро пожаловать!" : "Рады видеть!");

  return (
    <section className="welcome">
      <Link to="/" className="welcome__logo">
        <img src={logo} alt="Логотип проекта Movies Explorer" />
      </Link>
      <h2 className="welcome__text">{welcomeText}</h2>
    </section>
  )
};

export default WelcomeTop;