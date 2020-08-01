import React, { useState, useCallback, useEffect } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';

const Auth = () => {
  const [tel, setTel] = useState('');
  const [code, setCode] = useState('');
  const [res, setRes] = useState('');
  const [isSentPhone, setIsSentPhone] = useState(false);
  const [isSentCode, setIsSentCode] = useState(false);

  const getCodeHandler = useCallback((event) => {
    event.preventDefault();
    console.log('Получить код')
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(tel, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setRes(confirmationResult);
        console.log('confirmationResult: ', res);
        setIsSentPhone(true);
      }).catch(function (error) {
        console.log(error);
        // grecaptcha.reset(window.recaptchaWidgetId);
      });
  }, [tel]);

  const sendCodeHandler = useCallback((event) => {
    event.preventDefault();
    console.log('Отправить код')
    res.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log(user)
      localStorage.setItem('userId', user.uid);
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }, [code]);

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

        {
          isSentPhone
            ?
            <form className="form-auth">
              <label htmlFor="code">Введите полученный код</label>
              <input
                id="code"
                type="number"
                placeholder="123456"
                value={code}
                className="form-auth-input"
                onChange={(event) => setCode(event.target.value)}
              />
              <button
                className="btn-code"
                onClick={sendCodeHandler}
              >
                Отправить
              </button>
              {
                localStorage.getItem('userId') ? <Redirect to='/' /> : false
              }
            </form>
            :
            <form className="form-auth">
              <label htmlFor="tel">Введите действующий номер телефона</label>
              <input
                id="tel"
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
        }
      </div>
    </AuthWrapper>
  )
}

export default Auth;
