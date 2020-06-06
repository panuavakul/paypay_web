import {
  CommonState,
  commonReducer,
  resetCommonState,
  startLoadingAction,
  finishLoadingAction,
  loginAsAdmin,
  loginAsUser,
} from "../../../redux/slices/commonSlice";

describe("commonReducer", () => {
  const initialState: CommonState = {
    isLoading: false,
    isAdmin: undefined,
    userId: undefined,
  };

  it("should return initial state", () => {
    const result = commonReducer(initialState, resetCommonState());
    expect(result).toEqual({
      isLoading: false,
      isAdmin: undefined,
      userId: undefined,
    });
  });

  it("should handle startLoadingAction", () => {
    const result = commonReducer(initialState, startLoadingAction());
    expect(result).toEqual({
      isLoading: true,
      isAdmin: undefined,
      userId: undefined,
    });
  });

  it("should handle finishLoadingAction", () => {
    const firstResult = commonReducer(initialState, startLoadingAction());
    const result = commonReducer(firstResult, finishLoadingAction());
    expect(result).toEqual({
      isLoading: false,
      isAdmin: undefined,
      userId: undefined,
    });
  });

  it("should handle loginAsAdmin", () => {
    const result = commonReducer(initialState, loginAsAdmin());
    expect(result).toEqual({
      isLoading: false,
      isAdmin: true,
      userId: undefined,
    });
  });

  it("should handle loginAsAdmin", () => {
    const result = commonReducer(initialState, loginAsUser("1"));
    expect(result).toEqual({
      isLoading: false,
      isAdmin: false,
      userId: "1",
    });

    const resultTwo = commonReducer(initialState, loginAsAdmin());
    const resultThree = commonReducer(resultTwo, loginAsUser("112"));

    expect(resultThree).toEqual({
      isLoading: false,
      isAdmin: false,
      userId: "112",
    });
  });
});
