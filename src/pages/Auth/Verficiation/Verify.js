import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField";
import { verifyCodeReq } from "../../../services/auth";

const Verify = () => {
  const [isFetching, setIsFetching] = useState(false);
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  console.log("username: " + username);
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const element = e.target;
    const code =
      element["code1"].value +
      element["code2"].value +
      element["code3"].value +
      element["code4"].value;

    verifyCodeReq(code, username, setIsFetching, navigate);
  };

  const inputChangedHandler = (e) => {
    const element = e.target;
    if (element.value === "") {
      return;
    }
    element.nextSibling ? element.nextSibling.focus() : element.blur();
  };
  return (
    <StyledVerify>
      <h1>Enter Verification Code</h1>
      <form onSubmit={formSubmitHandler}>
        <InputWrapper>
          <InputField
            autoFocus={true}
            name="code1"
            type="text"
            pattern="\d*"
            maxLength="1"
            onChange={inputChangedHandler}
            title="only numbers are allowed"
            required
          />
          <InputField
            name="code2"
            type="text"
            pattern="\d*"
            maxLength="1"
            onChange={inputChangedHandler}
            title="only numbers are allowed"
            required
          />
          <InputField
            name="code3"
            type="text"
            pattern="\d*"
            maxLength="1"
            onChange={inputChangedHandler}
            title="only numbers are allowed"
            required
          />
          <InputField
            name="code4"
            type="text"
            pattern="\d*"
            maxLength="1"
            title="only numbers are allowed"
            required
          />
        </InputWrapper>
        <button disabled={isFetching} type="submit">
          Verify
        </button>
      </form>
    </StyledVerify>
  );
};
export default Verify;

const StyledVerify = styled.div`
  grid-column: span 2;
  justify-self: center;
  height: 300px;
  width: 550px;
  background: #fff;
  border-radius: 20px;
  color: #718096;
  padding: 20px;
  text-align: center;

  h1 {
    margin-bottom: 40px;
  }

  button {
    width: 100%;
    text-align: center;
    padding: 17px 0;
    color: #fff;
    background: rgba(39, 174, 96, 0.7);
    border-radius: 6px;
    border: none;
  }

  button:disabled {
    background-color: #a6a6a6;
    cursor: not-allowed;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;

  input {
    padding: 5px;
    width: 50px;
    height: 50px;
    text-align: center;
    background: #fbfbfb;
    border: 0.5px solid #27ae60;
    border-radius: 8px;
    font-size: 28px;
    color: #4a5568;
  }

  input:focus {
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
