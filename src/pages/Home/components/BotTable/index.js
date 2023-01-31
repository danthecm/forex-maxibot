import React from "react";
import { Table, TD, TR } from "./Styled";

const BotTable = ({ bots, isFetching }) => {
  return (
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
              <TD><button>Edit</button></TD>
            </TR>
          ))
        ) : (
          <TR>
            <TD colSpan={6}>You do not have any bots</TD>
          </TR>
        )}
      </tbody>
    </Table>
  );
};

export default BotTable;
