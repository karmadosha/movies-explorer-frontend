import React from "react";
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  
  return(
    <section className="notfound">
      <div className="notfound__content">
        <h1 className="notfound__title">404</h1>
        <p className="notfound__subtitle">Страница не найдена</p>
        <Link className="notfound__back-link" to={-1} >Назад</Link>
      </div>      
    </section>
  )
};

export default NotFound;