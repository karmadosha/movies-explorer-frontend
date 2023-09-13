import React from "react";
import './AboutMe.css';
import studentPic from '../../../images/my-foto.jpg';

function AboutMe() {
  return(
    <section className="about-me" id="about-me">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__title">Юлия</h3>
          <p className="about-me__subtitle">Фронтенд-разработчица, 45 лет</p>
          <p className="about-me__story">Я из Иркутска, закончила Иркутский лингвистический университет. Замужем, есть взрослая дочь и почти взрослый сын. Люблю своих мейнкунов - кота и кошку, пеку красивые и вкусные торты. Пробовала себя в тестировании, но поняла, что разработка для меня гораздо интереснее. После окончания курса по веб-разработке планирую найти работу в компании и работать удаленно.</p>
          <a className="about-me__github-link" href="https://github.com/karmadosha" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img src={studentPic} alt="Фото студента Виталия" className="about-me__pic" />        
      </div>
      <h4 className="about-me__portfolio">Портфолио</h4>
      <ul className="about-me__porfolio-items">
        <li className="about-me__portfolio-item">
          <a className="about-me__portfolio-link" href="https://karmadosha.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            <p className="about-me__portfolio-text">Статичный сайт</p>
            <div className="about-me__portfolio-icon"></div>
          </a>
        </li>
        <li className="about-me__portfolio-item">
          <a className="about-me__portfolio-link" href="https://karmadosha.github.io/russian-travel/" target="_blank" rel="noreferrer">
            <p className="about-me__portfolio-text">Адаптивный сайт</p>
            <div className="about-me__portfolio-icon"></div>
          </a>
        </li>
        <li className="about-me__portfolio-item">
          <a className="about-me__portfolio-link" href="https://mestokarma.nomoreparties.co" target="_blank" rel="noreferrer">
            <p className="about-me__portfolio-text">Одностраничное приложение</p>
            <div className="about-me__portfolio-icon"></div>
          </a>
        </li>
      </ul>
      
    </section>
  )
};

export default AboutMe;