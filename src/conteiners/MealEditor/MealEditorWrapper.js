import styled from 'styled-components';

const MealEditorWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .create {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid #cecece;
    border-radius: 25px;
    padding: 30px;

    h2 {
      margin: 10px;
      font-size: 30px;
    }
  }

  .form-create {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  label p {
    margin-bottom: 5px;
  }

  .form-create-input, select {
    height: 30px;
    border-radius: 7px;
    padding-left: 10px;
    border: 1px solid #cecece;
    font-size: 16px;
  }

  .btn-create {
    height: 35px;
    border-radius: 7px;
    border: none;
    background-color: #cecece;
    color: #000;
  }

  .btn-create:hover {
    cursor: pointer;
    color: #cecece;
    background-color: #000;
  }
  `;

export default MealEditorWrapper;
