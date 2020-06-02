import React from "react";
import { Grid, Typography } from "@material-ui/core";

const NotFoundPage = () => {
  return (
    <Grid container direction={"column"} alignContent={"center"}>
      <Grid item>
        <Typography color="textPrimary" variant={"h2"} gutterBottom>
          404
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="textSecondary" variant={"h3"} gutterBottom>
          Not Found
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
