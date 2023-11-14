import React from "react";
import './Register.css';
import WelcomeTop from "../WelcomeTop/Welcome";
import Form from "../Form/Form";

function Register({ onRegister, isLoading }) {
  
  return(
    <main>
      <section className="register">
        <div className="register__container">
          <WelcomeTop />
          <Form 
            inputUserName={true}
            submitBtn={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            question={'Уже зарегистрированы?'}
            link={'/signin'}
            linkText={'Войти'}
            onSubmit={onRegister}
            isLoading={isLoading}
          />
        </div>
      </section>
    </main>    
  )
};

export default Register;