import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/redux/configureStore";

import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
