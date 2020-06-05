import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import PPPerformanceService from "../../services/PPPerformanceService";
import { AppState } from "../store";
import * as Validator from "../../helpers/validators";
import { PPPerformancePostBody } from "../../models/PPPerformance";

// Actions
export const setEmployeeIdAction = createAction<string>(
  "page_edit_performance_set_employee_id"
);

export const setMonthAction = createAction<number>(
  "page_edit_performance_set_month"
);

export const setReviewerIdsAction = createAction<string[]>(
  "page_edit_performance_set_reviewer_ids"
);

export const setAchievementAction = createAction<string>(
  "page_edit_performance_set_achievement"
);

// Actions
export const setEmployeeIdErrorAction = createAction<string>(
  "page_edit_performance_set_employee_id_error"
);

export const setReviewerIdsErrorAction = createAction<string>(
  "page_edit_performance_set_reviewer_ids_error"
);

export const setAchievementErrorAction = createAction<string>(
  "page_edit_performance_set_achievement_error"
);

export const postPerformance = createAsyncThunk(
  "page_edit_performance_post",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as AppState;
    const editingState = state.editPerformancePage;
    const { employeeId, reviewerIds, achievement, month } = editingState;
    // For simplicity just do basic validation here.
    // Maybe these values should be put in ReduxForm, it's getting a little big
    let hasError = false;
    const employeeIdValidationResult = Validator.validateEmployeeId(employeeId);
    if (employeeIdValidationResult) {
      thunkApi.dispatch(setEmployeeIdErrorAction(employeeIdValidationResult));
      hasError = true;
    } else {
      thunkApi.dispatch(setEmployeeIdErrorAction(""));
    }
    const reviewerIdsValidationResult = Validator.validateReviewers(
      reviewerIds
    );
    if (reviewerIdsValidationResult) {
      thunkApi.dispatch(setReviewerIdsErrorAction(reviewerIdsValidationResult));
      hasError = true;
    } else {
      thunkApi.dispatch(setReviewerIdsErrorAction(""));
    }
    const achievementValidationResult = Validator.validateAchievement(
      achievement
    );
    if (achievementValidationResult) {
      thunkApi.dispatch(setAchievementErrorAction(achievementValidationResult));
      hasError = true;
    } else {
      thunkApi.dispatch(setAchievementErrorAction(""));
    }

    if (hasError) {
      console.log("error");
      return;
    }

    const date = new Date(new Date().getFullYear(), month).toISOString();

    const convertedReviewerIds = reviewerIds.map(id => `${id}`);

    const performanceToPost: PPPerformancePostBody = {
      date: date,
      userId: `${employeeId}`,
      achievement: achievement,
      reviewerIds: convertedReviewerIds,
    };

    await PPPerformanceService.post(performanceToPost);
    console.log("completed");
  }
);

// State
export interface EditPerformancePageState {
  employeeId: string;
  month: number;
  reviewerIds: string[];
  achievement: string;
  employeeErrorMsg: string;
  reviewersErrorMsg: string;
  achievementErrorMsg: string;
  dateErrorMsg: string;
}

const initialState: EditPerformancePageState = {
  employeeId: "",
  month: new Date().getMonth(),
  reviewerIds: [],
  achievement: "",
  employeeErrorMsg: "",
  reviewersErrorMsg: "",
  achievementErrorMsg: "",
  dateErrorMsg: "",
};

// Slices
const editPerformancePageSlice = createSlice({
  name: "editPerformancePage",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setEmployeeIdAction, (state, action) => {
      const reviewerIds = [...state.reviewerIds];

      // When the employee is changed remove the value if he/she is selected
      // in the reviewers list
      const indexToRemove = reviewerIds.indexOf(action.payload);
      if (indexToRemove > -1) {
        reviewerIds.splice(indexToRemove, 1);
      }
      return { ...state, employeeId: action.payload, reviewerIds: reviewerIds };
    });

    builder.addCase(setMonthAction, (state, action) => {
      return { ...state, month: action.payload };
    });

    builder.addCase(setReviewerIdsAction, (state, action) => {
      return { ...state, reviewerIds: action.payload };
    });

    builder.addCase(setAchievementAction, (state, action) => {
      return { ...state, achievement: action.payload };
    });

    builder.addCase(setEmployeeIdErrorAction, (state, action) => {
      return { ...state, employeeErrorMsg: action.payload };
    });

    builder.addCase(setReviewerIdsErrorAction, (state, action) => {
      return { ...state, reviewersErrorMsg: action.payload };
    });

    builder.addCase(setAchievementErrorAction, (state, action) => {
      return { ...state, achievementErrorMsg: action.payload };
    });
  },
});

export const editPerformancePageReducer = editPerformancePageSlice.reducer;
