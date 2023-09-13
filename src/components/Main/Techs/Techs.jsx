import React from 'react';
import './Techs.css';

function Techs() {
  const icons = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

  return(
    <section className='techs' id='techs'>
      <h2 className="techs__title">Технологии</h2>
      <div className='techs__content'>
        <h3 className='techs__heading'>7 технологий</h3>
        <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className='techs__icons'>
          {icons.map((icon) => (
            <p key={icon} className='techs__icon'>{icon} </p>
          ))}
        </div>
      </div>
    </section>
  )
};

export default Techs;