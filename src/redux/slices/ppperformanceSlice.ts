import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PPPerformance from "../../models/PPPerformance";
import PPPerformanceService from "../../services/PPPerformanceService";
import { mergeAllAction } from "./userSlice";

// Actions
export const getPerformancesAction = createAsyncThunk(
  "performance_get_performances",
  async (_, thunkApi) => {
    const result = await PPPerformanceService.get();
    const users = result.users;
    if (users.length > 0) {
      thunkApi.dispatch(mergeAllAction(users));
    }

    return result.performances;
  }
);

// State
export interface PPPerformanceState {
  byId: { [key: string]: PPPerformance };
  allIds: string[];
}

const initialState: PPPerformanceState = {
  byId: {},
  allIds: [],
};

// Slices
const ppperformanceSlice = createSlice({
  name: "ppperformance",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPerformancesAction.fulfilled, (state, action) => {
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

export const ppperformanceReducer = ppperformanceSlice.reducer;
