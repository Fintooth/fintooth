import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

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
}));

const UserSettingsForm = ({
  currentUser = { user: {} },
  updateUser,
  changePassword,
  removeUser,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [editInput, setEditInput] = useState({
    nickname: "",
    email: "",
    validEmail: true,
    validNickname: true,
  });

  React.useEffect(() => {
    if (!editInput.email && currentUser.user.email) {
      setEditInput({
        ...editInput,
        nickname: currentUser.user.nickname ? currentUser.user.nickname : "",
        email: currentUser.user.email,
      });
    }
  }, [editInput, setEditInput, currentUser]);

  const [passWordInput, setPasswordInput] = useState({
    password: "",
    newPassword: "",
    renewPassword: "",
    passwordsMatch: true,
    validPassword: true,
  });

  const [isEditPage, setIsEditPage] = useState(true);

  const [isDeleteButtonShown, showDeleteButton] = useState(false);

  const deleteUser = () => {
    const user = currentUser.user.id;
    removeUser(user);
    localStorage.removeItem("currentUser");
    history.push("/login");
  };

  const submitForm = (event) => {
    if (isEditPage) {
      const user = {
        email: editInput.email,
        nickname: editInput.nickname,
        id: currentUser.user.id,
      };
      updateUser(user);
      history.push("/dashboard/activity-manager");
    } else if (!isEditPage) {
      const user = {
        password: passWordInput.newPassword,
        userId: currentUser.user.id,
      };
      changePassword(user);
      localStorage.removeItem("currentUser");
      history.push("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          alt="Avatar"
          src={`../../../back-end/uploads/${currentUser.user.id}/avatar.png/`}
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
              value={editInput.nickname}
              onChange={(event) => {
                setEditInput({
                  ...editInput,
                  nickname: event.target.value,
                });
              }}
              onBlur={() => {
                editInput.nickname.length < 3 ||
                editInput.nickname.length > 10 ||
                !editInput.nickname.match(new RegExp(/^[a-z0-9_]+$/i))
                  ? setEditInput({
                      ...editInput,
                      validNickname: false,
                    })
                  : setEditInput({
                      ...editInput,
                      validNickname: true,
                    });
              }}
              error={!editInput.validNickname}
              helperText={
                !editInput.validNickname
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
          onClick={(event) => submitForm(event)}
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
          onClick={() => {
            showDeleteButton(!isDeleteButtonShown);
          }}
        >
          {!isDeleteButtonShown
            ? "Delete your account"
            : "I don't want to delete it"}
        </Button>
        {isDeleteButtonShown ? (
          <Fragment>
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                deleteUser();
              }}
            >
              {" "}
              Confirm that you want to delete your account
            </Button>
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
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
    removeUser: (userId) =>
      dispatch({ type: SAGA_USER_ACTIONS.REMOVE_USER_ASYNC, userId }),
    updateUser: (user) =>
      dispatch({ type: SAGA_USER_ACTIONS.MODIFY_USER_ASYNC, user }),
    changePassword: (user) =>
      dispatch({ type: SAGA_USER_ACTIONS.CHANGE_PASSWORD_ASYNC, user }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsForm);
