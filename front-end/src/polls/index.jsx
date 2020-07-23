import React from "react";
import { connect } from "react-redux";
import { SAGA_POLLS_ACTIONS } from "../redux/constants";
import Comments from "./comments";
import PollData from './polls'

class PollsAndComments extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPollsFromDatabase();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.polls.map(poll => {
          if (poll.group === this.props.groupId) {
            return <React.Fragment>
              <PollData {...poll} />
              <Comments key={poll.id} {...poll} />;
            </React.Fragment>
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  polls: state.polls
});

const mapDispatchToProps = dispatch => ({
  getPollsFromDatabase: () =>
    dispatch({ type: SAGA_POLLS_ACTIONS.GET_POLLS_ASYNC })
});

export default connect(mapStateToProps, mapDispatchToProps)(PollsAndComments);
