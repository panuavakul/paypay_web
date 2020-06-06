import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { validateFeedbackComment } from "../../helpers/validators";
import FeedbackService, {
  FeedbackPostBody,
} from "../../services/FeedbackService";
import { removeOnePerformanceWithIdAction } from "./ppperformanceSlice";

// Actions
export const resetGiveFeedbackAction = createAction<void>(
  "page_give_feedback_reset"
);

export const setFeedbackPointsAction = createAction<number>(
  "page_give_feedback_point_set"
);
export const setFeedbackCommentAction = createAction<string>(
  "page_give_feedback_comment_set"
);
export const setFeedbackCommentErrorMsgAction = createAction<string>(
  "page_give_feedback_comment_error_msg_set"
);

export const postFeedbackAction = createAsyncThunk<boolean, string>(
  "page_give_feedback_post",
  async (performanceId, thunkApi) => {
    const state = thunkApi.getState() as AppState;
    const { point, comment } = state.giveFeedback;
    const { userId } = state.common;

    if (!userId) {
      throw Error("Not logged in");
    }

    const commentValidationResult = validateFeedbackComment(comment);
    if (commentValidationResult) {
      thunkApi.dispatch(
        setFeedbackCommentErrorMsgAction(commentValidationResult)
      );
      return false;
    } else {
      thunkApi.dispatch(setFeedbackCommentErrorMsgAction(""));
    }

    const feedbackToPost: FeedbackPostBody = {
      points: point,
      comment: comment,
      userId: userId,
      performanceId: performanceId,
    };

    await FeedbackService.post(feedbackToPost);

    thunkApi.dispatch(removeOnePerformanceWithIdAction(performanceId));

    return true;
  }
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
      resetGiveFeedbackAction,
      (): GiveFeedbackState => {
        return { ...initialState };
      }
    );
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
