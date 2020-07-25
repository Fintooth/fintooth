import React from "react";
import { connect } from "react-redux";
import { SAGA_POLLS_ACTIONS } from "../redux/constants";
import Comments from "./comments";
import PollData from "./polls";
import PollForm from "./poll-form";
import Divider from "@material-ui/core/divider";

class PollsAndComments extends React.Component {
  static defaultProps = {
    polls: []
  };

  constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
  }

  componentDidMount() {
    this.props.getPollsFromDatabase();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.polls != state.polls) {
      return {
        polls: props.polls
      };
    }
    return null;
  }

  render() {
    return (
      <div>
        <PollForm
          creator={this.props.currentUser.user.id}
          postPoll={this.props.postPoll}
        />
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        {this.state.polls.map((poll, ind) => {
          if (poll.group === this.props.groupId) {
            return (
              <div key={ind}>
                <PollData {...poll} />
                <Comments {...poll} />;
              </div>
            );
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  polls: state.polls,
  currentUser: state.currentUser,
  groupId: state.currentGroup.id
});

const mapDispatchToProps = dispatch => ({
  getPollsFromDatabase: () =>
    dispatch({ type: SAGA_POLLS_ACTIONS.GET_POLLS_ASYNC }),
  postPoll: poll => dispatch({ type: SAGA_POLLS_ACTIONS.ADD_POLL_ASYNC, poll })
});

export default connect(mapStateToProps, mapDispatchToProps)(PollsAndComments);
