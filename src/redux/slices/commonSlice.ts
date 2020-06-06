import { createSlice, createAction } from "@reduxjs/toolkit";

// Actions
export const resetCommonState = createAction<void>("page_common_reset");
export const startLoadingAction = createAction<void>(
  "page_common_loading_start"
);
export const finishLoadingAction = createAction<void>(
  "page_common_loading_finish"
);
export const loginAsAdmin = createAction<void>("page_common_login_as_admin");
export const loginAsUser = createAction<string>("page_common_login_as_user");

// State
export interface CommonState {
  isLoading: boolean;
  // `isAdmin` and `userId` will act as our auth since we don't have auth system
  isAdmin?: boolean;
  userId?: string;
}

const initialState: CommonState = {
  isLoading: false,
  isAdmin: undefined,
  userId: undefined,
};

// Slices
const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      resetCommonState,
      (state, action): CommonState => {
        return { ...initialState };
      }
    );
    builder.addCase(
      startLoadingAction,
      (state, action): CommonState => {
        return { ...state, isLoading: true };
      }
    );
    builder.addCase(
      finishLoadingAction,
      (state, action): CommonState => {
        return { ...state, isLoading: false };
      }
    );
    builder.addCase(
      loginAsAdmin,
      (state, action): CommonState => {
        return { ...state, isAdmin: true };
      }
    );
    builder.addCase(
      loginAsUser,
      (state, action): CommonState => {
        return { ...state, isAdmin: false, userId: action.payload };
      }
    );
  },
});

export const commonReducer = commonSlice.reducer;
