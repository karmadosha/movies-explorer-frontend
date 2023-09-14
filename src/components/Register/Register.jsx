import React from "react";
import './Register.css';
import WelcomeTop from "../WelcomeTop/Welcome";
import Form from "../Form/Form";

function Register() {
  
  return(
    <main>
      <section className="register">
        <div className="register__container">
          <WelcomeTop />
          <Form 
            inputUserName={true}
            submitBtn={'Зарегистрироваться'}
            question={'Уже зарегистрированы?'}
            link={'/signin'}
            linkText={'Войти'}
          />
        </div>
      </section>
    </main>    
  )
};

export default Register;