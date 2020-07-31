import React, { useState, useCallback } from 'react';
import axios from 'axios';
import MealCreatorWrapper from './MealCreatorWrapper';

const MealCreator = () => {
  const [category, setCategory] = useState('Завтрак');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');

  const ref = React.createRef();

  const createMealHandler = useCallback((event) => {
    event.preventDefault();

    axios.post('https://gotovo-test-9f899.firebaseio.com/meals.json', {
      'category': category,
      'name': name,
      'weight': weight,
      'price': price,
      'photo': ref.current.value,
    })
      .then(response => {
        console.log(response);
        setCategory('Завтрак');
        setName('');
        setWeight('');
        setPrice('');
      })
      .catch(error => console.log(error));

    console.log(name);
    console.log('создаем блюдо');
  }, [name, weight, price]);

  return (
    <MealCreatorWrapper>
      <div className="create">
        <h2>Создание блюда</h2>

        <form className="form-create">

          <label htmlFor="select"><p>Выберете категорию:</p></label>
          <select value={category} id="select" onChange={(event) => setCategory(event.target.value)}>
            <option value="Завтрак">Завтрак</option>
            <option value="Обед">Обед</option>
            <option value="Ужин">Ужин</option>
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
            role="uploadcare-uploader"
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
    </MealCreatorWrapper>
  )
}

export default MealCreator;
