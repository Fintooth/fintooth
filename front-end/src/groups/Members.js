import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 355,
  },
  button: {
    marginBottom: 20,
    textAlign: "center",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Members({ members = [], url }) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={() => {
          history.push(url + "/add-member");
        }}
      >
        Add member
      </Button>
      {members.map((member, ind) => (
        <Card key={"member" + ind} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {member.email.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={member.email}
          />
        </Card>
      ))}
    </>
  );
}
