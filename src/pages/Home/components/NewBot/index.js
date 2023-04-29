import useInput from "../../../../hooks/use-input";
import {
  StyledNewBot,
  Input,
  InputError,
  AddButton,
  Form,
  Select,
} from "./Styled";

const NewBot = () => {
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

  const {
    value: enteredGridInt,
    inputBlurHandler: gridIntBlurHandler,
    valueChangedHandler: gridIntChangedHandler,
    isValid: gridIntIsValid,
    hasError: gridIntHasError,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredVolume,
    inputBlurHandler: volumeBlurHandler,
    valueChangedHandler: volumeChangedHandler,
    isValid: volumeIsValid,
    hasError: volumeHasError,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredTP,
    inputBlurHandler: tpBlurHandler,
    valueChangedHandler: tpChangedHandler,
    isValid: tpIsValid,
    hasError: tpHasError,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredTradeSkip,
    inputBlurHandler: tradeSkipBlurHandler,
    valueChangedHandler: tradeSkipChangedHanlder,
    isValid: tradeSkipIsValid,
    hasError: tradeSkipHasError,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredProfitMargin,
    inputBlurHandler: profitMarginBlurHandler,
    valueChangedHandler: profitMarginChangedHandler,
    isValid: profitMarginIsValid,
    hasError: profitMarginHasError,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPipMargin,
    inputBlurHandler: pipMarginBlurHandler,
    valueChangedHandler: pipMarginChangedHandler,
    isValid: pipMarginIsValid,
    hasError: pipMarginHasError,
  } = useInput((value) => value.trim() !== "");

  const formIsValid =
    gridIntIsValid &&
    volumeIsValid &&
    tpIsValid &&
    tradeSkipIsValid &&
    pipMarginIsValid &&
    profitMarginIsValid;

  return (
    <StyledNewBot>
      <Form>
        <Select
          onBlur={symbolIsBlured}
          onChange={symbolIsChanged}
          value={enteredSymbol}
          error={symbolHasError}
        >
          <option value="DEFAULT" disabled hidden>
            --Select Pair---
          </option>
          <option value="EURUSD">EURUSD</option>
          <option value="GBPUSD">GBPUSD</option>
          <option value="EURJPY">EURJPY</option>
        </Select>
        {symbolHasError ? <InputError>Please select a symbol</InputError> : ""}
        <Input
          error={gridIntHasError}
          onChange={gridIntChangedHandler}
          onBlur={gridIntBlurHandler}
          value={enteredGridInt}
          type="number"
          placeholder="Enter Grid Interval"
        />
        {gridIntHasError ? (
          <InputError>Grid Interval cannot be empty</InputError>
        ) : (
          ""
        )}

        <Input
          error={volumeHasError}
          onChange={volumeChangedHandler}
          onBlur={volumeBlurHandler}
          value={enteredVolume}
          type="number"
          placeholder="Enter Volume / Size"
          step="0.01"
        />
        {volumeHasError ? <InputError>Volume cannot be empty</InputError> : ""}

        <Input
          error={tpHasError}
          onChange={tpChangedHandler}
          onBlur={tpBlurHandler}
          value={enteredTP}
          type="number"
          placeholder="Enter Take Profit"
          step="0.01"
        />
        {tpHasError ? <InputError>Take Profit cannot be empty</InputError> : ""}

        <Input
          error={tradeSkipHasError}
          onChange={tradeSkipChangedHanlder}
          onBlur={tradeSkipBlurHandler}
          value={enteredTradeSkip}
          type="number"
          placeholder="Enter Trade Skip"
          step="0.01"
        />
        {tradeSkipHasError ? (
          <InputError>Trade Close Margin cannot be empty</InputError>
        ) : (
          ""
        )}

        <Input
          error={profitMarginHasError}
          onChange={profitMarginChangedHandler}
          onBlur={profitMarginBlurHandler}
          value={enteredProfitMargin}
          type="number"
          placeholder="Enter Profit Margin"
          step="0.01"
        />
        {profitMarginHasError ? (
          <InputError>Trade Close Margin cannot be empty</InputError>
        ) : (
          ""
        )}

        <Input
          error={pipMarginHasError}
          onChange={pipMarginChangedHandler}
          onBlur={pipMarginBlurHandler}
          value={enteredPipMargin}
          type="number"
          placeholder="Enter Pip Margin"
          step="0.01"
        />
        {pipMarginHasError ? (
          <InputError>Pip Margin cannot be empty</InputError>
        ) : (
          ""
        )}

        <AddButton disabled={!formIsValid} type="submit">
          Add New
        </AddButton>
      </Form>
    </StyledNewBot>
  );
};

export default NewBot;
