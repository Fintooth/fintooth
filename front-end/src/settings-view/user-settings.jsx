import React from "react";
import { connect } from "react-redux";

const UserSettingsForm = props => {
  console.log(props);

  return (
    <div>
      <h1>Settings go here :)</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(UserSettingsForm);
