import React from 'react';
import MealWrapper from './MealWrapper';

const Meal = ({
  name,
  src,
  price,
  weight
}) => {
  return (
    <MealWrapper>
      <div className="meal-picture">
        <img src={src} alt={name} />
      </div>
      <div className="meal-info">
        <div className="meal-info__description">
          <h3>
            {name}
            <span>{` ${weight} г`}</span>
          </h3>
        </div>
        <div className="meal-info__price">
          <p>{`${price} ₽`}</p>
        </div>
      </div>
    </MealWrapper>
  )
}

export default Meal;
