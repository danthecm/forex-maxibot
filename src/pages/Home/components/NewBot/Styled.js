import styled from "styled-components";

export const StyledNewBot = styled.section`
  margin-top: 20px;
  width: ${({ width }) => (width ? width : "365px")};
`;

export const Input = styled.input`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 35px;

  padding: 6px 16px;
  margin-bottom: 16px;

  background: #f1f1f1;
  border-radius: 5px;
  border: ${({ error }) => (error ? "2px solid hsl(0, 100%, 74%) " : "none")};
  color: #3f567a;

  &::placeholder {
    color: #a69d9d;
  }
  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[type="text"] {
    text-transform: capitalize;
  }
`;

export const Select = styled.select`
  text-align: center;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 35px;

  padding: 6px 16px;
  margin-bottom: 16px;

  background: #f1f1f1;
  border-radius: 5px;
  color: #3f567a;

  border: ${({ error }) => (error ? "2px solid hsl(0, 100%, 74%) " : "none")};

  &::placeholder {
    color: #a69d9d;
  }
  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const InputError = styled.p`
  color: hsl(0, 100%, 74%);
  font-size: 10px;
  font-weight: 600;
  font-style: italic;
  float: right;
  margin-bottom: 10px;
`;

export const AddButton = styled.button`
  width: 100%;
  text-align: center;
  padding: 17px 0;
  color: #fff;
  background: rgba(39, 174, 96, 0.7);
  border-radius: 6px;
  border: none;

  &:disabled {
    background: #a6a6a6;
    cursor: not-allowed;
  }
`;

export const Form = styled.form`
  display: grid;
  width: 100%;
  grid-template-columns: ${({ layout }) => (layout ? layout : "auto")};
  column-gap: 20px;
  justify-content: center;

  button {
    grid-column: ${({ layout }) => (layout ? "span 2" : "1")};
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;
