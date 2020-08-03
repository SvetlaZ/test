import React, { useState, useCallback, useEffect } from 'react';
import MealEditorWrapper from './MealEditorWrapper';
import Authentication from '../Auth/Authentication';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

const MealEditor = ({ match: { params: { id } } }) => {
  const [category, setCategory] = useState('breakfast');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const ref = React.createRef();

  useEffect(() => {
    Authentication();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { categories, name, weight, price, photo } = await firebase.database()
          .ref('meals/' + id)
          .once('value')
          .then(function (snapshot) {
            return snapshot.val() || [];
          });

        setCategory(JSON.parse(categories))
        setName(name)
        setWeight(weight)
        setPrice(price)
        setPhoto(photo)
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [id]);

  // eslint-disable-next-line
  const role = "uploadcare-uploader";

  const editMealHandler = useCallback((event) => {
    event.preventDefault();

    async function writeMealData(mealId, category, name, weight, price, photo) {
      await firebase.database().ref('meals/' + mealId).set({
        'categories': JSON.stringify(category),
        'name': name,
        'weight': weight,
        'price': price,
        'photo': photo,
      });

      setIsEdit(true);
    }
    writeMealData(id, category, name, weight, price, photo);
  }, [id, name, weight, price, category, photo]);

  return (
    <MealEditorWrapper>
      {
        isEdit ?
          (<Redirect to={"/"} />) :
          (
            <div className="create">
              <h2>Редактирование блюда</h2>

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
                  onClick={editMealHandler}
                  className="btn-create"
                >
                  Сохранить изменения
            </button>
              </form>
            </div>
          )
      }
    </MealEditorWrapper>
  )
}

export default MealEditor;
