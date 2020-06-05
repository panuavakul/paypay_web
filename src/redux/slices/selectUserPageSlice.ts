import { createAction, createSlice } from "@reduxjs/toolkit";

// Actions
export const setSelectedUserAction = createAction<string>(
  "page_select_user_page_set_selcted_user"
);

// State
export interface SelectUserPageState {
  selectedUserId: string;
}

const initialState: SelectUserPageState = {
  selectedUserId: "",
};

// Slices
const selectUserPageSlice = createSlice({
  name: "selectUserPage",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      setSelectedUserAction,
      (state, action): SelectUserPageState => {
        return { selectedUserId: action.payload };
      }
    );
  },
});

export const selectUserPageReducer = selectUserPageSlice.reducer;
