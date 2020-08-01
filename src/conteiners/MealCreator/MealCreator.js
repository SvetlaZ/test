import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import MealCreatorWrapper from './MealCreatorWrapper';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

const MealCreator = () => {
  const [category, setCategory] = useState(["breakfast"]);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const ref = React.createRef();

  // eslint-disable-next-line
  const role = "uploadcare-uploader";

  const createMealHandler = useCallback((event) => {
    event.preventDefault();

    const jwtToken = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user.getIdToken().then(function (idToken) {
          axios.post(`https://gotovo-test-9f899.firebaseio.com/meals.json?auth=${idToken}`, {
            'categories': JSON.stringify(category),
            'name': name,
            'weight': weight,
            'price': price,
            'photo': ref.current.value,
          })
            .then(response => {
              console.log(response);
              setCategory(['Завтрак']);
              setName('');
              setWeight('');
              setPrice('');
              setIsEdit(true);
            })
            .catch(error => console.log(error));
        });
      }
    });

    jwtToken();

    console.log(name);
    console.log('создаем блюдо');
  }, [name, weight, price, category, ref]);

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
    }
  }, []);

  return (
    <MealCreatorWrapper>
      {
        isEdit ?
          (<Redirect to={"/"} />) :
          (
            <div className="create">
              <h2>Создание блюда</h2>

              <form className="form-create">

                <label htmlFor="select"><p>Выберете категорию:</p></label>
                <select value={category} id="select" onChange={(event) => setCategory([event.target.value])}>
                  <option value="breakfast">Завтрак</option>
                  <option value="lunch">Обед</option>
                  <option value="dinner">Ужин</option>
                </select>


                <label htmlFor="name"><p>Введите название:</p></label>
                <input
                  id="name"
                  type="text"
                  placeholder="Название"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="form-create-input"
                />

                <label htmlFor="weight"><p>Введите вес в граммах:</p></label>
                <input
                  id="weight"
                  type="text"
                  placeholder="Вес"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  className="form-create-input"
                />

                <label htmlFor="price"><p>Введите цену в рублях:</p></label>
                <input
                  id="price"
                  type="text"
                  placeholder="Цена"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="form-create-input"
                />

                <label htmlFor="photo"><p>Загрузите фото: </p></label>
                <input
                  id="photo"
                  type="hidden"
                  role={role}
                  name="photo"
                  ref={ref}
                />

                <button
                  onClick={createMealHandler}
                  className="btn-create"
                >
                  Добавить блюдо
            </button>
              </form>
            </div>
          )
      }
    </MealCreatorWrapper>
  )
}

export default MealCreator;
