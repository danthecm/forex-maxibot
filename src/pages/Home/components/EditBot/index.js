import useInput from "../../../../hooks/use-input";
import { toast } from "react-toastify";
import {
  StyledNewBot,
  Input,
  InputError,
  AddButton,
  Form,
} from "../NewBot/Styled";
import useAxiosPrivate from "../../../../hooks/use-axios-private";

const EditBot = ({ bot, close, setBots }) => {
  const axiosPrivate = useAxiosPrivate();
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
    value: enteredSkip,
    inputBlurHandler: skipBlurHandler,
    valueChangedHandler: skipChangedHandler,
    isValid: skipIsValid,
    hasError: skipHasError,
  } = useInput((value) => value.trim() !== "", `${bot.skip}`);

  const {
    value: enteredStatus,
    inputBlurHandler: statusBlurHandler,
    valueChangedHandler: statusChangedHandler,
    isValid: statusIsValid,
    hasError: statusHasError,
  } = useInput((value) => value.trim() !== "", `${bot.status}`);

  const {
    value: enteredPipMargin,
    inputBlurHandler: pipMarginBlurHandler,
    valueChangedHandler: pipMarginChangedHandler,
    isValid: pipMarginIsValid,
    hasError: pipMarginHasError,
  } = useInput((value) => value.trim() !== "", `${bot.pip_margin}`);

  const {
    value: enteredProfitMargin,
    inputBlurHandler: profitMarginBlurHandler,
    valueChangedHandler: profitMarginChangedHandler,
    isValid: profitMarginIsValid,
    hasError: profitMarginHasError,
  } = useInput((value) => value.trim() !== "", `${bot.min_combo}`);

  const {
    value: enteredEquity,
    inputBlurHandler: equityBlurHandler,
    valueChangedHandler: equityChangedHandler,
    isValid: equityIsValid,
    hasError: equityHasError,
  } = useInput((value) => value.trim() !== "", `${bot.equity}`);

  const {
    value: enteredMinCombo,
    inputBlurHandler: minComboBlurHandler,
    valueChangedHandler: minComboChangedHandler,
    isValid: minComboIsValid,
    hasError: minComboHasError,
  } = useInput((value) => value.trim() !== "", `${bot.equity}`);

  const formIsValid =
    gridIntIsValid &&
    volumeIsValid &&
    tpIsValid &&
    skipIsValid &&
    pipMarginIsValid &&
    statusIsValid &&
    equityIsValid &&
    profitMarginIsValid &&
    minComboIsValid;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const updating = toast.loading("Updating...");
    const botInfo = {
      grid_interval: enteredGridInt,
      skip: enteredSkip,
      pip_margin: enteredPipMargin,
      volume: enteredVolume,
      take_profit: enteredTP,
      status: enteredStatus,
      equity: enteredEquity,
      profit_margin: enteredProfitMargin,
      min_combo: enteredMinCombo,
    };

    const updateBot = async () => {
      try {
        await axiosPrivate.patch(`bot/${bot.id}/`, botInfo);
        setBots((prev) => {
          const newBot = prev.filter((value) => value.id !== bot.id);
          newBot.push({ ...bot, ...botInfo });
          return newBot;
        });
        toast.update(updating, {
          render: "Successfully Updated Bot",
          type: "success",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
      } catch (e) {
        toast.update(updating, {
          render: "Error Updating Bot",
          type: "error",
          isLoading: false,
          closeButton: true,
          autoClose: true,
        });
      }
    };
    updateBot();
    close();
  };

  return (
    <StyledNewBot width="800px">
      <Form layout="1fr 1fr" onSubmit={formSubmitHandler}>
        <div>
          <label>Grid Interval:</label>
          <Input
            error={gridIntHasError}
            onChange={gridIntChangedHandler}
            onBlur={gridIntBlurHandler}
            value={enteredGridInt}
            type="number"
            placeholder="Enter Grid Interval"
          />
        </div>
        {gridIntHasError ? (
          <InputError>Grid Interval cannot be empty</InputError>
        ) : (
          ""
        )}
        <div>
          <label>Volume:</label>
          <Input
            error={volumeHasError}
            onChange={volumeChangedHandler}
            onBlur={volumeBlurHandler}
            value={enteredVolume}
            type="number"
            placeholder="Enter Volume/Quantity"
            step="0.01"
          />
        </div>
        {volumeHasError ? <InputError>Volume cannot be empty</InputError> : ""}
        <div>
          <label>Take Profit:</label>
          <Input
            error={tpHasError}
            onChange={tpChangedHandler}
            onBlur={tpBlurHandler}
            value={enteredTP}
            type="number"
            placeholder="Enter Take Profit"
            step="0.01"
          />
        </div>
        {tpHasError ? <InputError>Take Profit cannot be empty</InputError> : ""}
        <div>
          <label>Trade Skip:</label>
          <Input
            error={skipHasError}
            onChange={skipChangedHandler}
            onBlur={skipBlurHandler}
            value={enteredSkip}
            type="number"
            placeholder="Enter Trade Close Margin"
            step="0.01"
          />
        </div>

        {skipHasError ? (
          <InputError>Trade Skip cannot be empty</InputError>
        ) : (
          ""
        )}
        <div>
          <label>Pip Margin:</label>
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
        </div>

        <div>
          <label>Equity:</label>
          <Input
            error={equityHasError}
            onChange={equityChangedHandler}
            onBlur={equityBlurHandler}
            value={enteredEquity}
            type="number"
            placeholder="Enter Equity"
            step="0.001"
          />
          {pipMarginHasError ? (
            <InputError>Trade Close Margin cannot be empty</InputError>
          ) : (
            ""
          )}
        </div>

        <div>
          <label>Profit Margin:</label>
          <Input
            error={profitMarginHasError}
            onChange={profitMarginChangedHandler}
            onBlur={profitMarginBlurHandler}
            value={enteredProfitMargin}
            type="number"
            placeholder="Enter Pip Margin"
            step="0.01"
          />
          {profitMarginHasError ? (
            <InputError>Profit Margin cannot be empty</InputError>
          ) : (
            ""
          )}
        </div>

        <div>
          <label>Min Combo:</label>
          <Input
            error={minComboHasError}
            onChange={minComboChangedHandler}
            onBlur={minComboBlurHandler}
            value={enteredMinCombo}
            type="number"
            placeholder="Enter Min Combo"
            step="0.01"
          />
          {minComboHasError ? (
            <InputError>Min Combo cannot be empty</InputError>
          ) : (
            ""
          )}
        </div>

        <div>
          <label>Status</label>
          <Input
            error={statusHasError}
            onChange={statusChangedHandler}
            onBlur={statusBlurHandler}
            value={enteredStatus}
            type="text"
            placeholder="Set Bot Status"
          />
        </div>
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
