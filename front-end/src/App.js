import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Login from "./Login"
import Dashboard from "./dashboard/Dashboard"

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <div>
                <Link to="/dashboard">Dashboard</Link>
                <br />
                <Link to="/login">Login</Link>
            </div>
            <Login />
          </Route>
          <Route path="/dashboard">
            <div>
                <Link to="/dashboard">Dashboard</Link>
                <br />
                <Link to="/login">Login</Link>
            </div>
            <Dashboard />
          </Route>
          <Route path="/">
            <div>
                <Link to="/dashboard">Dashboard</Link>
                <br />
                <Link to="/login">Login</Link>
            </div>
          </Route>
        </Switch>
    </Router>
  );
}