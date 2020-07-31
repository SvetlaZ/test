import React, { useState, useCallback } from 'react';
import axios from 'axios';
import MealCreatorWrapper from './MealCreatorWrapper';

const MealCreator = () => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');

  const createMealHandler = useCallback((event) => {
    event.preventDefault();

    axios.post('https://gotovo-test-9f899.firebaseio.com/meals.json', {
      'name': name,
      'weigth': weight,
      'price': price
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
      ;

    console.log(name);
    console.log('создаем блюдо');
  }, [name, weight, price]);

  return (
    <MealCreatorWrapper>
      <div className="create">
        <h2>Создание блюда</h2>

        <form className="form-create">

          <label><p>Выберете категорию:</p></label>
          <select>
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

          <label><p>Введите вес:</p></label>
          <input
            type="text"
            placeholder="Вес"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="form-create-input"
          />

          <label><p>Введите цену:</p></label>
          <input
            type="text"
            placeholder="Цена"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="form-create-input"
          />

          <p>Загузите фото</p>

          <button
            onClick={createMealHandler}
            className="btn-create"
          >
            Добавить блюдо
            </button>
        </form>
      </div>
    </MealCreatorWrapper>
  )
}

export default MealCreator;
