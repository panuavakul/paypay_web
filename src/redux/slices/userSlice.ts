import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";
import User from "../../models/User";
import { mergeOne } from "../reducer_helpers/mergeOne";
import { mergeAll } from "../reducer_helpers/mergeAll";

// Actions
export const getUsersAction = createAsyncThunk("users_get_users", async () => {
  const users = await UserService.get();
  return users;
});

// Actions
export const mergeOneAction = createAction<User>("data_user_merge_one");
export const mergeAllAction = createAction<User[]>("data_user_merge_all");

// State

export interface UserState {
  byId: { [key: string]: User };
  allIds: string[];
}

const initialState: UserState = {
  byId: {},
  allIds: [],
};

// Slices
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersAction.fulfilled, (state, action) => {
      return mergeAll<User>(state, action.payload);
    });

    builder.addCase(mergeOneAction, (state, action) => {
      return mergeOne<User>(state, action.payload);
    });

    builder.addCase(mergeAllAction, (state, action) => {
      return mergeAll<User>(state, action.payload);
    });
  },
});

export const userReducer = userSlice.reducer;
