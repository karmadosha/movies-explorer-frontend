import React from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import Header from "../Header/Header";

function Profile() {
  const isLoggedIn = true;
  const [isEditable, setIsEditable] = React.useState(false);
  function handleEditClick() {
    setIsEditable(true);
  };
  function handleSaveClick() {
    setIsEditable(false);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="profile">        
        <h1 className="profile__greeting">Привет, Виталий!</h1>
        <form className="profile__form">
          <div className="profile__container">
            <p className="profile__container-title">Имя</p>
            {isEditable ? 
              <input
                type="text" 
                name="name" 
                placeholder="Введите ваше имя"
                minLength="2"                      
                className="profile__container-input"                
                required /> : <span className="profile__container-value">Виталий</span>
            }
          </div>
          <div className="profile__container">
            <p className="profile__container-title">Email</p>
            {isEditable ? 
              <input
                type="email" 
                name="email" 
                placeholder="Введите ваш email"                   
                className="profile__container-input"                
                required/> : <span className="profile__container-value">pochta@pochta.ru</span>
            }
          </div>        
          <div className="profile__buttons">
            {!isEditable && (
              <>
                <button
                 className="profile__edit-btn"
                 type="button"
                 aria-label="кнопка редактировать"
                 onClick={handleEditClick}>Редактировать
                </button>
                <Link className="profile__logout-link" to="/signin">Выйти из аккаунта</Link>
              </>        
            )}
            {isEditable && (
              <>
                <span className="profile__error">При обновлении профиля произошла ошибка.</span>
                <button
                type="submit"                
                className="profile__save-btn profile__save-btn_disabled"
                aria-label="кнопка сохранить"
                onClick={handleSaveClick}>Сохранить</button>
              </>
            )}
          </div>
          </form>
      </main>
    </>   
  )
};

export default Profile;