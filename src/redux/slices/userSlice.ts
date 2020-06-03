import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";
import User from "../../models/User";
import PPPerformance from "../../models/PPPerformance";

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
      const newItems = action.payload;

      const byId = { ...state.byId };
      let allIds = [...state.allIds];

      for (var index in newItems) {
        const item = newItems[index];
        const id = item.id;
        byId[id] = item;
        allIds.push(id);
      }

      allIds = Array.from(new Set([...allIds]));

      return { byId: byId, allIds: allIds };
    });

    builder.addCase(mergeOneAction, (state, action) => {
      const id = action.payload.id;
      const value = action.payload;

      const byId = { ...state.byId };
      byId[id] = value;

      const allIds = Array.from(new Set([...state.allIds, id]));

      return { byId: byId, allIds: allIds };
    });

    builder.addCase(mergeAllAction, (state, action) => {
      const newItems = action.payload;

      const byId = { ...state.byId };
      let allIds = [...state.allIds];

      for (var index in newItems) {
        const item = newItems[index];
        const id = item.id;
        byId[id] = item;
        allIds.push(id);
      }

      allIds = Array.from(new Set([...allIds]));

      return { byId: byId, allIds: allIds };
    });
  },
});

export const userReducer = userSlice.reducer;
