import React from "react";
import axios from "axios";
import { URL } from "../redux/constants";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  headerText: {
    textAlign: "center"
  },
  rowDetails: {
    justifyContent: "space-between",
    padding: 2
  }
});

const accountRows = data => {
  let rowArray = [];
  data.forEach(acc => {
    rowArray.push({
      type: acc.type,
      amount: acc.amount,
      currency: acc.currency,
      bankAccType: acc.bankAccType,
      name: acc.name
    });
  });

  return rowArray;
};

const groupRows = data => {
  let rowArray = [];
  data.forEach(gr => {
    rowArray.push({
      id: gr.id,
      dateCreated: gr.dateCreated,
      name: gr.name,
      members: gr.members ? gr.members.length : 0,
      accounts: gr.accouts ? gr.accouts.length : 0
    });
  });

  return rowArray;
};

const UserDetail = props => {
  const [details, setDetails] = React.useState({});
  const [groupsDetails, setGroupsDetails] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      const token = JSON.parse(localStorage.getItem("currentUser")).token;
      axios
        .get(URL + `/users/${props.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setDetails(res.data);
          res.data.groups.length > 0 &&
            res.data.groups.forEach(id => {
              axios
                .get(URL + `/groups/${id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                })
                .then(groupRes => {
                  let temp = groupsDetails;
                  temp.push(groupRes.data);
                  setGroupsDetails(temp);
                });
            });
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.headerText} variant="h5">
        Deatils for user with id: {details.id}
      </Typography>

      <Grid container className={classes.rowDetails}>
        <Typography>Nickname: </Typography>
        <Typography>{details.nickname}</Typography>
      </Grid>

      <Grid container className={classes.rowDetails}>
        <Typography>Date Created: </Typography>
        <Typography>{details.dateCreated}</Typography>
      </Grid>

      <Typography padding={2}>Accounts data:</Typography>
      {details.accounts && details.accounts.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Currency</TableCell>
                <TableCell align="right">Bank account type</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountRows(details.accounts).map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.currency}</TableCell>
                  <TableCell align="right">{row.bankAccType}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No accounts</Typography>
      )}

      <Typography padding={2}>Groups that this user belongs to:</Typography>
      {groupsDetails.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Currency</TableCell>
                <TableCell align="right">Bank account type</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupRows(groupsDetails).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.dateCreated}</TableCell>
                  <TableCell align="right">{row.members}</TableCell>
                  <TableCell align="right">{row.accounts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No groups</Typography>
      )}
    </Container>
  );
};

export default UserDetail;
