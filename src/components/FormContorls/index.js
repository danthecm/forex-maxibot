import styled from "styled-components";

export const Input = styled.input`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 35px;

  padding: 0.5rem 0.7rem;
  margin-bottom: 1rem;

  background: ${({ bg }) => (bg ? bg : "transparent")};
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
`;

export const Select = styled.select`
  width: 100%;
  text-align: center;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 35px;

  padding: 6px 16px;
  margin-bottom: 16px;

  background: ${({ bg }) => (bg ? bg : "transparent")};
  border-radius: 5px;
  color: #3f567a;

  border: ${({ error }) =>
    error ? "2px solid hsl(0, 100%, 74%) " : "3px solid #F3F3F3"};

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
