import useInput from "../../../../hooks/use-input";
import useAuth from "../../../../hooks/use-auth";
import axios from "../../../../config/axios";
import { toast } from "react-toastify";
import {
  StyledNewBot,
  Input,
  InputError,
  AddButton,
  Form,
} from "../NewBot/Styled";

const EditBot = ({ bot, close }) => {
  const { auth } = useAuth();
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

  const {
    value: enteredPipMargin,
    inputBlurHandler: pipMarginBlurHandler,
    valueChangedHandler: pipMarginChangedHandler,
    isValid: pipMarginIsValid,
    hasError: pipMarginHasError,
  } = useInput((value) => value.trim() !== "", `${bot.pip_margin}`);

  const formIsValid =
    gridIntIsValid &&
    volumeIsValid &&
    tpIsValid &&
    tradeCloseIsValid &&
    pipMarginIsValid &&
    statusIsValid;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const updating = toast.loading("Updating...");
    const botInfo = {
      grid_interval: enteredGridInt,
      close_trade: enteredTradeClose,
      pip_margin: enteredPipMargin,
      volume: enteredVolume,
      take_profit: enteredTP,
      status: enteredStatus,
    };

    const updateBot = async () => {
      try {
        const updateReq = await axios.patch(`bot/${bot.id}/`, botInfo, {
          headers: {
            Authorization: "Bearer " + auth.accessToken,
          },
          withCredentials: true,
        });
        toast.update(updating, {
          render: "Successfully Updated Bot",
          type: "success",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        console.log(updateReq.status, updateReq.data);
        setTimeout(() => {
          window.location.reload();
        }, 4000)
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
    close()


  };

  return (
    <StyledNewBot>
      <Form onSubmit={formSubmitHandler}>
        <label>Grid Interval:</label>
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
        {volumeHasError ? <InputError>Volume cannot be empty</InputError> : ""}
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
        {tpHasError ? <InputError>Take Profit cannot be empty</InputError> : ""}
        <label>Close Margin:</label>
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
