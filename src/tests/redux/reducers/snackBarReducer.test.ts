import BaseData from "../../../models/BaseData";
import {
  SnackbarState,
  showSnackBarAction,
  hideSnackBarAction,
  snackbarReducer,
} from "../../../redux/slices/snackbarSlice";
import SnackBarSeverity from "../../../enums/SnackBarSeverity";

describe("snackBarReducer", () => {
  const initialState: SnackbarState = {
    isOpen: false,
    severity: SnackBarSeverity.Success,
    message: "",
  };

  it("should handle showSnackBarAction", () => {
    const result = snackbarReducer(
      initialState,
      showSnackBarAction({
        severity: SnackBarSeverity.Error,
        message: "Something went wrong",
      })
    );
    expect(result).toEqual({
      isOpen: true,
      severity: SnackBarSeverity.Error,
      message: "Something went wrong",
    });
  });

  it("should handle hideSnackBarAction", () => {
    const result = snackbarReducer(initialState, hideSnackBarAction());
    expect(result).toEqual({ ...initialState });
  });
});
