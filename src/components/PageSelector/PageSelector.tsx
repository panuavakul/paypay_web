import React from "react";
import AdminPageType from "../../enums/AdminPageType";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

interface ComponentProps {
  mode: AdminPageType;
}

const PageSelector: React.SFC<ComponentProps> = props => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Link to={`/performances`} style={{ textDecoration: "none" }}>
          <Typography
            color={
              props.mode === AdminPageType.Performances
                ? "textPrimary"
                : "textSecondary"
            }
            variant={"h4"}
            gutterBottom
          >
            Performances
          </Typography>
        </Link>
      </Grid>
      <Grid item>
        <Typography color={"textPrimary"} variant={"h4"} gutterBottom>
          /
        </Typography>
      </Grid>
      <Grid item>
        <Link to={`/users`} style={{ textDecoration: "none" }}>
          <Typography
            color={
              props.mode === AdminPageType.Users
                ? "textPrimary"
                : "textSecondary"
            }
            variant={"h4"}
            gutterBottom
          >
            Employees
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default PageSelector;
