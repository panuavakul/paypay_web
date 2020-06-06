import PPPerformance, {
  PPPerformanceHelper,
} from "../../../models/PPPerformance";
import { removeId } from "../../../redux/reducer_helpers/removeId";
import BaseData from "../../../models/BaseData";
import User from "../../../models/User";

interface State<T extends BaseData> {
  byId: { [key: string]: T };
  allIds: string[];
}

describe("ppperformanceReducer", () => {
  const initialState: State<User> = {
    byId: {},
    allIds: [],
  };

  const sampleState: State<User> = {
    byId: {
      "1": {
        id: "1",
        firstName: "Taro",
        lastName: "Yamada",
        performanceIds: [],
        feedbackIds: [],
      },
      "2": {
        id: "2",
        firstName: "John",
        lastName: "Smith",
        performanceIds: [],
        feedbackIds: [],
      },
      "3": {
        id: "3",
        firstName: "John",
        lastName: "Smith",
        performanceIds: [],
        feedbackIds: [],
      },
    },
    allIds: ["1", "2", "3"],
  };

  it("should return initial state", () => {
    expect(removeId<User>(initialState, "0")).toEqual(initialState);
  });

  it("should remove an item", () => {
    const result = removeId<User>(sampleState, "1");
    expect(result.allIds).toEqual(["2", "3"]);
    expect(result.byId["2"]).toEqual({
      id: "2",
      firstName: "John",
      lastName: "Smith",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["3"]).toEqual({
      id: "3",
      firstName: "John",
      lastName: "Smith",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["1"]).toBeUndefined();
  });

  it("should remove all items", () => {
    const removeOne = removeId<User>(sampleState, "1");
    const removeTwo = removeId<User>(removeOne, "2");
    const removeThree = removeId<User>(removeTwo, "3");

    expect(removeThree).toEqual(initialState);
  });
});
