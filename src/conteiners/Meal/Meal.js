import React from 'react';
import MealWrapper from './MealWrapper';

import pic from './pic.png'

const Meal = () => {
  return (
    <MealWrapper>
      <div className="meal-picture">
        <img src={pic} alt="Слоенный розан с малиной" />
      </div>
      <div className="meal-info">
        <div className="meal-info__description">
          <h3>Слоенный розан с малиной</h3>
        </div>
        <div className="meal-info__price">
          <p>150 ₽</p>
        </div>
      </div>
    </MealWrapper>
  )
}

export default Meal;
