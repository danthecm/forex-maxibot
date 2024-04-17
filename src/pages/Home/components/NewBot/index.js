import useInput from "../../../../hooks/use-input";
import useAxiosPrivate from "../../../../hooks/use-axios-private";
import { StyledNewBot, AddButton, Form } from "./Styled";
import useAuth from "../../../../hooks/use-auth";
import { newBotReq } from "../../../../services/bot";
import InputField from "../../../../components/InputField";
import { InputError, Select } from "../../../../components/FormContorls";

const NewBot = ({ close }) => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const {
    value: enteredSymbol,
    inputBlurHandler: symbolIsBlured,
    valueChangedHandler: symbolIsChanged,
    isValid: symbolIsValid,
    hasError: symbolHasError,
  } = useInput(
    (value) => value.trim() !== "" && value !== "DEFAULT",
    "DEFAULT"
  );
  const gridIntHook = useInput((value) => value.trim() !== "");
  const { value: enteredGridInt, isValid: gridIntIsValid } = gridIntHook;
  const volumeHook = useInput((value) => value.trim() !== "");
  const { value: enteredVolume, isValid: volumeIsValid } = volumeHook;
  const tpHook = useInput((value) => value.trim() !== "");
  const { value: enteredTP, isValid: tpIsValid } = tpHook;
  const profitMarginHook = useInput((value) => value.trim() !== "");
  const { value: enteredProfitMargin, isValid: profitMarginIsValid } =
    profitMarginHook;
  const pipMarginHook = useInput((value) => value.trim() !== "");
  const { value: enteredPipMargin, isValid: pipMarginIsValid } = pipMarginHook;

  const ratioHook = useInput(
    (value) => value.trim() !== "" && Number(value) >= 0 && Number(value) <= 100
  );
  const { value: enteredRatio, isValid: ratioIsValid } = ratioHook;

  const formIsValid =
    gridIntIsValid &&
    volumeIsValid &&
    tpIsValid &&
    pipMarginIsValid &&
    profitMarginIsValid &&
    ratioIsValid &&
    symbolIsValid;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const botInfo = {
      symbol: enteredSymbol,
      grid_interval: enteredGridInt,
      pip_margin: enteredPipMargin,
      volume: enteredVolume,
      take_profit: enteredTP,
      status: "running",
      profit_margin: enteredProfitMargin,
      ratio: enteredRatio,
      profile: auth.user.trade_profile[0].id,
    };
    newBotReq(axiosPrivate, botInfo);
  };

  return (
    <StyledNewBot>
      <Form onSubmit={formSubmitHandler}>
        <Select
          onBlur={symbolIsBlured}
          onChange={symbolIsChanged}
          value={enteredSymbol}
          error={symbolHasError}
          bg="#f1f1f1"
        >
          <option value="DEFAULT" disabled hidden>
            --Select Pair---
          </option>
          <option value="EURUSD">EURUSD</option>
          <option value="GBPUSD">GBPUSD</option>
          <option value="EURJPY">EURJPY</option>
        </Select>
        {symbolHasError ? <InputError>Please select a symbol</InputError> : ""}
        <InputField
          hook={gridIntHook}
          value={enteredGridInt}
          type="number"
          placeholder="Enter Grid Interval"
          message="Grid Interval cannot be empty"
          bg="#f1f1f1"
        />

        <InputField
          hook={volumeHook}
          value={enteredVolume}
          type="number"
          placeholder="Enter Volume / Size"
          step="0.01"
          message="Volume cannot be empty"
          bg="#f1f1f1"
        />

        <InputField
          hook={tpHook}
          value={enteredTP}
          type="number"
          placeholder="Enter Take Profit"
          step="0.01"
          message="Take Profit cannot be empty"
          bg="#f1f1f1"
        />

        <InputField
          hook={profitMarginHook}
          value={enteredProfitMargin}
          type="number"
          placeholder="Enter Profit Margin"
          step="0.01"
          message="Trade Close Margin cannot be empty"
          bg="#f1f1f1"
        />

        <InputField
          hook={ratioHook}
          value={enteredRatio}
          type="number"
          placeholder="Enter Ratio"
          message="Ratio cannot be empty and must be between 0 and 100"
          bg="#f1f1f1"
        />

        <InputField
          hook={pipMarginHook}
          value={enteredPipMargin}
          type="number"
          placeholder="Enter Pip Margin"
          step="0.01"
          message="Pip Margin cannot be empty"
          bg="#f1f1f1"
        />

        <AddButton disabled={!formIsValid} type="submit">
          Add New
        </AddButton>
      </Form>
    </StyledNewBot>
  );
};

export default NewBot;
