import React from "react";
import { connect } from "react-redux";
import { SAGA_GROUP_ACTIONS } from "../redux/constants";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      groupPicUrl: ""
    };
  }

  _handleChangeGroupName = e => {
    this.setState({
      groupName: e.target.value
    });
  };

  _handleChangeGroupPic = e => {
    this.setState({
      groupPicUrl: e.target.value
    });
  };

  _submitGroup = () => {
    const group = {
      name: this.state.groupName,
      avatar: this.state.groupPicUrl,
      userId: this.props.user.user.id
    };

    this.props.createGroup(group);
  };

  render() {
    return (
      <Container>
        <Typography variant="h5">Create a group:</Typography>
        <TextField
          id="outlined-full-width"
          label="Group name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          onChange={this._handleChangeGroupName}
        />
        <TextField
          id="outlined-full-width"
          label="Image url"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          onChange={this._handleChangeGroupPic}
        />
        <Button
          style={{ marginTop: 16 }}
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          onClick={this._submitGroup}
        >
          Create Group
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  createGroup: group =>
    dispatch({ type: SAGA_GROUP_ACTIONS.ADD_GROUP_ASYNC, group })
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupForm);
