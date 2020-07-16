import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";

const UserSettingsForm = (props) => {
  console.log(props);

  return (
    <Container>
      <form
        onSubmit={(event) => submitForm(event)}
        noValidate
        method="PATCH"
      ></form>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="Change Email Address"
        name="email"
        autoComplete="email"
        value={props.currentUser.user.email}
        //onChange={}
        // onBlur={}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="nickname"
        label="Change Nickname"
        name="nickname"
        autoComplete="nickname"
        value={props.currentUser.user.nickname}
        //onChange={}
        // onBlur={}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={(event) => submitForm(props, event)}
      >
        Change your properties
      </Button>
    </Container>
  );
};

/*
This function does not work and does not update the nickname and the
email address of the user, but I don't know why. 
*/
const submitForm = (props, event) => {
  event.preventDefault();
  const user = {
    email: props.currentUser.user.email,
    nickname: props.currentUser.user.nickname,
  };

  axios.patch(`${URL}/users/${props.currentUser.user.id}`, user);
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(UserSettingsForm);
