import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import ChartElement from "./ChartElement";

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 290,
    paddingBottom: 40,
    marginBottom: 30,
  },
}));

export default function Chart({ activitiesToShow }) {
  const classes = useStyles();
  const cumulativeSum = ((sum) => (value) => (sum += value))(0);

  const objectDataLastMonth = activitiesToShow
    .filter((act) => {
      const d = new Date(act.date);
      const n = new Date();
      return (
        d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
      );
    })
    .map((act) => {
      const d = new Date(act.date);
      let amount = 0;
      if (act.type === "Expenditure") amount = -act.amount;
      if (act.type === "Income") amount = act.amount;
      return { date: d.getDate(), amount };
    })
    .reduce((all, { date: d, amount: a }) => {
      all[d] = (all[d] || 0) + a;
      return all;
    }, {});

  const objectData = activitiesToShow
    .map((act) => {
      const d = new Date(act.date);
      let amount = 0;
      if (act.type === "Expenditure") amount = -act.amount;
      if (act.type === "Income") amount = act.amount;
      return { date: d.getDate(), amount };
    })
    .reduce((all, { date: d, amount: a }) => {
      all[d] = (all[d] || 0) + a;
      return all;
    }, {});

  return (
    <>
      <Paper className={classes.fixedHeight}>
        {/* Daily balance */}
        <ChartElement
          title="Daily balance by date"
          yLabel="Daily balance"
          data={Object.entries(objectDataLastMonth).map((arr) => {
            return { date: arr[0], amount: arr[1] };
          })}
        />
      </Paper>
      {/* Daily balance cumulative */}
      <Paper className={classes.fixedHeight}>
        <ChartElement
          title="Daily balance by date cumulative"
          yLabel="Daily balance cumulative"
          data={Object.entries(objectDataLastMonth).map((arr) => {
            return { date: arr[0], amount: cumulativeSum(arr[1]) };
          })}
        />
      </Paper>
      <Paper className={classes.fixedHeight}>
        {/* Balance */}
        <ChartElement
          title="Balance by date"
          yLabel="Balance"
          data={Object.entries(objectData).map((arr) => {
            return { date: arr[0], amount: arr[1] };
          })}
        />
      </Paper>
      {/* Balance cumulative */}
      <Paper className={classes.fixedHeight}>
        <ChartElement
          title="Balance by date cumulative"
          yLabel="Balance cumulative"
          data={Object.entries(objectData).map((arr) => {
            return { date: arr[0], amount: cumulativeSum(arr[1]) };
          })}
        />
      </Paper>
    </>
  );
}
