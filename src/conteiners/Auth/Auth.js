import React, { useState, useCallback, useRef, useEffect } from 'react';
import * as firebase from 'firebase';
import AuthWrapper from './AuthWrapper'

const Auth = () => {
  const [tel, setTel] = useState('');
  const [code, setCode] = useState('');

  const getCodeHandler = useCallback((event) => {
    event.preventDefault();
    console.log('Получить код')
  }, []);

  const sendCodeHandler = useCallback((event) => {
    event.preventDefault();
    console.log('Отправить код')
  }, []);

  useEffect(() => {
    if (!firebase.apps.length) {
      let firebaseConfig = {
        apiKey: "AIzaSyBqxC7p9MXNBgFXpSuSUicsMFwhYVZXx6o",
        authDomain: "gotovo-test-9f899.firebaseapp.com",
        databaseURL: "https://gotovo-test-9f899.firebaseio.com",
        projectId: "gotovo-test-9f899",
        storageBucket: "gotovo-test-9f899.appspot.com",
        messagingSenderId: "315153781152",
        appId: "1:315153781152:web:634ce87b79d732a01f94c5"
      };

      firebase.initializeApp(firebaseConfig);
      firebase.auth().languageCode = 'en';

      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      window.recaptchaVerifier.render().then(function (widgetId) {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }, []);

  return (
    <AuthWrapper>
      <div className="auth">
        <h2>Авторизация</h2>

        <form className="form-auth">
          <label>Введите действующий номер телефона</label>
          <input
            type="tel"
            placeholder="+79995555555"
            pattern='/+7[0-9]{3}[0-9][0-9]{2}/'
            value={tel}
            className="form-auth-input"
            onChange={(event) => setTel(event.target.value)}
          />
          <div id="recaptcha-container"></div>
          <button
            className="btn-auth"
            onClick={getCodeHandler}
          >
            Прислать код
          </button>
        </form>

        <form className="form-auth">
          <label>Введите полученный код</label>
          <input
            type="number"
            placeholder="5555"
            value={code}
            className="form-auth-input"
            onChange={(event) => setCode(event.target.value)}
          />
          <button
            className="btn-code"
            onClick={sendCodeHandler}
          >
            Прислать код
          </button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Auth;
