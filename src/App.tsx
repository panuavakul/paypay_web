import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from "@material-ui/core";
import PPAppBar from "./components/PpAppBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PerformancePage from "./pages/PerformancePage";
import UserPage from "./pages/UsersPage/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Box className={classes.root}>
        <PPAppBar />
        <Container maxWidth="sm">
          <Switch>
            <Route exact path={"/performances"} component={PerformancePage} />
            <Route exact path={"/users"} component={UserPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </Box>
    </Router>
  );
}

const useStyles = makeStyles(() => ({
  root: {},
}));

export default App;
