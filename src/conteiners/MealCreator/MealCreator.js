import React, { useState, useCallback, useEffect } from 'react';
import MealCreatorWrapper from './MealCreatorWrapper';
import Authentication from '../Auth/Authentication';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

const MealCreator = () => {
  const [category, setCategory] = useState('breakfast');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [isCreate, setIsCreate] = useState(false);

  const ref = React.createRef();

  // eslint-disable-next-line
  const role = "uploadcare-uploader";
  useEffect(() => {
    Authentication();
  }, []);

  const createMealHandler = useCallback((event) => {
    event.preventDefault();

    const jwtToken = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.dir(ref);
        async function writeMealData(category, name, weight, price, photo) {
          const mealData = {
            'categories': JSON.stringify(category),
            'name': name,
            'weight': weight,
            'price': price,
            'photo': photo,
          };

          const newMealKey = firebase.database().ref().child('meals').push().key;
          let updates = {};

          updates['/meals/' + newMealKey] = mealData;

          firebase.database().ref().update(updates);

          setIsCreate(true);
        }

        writeMealData(category, name, weight, price, ref.current.value);
      }
    });

    jwtToken();
  }, [name, weight, price, category, ref]);

  return (
    <MealCreatorWrapper>
      {
        isCreate ?
          (<Redirect to={"/"} />) :
          (
            <div className="create">
              <h2>Создание блюда</h2>

              <form className="form-create">

                <label htmlFor="select"><p>Выберете категорию:</p></label>
                <select value={category} id="select" onChange={(event) => setCategory(event.target.value)}>
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
