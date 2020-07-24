import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Accounts({
  account,
  setActivities,
  activities,
  accountToView,
  setAccountToView,
}) {
  function handleViewActivities(accId) {
    if (accId !== accountToView) {
      setAccountToView(accId);
      setActivities(
        activities.filter(
          (activity) =>
            activity.accountSrc === accId || activity.accountDest === accId
        )
      );
    } else {
      setAccountToView("");
      setActivities([...activities]);
    }
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{account.name}</Title>
      <Typography component="p" variant="h4">
        {parseFloat(account.amount).toFixed(2)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {account.type} {account.type === "bank" && account.bankAccType}
      </Typography>
      <div>
        <Link
          color={accountToView === account._id ? "secondary" : "primary"}
          href="#"
          onClick={(event) => {
            event.preventDefault();
            handleViewActivities(account._id);
          }}
        >
          {accountToView === account._id
            ? "Clear"
            : "Select account's activities"}
        </Link>
      </div>
    </React.Fragment>
  );
}
