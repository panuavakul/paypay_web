import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { AppState } from "../../redux/store";
import { getUsersAction } from "../../redux/slices/userSlice";

interface UserPage {
  userIds: string[];
  getUsers: () => void;
}

const UserPage: React.SFC<UserPage> = props => {
  useEffect(() => {
    // Update the document title using the browser API
    props.getUsers();
  }, []);

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

const mapStateToProps = (state: AppState) => {
  const userIds = state.user.allIds;
  return { userIds: userIds };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUsers: () => dispatch(getUsersAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
