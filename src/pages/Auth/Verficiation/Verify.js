import styled from "styled-components";

const Verify = () => {
  return (
    <StyledVerify>
      <h1>Enter Email Verification Code</h1>
      <form>
        <InputWrapper>
          <input type="number" max="1" />
          <input type="number" max="1" />
          <input type="number" max="1" />
          <input type="number" max="1" />
        </InputWrapper>
        <button type="submit">Verify</button>
      </form>
    </StyledVerify>
  );
};
export default Verify;

const StyledVerify = styled.div`
  grid-column: span 2;
  justify-self: center;
  height: 300px;
  width: 600px;
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
`;

const InputWrapper = styled.form`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;

  input {
    padding: 5px;
    width: 50px;
    height: 50px;
    text-align: center;
    border: 1px solid #27ae60;
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
