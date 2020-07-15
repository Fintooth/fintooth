import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { CURRENT_USER_ACTIONS } from "./redux/constants";

import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import AdminView from "./admin-view/layout";
import UserSettingsForm from "./settings-view/user-settings";

function App({ addUserData, removeUserData }) {
  React.useEffect(() => {
    const localCurrentUserString = localStorage.getItem("currentUser");
    if (localCurrentUserString) {
      const localCurrentUser = JSON.parse(localCurrentUserString);
      if (localCurrentUser.expiry < Date.now()) {
        localStorage.removeItem("currentUser");
        removeUserData();
      } else {
        addUserData({
          user: localCurrentUser.user,
          token: localCurrentUser.token,
        });
      }
    } else {
      removeUserData();
    }
  }, [addUserData, removeUserData]);

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
    addUserData: (userData) =>
      dispatch({ type: CURRENT_USER_ACTIONS.SET_CURRENT_USER, userData }),
    removeUserData: () =>
      dispatch({ type: CURRENT_USER_ACTIONS.UNSET_CURRENT_USER }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
