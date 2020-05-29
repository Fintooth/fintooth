import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import ToolBar from "../common/toolbar";
import UserTable from "./table";
import Progress from "../common/progress";
import { SAGA_USER_ACTIONS } from "../redux/constants";

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

  const { getUsers, request } = props;

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      getUsers();
    }

    return () => {
      mounted = false;
    };
  }, [getUsers]);

  const requestStatus = () => {
    if (request.fetching) {
      return <Progress />;
    } else if (request.error) {
      return <h2 className={classes.errorMessage}>{request.error}</h2>;
    } else {
      return <UserTable {...props} />;
    }
  };

  return (
    <div className={classes.root}>
      <ToolBar title="User Controll Center" element={requestStatus()} />
    </div>
  );
};

const mapStateToProps = state => ({
  request: state.request,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch({ type: SAGA_USER_ACTIONS.GET_USERS_ASYNC }),
  addUser: user =>
    dispatch({ type: SAGA_USER_ACTIONS.ADD_USER_ASYNC, user: user }),
  updateUser: user =>
    dispatch({ type: SAGA_USER_ACTIONS.MODIFY_USER_ASYNC, user }),
  deleteUser: userId =>
    dispatch({ type: SAGA_USER_ACTIONS.REMOVE_USER_ASYNC, userId })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
