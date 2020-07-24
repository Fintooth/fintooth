import React from "react";
import { connect } from "react-redux";
import { SAGA_POLLS_ACTIONS } from "../redux/constants";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class PollData extends React.Component {
  _voteFor = () => {
    const voteSubmit = {
      vote: {
        vote: "For",
        voterId: this.props.currentUser.user.id
      },
      poll: {
        comments: this.props.comments,
        creator: this.props.creator,
        description: this.props.description,
        group: this.props.group,
        result: this.props.result,
        title: this.props.title,
        _id: this.props._id
      }
    };

    this.props.votePoll(voteSubmit);
  };

  _voteAgainst = () => {
    const voteSubmit = {
      vote: {
        vote: "Against",
        voterId: this.props.currentUser.user.id
      },
      pollId: this.props._id
    };
  };

  render() {
    return (
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h2">{this.props.title}</Typography>
        <Typography variant="subtitle1">{this.props.description}</Typography>
        <Grid
          container
          direction="row"
          style={{ justifyContent: "space-between" }}
        >
          <Grid>
            <Typography>For: {this.props.result[0]}</Typography>
            <Button variant="contained" color="primary" onClick={this._voteFor}>
              Vote For
            </Button>
          </Grid>
          <Grid>
            <Typography>Against: {this.props.result[1]}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={this._voteAgainst}
            >
              Vote Against
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.currentUser
});

const mapDispatchToProps = dispatch => ({
  votePoll: obj =>
    dispatch({ type: SAGA_POLLS_ACTIONS.VOTE_POLL_ASYNC, vote: obj })
});

export default connect(mapStateToProps, mapDispatchToProps)(PollData);
