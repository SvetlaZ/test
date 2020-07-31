import styled from 'styled-components';

const MealWrapper = styled.div`
  min-height: 100px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  
  .meal-picture {
    img {
      height: 180px;
      width: 180px;
    }  
  }

  .meal-info__price {
    p {
      color: rgb(196,196,196);
      font-size: 21px;
      font-weight: 500;
      border: solid 2px rgb(196,196,196);
      border-radius: 50px;
      width: 86px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  `;

export default MealWrapper;
