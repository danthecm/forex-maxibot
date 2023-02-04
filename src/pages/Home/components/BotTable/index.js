import React, { useEffect, useMemo, useState } from "react";
import { Table, TD, TR } from "./Styled";
import Modal from "../../../../components/Modal";
import EditBot from "../EditBot";
import useAxiosPrivate from "../../../../hooks/use-axios-private";
import useAuth from "../../../../hooks/use-auth";

const BOT_URL = "bot/";

const BotTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [bot, setBot] = useState({});
  const [bots, setBots] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const token = useMemo(() => auth.accessToken, [auth]);
  const editButtonHandler = (event) => {
    const editBot = JSON.parse(event?.target?.value);
    setBot(editBot);
    setShowModal(true);
    console.log("Edit bot", editBot);
  };

  useEffect(() => {
    setIsFetching(true);

    const fetchBots = async () => {
      try {
        const botReq = await axiosPrivate.get(BOT_URL);
        if (botReq.status !== 200) {
          setIsFetching(false);
          return;
        }
        const data = await botReq.data;
        setBots(data);
        setIsFetching(false);
      } catch (error) {
        console.log("Error loading bot", error);
        setIsFetching(false);
      }
    };

    fetchBots();
  }, [token, axiosPrivate]);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Pairs</th>
            <th>strategy</th>
            <th>quantity</th>
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
              <TR key={bot.id}>
                <TD>{index + 1}</TD>
                <TD>{bot.symbol}</TD>
                <TD>{bot.strategy || "Grid"}</TD>
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
