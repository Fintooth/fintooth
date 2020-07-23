import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import blackTooth from "../images/blackTooth.png";

import {
  SAGA_USER_ACTIONS,
  URL,
  CURRENT_USER_ACTIONS,
} from "../redux/constants";

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
}));

const UserSettingsForm = (props) => {
  const classes = useStyles();
  const [editInput, setEditInput] = useState({
    username: props.currentUser.user.username
      ? props.currentUser.user.username
      : "",
    email: props.currentUser.user.email,
    validEmail: true,
    validUsername: true,
  });

  const [passWordInput, setPasswordInput] = useState({
    password: "",
    newPassword: "",
    renewPassword: "",
    passwordsMatch: true,
    validPassword: true,
  });

  const [isEditPage, setIsEditPage] = useState(true);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          alt="blackTooth"
          src={`../../../back-end/uploads/${props.currentUser.user.id}/avatar.png/`}
        ></Avatar>
        <form
          onSubmit={(event) => submitForm(event)}
          noValidate
          method="PATCH"
        ></form>
        {isEditPage ? (
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Change Email Address"
              name="email"
              autoComplete="email"
              value={editInput.email}
              onChange={(event) => {
                setEditInput({
                  ...editInput,
                  email: event.target.value,
                });
              }}
              onBlur={() => {
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                emailPattern.test(editInput.email)
                  ? setEditInput({ ...editInput, validEmail: true })
                  : setEditInput({ ...editInput, validEmail: false });
              }}
              error={!editInput.validEmail}
              helperText={
                !editInput.validEmail ? "Please enter a valid email" : ""
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="nickname"
              label="Change Nickname"
              name="nickname"
              autoComplete="nickname"
              value={editInput.username}
              onChange={(event) => {
                setEditInput({
                  ...editInput,
                  username: event.target.value,
                });
              }}
              onBlur={() => {
                editInput.username.length < 3 ||
                editInput.username.length > 10 ||
                !editInput.username.match(new RegExp(/^[a-z0-9_]+$/i))
                  ? setEditInput({
                      ...editInput,
                      validUsername: false,
                    })
                  : setEditInput({
                      ...editInput,
                      validUsername: true,
                    });
              }}
              error={!editInput.validUsername}
              helperText={
                !editInput.validUsername
                  ? "Nickname can be from 3 to 10 characters and can contain only alphanumerical symbols and _"
                  : ""
              }
            />
          </Fragment>
        ) : (
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              type="password"
              label="Write your current password"
              name="password"
              autoComplete="password"
              value={passWordInput.password}
              onChange={(event) => {
                setPasswordInput({
                  ...passWordInput,
                  password: event.target.value,
                });
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="newPassword"
              type="password"
              label="Write your new password"
              name="newPassword"
              autoComplete="newPassword"
              value={passWordInput.newPassword}
              onChange={(event) => {
                setPasswordInput({
                  ...passWordInput,
                  newPassword: event.target.value,
                });
              }}
              onBlur={() => {
                passWordInput.newPassword.length < 6
                  ? setPasswordInput({ ...passWordInput, validPassword: false })
                  : setPasswordInput({ ...passWordInput, validPassword: true });
              }}
              error={!passWordInput.validPassword}
              helperText={
                !passWordInput.validPassword
                  ? "Your new password must be at least 6 characters"
                  : ""
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="renewPassword"
              type="password"
              label="Repeat your new password"
              name="renewPassword"
              autoComplete="renewPassword"
              value={passWordInput.renewPassword}
              onChange={(event) => {
                setPasswordInput({
                  ...passWordInput,
                  renewPassword: event.target.value,
                });
              }}
              onBlur={() =>
                passWordInput.newPassword === passWordInput.renewPassword
                  ? setPasswordInput({ ...passWordInput, passwordsMatch: true })
                  : setPasswordInput({
                      ...passWordInput,
                      passwordsMatch: false,
                    })
              }
              error={!passWordInput.passwordsMatch}
              helperText={
                !passWordInput.passwordsMatch ? "Passwords don't match" : ""
              }
            />
          </Fragment>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(event) => submitForm(props, event)}
        >
          {isEditPage ? "Save your properties" : "Change your password"}
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            setIsEditPage(!isEditPage);
          }}
        >
          {isEditPage
            ? "Click here to change password"
            : "Click here to change email and nickname"}
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={(event) => prompt("Please enter your password")}
        >
          Delete your user
        </Button>
      </div>
    </Container>
  );
};

/*
This function does not work and does not update the nickname and the
email address of the user, but I don't know how. 
*/
const submitForm = (props, event) => {
  event.preventDefault();
  const user = {
    //email: editInput.email,
    nickname: props.currentUser.user.nickname,
  };

  axios.patch(`${URL}/users/${props.currentUser.user.id}`, user);
};

function mapStateToProps(state) {
  return {
    users: state.users,
    request: state.reques,
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeUser: (user) =>
      dispatch({ type: SAGA_USER_ACTIONS.REMOVE_USER_ASYNC, user }),
  };
}

export default connect(mapStateToProps)(UserSettingsForm);
