import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PPAppBar from "./components/PpAppBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PerformancePage from "./pages/PerformancePage";
import UserPage from "./pages/UsersPage/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import PerformanceDetailPage from "./pages/PerformanceDetailPage";
import EditPerformancePage from "./pages/EditPerformancePage";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackBarAction } from "./redux/slices/snackbarSlice";
import { AppState } from "./redux/store";
import EditUserPage from "./pages/EditUserPage";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarState = useSelector((store: AppState) => store.snackbar);
  return (
    <Router>
      <Box className={classes.root}>
        <PPAppBar />
        <Container maxWidth="sm">
          <Switch>
            <Route exact path={"/performances"} component={PerformancePage} />
            <Route
              exact
              path={"/performances/new"}
              component={EditPerformancePage}
            />
            <Route
              exact
              path={"/performances/:id"}
              component={PerformanceDetailPage}
            />
            <Route exact path={"/users"} component={UserPage} />
            <Route exact path={"/users/new"} component={EditUserPage} />

            <Route component={NotFoundPage} />
          </Switch>
        </Container>
        <Snackbar
          open={snackbarState.isOpen}
          autoHideDuration={4000}
          onClose={() => {
            dispatch(hideSnackBarAction());
          }}
        >
          <MuiAlert
            severity={snackbarState.severity}
            variant={"filled"}
            elevation={1}
          >
            {snackbarState.message}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Router>
  );
}

const useStyles = makeStyles(() => ({
  root: {},
}));

export default App;
