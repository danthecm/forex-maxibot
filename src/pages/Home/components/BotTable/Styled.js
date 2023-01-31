import styled from "styled-components";

export const Table = styled.table`
  grid-column: span 2;
  text-align: center;
  overflow-x: scroll;

  thead {
    height: 35px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #4a5568;
    background: #edf2f7;
    text-transform: capitalize;
  }

`;

export const TR = styled.tr`
  height: 60px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  /* 600 */

  color: #718096;
`;

export const TD = styled.td`
 border-bottom: 1px solid #e2e8f0;
`
