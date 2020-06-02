import { createAction, createSlice } from "@reduxjs/toolkit";
import PPPerformance from "../../models/PPPerformance";

// Actions
export const mergeOneAction = createAction<PPPerformance>(
  "data_ppperformance_merge_one"
);
export const mergeAllAction = createAction<PPPerformance[]>(
  "data_ppperformance_merge_all"
);

// State

interface PPPerformanceState {
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

export const ppperformanceReducer = ppperformanceSlice.reducer;
