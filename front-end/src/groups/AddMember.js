import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { SAGA_USER_ACTIONS } from "../redux/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    //backgroundColor: theme.palette.secondary.main,
    height: 200,
    width: 200,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddMember({ groupId, addUserToGroup }) {
  const classes = useStyles();
  let history = useHistory();

  const [userEmail, setUserEmail] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    addUserToGroup(userEmail, groupId);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        Add user to group
        <form onSubmit={submitForm} noValidate>
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="email"
              name="email"
              value={userEmail}
              onChange={(event) => {
                setUserEmail(event.target.value);
              }}
            />
          </Fragment>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
