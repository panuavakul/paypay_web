import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { AppState } from "../../redux/store";
import { getUsersAction } from "../../redux/slices/userSlice";
import UserCard from "../../components/UserCard";
import AddFab from "../../components/AddFab";
import PageSelector from "../../components/PageSelector";
import AdminPageType from "../../enums/AdminPageType";
import { withAdmin } from "../../components/hocs/withAdmin";

interface ComponentProps {}

const idsSelector = (state: AppState) => state.user.allIds;

const UserPage: React.SFC<ComponentProps> = props => {
  const userIds = useSelector(idsSelector);
  const dispatch = useDispatch();
  const hasUser = userIds.length > 0;

  useEffect(() => {
    dispatch(getUsersAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <PageSelector mode={AdminPageType.Users} />
      {hasUser ? (
        <Grid container direction={"column"} spacing={2}>
          {userIds.map((id, index) => (
            <Grid item key={index}>
              <UserCard userId={id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="textSecondary" variant={"h5"}>
          No user yet
        </Typography>
      )}
      <AddFab to={"/users/new"} />
    </React.Fragment>
  );
};

export default withAdmin(UserPage);
