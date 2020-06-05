import { createSlice, createAction } from "@reduxjs/toolkit";
import SnackBarSeverity from "../../enums/SnackBarSeverity";

export const showSnackBarAction = createAction<SnackBarProps>(
  "page_snackbar_show"
);
export const hideSnackBarAction = createAction<void>("page_snackbar_hide");

export interface SnackBarProps {
  severity: SnackBarSeverity;
  message: string;
}

// State
export interface SnackbarState {
  // Maybe this should be an enum
  isOpen: boolean;
  severity: SnackBarSeverity;
  message: string;
}

const initialState: SnackbarState = {
  isOpen: false,
  severity: SnackBarSeverity.Success,
  message: "",
};

// Slices
const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      showSnackBarAction,
      (state, action): SnackbarState => {
        return {
          isOpen: true,
          severity: action.payload.severity,
          message: action.payload.message,
        };
      }
    );
    builder.addCase(
      hideSnackBarAction,
      (state, action): SnackbarState => {
        return {
          isOpen: false,
          severity: SnackBarSeverity.Success,
          message: "",
        };
      }
    );
  },
});

export const snackbarReducer = snackbarSlice.reducer;
