import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";
import { UserPostBody } from "../../models/User";
import { AppState } from "../store";
import * as Validator from "../../helpers/validators";

// Actions
export const postUserAction = createAsyncThunk<boolean, void>(
  "page_edituser_post",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as AppState;
    const { firstName, lastName } = state.editUserPage;

    let hasError = false;
    const firstNameValidationResult = Validator.validateFirstName(firstName);
    if (firstNameValidationResult) {
      thunkApi.dispatch(setFirstNameErrorMsgAction(firstNameValidationResult));
      hasError = true;
    } else {
      thunkApi.dispatch(setFirstNameErrorMsgAction(""));
    }

    const lastNameValidationResult = Validator.validateLastName(lastName);
    if (lastNameValidationResult) {
      thunkApi.dispatch(setLastNameErrorMsgAction(lastNameValidationResult));
      hasError = true;
    } else {
      thunkApi.dispatch(setLastNameErrorMsgAction(""));
    }

    if (hasError) {
      // Return false here to indicate that there is a validation error
      return false;
    }

    // Post data
    const body: UserPostBody = {
      firstName: firstName,
      lastName: lastName,
    };

    await UserService.post(body);
    return true;
  }
);

// Actions
export const resetEditUserPage = createAction<void>("page_edituser_reset");
export const setFirstNameAction = createAction<string>(
  "page_edituser_firstname_set"
);
export const setLastNameAction = createAction<string>(
  "page_edituser_lastname_set"
);
export const setFirstNameErrorMsgAction = createAction<string>(
  "page_edituser_firstname_error_msg_set"
);
export const setLastNameErrorMsgAction = createAction<string>(
  "page_edituser_lastname_error_msg_set"
);

// State

export interface EditUserPageState {
  firstName: string;
  lastName: string;
  firstNameErrorMsg: string;
  lastNameErrorMsg: string;
}

const initialState: EditUserPageState = {
  firstName: "",
  lastName: "",
  firstNameErrorMsg: "",
  lastNameErrorMsg: "",
};

// Slices
const editUserPageSlice = createSlice({
  name: "editUserPage",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      resetEditUserPage,
      (state, action): EditUserPageState => {
        return { ...initialState };
      }
    );
    builder.addCase(
      setFirstNameAction,
      (state, action): EditUserPageState => {
        return { ...state, firstName: action.payload };
      }
    );
    builder.addCase(
      setLastNameAction,
      (state, action): EditUserPageState => {
        return { ...state, lastName: action.payload };
      }
    );
    builder.addCase(
      setFirstNameErrorMsgAction,
      (state, action): EditUserPageState => {
        return { ...state, firstNameErrorMsg: action.payload };
      }
    );
    builder.addCase(
      setLastNameErrorMsgAction,
      (state, action): EditUserPageState => {
        return { ...state, lastNameErrorMsg: action.payload };
      }
    );
  },
});

export const editUserPageReducer = editUserPageSlice.reducer;
