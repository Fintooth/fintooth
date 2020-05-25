import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import ToolBar from "../common/toolbar";
import UserTable from "./table";
import Progress from "../common/progress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  errorMessage: {
    marginTop: theme.spacing(20),
    marginLeft: "35%"
  }
}));

const AdminView = props => {
  const classes = useStyles();

  React.useEffect(() => {
    props.dispatch({ type: "GET_USERS_ASYNC" });
  }, []);

  const requestStatus = () => {
    if (props.request.fetching) {
      return <Progress />;
    } else if (props.request.error) {
      return <h2 className={classes.errorMessage}>{props.request.error}</h2>;
    } else {
      return <UserTable users={props.users} />;
    }
  };

  return (
    <div className={classes.root}>
      <ToolBar title="User Controll Center" />
      {requestStatus()}
    </div>
  );
};

const mapStateToProps = state => ({
  request: state.request,
  users: state.users
});

export default connect(mapStateToProps)(AdminView);
