import { createSlice, createAction } from "@reduxjs/toolkit";

// Actions
export const startLoadingAction = createAction<void>(
  "page_common_loading_start"
);
export const finishLoadingAction = createAction<void>(
  "page_common_loading_finish"
);
// State
export interface CommonState {
  isLoading: boolean;
}

const initialState: CommonState = {
  isLoading: false,
};

// Slices
const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(startLoadingAction, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(finishLoadingAction, (state, action) => {
      return { ...state, isLoading: false };
    });
  },
});

export const commonReducer = commonSlice.reducer;
