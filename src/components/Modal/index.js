import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

import { ReactComponent as CancelIcon } from "../../assets/cancel.svg";

const Modal = ({ show, close, title, children }) => {
  const modalContentRef = useRef();

  const handleClick = useCallback((e) => {
    if (modalContentRef?.current?.contains(e.target)) {
      return;
    }
    close();
  }, [close]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    //  clean on unmount
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [show, handleClick]);

  return createPortal(
    <>
      {show ? (
        <>
          <Overlay
            role="dialog"
            aria-labelledby="dialog1Title"
            aria-describedby="dialog1Desc"
          >
            <ModalContent ref={modalContentRef}>
              <ModalHeading>
                <h2 id="dialog1Title">{title}</h2>
                <CancelIcon onClick={close} />
              </ModalHeading>
              <ModalBody>{children}</ModalBody>
            </ModalContent>
          </Overlay>
          <ScrollDisabler />
        </>
      ) : null}
    </>,
    document.getElementById("modal")
  );
};
export default Modal;

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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

const ScrollDisabler = createGlobalStyle`
body {
  overflow-y: hidden;
}
`

