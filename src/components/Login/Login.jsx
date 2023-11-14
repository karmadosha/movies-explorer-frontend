import React from "react";
import './Login.css';
import WelcomeTop from "../WelcomeTop/Welcome";
import Form from "../Form/Form";

function Login({ onLogin, onLoading }) {
  return(
    <main>
      <section className="login">
        <WelcomeTop />
        <Form 
          inputUsername={false}
          submitBtn={onLoading ? 'Вход...' : 'Войти'}
          question={'Еще не зарегистрированы?'}
          link={'/signup'}
          linkText={'Регистрация'}
          onSubmit={onLogin}
          isDisabled={onLoading}
        />
      </section>
    </main>
  )
};

export default Login;