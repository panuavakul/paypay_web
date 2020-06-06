import React, { useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersAction,
  resetUserStateAction,
} from "../../redux/slices/userSlice";
import UserSelector from "../../components/UserSelector";
import { AppState } from "../../redux/store";
import {
  loginAsAdmin,
  resetCommonState,
  loginAsUser,
} from "../../redux/slices/commonSlice";
import { useHistory } from "react-router-dom";
import { setSelectedUserAction } from "../../redux/slices/selectUserPageSlice";
import { resetFeedbackStateAction } from "../../redux/slices/feedbackSlice";

interface State {
  userIds: string[];
  selectedUserId: string;
}

const selector = (state: AppState): State => {
  return {
    userIds: state.user.allIds,
    selectedUserId: state.selectUserPage.selectedUserId,
  };
};

// This is more like a debug screen to simulate the login process
// Since, it is assumed that no login system is need use this screen
// choose which user to log in as
const SelectUserPage: React.SFC = props => {
  const state = useSelector(selector);
  const dispatch = useDispatch();
  const { userIds, selectedUserId } = state;
  const hasUser = userIds.length > 0;
  const history = useHistory();

  useEffect(() => {
    dispatch(resetUserStateAction());
    dispatch(resetFeedbackStateAction());
    dispatch(resetUserStateAction());
    dispatch(resetCommonState());
    dispatch(getUsersAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Since this is more of like a debug screen
  // we will be using the local state and not the Redux's store to save time

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item>
        <Typography color="textPrimary" variant={"h4"}>
          Sign In as
        </Typography>
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color={"primary"}
          onClick={() => {
            dispatch(loginAsAdmin());
            history.push("/performances");
          }}
        >
          Admin
        </Button>
      </Grid>
      <Grid item>
        <Typography color="textPrimary" variant={"h4"}>
          or as
        </Typography>
      </Grid>
      {hasUser && (
        <Grid item>
          <UserSelector
            id={"login-as-selector"}
            label={"User"}
            values={selectedUserId}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              const id = event.target.value as string;
              dispatch(setSelectedUserAction(id));
            }}
          />
        </Grid>
      )}
      {!hasUser && (
        <Grid item>
          <Typography color="textSecondary" variant={"body1"} gutterBottom>
            No user found. Please first create an user with an admin account.
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Button
          fullWidth
          disabled={!hasUser || state.selectedUserId.length < 1}
          variant="contained"
          color={"primary"}
          onClick={() => {
            dispatch(loginAsUser(selectedUserId));
            history.push("/inbox");
          }}
        >
          Employee
        </Button>
      </Grid>
    </Grid>
  );
};

export default SelectUserPage;
