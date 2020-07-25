import React from "react";
import axios from "axios";
import { URL } from "../redux/constants";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  headerText: {
    textAlign: "center"
  },
  rowDetails: {
    justifyContent: "space-between",
    padding: 2
  },
  usersGrid: {
    flex: 1,
    flexDirection: "column"
  },
  userRow: {
    justifyContent: "space-between",
    paddingLeft: "5%"
  }
});

const GroupDetail = props => {
  const [details, setDetails] = React.useState({
    id: "",
    name: "",
    dateCreated: "",
    memberes: []
  });

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      const token = JSON.parse(localStorage.getItem("currentUser")).token;
      axios
        .get(URL + `/groups/${props.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          console.log("res", res);
          setDetails(res.data);
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  const classes = useStyles();
  let userIndex = 1;

  console.log(details);
  return (
    <Container>
      <Typography className={classes.headerText} variant="h5">
        Deatils for group with id: {details.id}
      </Typography>

      <Grid container className={classes.rowDetails}>
        <Typography>Name: </Typography>
        <Typography>{details.name}</Typography>
      </Grid>

      <Grid container className={classes.rowDetails}>
        <Typography>Date Created: </Typography>
        <Typography>{details.dateCreated}</Typography>
      </Grid>

      <Typography>Emails of users in the group</Typography>
      <Grid container className={classes.usersGrid}>
        {details.members &&
          details.members.map(user => {
            return (
              <Typography className={classes.userRow} key={userIndex}>
                {userIndex++}: {user.email}
              </Typography>
            );
          })}
      </Grid>
    </Container>
  );
};

export default GroupDetail;
