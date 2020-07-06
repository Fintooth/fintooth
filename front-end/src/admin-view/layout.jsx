import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

import ToolBar from "../common/toolbar";
import UserTable from "./user-table";
import Progress from "../common/progress";
import GroupsTable from "./groups-table";
import { SAGA_USER_ACTIONS, SAGA_GROUP_ACTIONS } from "../redux/constants";

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
  let location = useLocation();
  const page = location.pathname.split("/").slice(-1)[0];
  //console.log(page);

  const { getUsers, getGroups, request } = props;

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (page === "users") {
        getUsers();
      } else {
        getGroups();
      }
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
      if (page === "groups") {
        return <GroupsTable {...props} />;
      } else {
        return <UserTable {...props} />;
      }
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
  users: state.users,
  groups: state.groups,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch({ type: SAGA_USER_ACTIONS.GET_USERS_ASYNC }),
  addUser: user =>
    dispatch({ type: SAGA_USER_ACTIONS.ADD_USER_ASYNC, user: user }),
  updateUser: user =>
    dispatch({ type: SAGA_USER_ACTIONS.MODIFY_USER_ASYNC, user }),
  deleteUser: userId =>
    dispatch({ type: SAGA_USER_ACTIONS.REMOVE_USER_ASYNC, userId }),

  getGroups: () => dispatch({ type: SAGA_GROUP_ACTIONS.GET_GROUPS_ASYNC })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
