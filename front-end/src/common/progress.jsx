import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginLeft: "30%",
    marginTop: theme.spacing(30)
  },
  text: {
    marginRight: theme.spacing(5)
  }
}));

export default function Progress() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant="h4">
        Loading...
      </Typography>
      <CircularProgress />
    </div>
  );
}
