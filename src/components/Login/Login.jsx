import React from "react";
import './Login.css';
import WelcomeTop from "../WelcomeTop/Welcome";
import Form from "../Form/Form";

function Login({ onLogin }) {
  return(
    <main>
      <section className="login">
        <WelcomeTop />
        <Form 
          inputUsername={false}
          submitBtn={'Войти'}
          question={'Еще не зарегистрированы?'}
          link={'/signup'}
          linkText={'Регистрация'}
          onSubmit={onLogin}
        />
      </section>
    </main>
  )
};

export default Login;