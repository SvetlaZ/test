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

  .pencil {
    margin-left: 10px;
    width: 20px;
  }
  
  .pencil:hover {
    cursor: pointer;
  }
      

  h3 {
    span {
      font-size: 13px;
      line-height: 15px;
      color: rgb(196, 196, 196);
      margin-left: 4px;
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
