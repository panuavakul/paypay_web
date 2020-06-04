import { createSlice, createAction } from "@reduxjs/toolkit";

// Actions
export const setEmployeeIdAction = createAction<string>(
  "page_edit_performance_set_employee_id"
);

export const setReviewerIdsAction = createAction<string[]>(
  "page_edit_performance_set_reviewer_ids"
);

export const setAchievementAction = createAction<string>(
  "page_edit_performance_set_achievement"
);

// State
export interface EditPerformancePageState {
  employeeId: string;
  reviewerIds: string[];
  achievement: string;
}

const initialState: EditPerformancePageState = {
  employeeId: "",
  reviewerIds: [],
  achievement: "",
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

    builder.addCase(setReviewerIdsAction, (state, action) => {
      return { ...state, reviewerIds: action.payload };
    });

    builder.addCase(setAchievementAction, (state, action) => {
      return { ...state, achievement: action.payload };
    });
  },
});

export const editPerformancePageReducer = editPerformancePageSlice.reducer;
