import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import MoreVert from "@material-ui/icons/MoreVert";
import MuiChip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import NeutralIcon from "@material-ui/icons/FiberManualRecordOutlined";

import ActivityToEdit from "./ActivityToEdit";

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
    flexBasis: "80%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  columnDescrip: {
    flexBasis: "50%",
  },
  columnImg: {
    marginLeft: "6px",
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
}));

const emptyFunc = (event) => {
  event.stopPropagation();
  return false;
};

export default function Activities({ activities, accounts }) {
  const classes = useStyles();

  const activityColor = {
    Income: "primary",
    Expenditure: "secondary",
    Move: "default",
  };

  // for modal
  const [open, setOpen] = React.useState(0);
  const handleOpen = (event) => {
    setOpen(parseInt(event.target.id.substr(8)));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getActivityDate = (date) => {
    const d = new Date(date);
    return d.toString().substr(0, 24);
  };

  const [activityToEdit, setActivityToEdit] = React.useState({
    id: "",
    user: "",
    type: "Expenditure",
    accountSrc: "",
    accountDest: "",
    description: "",
    picture: "",
    date: "Now",
    amount: "",
  });

  function getAccountName(accId) {
    const acc = accounts ? accounts.find((acc) => acc._id === accId) : false;
    return acc ? acc.name : accId;
  }

  return (
    <div className={classes.root}>
      <ActivityToEdit
        activityToEdit={activityToEdit}
        setActivityToEdit={setActivityToEdit}
      />
      {activities.map((activity, ind) => (
        <Accordion key={ind + 1}>
          <AccordionSummary
            expandIcon={<MoreVert />}
            aria-controls={`panel${ind + 1}-content`}
            id={`panel${ind + 1}-header`}
          >
            <div className={classes.column}>
              <Chip
                variant="outlined"
                color={activityColor[activity.type]}
                label={activity.amount}
                onClick={emptyFunc}
                avatar={
                  <Avatar>
                    {activity.type === "Income" && <PlusIcon />}
                    {activity.type === "Expenditure" && <MinusIcon />}
                    {activity.type === "Move" && <NeutralIcon />}
                  </Avatar>
                }
              />
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                {getActivityDate(activity.date)}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={classes.columnAccount}>
              <Typography variant="caption">
                {"accountSrc" in activity &&
                  "From: " + getAccountName(activity.accountSrc)}
                {"accountSrc" in activity && "accountDest" in activity && (
                  <br />
                )}
                {"accountDest" in activity &&
                  "To: " + getAccountName(activity.accountDest)}
              </Typography>
            </div>
            <div className={clsx(classes.columnDescripImg, classes.helper)}>
              <div className={classes.columnDescrip}>
                <p>{activity.description}</p>
              </div>
              {activity.picture && (
                <div className={classes.columnImg}>
                  <img
                    id={"imgPanel" + (ind + 1)}
                    className={classes.activityImage}
                    src={activity.picture}
                    onClick={handleOpen}
                    alt="activity"
                  />
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open === ind + 1}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open === ind + 1}>
                      <div className={classes.paper}>
                        <img
                          className={classes.modalImage}
                          src={activity.picture}
                          onClick={handleOpen}
                          alt="activity"
                        />
                      </div>
                    </Fade>
                  </Modal>
                </div>
              )}
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button size="small">Change</Button>
            <Button size="small" color="primary">
              Delete
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
