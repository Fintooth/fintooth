import React from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  SAGA_ACTIVITY_ACTIONS,
  SAGA_USER_ACTIONS,
  SAGA_GROUP_ACTIONS,
} from "../redux/constants";
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
import Charts from "../dashboard/Charts";
import Account from "../dashboard/Account";

import Activities from "../dashboard/Activities";
import { Button } from "@material-ui/core";
import AddAccountPage from "../dashboard/AddAccountPage";

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

function Group(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let history = useHistory();

  const localCurrentUserString = window.localStorage.getItem("currentUser");
  if (!localCurrentUserString) {
    history.replace("/login");
  }

  const {
    activities,
    getActivities,
    request,
    currentUser,
    deleteAccount,
    currentGroup,
    loadCurrentGroup,
  } = props;

  const { groupId } = useParams();
  let { path, url } = useRouteMatch();
  let { pathname } = useLocation();

  React.useEffect(() => {
    if (groupId && !currentGroup.id && !request.fetching) {
      loadCurrentGroup(groupId);
    }
  }, [currentGroup, loadCurrentGroup, groupId, request]);

  const [activitiesToShow, setActivitiesToShow] = React.useState([]);
  const [accountToView, setAccountToView] = React.useState("");

  React.useEffect(() => {
    setActivitiesToShow([...activities]);
  }, [setActivitiesToShow, activities]);

  React.useEffect(() => {
    if (currentUser.token && currentGroup.id) {
      getActivities(currentGroup.id);
    }
  }, [getActivities, currentGroup, currentUser]);

  const requestStatus = () => {
    if (request.error) {
      return <h2 className={classes.errorMessage}>{request.error}</h2>;
    } else {
      return (
        <div className={classes.root}>
          <Toolbar title="Dashboard" isAdmin={currentUser.user.admin} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              {request.fetching && <Progress />}
              <Grid container spacing={3}>
                {/* Accounts */}

                {currentGroup.id &&
                  currentGroup.accounts.map((account, ind) => (
                    <Grid item xs={4} md={4} lg={3} key={"account" + ind}>
                      <Paper className={fixedHeightPaper}>
                        <Account
                          account={account}
                          activities={activities}
                          setActivities={setActivitiesToShow}
                          accountToView={accountToView}
                          setAccountToView={setAccountToView}
                        />
                        {pathname.includes("account-editor") && (
                          <Button
                            color="secondary"
                            onClick={() =>
                              deleteAccount(account.user, account._id)
                            }
                          >
                            Delete
                          </Button>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                {!pathname.includes("account-editor") && (
                  <Grid item xs={3} md={3} lg={2}>
                    <Button
                      variant="outlined"
                      onClick={() => history.push(url + "/account-editor")}
                    >
                      Add or delete account
                    </Button>
                  </Grid>
                )}

                <Switch>
                  <Route path={path + "/charts"}>
                    <Grid item xs={12}>
                      <Link to={url + "/activity-manager"}>
                        Show activity manager{" "}
                      </Link>
                      <Charts activitiesToShow={activitiesToShow} />
                    </Grid>
                  </Route>
                  <Route path={path + "/activity-manager"}>
                    <Grid item xs={12}>
                      <Link to={url + "/charts"}>Show charts</Link>
                      <Paper className={classes.paper}>
                        <Activities
                          activities={activitiesToShow}
                          accounts={currentGroup ? currentGroup.accounts : []}
                        />
                      </Paper>
                    </Grid>
                  </Route>
                  <Route path={path + "/account-editor"}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <AddAccountPage />
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
    currentGroup: state.currentGroup,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadCurrentGroup: (groupId) =>
    dispatch({
      type: SAGA_GROUP_ACTIONS.GET_GROUP_ASYNC,
      groupId,
    }),
  getActivities: (groupId) =>
    dispatch({
      type: SAGA_ACTIVITY_ACTIONS.GET_ACTIVITIES_ASYNC,
      userId: groupId,
    }),
  addActivity: (activity) =>
    dispatch({ type: SAGA_ACTIVITY_ACTIONS.ADD_ACTIVITY_ASYNC, activity }),
  deleteAccount: (userId, accountId) =>
    dispatch({
      type: SAGA_USER_ACTIONS.DELETE_ACCOUNT_ASYNC,
      userId,
      accountId,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
