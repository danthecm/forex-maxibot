import { useEffect } from "react";
import useInput from "../../../../hooks/use-input";
import {
  StyledNewBot,
  Input,
  InputError,
  AddButton,
  Form,
} from "../NewBot/Styled";

const EditBot = ({ bot }) => {
  const {
    value: enteredGridInt,
    inputBlurHandler: gridIntBlurHandler,
    valueChangedHandler: gridIntChangedHandler,
    isValid: gridIntIsValid,
    hasError: gridIntHasError,
  } = useInput((value) => value.trim() !== "", `${bot.grid_interval}`);

  const {
    value: enteredVolume,
    inputBlurHandler: volumeBlurHandler,
    valueChangedHandler: volumeChangedHandler,
    isValid: volumeIsValid,
    hasError: volumeHasError,
  } = useInput((value) => value.trim() !== "", `${bot.volume}`);

  const {
    value: enteredTP,
    inputBlurHandler: tpBlurHandler,
    valueChangedHandler: tpChangedHandler,
    isValid: tpIsValid,
    hasError: tpHasError,
  } = useInput((value) => value.trim() !== "", `${bot.take_profit}`);

  const {
    value: enteredTradeClose,
    inputBlurHandler: tradeCloseBlurHandler,
    valueChangedHandler: tradeCloseChangedHandler,
    isValid: tradeCloseIsValid,
    hasError: tradeCloseHasError,
  } = useInput((value) => value.trim() !== "", `${bot.close_trade}`);

  const {
    value: enteredStatus,
    inputBlurHandler: statusBlurHandler,
    valueChangedHandler: statusChangedHandler,
    isValid: statusIsValid,
    hasError: statusHasError,
  } = useInput((value) => value.trim() !== "", `${bot.status}`);

  const formIsValid =
    gridIntIsValid && volumeIsValid && tpIsValid && tradeCloseIsValid && statusIsValid;

  return (
    <StyledNewBot>
      <Form>
        <label>Grid Interval</label>
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
        <label>Volume</label>
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
        <label>Take Profit</label>
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
        <label>Close Margin</label>
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
        <label>Status</label>
        <Input
          error={statusHasError}
          onChange={statusChangedHandler}
          onBlur={statusBlurHandler}
          value={enteredStatus}
          type="text"
          placeholder="Set Bot Status"
        />
        {statusHasError ? (
          <InputError>Trade Close Margin cannot be empty</InputError>
        ) : (
          ""
        )}

        <AddButton disabled={!formIsValid} type="submit">
          Edit
        </AddButton>
      </Form>
    </StyledNewBot>
  );
};

export default EditBot;
