import React from "react";
import { connect } from "react-redux";
import { SAGA_POLLS_ACTIONS } from "../redux/constants";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class PollData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      for: this.props.votes.filter((vote) => vote === "For").length,
      against: this.props.votes.filter((vote) => vote === "Against").length,
      voted: false,
    };
  }

  _voteFor = () => {
    const voteSubmit = {
      vote: {
        vote: "For",
        voterId: this.props.currentUser.user.id,
      },
      poll: {
        comments: this.props.comments,
        creator: this.props.creator,
        description: this.props.description,
        group: this.props.group,
        result: this.props.result,
        title: this.props.title,
        _id: this.props._id,
      },
    };

    !this.state.voted &&
      this.setState({
        for: this.state.for + 1,
        voted: true,
      });

    this.props.votePoll(voteSubmit);
  };

  countVotes = (forOrAgainst) => {
    var count = 0;
    for (var i = 0; i < this.props.votes.length; ++i) {
      if (this.props.votes[i] === forOrAgainst) count++;
    }
    return count;
  };

  _voteAgainst = () => {
    const voteSubmit = {
      vote: {
        vote: "Against",
        voterId: this.props.currentUser.user.id,
      },
      poll: {
        comments: this.props.comments,
        creator: this.props.creator,
        description: this.props.description,
        group: this.props.group,
        result: this.props.result,
        title: this.props.title,
        _id: this.props._id,
      },
    };

    !this.state.voted &&
      this.setState({
        against: this.state.against + 1,
        voted: true,
      });

    this.props.votePoll(voteSubmit);
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
            <Typography>For: {this.countVotes("For")}</Typography>
            <Button variant="contained" color="primary" onClick={this._voteFor}>
              Vote For
            </Button>
          </Grid>
          <Grid>
            <Typography>Against: {this.countVotes("Against")}</Typography>
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

const mapStateToProps = (store) => ({
  currentUser: store.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  votePoll: (obj) =>
    dispatch({ type: SAGA_POLLS_ACTIONS.VOTE_POLL_ASYNC, vote: obj }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PollData);
