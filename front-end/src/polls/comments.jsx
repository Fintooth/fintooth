import React from "react";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { SAGA_POLLS_ACTIONS } from "../redux/constants";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const imgLink =
  "https://lh3.googleusercontent.com/proxy/moAQxvY0pnY8d_IAjGlM2RGIZAztHqdwRylrPNNTlL2lrOe8qj_aviSkfcDrPFIY3LHxs7rt9ZkWJkvOhIlQr9_CD5i9cN0kjy5J2lRVxS53n6mW1K3_DY0Wt1yt-SBZNjN5mDI";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: ""
    };
  }

  _handleCommentInput = e => {
    this.setState({
      newComment: e.target.value
    });
  };

  _submitComment = () => {
    const commentToUpload = {
      comment: this.state.newComment,
      date: Date.now().toString(),
      authorId: this.props.user.user.id
    };

    const currentPoll = this.props;
    currentPoll.comments.push(commentToUpload);
    this.props.updatePoll(currentPoll);
    window.location.reload();
  };

  render() {
    return (
      <div style={{ padding: 14 }} className="App">
        <h1>Comments</h1>
        <Paper style={{ padding: "40px 20px" }}>
          {this.props.comments &&
            this.props.comments.map((comment, ind) => {
              return (
                <div key={`${comment.date}` + ind}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" src={imgLink} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {comment.author}
                      </h4>
                      <p style={{ textAlign: "left" }}>{comment.comment}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        posted {comment.date}
                      </p>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                </div>
              );
            })}
          <TextField
            id="outlined-full-width"
            label="Write a comment"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={this._handleCommentInput}
          />
          <Button
            style={{ margin: 8 }}
            variant="contained"
            color="primary"
            disableElevation
            onClick={this._submitComment}
          >
            Submit Comment
          </Button>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  updatePoll: poll =>
    dispatch({ type: SAGA_POLLS_ACTIONS.EDIT_POLL_ASYNC, poll })
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
