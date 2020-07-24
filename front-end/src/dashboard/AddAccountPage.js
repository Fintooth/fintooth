import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { SAGA_USER_ACTIONS } from "../redux/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    //backgroundColor: theme.palette.secondary.main,
    height: 200,
    width: 200,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddAccountPage({ ownerId, addAccount }) {
  const classes = useStyles();

  const [accountToEdit, setAccountToEdit] = useState({
    name: "",
    type: "bank",
    bankAccType: "debit",
    bankAccInterestRate: 0,
    bankAccInterestPeriod: 12,
    amount: 0,
    currency: "usd",
  });

  const submitForm = (event) => {
    event.preventDefault();
    addAccount(ownerId, accountToEdit);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form onSubmit={submitForm} noValidate>
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              value={accountToEdit.name}
              onChange={(event) => {
                setAccountToEdit({
                  ...accountToEdit,
                  name: event.target.value,
                });
              }}
            />
          </Fragment>
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              fullWidth
              label="Initial amount"
              name="amount"
              value={accountToEdit.amount}
              onChange={(event) => {
                setAccountToEdit({
                  ...accountToEdit,
                  amount: event.target.value,
                });
              }}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={accountToEdit.currency}
                onChange={({ target }) =>
                  setAccountToEdit({ ...accountToEdit, currency: target.value })
                }
                label="Account currency"
              >
                <MenuItem value="usd">USD</MenuItem>
                <MenuItem value="eur">EUR</MenuItem>
                <MenuItem value="bgn">BGN</MenuItem>
              </Select>
            </FormControl>
          </Fragment>
          <Fragment>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select
                value={accountToEdit.type}
                onChange={({ target }) =>
                  setAccountToEdit({ ...accountToEdit, type: target.value })
                }
                label="Type"
              >
                <MenuItem value="bank">Bank</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="stocks">Stocks</MenuItem>
              </Select>
            </FormControl>
            {accountToEdit.type === "bank" && (
              <>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Bank account type</InputLabel>
                  <Select
                    value={accountToEdit.bankAccType}
                    onChange={({ target }) =>
                      setAccountToEdit({
                        ...accountToEdit,
                        bankAccType: target.value,
                      })
                    }
                    label="Bank account type"
                  >
                    <MenuItem value="debit">Debit</MenuItem>
                    <MenuItem value="credit">Credit</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  fullWidth
                  label="Bank account interest rate"
                  name="bankAccInterestRate"
                  value={accountToEdit.bankAccInterestRate}
                  onChange={(event) => {
                    setAccountToEdit({
                      ...accountToEdit,
                      bankAccInterestRate: event.target.value,
                    });
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  fullWidth
                  label="Bank account interest period"
                  name="bankAccInterestPeriod"
                  value={accountToEdit.bankAccInterestPeriod}
                  onChange={(event) => {
                    setAccountToEdit({
                      ...accountToEdit,
                      bankAccInterestPeriod: event.target.value,
                    });
                  }}
                />
              </>
            )}
          </Fragment>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
