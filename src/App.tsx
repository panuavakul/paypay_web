import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid } from "@material-ui/core";
import PPAppBar from "./components/PpAppBar";
import PerformanceCard from "./components/PerformanceCard";

function App() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <PPAppBar />
      <Container maxWidth="sm">
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <PerformanceCard />
          </Grid>
          <Grid item>
            <PerformanceCard />
          </Grid>
          <Grid item>
            <PerformanceCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  root: {},
}));

export default App;
