import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PPPerformance from "../../models/PPPerformance";
import PPPerformanceService from "../../services/PPPerformanceService";
import { mergeOneAction, mergeAllAction } from "./userSlice";

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

export const getPerformanceAction = createAsyncThunk<PPPerformance, string>(
  "performance_get_performance",
  async (id, thunkApi) => {
    const result = await PPPerformanceService.getWithId(id);

    const user = result.user;
    thunkApi.dispatch(mergeOneAction(user));

    return result.performance;
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

    builder.addCase(getPerformanceAction.fulfilled, (state, action) => {
      const newItem = action.payload;
      const id = newItem.id;

      const byId = { ...state.byId };
      let allIds = [...state.allIds];

      byId[id] = newItem;

      allIds.push(id);

      allIds = Array.from(new Set([...allIds]));

      return { byId: byId, allIds: allIds };
    });
  },
});

export const ppperformanceReducer = ppperformanceSlice.reducer;
