import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  ppperformanceReducer,
  PPPerformanceState,
} from "./slices/ppperformanceSlice";
import { combineReducers } from "redux";
import { userReducer, UserState } from "./slices/userSlice";
import { feedbackReducer, FeedbackState } from "./slices/feedbackSlice";
import {
  editPerformancePageReducer,
  EditPerformancePageState,
} from "./slices/editPerformancePageSlice";
import { loadingMiddleware } from "./middlewares/loadingMiddleware";
import { commonReducer, CommonState } from "./slices/commonSlice";
import { SnackbarState, snackbarReducer } from "./slices/snackbarSlice";
import {
  EditUserPageState,
  editUserPageReducer,
} from "./slices/editUserPageSlice";

const reducer = combineReducers({
  common: commonReducer,
  snackbar: snackbarReducer,
  user: userReducer,
  ppperformance: ppperformanceReducer,
  feedback: feedbackReducer,
  editPerformancePage: editPerformancePageReducer,
  editUserPage: editUserPageReducer,
});

export interface AppState {
  common: CommonState;
  snackbar: SnackbarState;
  user: UserState;
  ppperformance: PPPerformanceState;
  feedback: FeedbackState;
  editPerformancePage: EditPerformancePageState;
  editUserPage: EditUserPageState;
}

export const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware(), loadingMiddleware],
});
