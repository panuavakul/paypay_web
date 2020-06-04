import { createSlice, createAction } from "@reduxjs/toolkit";
import Feedback from "../../models/Feedback";
import { mergeOne } from "../reducer_helpers/mergeOne";
import { mergeAll } from "../reducer_helpers/mergeAll";

// Actions
export const mergeOneAction = createAction<Feedback>("data_feedback_merge_one");
export const mergeAllAction = createAction<Feedback[]>(
  "data_feedback_merge_all"
);

// State
export interface FeedbackState {
  byId: { [key: string]: Feedback };
  allIds: string[];
}

const initialState: FeedbackState = {
  byId: {},
  allIds: [],
};

// Slices
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(mergeOneAction, (state, action) => {
      return mergeOne<Feedback>(state, action.payload);
    });

    builder.addCase(mergeAllAction, (state, action) => {
      return mergeAll<Feedback>(state, action.payload);
    });
  },
});

export const feedbackReducer = feedbackSlice.reducer;
