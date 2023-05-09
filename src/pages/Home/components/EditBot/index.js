import { StyledNewBot, AddButton, Form } from "../NewBot/Styled";
import useAxiosPrivate from "../../../../hooks/use-axios-private";
import { updateBotReq } from "../../../../services/bot";
import InputField from "../../../../components/InputField";
import useInput from "../../../../hooks/use-input";

const EditBot = ({ bot, close, setBots }) => {
  const axiosPrivate = useAxiosPrivate();
  const gridIntHook = useInput(
    (value) => value.trim() !== "",
    `${bot.grid_interval}`
  );
  const { value: enteredGridInt, isValid: gridIntIsValid } = gridIntHook;

  const symbolHook = useInput((value) => value.trim() !== "", `${bot.symbol}`);
  const { value: enteredSymbol, isValid: symbolIsValid } = symbolHook;

  const volumeHook = useInput((value) => value.trim() !== "", `${bot.volume}`);
  const { value: enteredVolume, isValid: volumeIsValid } = volumeHook;
  const tpHook = useInput((value) => value.trim() !== "", `${bot.take_profit}`);
  const { value: enteredTP, isValid: tpIsValid } = tpHook;
  const statusHook = useInput((value) => value.trim() !== "", `${bot.status}`);
  const { value: enteredStatus, isValid: statusIsValid } = statusHook;

  const pipMarginHook = useInput(
    (value) => value.trim() !== "",
    `${bot.pip_margin}`
  );
  const { value: enteredPipMargin, isValid: pipMarginIsValid } = pipMarginHook;

  const profitMarginHook = useInput(
    (value) => value.trim() !== "",
    `${bot.profit_margin}`
  );
  const { value: enteredProfitMargin, isValid: profitMarginIsValid } =
    profitMarginHook;

  const equityHook = useInput((value) => value.trim() !== "", `${bot.equity}`);
  const { value: enteredEquity, isValid: equityIsValid } = equityHook;

  const minComboHook = useInput(
    (value) => value.trim() !== "",
    `${bot.min_combo}`
  );
  const { value: enteredMinCombo, isValid: minComboIsValid } = minComboHook;

  const formIsValid =
    gridIntIsValid &&
    volumeIsValid &&
    tpIsValid &&
    pipMarginIsValid &&
    statusIsValid &&
    equityIsValid &&
    profitMarginIsValid &&
    minComboIsValid &&
    symbolIsValid;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const botInfo = {
      grid_interval: enteredGridInt,
      pip_margin: enteredPipMargin,
      volume: enteredVolume,
      take_profit: enteredTP,
      status: enteredStatus,
      equity: enteredEquity,
      profit_margin: enteredProfitMargin,
      min_combo: enteredMinCombo,
      symbol: enteredSymbol,
    };

    updateBotReq(axiosPrivate, bot.id, botInfo, setBots);
    close();
  };

  return (
    <StyledNewBot width="600px">
      <Form layout="1fr 1fr" onSubmit={formSubmitHandler}>
        <div>
          <label>Symbol:</label>
          <InputField
            hook={symbolHook}
            value={enteredSymbol}
            type="text"
            placeholder="Enter Symbol"
            message="Symbol cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <div>
          <label>Grid Interval:</label>
          <InputField
            hook={gridIntHook}
            value={enteredGridInt}
            type="number"
            placeholder="Enter Grid Interval"
            message="Grid Int cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <div>
          <label>Volume:</label>
          <InputField
            hook={volumeHook}
            value={enteredVolume}
            type="number"
            placeholder="Enter Volume/Quantity"
            step="0.01"
            message="Volume cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <div>
          <label>Take Profit:</label>
          <InputField
            hook={tpHook}
            value={enteredTP}
            type="number"
            placeholder="Enter Take Profit"
            step="0.01"
            message="Take Profit cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <div>
          <label>Pip Margin:</label>
          <InputField
            hook={pipMarginHook}
            value={enteredPipMargin}
            type="number"
            placeholder="Enter Pip Margin"
            step="0.01"
            message="Pip Margin cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <div>
          <label>Equity:</label>
          <InputField
            hook={equityHook}
            value={enteredEquity}
            type="number"
            placeholder="Enter Equity"
            step="0.001"
            message="Equity cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <div>
          <label>Profit Margin:</label>
          <InputField
            hook={profitMarginHook}
            value={enteredProfitMargin}
            type="number"
            placeholder="Enter Pip Margin"
            step="0.01"
            message="Profit Margin cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <div>
          <label>Min Combo:</label>
          <InputField
            hook={minComboHook}
            value={enteredMinCombo}
            type="number"
            placeholder="Enter Min Combo"
            step="0.01"
            message="Min Combo cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <div>
          <label>Status</label>
          <InputField
            hook={statusHook}
            value={enteredStatus}
            type="text"
            placeholder="Set Bot Status"
            message="Status cannot be empty"
            bg="#f1f1f1"
          />
        </div>

        <AddButton disabled={!formIsValid} type="submit">
          Edit
        </AddButton>
      </Form>
    </StyledNewBot>
  );
};

export default EditBot;
