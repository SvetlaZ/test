import styled from 'styled-components';

const MealListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .doWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  a {
    text-decoration: none;
  }

  .btn {
    height: 35px;
    border-radius: 7px;
    border: none;
    background-color: #cecece;
    color: #000;
    width: 100px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn:hover {
    cursor: pointer;
    color: #cecece;
    background-color: #000;
  }

  .wrapperList {
    max-width: 600px;
  }
  `;

export default MealListWrapper;