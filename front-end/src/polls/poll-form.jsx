import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";

class PollForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      creator: "",
      group: "",
      expires: ""
    };
  }

  _handleChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  _handleChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  _handleDateChange = e => {
    this.setState({
      expires: Date.parse(e.target.value)
    });
  };

  _submitPoll = e => {
    e.preventDefault();
    this.setState(
      {
        creator: this.props.creator,
        group: this.props.groupId
      },
      () => {
        this.props.postPoll(this.state);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
    );
  };

  render() {
    return (
      <Container>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Create a poll
        </Typography>
        <TextField
          id="outlined-full-width"
          label="Poll Title"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          onChange={this._handleChangeTitle}
        />
        <TextField
          id="outlined-multiline-static"
          label="Poll Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          onChange={this._handleChangeDescription}
        />
        <TextField
          id="date"
          label="Active untill"
          type="date"
          defaultValue="2017-05-24"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          style={{ marginTop: 12 }}
          onChange={this._handleDateChange}
        />
        <Button
          style={{ marginTop: 16 }}
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          onClick={this._submitPoll}
        >
          Submit Poll
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  groupId: state.currentGroup.id
});

export default connect(mapStateToProps)(PollForm);
