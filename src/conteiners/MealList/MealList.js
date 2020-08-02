import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Meal from '../Meal/Meal';
import Title from '../Title/Title';
import MealListWrapper from './MealListWrapper';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responceMeals = await axios.get('https://gotovo-test-9f899.firebaseio.com/meals.json');
        const responceCategories = await axios.get('https://gotovo-test-9f899.firebaseio.com/categories.json');
        console.log('responceCategories', responceCategories.data)
        const categories = [];
        for (let category in responceCategories.data) {
          categories.push({
            id: category,
            ...responceCategories.data[category]
          })
        }
        categories.sort((a, b) => a.order > b.order ? 1 : -1);
        setCategories(categories);
        const meals = [];
        console.log('resp: ', responceMeals.data)
        for (let mealId in responceMeals.data) {
          meals.push({
            id: mealId,
            ...responceMeals.data[mealId]
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
        {categories.map(({ title, id }) => {
          let item = [
            <Title
              key={id}
              title={title}
            />];
          item = item.concat(meals.filter(({ categories }) => {
            if (categories) {
              return categories.indexOf(id) !== -1 ? true : false;
            }
            return false;
          }).map(({ name, photo, price, id, weight }) => {
            return <Meal
              key={id}
              id={id}
              name={name}
              src={photo}
              weight={weight}
              price={price}
              isAuth={!!localStorage.getItem('userId')}
            />
          }))

          return item;
        })}
      </div>
    </MealListWrapper>
  )
};

export default MealList;
