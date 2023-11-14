import React from "react";
import './Form.css';
import { Link } from 'react-router-dom';
import useFormValidation from "../../hooks/useFormValidation";
import { errorMessages } from "../../utils/constants";

function Form({ inputUserName, submitBtn, linkText, question, link, onSubmit, isLoading }) {
  const {values, handleChange, errors, isValid} = useFormValidation();  
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
};

  return(
    <form className="auth-form" onSubmit={handleSubmit} disabled={isLoading} noValidate >
      <div className="auth-form__container">
        {inputUserName && 
          <label className="auth-form__label">Имя
          <input 
            className={(`auth-form__input ${errors.name ? 'auth-form__input_notvalid' : ''}`)}
            type="text"
            name="name"
            minLength={2}
            maxLength={30}
            placeholder="Введите имя"
            onChange={handleChange}
            value={values.name || ''}
            pattern='[A-Za-zА-Яа-яё\s\-]+$'
            required
            />
          <span className={(`auth-form__input-error ${errors.name ? 'auth-form__input-error_active' : ''}`)}>{errorMessages.nameInputError}</span>  
          </label>}
          <label className="auth-form__label">E-mail
            <input
              className={(`auth-form__input ${ errors.email ? 'auth-form__input_notvalid' : ''}`)}
              type="email"
              name="email"
              placeholder="Введите email"
              onChange={handleChange}
              value={values.email || ''}
              pattern='^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$'
              required
            />
            <span className={(`auth-form__input-error ${errors.email ? 'auth-form__input-error_active' : ''}`)}>{errorMessages.emailInputError}</span>
          </label>
          <label className="auth-form__label">Пароль
            <input
              className={(`auth-form__input ${ errors.password ? 'auth-form__input_notvalid' : ''}`)}
              type="password"
              name="password"
              minLength={6}
              maxLength={30}
              placeholder="Введите пароль"
              onChange={handleChange}
              value={values.password || ''}
              required
            />
            <span className={(`auth-form__input-error ${errors.password ? 'auth-form__input-error_active' : ''}`)}>{errors.password}</span>
          </label>
      </div>            
      <div className="auth-form__bottom">
        <button
         className={`auth-form__btn ${!isValid  && 'auth-form__btn_disabled'}`} 
         type='submit' 
         disabled={!isValid || isLoading}>
          {submitBtn}
        </button>
        <p className='auth-form__question'>{question}
         <Link className='auth-form__link' to={link}>{linkText}</Link>
        </p>
      </div>
    </form>
  )
};

export default Form;