import React from 'react';
import { Link } from 'react-router-dom'
import MealWrapper from './MealWrapper';

import pencil from './pencil.svg';

const Meal = ({
  id,
  name,
  src,
  price,
  weight,
  isAuth
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
            {
              isAuth
                ?
                <Link to={`/edit/${id}`}>
                  <img src={pencil} alt="edit" className="pencil" />
                </Link>
                :
                false
            }
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
