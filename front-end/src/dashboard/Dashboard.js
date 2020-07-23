import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SAGA_ACTIVITY_ACTIONS } from "../redux/constants";
import Progress from "../common/progress";
import Toolbar from "../common/toolbar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MaterialLink from "@material-ui/core/Link";
import Charts from "./Charts";
import Account from "./Account";

import Activities from "./Activities";
import { Button } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MaterialLink color="inherit" href="https://material-ui.com/">
        Fintooth
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: "240",
  },
  fixedHeight: {
    height: 290,
    paddingBottom: 30,
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let history = useHistory();

  const localCurrentUserString = window.localStorage.getItem("currentUser");
  if (!localCurrentUserString) {
    history.replace("/login");
  }

  const {
    activities,
    addActivity,
    editActivity,
    getActivities,
    deleteActivity,
    request,
    currentUser,
  } = props;

  const [activitiesToShow, setActivitiesToShow] = React.useState([]);
  const [accountToView, setAccountToView] = React.useState("");

  React.useEffect(() => {
    setActivitiesToShow([...activities]);
  }, [setActivitiesToShow, activities]);

  React.useEffect(() => {
    let mounted = true;
    if (mounted && currentUser.token && currentUser.user.id) {
      getActivities(currentUser.user.id);
    }
    return () => {
      mounted = false;
    };
  }, [getActivities, currentUser]);

  const requestStatus = () => {
    if (request.error) {
      return <h2 className={classes.errorMessage}>{request.error}</h2>;
    } else {
      return (
        <div className={classes.root}>
          <Toolbar title="Dashboard" />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              {request.fetching && <Progress />}
              <Grid container spacing={3}>
                {/* Accounts */}

                {currentUser.user &&
                  currentUser.user.accounts.map((account, ind) => (
                    <Grid item xs={4} md={4} lg={3} key={"account" + ind}>
                      <Paper className={fixedHeightPaper}>
                        <Account
                          account={account}
                          activities={activities}
                          setActivities={setActivitiesToShow}
                          accountToView={accountToView}
                          setAccountToView={setAccountToView}
                        />
                      </Paper>
                    </Grid>
                  ))}

                <Grid item xs={3} md={3} lg={2}>
                  <Button variant="outlined">Add account</Button>
                </Grid>

                <Switch>
                  <Route path="/dashboard/charts">
                    <Grid item xs={12}>
                      <Link to="/dashboard/activity-manager">
                        Show activity manager{" "}
                      </Link>
                      <Charts activitiesToShow={activitiesToShow} />
                    </Grid>
                  </Route>
                  <Route path="/dashboard/activity-manager">
                    <Grid item xs={12}>
                      <Link to="/dashboard/charts">Show charts</Link>
                      <Paper className={classes.paper}>
                        <Activities
                          activities={activitiesToShow}
                          accounts={
                            currentUser.user ? currentUser.user.accounts : []
                          }
                          editActivity={editActivity}
                          deleteActivity={deleteActivity}
                        />
                      </Paper>
                    </Grid>
                  </Route>
                </Switch>
              </Grid>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </div>
      );
    }
  };
  return <div className={classes.root}>{requestStatus()}</div>;
}

const mapStateToProps = (state) => {
  return {
    activities: state.activities,
    request: state.request,
    groups: state.groups,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getActivities: (userId) =>
    dispatch({
      type: SAGA_ACTIVITY_ACTIONS.GET_ACTIVITIES_ASYNC,
      userId,
    }),
  addActivity: (activity) =>
    dispatch({ type: SAGA_ACTIVITY_ACTIONS.ADD_ACTIVITY_ASYNC, activity }),
  editActivity: (activity) =>
    dispatch({ type: SAGA_ACTIVITY_ACTIONS.EDIT_ACTIVITY_ASYNC, activity }),
  deleteActivity: (activityId) =>
    dispatch({ type: SAGA_ACTIVITY_ACTIONS.DELETE_ACTIVITY_ASYNC, activityId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
