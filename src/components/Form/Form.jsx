import React from "react";
import './Form.css';
import { Link } from 'react-router-dom';
import useFormValidation from "../../hooks/useFormValidation";

function Form({ inputUserName, submitBtn, linkText, question, link }) {
  const form = useFormValidation();

  return(
    <form className="auth-form" noValidate>
      <div className="auth-form__container">
        {inputUserName && 
          <label className="auth-form__label">Имя
          <input 
            className={(`auth-form__input ${form.errors.name ? 'auth-form__input_notvalid' : ''}`)}
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            placeholder="Введите имя"
            onChange={form.handleChange}
            value={form.value}
            required
            />
          <span className={(`auth-form__input-error ${form.errors.name ? 'auth-form__input-error_active' : ''}`)}>{form.errors.name}</span>  
          </label>}
          <label className="auth-form__label">E-mail
            <input
              className={(`auth-form__input ${ form.errors.email ? 'auth-form__input_notvalid' : ''}`)}
              type="email"
              name="email"
              placeholder="Введите email"
              onChange={form.handleChange}
              value={form.value}
              required
            />
            <span className={(`auth-form__input-error ${form.errors.email ? 'auth-form__input-error_active' : ''}`)}>{form.errors.email}</span>
          </label>
          <label className="auth-form__label">Пароль
            <input
              className={(`auth-form__input ${ form.errors.password ? 'auth-form__input_notvalid' : ''}`)}
              type="password"
              name="password"
              minLength='6'
              maxLength='30'
              placeholder="Введите пароль"
              onChange={form.handleChange}
              value={form.value}
              required
            />
            <span className={(`auth-form__input-error ${form.errors.password ? 'auth-form__input-error_active' : ''}`)}>{form.errors.password}</span>
          </label>
      </div>            
      <div className="auth-form__bottom">
        <button className={`auth-form__btn ${!form.isValid && 'auth-form__btn_disabled'}`} type='submit' disabled={!form.isValid}>{submitBtn}</button>
        <p className='auth-form__question'>{question}
         <Link className='auth-form__link' to={link}>{linkText}</Link>
        </p>
      </div>
    </form>
  )
};

export default Form;