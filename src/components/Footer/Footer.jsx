import React from 'react';
import './Footer.css';

function Footer() {
  return (
      <footer className='footer'>
        <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__bottom'>
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
          <ul className='footer__links'>
            <li>
              <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
            </li>
            <li>
              <a className='footer__link' href='https://github.com/' target='_blank' rel='noreferrer'>GitHub</a>
            </li>
          </ul>
        </div>
      </footer>
  )
};

export default Footer;