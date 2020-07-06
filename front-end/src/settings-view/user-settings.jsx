import React from "react";
import { connect } from "react-redux";

const UserSettingsForm = props => {
  console.log(props);

  return <div></div>;
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(UserSettingsForm);
