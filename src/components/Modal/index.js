import { createPortal } from "react-dom";
import styled from "styled-components";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";

const Modal = ({show, hide, title, children}) => {
  return createPortal(
    <StyledModal
      role="dialog"
      aria-labelledby="dialog1Title"
      aria-describedby="dialog1Desc"
    >
      <ModalContent>
        <ModalHeading>
          <h2 id="dialog1Title">{title}</h2>
          <Cancel onClick={hide} />
        </ModalHeading>
        <ModalBody>
          <h1>This is an heading now it is going o be a long ttext</h1>
        </ModalBody>
      </ModalContent>
    </StyledModal>,
    document.getElementById("modal")
  );
};
export default Modal;

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalContent = styled.div`
  width: auto;
  height: auto;
  background: #fff;
  padding: 30px 40px;
  border-radius: 20px;
  box-shadow: 0px 5px 8px 5px rgba(17, 17, 17, 0.32);
  max-width: 80%;
`;

const ModalHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  padding: 5px 0;
  margin-bottom: 5px;

  svg {
    color: #6fcf97;
    cursor: pointer;
  }

  svg:hover {
    color: #ff0000;
  }

  h2 {
    font-family: "Montserrat Alternates";
    font-weight: 700;
    font-size: 28px;

    color: #6fcf97;
  }
`;

const ModalBody = styled.div``;
