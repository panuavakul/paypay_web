import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import PPPerformance from "../../models/PPPerformance";
import PPPerformanceService from "../../services/PPPerformanceService";
import { mergeAllUserAction } from "./userSlice";
import { mergeAllFeedbackAction } from "./feedbackSlice";
import { mergeAll } from "../reducer_helpers/mergeAll";
import { mergeOne } from "../reducer_helpers/mergeOne";
import { AppState } from "../store";
import { removeId } from "../reducer_helpers/removeId";

// Actions
export const getPerformancesAction = createAsyncThunk(
  "performance_get_performances",
  async (_, thunkApi) => {
    const result = await PPPerformanceService.get();
    const users = result.users;
    if (users.length > 0) {
      thunkApi.dispatch(mergeAllUserAction(users));
    }

    return result.performances;
  }
);

export const getPerformanceAction = createAsyncThunk<PPPerformance, string>(
  "performance_get_performance",
  async (id, thunkApi) => {
    const result = await PPPerformanceService.getWithId(id);

    const users = result.users;
    const feedbacks = result.feedbacks;

    thunkApi.dispatch(mergeAllUserAction(users));

    thunkApi.dispatch(mergeAllFeedbackAction(feedbacks));

    return result.performance;
  }
);

export const getAssignedPerformancesAction = createAsyncThunk(
  "performance_get_assigned_performances",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as AppState;
    const userId = state.common.userId;
    if (!userId) {
      // Reject this if use isn't signed in
      throw Error("No user id");
    }

    const result = await PPPerformanceService.getAssigned(`${userId}`);
    const users = result.users;
    if (users.length > 0) {
      thunkApi.dispatch(mergeAllUserAction(users));
    }

    return result.performances;
  }
);

export const removeOnePerformanceWithIdAction = createAction<string>(
  "performance_remove_one_with_id"
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
      return mergeAll<PPPerformance>(state, action.payload);
    });

    builder.addCase(getPerformanceAction.fulfilled, (state, action) => {
      return mergeOne<PPPerformance>(state, action.payload);
    });

    builder.addCase(
      getAssignedPerformancesAction.fulfilled,
      (state, action) => {
        return mergeAll<PPPerformance>(state, action.payload);
      }
    );

    builder.addCase(removeOnePerformanceWithIdAction, (state, action) => {
      const result = removeId<PPPerformance>(state, action.payload);
      return removeId<PPPerformance>(state, action.payload);
    });
  },
});

export const ppperformanceReducer = ppperformanceSlice.reducer;
