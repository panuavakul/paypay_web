import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { Typography, Grid } from "@material-ui/core";
import AuthType from "../../enums/AuthType";

const userTypeSelector = (state: AppState): boolean => {
  const { userId } = state.common;
  if (!userId) {
    return false;
  }
  return `${userId}`.length > 0;
};

const adminTypeSelector = (state: AppState): boolean => {
  const { isAdmin } = state.common;
  return isAdmin ?? false;
};

/// This component act as a fake auth checking HOC
/// in reality, this component will check if there is auth
/// and check type and render accordingly
export const withAuth = (type: AuthType) => <T extends object>(
  Component: React.ComponentType<T>
) => (props: T) => {
  const isAdmin = useSelector(adminTypeSelector);
  const isUser = useSelector(userTypeSelector);
  let hasAuth = false;
  let label = "";
  switch (type) {
    case AuthType.Admin:
      hasAuth = isAdmin;
      label = "as admin";
      break;
    case AuthType.User:
      hasAuth = isUser;
      label = "as employee";
      break;
    case AuthType.Either:
      hasAuth = isAdmin || isUser;
      break;
    default:
      break;
  }
  return (
    <React.Fragment>
      {hasAuth ? (
        <Component
          signinedas={isAdmin ? AuthType.Admin : AuthType.User}
          {...(props as T)}
        />
      ) : (
        <Grid container direction={"column"}>
          <Grid item>
            <Typography color="textPrimary" variant={"h4"}>
              Not authorized
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" variant={"h5"}>
              Please sign in {`${label}`}
            </Typography>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};
