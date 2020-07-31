import React, { useEffect, useState } from 'react';
import Meal from '../Meal/Meal'
import MealListWrapper from './MealListWrapper';
import axios from 'axios';

import croissant from './croissant.png';
import rozan from './rozan.png';
import bun from './bun.png';

const mealArr = [
  {
    'name': 'Большой миндальный круассан',
    'src': croissant,
    'price': '145 ₽'
  },
  {
    'name': 'Слоенный розан с малиной',
    'src': rozan,
    'price': '105 ₽'
  },
  {
    'name': 'Улитка с корицей',
    'src': bun,
    'price': '100 ₽'
  },
]

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

  return (
    <MealListWrapper>
      {meals.map(({ name, photo, price, id, weight }) => {
        return <Meal
          key={id}
          name={name}
          src={photo}
          weight={weight}
          price={price}
        />
      })}
    </MealListWrapper>
  )
};

export default MealList;
