import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import MoreVert from "@material-ui/icons/MoreVert";
import MuiChip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import NeutralIcon from "@material-ui/icons/FiberManualRecordOutlined";

const Chip = withStyles({
  root: {
    fontSize: "1.3em",
    color: "black",
    backgroundColor: "white",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  avatar: {
    opacity: 0.84,
    backgroundColor: "white",
  },
})(MuiChip);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
  },
})(MuiExpansionPanelSummary);

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
    flexBasis: "80%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  columnDescrip: {
    flexBasis: "50%",
  },
  columnImg: {
    flexBasis: "50%",
    textAlign: "center",
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

  // Modal
  activityImage: {
    maxHeight: "150px",
    maxWidth: "300px",
    borderRadius: "5%",
  },
  modalImage: {
    maxHeight: "600px",
    maxWidth: "1200px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  //Input
  typeField: {
    width: "100px",
  },
  amountField: {
    marginLeft: "2px",
    width: "150px",
  },
  iconInput: {
    fontSize: "small",
    opacity: 0.74,
  },
}));

const emptyFunc = (event) => {
  event.stopPropagation();
  return false;
};

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

export default function DetailedExpansionPanel() {
  const classes = useStyles();

  // for modal
  const [open, setOpen] = React.useState(0);
  const handleOpen = (event) => {
    setOpen(event.target.id.slice(-1));
  };
  const handleClose = () => {
    setOpen(false);
  };

  // for input
  const [type, setType] = React.useState("Spend");
  const [amount, setAmount] = React.useState({
    numberformat: "",
  });
  const getSymbol = {
    Add: <PlusIcon color="primary" className={classes.iconInput} />,
    Spend: <MinusIcon color="secondary" className={classes.iconInput} />,
    Move: <NeutralIcon color="disabled" className={classes.iconInput} />,
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setAmount({
      ...amount,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off">
        <ExpansionPanel disabled>
          <ExpansionPanelSummary
            aria-controls="panel0-content"
            id="panel0-header"
          >
            <div className={classes.column}>
              <div>
                <TextField
                  className={classes.typeField}
                  id="outlined-select-currency"
                  select
                  label="Type"
                  value={type}
                  onChange={handleChangeType}
                  variant="outlined"
                >
                  <MenuItem key="add" value="Add">
                    Add
                  </MenuItem>
                  <MenuItem key="spend" value="Spend">
                    Spend
                  </MenuItem>
                  <MenuItem key="move" value="Move">
                    Move
                  </MenuItem>
                </TextField>
                <TextField
                  label="Amount"
                  value={amount.numberformat}
                  onChange={handleChangeAmount}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  className={classes.amountField}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: (
                      <InputAdornment position="start">
                        {getSymbol[type]}
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </div>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                13:27 April 21, Tuesday
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.columnAccount}>
              <Typography variant="caption">
                spent from Visa •••• 7162
              </Typography>
            </div>
            <div className={clsx(classes.columnDescripImg, classes.helper)}>
              <div className={classes.columnDescrip}>
                <p>Комплект отвертки за ремонта в хола това лято</p>
              </div>
              <div className={classes.columnImg}>
                <img
                  id="imgPanel1"
                  className={classes.activityImage}
                  src="../../images/activities/1/bill.png"
                  onClick={handleOpen}
                  alt="bill.png"
                />
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open === "1"}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open === "1"}>
                    <div className={classes.paper}>
                      <img
                        className={classes.modalImage}
                        src="../../images/activities/1/bill.png"
                        alt="bill.png"
                        onClick={handleOpen}
                      />
                    </div>
                  </Fade>
                </Modal>
              </div>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small">Change</Button>
            <Button size="small" color="primary">
              Delete
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </form>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<MoreVert />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className={classes.column}>
            <Chip
              variant="outlined"
              color="secondary"
              label="714.29"
              onClick={emptyFunc}
              avatar={
                <Avatar>
                  <MinusIcon />
                </Avatar>
              }
            />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              13:27 April 21, Tuesday
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.columnAccount}>
            <Typography variant="caption">spent from Visa •••• 7162</Typography>
          </div>
          <div className={clsx(classes.columnDescripImg, classes.helper)}>
            <div className={classes.columnDescrip}>
              <p>Комплект отвертки за ремонта в хола това лято</p>
            </div>
            <div className={classes.columnImg}>
              <img
                id="imgPanel1"
                className={classes.activityImage}
                src="../../images/activities/1/bill.png"
                onClick={handleOpen}
                alt="bill.png"
              />
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open === "1"}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open === "1"}>
                  <div className={classes.paper}>
                    <img
                      className={classes.modalImage}
                      src="../../images/activities/1/bill.png"
                      onClick={handleOpen}
                      alt="bill.png"
                    />
                  </div>
                </Fade>
              </Modal>
            </div>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Change</Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<MoreVert />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className={classes.column}>
            <Chip
              variant="outlined"
              color="primary"
              label="2000.00"
              onClick={emptyFunc}
              avatar={
                <Avatar>
                  <PlusIcon />
                </Avatar>
              }
            />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              00:10 April 20, Monday
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.columnAccount}>
            <Typography variant="caption">added to Home Account</Typography>
          </div>
          <div className={clsx(classes.columnDescripImg, classes.helper)}>
            <div className={classes.columnDescrip}>
              <p></p>
            </div>
            <div className={classes.columnImg}>
              <img
                id="imgPanel2"
                className={classes.activityImage}
                src="../../images/activities/1/shop.jpg"
                onClick={handleOpen}
                alt="shop.jpg"
              />
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open === "2"}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open === "2"}>
                  <div className={classes.paper}>
                    <img
                      className={classes.modalImage}
                      src="../../images/activities/1/shop.jpg"
                      onClick={handleOpen}
                      alt="shop.jpg"
                    />
                  </div>
                </Fade>
              </Modal>
            </div>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Change</Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<MoreVert />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <div className={classes.column}>
            <Chip
              variant="outlined"
              label="420.00"
              onClick={emptyFunc}
              avatar={
                <Avatar>
                  <NeutralIcon />
                </Avatar>
              }
            />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              00:07 April 20, Monday
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.columnAccount}>
            <Typography variant="caption">
              moved from Visa •••• 7162 to Home Account
            </Typography>
          </div>
          <div className={clsx(classes.columnDescripImg, classes.helper)}>
            <div className={classes.columnDescrip}>
              <p></p>
            </div>
            <div className={classes.columnImg}>
              <img
                id="imgPanel3"
                className={classes.activityImage}
                src="../../images/activities/1/product.png"
                onClick={handleOpen}
                alt="product.png"
              />
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open === "3"}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open === "3"}>
                  <div className={classes.paper}>
                    <img
                      className={classes.modalImage}
                      src="../../images/activities/1/product.png"
                      onClick={handleOpen}
                      alt="product.png"
                    />
                  </div>
                </Fade>
              </Modal>
            </div>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Change</Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
