import { Middleware } from "@reduxjs/toolkit";
import { postPerformance } from "../slices/editPerformancePageSlice";
import { startLoadingAction, finishLoadingAction } from "../slices/commonSlice";
import { showSnackBarAction } from "../slices/snackbarSlice";
import SnackBarSeverity from "../../enums/SnackBarSeverity";

const loadingActions: string[] = [postPerformance.typePrefix];

export const loadingMiddleware: Middleware = store => next => action => {
  const type: string = action.type;
  // length will always be more than 0
  const splitted = type.split("/");
  const prefix = splitted[0];
  if (loadingActions.includes(prefix)) {
    // the thunk action should have length > 1
    const loadingType = splitted[1];
    switch (loadingType) {
      case "pending":
        store.dispatch(startLoadingAction());
        break;
      case "rejected":
        store.dispatch(finishLoadingAction());
        store.dispatch(
          showSnackBarAction({
            severity: SnackBarSeverity.Error,
            message: "Something went wrong. Please try again :O",
          })
        );
        break;
      case "fulfilled":
        // Success
        store.dispatch(
          showSnackBarAction({
            severity: SnackBarSeverity.Success,
            message: "Succesfully saved :D",
          })
        );
        store.dispatch(finishLoadingAction());
        break;
      default:
        // this is not possible do nothing
        break;
    }
  }
  return next(action);
};
