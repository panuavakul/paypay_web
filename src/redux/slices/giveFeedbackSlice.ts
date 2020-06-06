import { createAction, createSlice } from "@reduxjs/toolkit";

// Actions
export const setFeedbackPointsAction = createAction<number>(
  "page_give_feedback_point_set"
);
export const setFeedbackCommentAction = createAction<string>(
  "page_give_feedback_comment_set"
);
export const setFeedbackCommentErrorMsgAction = createAction<string>(
  "page_give_feedback_comment_error_msg_set"
);

// State

export interface GiveFeedbackState {
  point: number;
  comment: string;
  commentErrorMsg: string;
}

const initialState: GiveFeedbackState = {
  point: 3,
  comment: "",
  commentErrorMsg: "",
};

// Slices
const giveFeedbackSlice = createSlice({
  name: "giveFeedback",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      setFeedbackPointsAction,
      (state, action): GiveFeedbackState => {
        return { ...state, point: action.payload };
      }
    );
    builder.addCase(
      setFeedbackCommentAction,
      (state, action): GiveFeedbackState => {
        return { ...state, comment: action.payload };
      }
    );
    builder.addCase(
      setFeedbackCommentErrorMsgAction,
      (state, action): GiveFeedbackState => {
        return { ...state, commentErrorMsg: action.payload };
      }
    );
  },
});

export const giveFeedbackReducer = giveFeedbackSlice.reducer;
