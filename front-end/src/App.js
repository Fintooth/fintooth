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
      <div>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}