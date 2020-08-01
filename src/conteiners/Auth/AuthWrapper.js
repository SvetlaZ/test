import styled from 'styled-components';

const AuthWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid #cecece;
    border-radius: 25px;
    padding: 20px;

    h2 {
      margin: 10px;
      font-size: 30px;
    }
  }

  label {
    margin-bottom: 5px;
    margin-top: 10px;
    text-align: center;
  }

  .form-auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form-auth-input {
    height: 25px;
    margin: 15px 0;
    width: 90%;
    border-radius: 7px;
    padding-left: 10px;
    border: 1px solid #cecece;
  }

  .btn-auth, .btn-code {
    height: 35px;
    border-radius: 7px;
    border: none;
    background-color: #cecece;
    color: #000;
    width: 95%;
    margin-top: 10px;
  }

  .btn-auth:hover, .btn-code:hover {
    cursor: pointer;
    color: #cecece;
    background-color: #000;
  }
`;

export default AuthWrapper;
