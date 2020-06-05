import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { AppState } from "../../redux/store";
import { getUsersAction } from "../../redux/slices/userSlice";
import UserCard from "../../components/UserCard";
import AddFab from "../../components/AddFab";

interface ComponentProps {}

const idsSelector = (state: AppState) => state.user.allIds;

const UserPage: React.SFC<ComponentProps> = props => {
  const userIds = useSelector(idsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h4"} gutterBottom>
        Users
      </Typography>
      <Grid container direction={"column"} spacing={2}>
        {userIds.map((id, index) => (
          <Grid item key={index}>
            <UserCard userId={id} />
          </Grid>
        ))}
      </Grid>
      <AddFab to={"/users/new"} />
    </React.Fragment>
  );
};

export default UserPage;
