import { useState } from "react";
import { Table, TD, TR } from "./Styled";
import Modal from "../../../../components/Modal";
import EditBot from "../EditBot";

const BotTable = ({ bots, setBots, isFetching }) => {
  const [showModal, setShowModal] = useState(false);
  const [bot, setBot] = useState({});

  const editButtonHandler = (event) => {
    const editBot = JSON.parse(event?.target?.value);
    setBot(editBot);
    setShowModal(true);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Pairs</th>
            <th>Equity</th>
            <th>Quantity</th>
            <th>Grid Interval</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <TR>
              <TD colSpan={6}>Loading...</TD>
            </TR>
          ) : bots.length ? (
            bots.map((bot, index) => (
              <TR key={index}>
                <TD>{index + 1}</TD>
                <TD>{bot.symbol}</TD>
                <TD>{bot.equity || "Grid"}</TD>
                <TD>{bot.volume}</TD>
                <TD>{bot.grid_interval}</TD>
                <TD>{bot.status}</TD>
                <TD>
                  <button
                    value={JSON.stringify(bot)}
                    onClick={editButtonHandler}
                  >
                    Edit
                  </button>
                </TD>
              </TR>
            ))
          ) : (
            <TR>
              <TD colSpan={6}>You do not have any bots</TD>
            </TR>
          )}
        </tbody>
      </Table>
      <Modal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        title="EDIT BOT"
      >
        <EditBot
          close={() => {
            setShowModal(false);
          }}
          setBots={setBots}
          bot={bot}
        />
      </Modal>
    </>
  );
};

export default BotTable;
