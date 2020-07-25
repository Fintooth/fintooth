import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PeopleIcon from "@material-ui/icons/People";
import EuroIcon from "@material-ui/icons/Euro";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import TimelineIcon from "@material-ui/icons/Timeline";
import PollIcon from "@material-ui/icons/Poll";
import Button from "@material-ui/core/Button";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";

export const MainListItems = () => {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  let history = useHistory();

  return /(^\/dashboard$|^\/groups\/[\w]+$)/.test(url) ? (
    <div>
      <ListItem
        button
        onClick={() => history.push(url + "/activity-manager")}
        selected={pathname.includes("activity-manager")}
      >
        <ListItemIcon>
          <EuroIcon />
        </ListItemIcon>
        <ListItemText primary="Activity Manager" />
      </ListItem>
      <ListItem
        button
        onClick={() => history.push(url + "/charts")}
        selected={pathname.includes("charts")}
      >
        <ListItemIcon>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Charts" />
      </ListItem>
      <ListItem
        button
        onClick={() => history.push(url + "/account-editor")}
        selected={pathname.includes("account-editor")}
      >
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Account editor" />
      </ListItem>
      {/^\/groups\/[\w]+$/.test(url) && (
        <>
          <ListItem
            button
            onClick={() => history.push(url + "/account-editor")}
            selected={pathname.includes("polls")}
          >
            <ListItemIcon>
              <PollIcon />
            </ListItemIcon>
            <ListItemText primary="Polls" />
          </ListItem>
          <ListItem
            button
            onClick={() => history.push(url + "/account-editor")}
            selected={pathname.includes("members")}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItem>
        </>
      )}
    </div>
  ) : (
    ""
  );
};

export const SecondaryListItems = ({ groups }) => {
  const { url } = useRouteMatch();
  let history = useHistory();

  return (
    <div>
      <ListItem button onClick={() => history.push("/create-group")}>
        <ListItemIcon>+</ListItemIcon>
        <ListItemText primary="Create group" />
      </ListItem>
      <ListItem
        button
        onClick={() => history.push("/dashboard")}
        selected={url.includes("dashboard")}
      >
        <ListItemIcon>D</ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      {groups &&
        groups.map(({ name, _id }, ind) => (
          <ListItem
            key={"listItem" + ind}
            button
            onClick={() => history.push("/groups/" + _id)}
            selected={url.includes(_id)}
          >
            <ListItemIcon>{"G" + (ind + 1)}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
    </div>
  );
};
