import React from 'react';
import './NavTab.css';
import { Link } from 'react-scroll'


function NavTab() {
  return (
    <nav className='navtab'>
      <ul className='navtab__items'>
        <Link
         className='navtab__item'         
         to='aboutproject'
         smooth={true}
         duration={800}
         >О проекте</Link>
        <Link
         className='navtab__item'         
         to='techs'
         smooth={true}
         duration={800}>Технологии</Link>
        <Link 
         className='navtab__item'         
         to='about-me'
         smooth={true}
         duration={800}>Студент</Link>
      </ul>
    </nav>

     /*<button type='button' className='navtab__btn' onClick={scrollTo}>О проекте</button>
      <button type='button' className='navtab__btn'>Технологии</button>
      <button type='button' className='navtab__btn'>Студент</button>*/
    
  );
};

export default NavTab;