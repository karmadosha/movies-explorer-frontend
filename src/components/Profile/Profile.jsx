import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import Header from "../Header/Header";
import useFormValidation from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { errorMessages } from "../../utils/constants";

function Profile({ onProfileUpdate, onLogout, isLoading, handleInfoMessage, handleErrorMessage }) {
  const  {values, errors, isValid, handleChange, setValues, setIsValid } = useFormValidation(); 
  const [isEditable, setIsEditable] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const prevValue = (currentUser.email === values.email) && (currentUser.name === values.name);

  function handleSaveClick(evt) {
    evt.preventDefault();
    if (prevValue) {
      console.log('Данные совпадают');
      setIsValid(false);
      return;
    }
    onProfileUpdate({
      name: values['name'],
      email: values['email']
    });
    setIsEditable(false);
  };
  
  useEffect(() => {
    if (currentUser)
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    })
  }, [currentUser, setValues]);

  useEffect(() => {
    if (prevValue) {
      setIsValid(false);
    }
  }, [prevValue, setIsValid]);

  function handleEditClick() {
    setIsEditable(true);
  };  

  return (
    <main>
      <Header isLoggedIn={true} />    
      <section className="profile">        
        <h1 className="profile__greeting">Привет, {currentUser?.name}!</h1>
        <form className="profile__form" noValidate>
          <div className="profile__container">
            <p className="profile__container-title">Имя</p>
            {isEditable ? 
              <input
                type="text" 
                name="name" 
                placeholder="Введите ваше имя"
                minLength="2"
                maxLength="30"                 
                className="profile__container-input"
                onChange={handleChange}
                value={values['name'] || ''}
                pattern='[A-Za-zА-Яа-яё\s\-]+$'
                required
                 /> : <span className="profile__container-value">{currentUser?.name}</span>
            }            
          </div>
          <span className={`profile__container-error ${errors.name ? 'profile__container-error_active' : ''}`}>
              {errorMessages.nameInputError}
            </span>
          <div className="profile__container">
            <p className="profile__container-title">Email</p>
            {isEditable ? 
              <input
                type="email" 
                name="email" 
                placeholder="Введите ваш email"                   
                className="profile__container-input"
                onChange={handleChange}
                value={values['email'] || ''}
                pattern='^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$'
                required
                /> : <span className="profile__container-value">{currentUser?.email}</span>
            }            
          </div>
          <span className={`profile__container-error ${errors.email ? 'profile__container-error_active' : ''}`}>
              {errorMessages.emailInputError}
            </span>      
          <div className="profile__buttons">
            {!isEditable && (
              <>
                <button
                 className="profile__edit-btn"
                 type="button"
                 aria-label="кнопка редактировать"
                 onClick={handleEditClick}>Редактировать
                </button>
                <Link
                 className="profile__logout-link" 
                 to="/"
                 onClick={onLogout}
                 >Выйти из аккаунта</Link>
              </>        
            )}
            {isEditable && (
              <>                
                <button
                type="submit"
                className={`profile__save-btn ${!isValid && 'profile__save-btn_disabled'}`}
                aria-label="кнопка сохранить"
                disabled={!isValid || isLoading}
                onClick={handleSaveClick}>
                  Сохранить
                </button>
                <button
                  type="button"
                  className="profile__notedit-btn"
                  aria-label="кнопка Отменить"
                  onClick={(evt) => setIsEditable(false)}
                >Отменить</button>
              </>
            )}
          </div>
          </form>
      </section>
    </main>   
  )
};

export default Profile;