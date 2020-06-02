import React from "react";
import { Grid, Typography } from "@material-ui/core";
import PerformanceCard from "../../components/PerformanceCard";

interface PerformancePage {}
const PerformancePage: React.SFC<PerformancePage> = props => {
  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h3"} gutterBottom>
        Performance
      </Typography>
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
    </React.Fragment>
  );
};

export default PerformancePage;
