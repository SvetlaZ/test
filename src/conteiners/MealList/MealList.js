import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Meal from '../Meal/Meal';
import Title from '../Title/Title';
import MealListWrapper from './MealListWrapper';
import * as firebase from 'firebase';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const responceMeals = await firebase.database().ref('meals').once('value').then(function (snapshot) {
          return snapshot.val() || [];
        });

        const responceCategories = await firebase.database().ref('categories').once('value').then(function (snapshot) {
          return snapshot.val() || [];
        });

        for (let category in responceCategories) {
          categories.push({
            id: category,
            ...responceCategories[category]
          })
        }

        categories.sort((a, b) => a.order > b.order ? 1 : -1);
        setCategories(categories);
        const meals = [];
        for (let mealId in responceMeals) {
          meals.push({
            id: mealId,
            ...responceMeals[mealId]
          })
        }
        setMeals(meals);
      } catch (e) {
        console.error(e);
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
