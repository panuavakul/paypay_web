import { configureStore } from "@reduxjs/toolkit";
import {
  ppperformanceReducer,
  PPPerformanceState,
} from "./slices/ppperformanceSlice";
import { combineReducers } from "redux";
import { userReducer, UserState } from "./slices/userSlice";

const reducer = combineReducers({
  user: userReducer,
  ppperformance: ppperformanceReducer,
});

export interface AppState {
  user: UserState;
  ppperformance: PPPerformanceState;
}

export const store = configureStore({
  reducer: reducer,
});
