import React from 'react';
import './NavTab.css';
import { Link } from 'react-scroll'


function NavTab() {
  return (
    <nav className='navtab'>
      <ul className='navtab__items'>
        <li>
          <Link
          className='navtab__item'
          to='aboutproject'
          smooth={true}
          duration={800}
          >О проекте</Link>
        </li>
        <li>
          <Link
          className='navtab__item'
          to='techs'
          smooth={true}
          duration={800}>Технологии</Link>
        </li>
        <li>
          <Link 
          className='navtab__item'
          to='about-me'
          smooth={true}
          duration={800}>Студент</Link>
        </li>
      </ul>
    </nav>

     /*<button type='button' className='navtab__btn' onClick={scrollTo}>О проекте</button>
      <button type='button' className='navtab__btn'>Технологии</button>
      <button type='button' className='navtab__btn'>Студент</button>*/
    
  );
};

export default NavTab;