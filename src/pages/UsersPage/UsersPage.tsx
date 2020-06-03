import React from "react";
import { Grid, Typography } from "@material-ui/core";

interface UserPage {}

const UserPage: React.SFC<UserPage> = props => {
  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h3"} gutterBottom>
        Users
      </Typography>
      <Grid container direction={"column"} spacing={2}>
        <Grid item></Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </React.Fragment>
  );
};

export default UserPage;
