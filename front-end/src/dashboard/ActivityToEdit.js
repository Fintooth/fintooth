import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { SAGA_ACTIVITY_ACTIONS, SAGA_USER_ACTIONS } from "../redux/constants";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import MoreVert from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import NeutralIcon from "@material-ui/icons/FiberManualRecordOutlined";

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .04)",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
  },
})(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  columnAccount: {
    flexBasis: "20%",
  },
  columnDescripImg: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
  },
  columnDescrip: {
    flexGrow: "1",
  },
  columnImg: {
    marginTop: "20px",
    flexGrow: "1",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },

  //Input
  typeField: {
    maxWidth: "100px",
    backgroundColor: "white",
  },
  amountField: {
    marginLeft: "2px",
    width: "150px",
    backgroundColor: "white",
  },
  accField: {
    minWidth: "140px",
    margin: "10px",
  },
  iconInput: {
    fontSize: "small",
    opacity: 0.74,
  },
  selectField: {
    width: "100%",
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={" "}
      decimalSeparator={","}
      decimalScale={2}
      isNumericString
    />
  );
}

function ActivityToEdit({
  currentUser,
  activityToEdit,
  setActivityToEdit,
  addActivity,
  addToAccount,
}) {
  const classes = useStyles();

  React.useEffect(() => {
    if (!activityToEdit.user && currentUser.user.id) {
      setActivityToEdit({ ...activityToEdit, user: currentUser.user.id });
    }
  }, [activityToEdit, setActivityToEdit, currentUser]);

  const getSymbol = {
    Income: <PlusIcon color="primary" className={classes.iconInput} />,
    Expenditure: <MinusIcon color="secondary" className={classes.iconInput} />,
    Move: <NeutralIcon color="disabled" className={classes.iconInput} />,
  };

  const handleChangeActivity = (event) => {
    setActivityToEdit({
      ...activityToEdit,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    addActivity(activityToEdit);
  };

  return (
    <form onSubmit={handleSave}>
      <Accordion>
        <AccordionSummary
          expandIcon={<MoreVert />}
          aria-controls="panel0-content"
          id="panel0-header"
        >
          <div className={classes.column}>
            <div>
              <TextField
                className={classes.typeField}
                id="outlined-select-currency"
                variant="outlined"
                select
                label="Type"
                name="type"
                value={activityToEdit.type}
                onChange={handleChangeActivity}
                onClick={(event) => event.stopPropagation()}
              >
                <MenuItem key="add" value="Income">
                  Add
                </MenuItem>
                <MenuItem key="spend" value="Expenditure">
                  Spend
                </MenuItem>
                <MenuItem key="move" value="Move">
                  Move
                </MenuItem>
              </TextField>
              <TextField
                label="Amount"
                value={activityToEdit.amount}
                onClick={(event) => event.stopPropagation()}
                onChange={handleChangeActivity}
                name="amount"
                id="formatted-numberformat-input"
                className={classes.amountField}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  startAdornment: (
                    <InputAdornment position="start">
                      {getSymbol[activityToEdit.type]}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                required
              />
            </div>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Now</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.columnAccount}>
            <Typography variant="caption">
              {["Move", "Expenditure"].includes(activityToEdit.type) && (
                <TextField
                  className={classes.accField}
                  select
                  label="From account"
                  variant="outlined"
                  name="accountSrc"
                  value={activityToEdit.accountSrc}
                  onChange={handleChangeActivity}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {currentUser.user.accounts &&
                    currentUser.user.accounts.map((account, ind) => (
                      <MenuItem key={ind} value={account._id}>
                        {account.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
              {["Move", "Income"].includes(activityToEdit.type) && (
                <TextField
                  className={classes.accField}
                  select
                  label="To account"
                  variant="outlined"
                  name="accountDest"
                  value={activityToEdit.accountDest}
                  onChange={handleChangeActivity}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {currentUser.user.accounts &&
                    currentUser.user.accounts.map((account, ind) => (
                      <MenuItem key={ind} value={account._id}>
                        {account.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            </Typography>
          </div>
          <div className={clsx(classes.columnDescripImg, classes.helper)}>
            <div className={classes.columnDescrip}>
              <TextField
                className={classes.selectField}
                label="Description"
                variant="outlined"
                name="description"
                value={activityToEdit.description}
                onChange={handleChangeActivity}
              />
            </div>
            <div className={classes.columnImg}>
              <TextField
                className={classes.selectField}
                label="Picture url"
                variant="outlined"
                name="picture"
                value={activityToEdit.picture}
                onChange={handleChangeActivity}
              />
            </div>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" color="primary" type="submit">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    request: state.request,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addActivity: (activity) =>
    dispatch({ type: SAGA_ACTIVITY_ACTIONS.ADD_ACTIVITY_ASYNC, activity }),
  editActivity: (activity) =>
    dispatch({ type: SAGA_ACTIVITY_ACTIONS.EDIT_ACTIVITY_ASYNC, activity }),
  addToAccount: (userId, accountId, amount) =>
    dispatch({
      type: SAGA_USER_ACTIONS.ADD_TO_ACCOUNT_ASYNC,
      userId,
      accountId,
      amount,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityToEdit);
