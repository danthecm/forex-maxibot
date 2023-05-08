import styled from "styled-components";

export const StyledNewBot = styled.section`
  margin-top: 20px;
  width: ${({ width }) => (width ? width : "365px")};
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
