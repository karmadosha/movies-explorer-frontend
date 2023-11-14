import React from "react";
import './Login.css';
import WelcomeTop from "../WelcomeTop/Welcome";
import Form from "../Form/Form";

function Login({ onLogin, isLoading }) {
  return(
    <main>
      <section className="login">
        <WelcomeTop />
        <Form 
          inputUsername={false}
          submitBtn={isLoading ? 'Вход...' : 'Войти'}
          question={'Еще не зарегистрированы?'}
          link={'/signup'}
          linkText={'Регистрация'}
          onSubmit={onLogin}
          disabled={isLoading}
        />
      </section>
    </main>
  )
};

export default Login;