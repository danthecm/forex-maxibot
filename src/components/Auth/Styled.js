import styled from "styled-components";

export const Main = styled.main`
  color: #fff;
  display: grid;
  background: url("https://res.cloudinary.com/danthecm/image/upload/v1683188768/forex-frontend/bg_t14ium.jpg")
    no-repeat;
  background-size: cover;
  opacity: 98%;
  height: 100vh;
  grid-template-rows: 0.1fr auto;
  width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;

  .logo {
    margin-top: 20px;
    margin-left: 30px;
    height: 70px;
    position: fixed;
  }

  .subText {
    line-height: 30px;
    text-align: justify;
  }

  @media screen and (max-width: 768px) {
    .logo {
      position: static;
      height: 60px;
      margin: 20px auto;
    }
  }
`;

export const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: 500px 500px;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 100vh;
  margin: auto;

  h2 {
    font-size: 55px;
    font-weight: 700;
    margin: 2.5rem 0;
    line-height: 35px;
  }

  .title span {
    font-weight: 600;
  }

  .title {
    background-color: #27ae60;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 1px 5px #e1f083;
  }

  .invalid {
    background: url("../../assets/icon-error.svg") no-repeat scroll 97% 10px;
    border: 2px solid hsl(0, 100%, 74%) !important;
  }

  @media screen and (max-width: 769px) {
    grid-template-columns: auto;
    padding: 0 2rem;
    height: auto;
    & > div {
      text-align: center;
    }
    .subText {
      display: none;
    }
    .title {
      display: none;
    }
    h2 {
      font-size: 24px;
      margin: 10px 0 5px 0;
      text-align: center;
    }
    div > p {
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 375px) {
    padding: 2rem 1rem;
  }
`;

export const Article = styled.article``;

export const Card = styled.section`
  width: auto;
  height: auto;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin: 1.6rem 0;
  padding: 2rem;

  input {
    display: inline-block;
    width: 100%;
    border-radius: 10px;
    padding: 12pt;
    border: 3px solid #f4f4f4;
    border-radius: 10px;
    font-weight: 500;
    margin: 10px 0;

    font-family: "Work Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;

    letter-spacing: -0.499263px;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: #c5c5c5;
  }

  button {
    margin: 5px 0;
    padding: 1rem;
    color: #fff;
    background-color: #27ae60;
    border: none;
    border-radius: 7px;
    font-weight: 600;
    width: 100%;
  }

  button:hover {
    cursor: pointer;
    background-color: #6fcf97;
  }

  button:disabled {
    background-color: #a6a6a6;
    cursor: not-allowed;
  }
`;

export const Error = styled.p`
  color: hsl(0, 100%, 74%);
  font-size: 10px;
  font-weight: 600;
  font-style: italic;
  float: right;
  margin-bottom: 10px;
`;

export const AuthForm = styled.form`
  .terms {
    margin: 10px 0;
    text-align: center;
    font-size: 10px;
    font-weight: 400;
    color: hsl(246, 25%, 77%);
  }

  .terms > span {
    color: #ff7979;
    font-weight: 600;
  }

  .link {
    font-size: 14px;
    color: #000;
    margin-top: 15px;
    text-align: center;
  }
  .link a {
    color: #27ae60;
    text-decoration: none;
  }
`;
