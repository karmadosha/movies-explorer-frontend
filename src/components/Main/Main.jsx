import React from "react";
import './Main.css';
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";

function Main() {
  
  return (         
      <main className="main">
        <Promo />
        <NavTab />
        <AboutProject
          title="AboutProject"
          id="aboutproject"
        />
        <Techs 
          title="Techs"
          id="techs"
        />
        <AboutMe
          title="AboutMe"
          id="about-me"
        />
      </main>
 )
}

export default Main;