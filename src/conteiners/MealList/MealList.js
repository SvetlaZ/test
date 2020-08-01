import React, { useEffect, useState, useCallback } from 'react';
import Meal from '../Meal/Meal';
import { Link } from 'react-router-dom';
import MealListWrapper from './MealListWrapper';
import axios from 'axios';

const MealList = () => {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responce = await axios.get('https://gotovo-test-9f899.firebaseio.com/meals.json');
        const meals = [];
        console.log('resp: ', responce.data)
        for (let mealId in responce.data) {
          meals.push({
            id: mealId,
            ...responce.data[mealId]
          })
        }
        console.log('meals: ', meals)
        setMeals(meals);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const authHandler = useCallback((event) => {
    event.preventDefault();
    console.log('Авторизируемся');
  }, []);

  return (
    <MealListWrapper>
      {
        localStorage.getItem('userId')
          ?
          <div className="doWrap">
            <p>Добавте свое блюдо</p>
            <Link
              to="/create"
            >
              <div className="btn">Добавить</div>
            </Link>
          </div>
          :
          <div className="doWrap">
            <p>Чтобы добавлять блюда, необходимо войти</p>
            <Link
              to="/auth"
            >
              <div className="btn">Войти</div>
            </Link>
          </div>
      }

      <div className="wrapperList">
        {meals.map(({ name, photo, price, id, weight }) => {
          return <Meal
            key={id}
            name={name}
            src={photo}
            weight={weight}
            price={price}
          />
        })}
      </div>
    </MealListWrapper>
  )
};

export default MealList;
