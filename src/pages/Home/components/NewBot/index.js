import useInput from "../../../../hooks/use-input";
import { StyledNewBot, Input, InputError, AddNew } from "./Styled";

const NewBot = () => {
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
    value: enteredTradeClose,
    inputBlurHandler: tradeCloseBlurHandler,
    valueChangedHandler: tradeCloseChangedHandler,
    isValid: tradeCloseIsValid,
    hasError: tradeCloseHasError,
  } = useInput((value) => value.trim() !== "");

  const formIsValid =
    gridIntIsValid && volumeIsValid && tpIsValid && tradeCloseIsValid;

  return (
    <StyledNewBot>
      <form>
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
          placeholder="Enter Volume/Quantity"
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
          error={tradeCloseHasError}
          onChange={tradeCloseChangedHandler}
          onBlur={tradeCloseBlurHandler}
          value={enteredTradeClose}
          type="number"
          placeholder="Enter Trade Close Margin"
          step="0.01"
        />
        {tradeCloseHasError ? (
          <InputError>Trade Close Margin cannot be empty</InputError>
        ) : (
          ""
        )}

        <AddNew disabled={!formIsValid} type="submit">
          Add New
        </AddNew>
      </form>
    </StyledNewBot>
  );
};

export default NewBot;
