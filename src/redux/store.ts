import { configureStore } from "@reduxjs/toolkit";
import { ppperformanceReducer } from "./slices/ppperformanceSlice";
import { combineReducers } from "redux";

const reducer = combineReducers({
  ppperformance: ppperformanceReducer,
});

export const store = configureStore({
  reducer: reducer,
});
