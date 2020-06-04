import { configureStore } from "@reduxjs/toolkit";
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

const reducer = combineReducers({
  user: userReducer,
  ppperformance: ppperformanceReducer,
  feedback: feedbackReducer,
  editPerformancePage: editPerformancePageReducer,
});

export interface AppState {
  user: UserState;
  ppperformance: PPPerformanceState;
  feedback: FeedbackState;
  editPerformancePage: EditPerformancePageState;
}

export const store = configureStore({
  reducer: reducer,
});
