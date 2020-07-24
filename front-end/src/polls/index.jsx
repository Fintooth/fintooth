import React from "react";
import { connect } from "react-redux";
import { SAGA_POLLS_ACTIONS } from "../redux/constants";
import Comments from "./comments";
import PollData from "./polls";
import PollForm from "./poll-form";
import Divider from "@material-ui/core/divider";

class PollsAndComments extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPollsFromDatabase();
  }

  render() {
    return (
      <div>
        <PollForm
          groupId={this.props.groupId}
          creator={this.props.currentUser.user.id}
          postPoll={this.props.postPoll}
        />
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        {this.props.polls.map((poll) => {
          if (poll.group === this.props.groupId) {
            return (
              <React.Fragment>
                <PollData {...poll} />
                <Comments key={poll.id} {...poll} />;
              </React.Fragment>
            );
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  polls: state.polls,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getPollsFromDatabase: () =>
    dispatch({ type: SAGA_POLLS_ACTIONS.GET_POLLS_ASYNC }),
  postPoll: (poll) =>
    dispatch({ type: SAGA_POLLS_ACTIONS.ADD_POLL_ASYNC, poll }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PollsAndComments);
