import styled from "styled-components";

export const StyledNewBot = styled.div`
  margin-top: 20px;
  width: 365px;
`;

export const Input = styled.input`
  font-family: "Montserrat Alternates";
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: rgba(39, 174, 96, 0.6);
  padding: 18px 35px;
  margin-bottom: 10px;

  background: rgba(225, 240, 131, 0.37);
  border-radius: 6px;
  border: ${({error}) => error ? "2px solid hsl(0, 100%, 74%) ": "none"};

  &::placeholder {
    color: rgba(39, 174, 96, 0.6);
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
    background: #a6a6a6;;
    cursor: not-allowed;
}

`
