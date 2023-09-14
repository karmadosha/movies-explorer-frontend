import React from "react";
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about" id="aboutproject">
      <h2 className="about__header">О проекте</h2>
      <div className="about__content">
        <div className="about__structure">
          <h3 className="about__title">Дипломный проект включал 5 этапов</h3>
          <p className="about__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__time">
        <h3 className="about__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__timeline">
        <p className="about__timeline-week">1 неделя</p>
        <p className="about__timeline-fourweek">4 недели</p>
        <p className="about__timeline-cell">Back-end</p>
        <p className="about__timeline-cell">Front-end</p>
      </div>
    </section>

  )
};

export default AboutProject;