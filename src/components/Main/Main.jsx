import React from "react";
import './Main.css';
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main({ isLoggedIn }) {
  
  return (    
    <>
      <Header  isLoggedIn={isLoggedIn}/>
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
      <Footer />
    </>     
      
 )
}

export default Main;