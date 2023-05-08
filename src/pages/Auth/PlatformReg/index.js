import React from "react";
import { Card } from "../../../components/Auth/Styled";
import AddPlatformForm from "../../../components/Auth/AddPlatformForm";

const PlatformReg = () => {
  return (
    <>
      <>
        <section className="intro">
          <h2>Almost There</h2>
          <p className="subText">
            Please Provide your MT5 Trading Platform Details to be linked to the
            bot an enjoy access to all our tools
          </p>
        </section>
        <section>
          <p className="title">
            <span>Add a Trading Profile</span> to continue
          </p>
          <Card>
            <AddPlatformForm />{" "}
          </Card>
        </section>
      </>
    </>
  );
};

export default PlatformReg;
