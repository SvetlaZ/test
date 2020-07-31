import React from 'react';
import Meal from '../Meal/Meal'
import MealListWrapper from './MealListWrapper';

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
  return (
    <MealListWrapper>
      {mealArr.map(({ name, src, price }, index) => {
        return <Meal
          key={index}
          name={name}
          src={src}
          price={price}
        />
      })}
    </MealListWrapper>
  )
};

export default MealList;
