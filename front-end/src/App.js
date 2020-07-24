import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  CURRENT_USER_ACTIONS,
  USER_ACTIONS,
  SAGA_USER_ACTIONS,
} from "./redux/constants";

import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import AdminView from "./admin-view/layout";
import UserSettingsForm from "./settings-view/user-settings";
import CreateGroupForm from "./common/group-form";
import Group from "./groups/Group";

function App({ setToken, removeUserData, getCurrentUser }) {
  React.useEffect(() => {
    const localCurrentUserString = localStorage.getItem("currentUser");
    if (localCurrentUserString) {
      const localCurrentUser = JSON.parse(localCurrentUserString);
      if (localCurrentUser.expiry < Date.now()) {
        localStorage.removeItem("currentUser");
        removeUserData();
      } else {
        setToken(localCurrentUser.token);
        getCurrentUser(localCurrentUser.user.id);
      }
    } else {
      removeUserData();
    }
  }, [setToken, getCurrentUser, removeUserData]);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/admin-view/users">
          <AdminView />
        </Route>
        <Route path="/admin-view/groups">
          <AdminView />
        </Route>
        <Route path="/settings">
          <UserSettingsForm />
        </Route>
        <Route path="/polls">
          <CreateGroupForm userId="5f034c0eebf38f58181bd243" />
        </Route>
        <Route path="/groups/:groupId">
          <Group />
        </Route>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: (userId) =>
      dispatch({ type: SAGA_USER_ACTIONS.GET_CURRENT_USER_ASYNC, userId }),
    setToken: (token) =>
      dispatch({ type: CURRENT_USER_ACTIONS.SET_CURRENT_USER_TOKEN, token }),
    removeUserData: () =>
      dispatch({ type: CURRENT_USER_ACTIONS.UNSET_CURRENT_USER }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
