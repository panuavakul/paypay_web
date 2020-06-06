import BaseData from "../../../models/BaseData";
import User from "../../../models/User";
import { mergeAll } from "../../../redux/reduxHelpers/mergeAll";

interface State<T extends BaseData> {
  byId: { [key: string]: T };
  allIds: string[];
}

describe("mergeAll", () => {
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
        firstName: "Papa",
        lastName: "John",
        performanceIds: [],
        feedbackIds: [],
      },
    },
    allIds: ["1", "2", "3"],
  };

  it("should return initial state", () => {
    expect(mergeAll<User>(initialState, [])).toEqual(initialState);
  });

  it("should add an item", () => {
    const result = mergeAll<User>(sampleState, [
      {
        id: "4",
        firstName: "Kamome",
        lastName: "Tanaka",
        performanceIds: [],
        feedbackIds: [],
      },
    ]);
    expect(result.allIds).toEqual(["1", "2", "3", "4"]);
    expect(result.byId["1"]).toEqual({
      id: "1",
      firstName: "Taro",
      lastName: "Yamada",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["2"]).toEqual({
      id: "2",
      firstName: "John",
      lastName: "Smith",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["3"]).toEqual({
      id: "3",
      firstName: "Papa",
      lastName: "John",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["4"]).toEqual({
      id: "4",
      firstName: "Kamome",
      lastName: "Tanaka",
      performanceIds: [],
      feedbackIds: [],
    });
  });

  it("should add multiple value", () => {
    const result = mergeAll<User>(sampleState, [
      {
        id: "4",
        firstName: "Kamome",
        lastName: "Tanaka",
        performanceIds: [],
        feedbackIds: [],
      },
      {
        id: "1",
        firstName: "Go",
        lastName: "Lang",
        performanceIds: [],
        feedbackIds: [],
      },
      {
        id: "5",
        firstName: "React",
        lastName: "Redux",
        performanceIds: [],
        feedbackIds: [],
      },
    ]);
    expect(result.allIds).toEqual(["1", "2", "3", "4", "5"]);
    expect(result.byId["1"]).toEqual({
      id: "1",
      firstName: "Go",
      lastName: "Lang",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["2"]).toEqual({
      id: "2",
      firstName: "John",
      lastName: "Smith",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["3"]).toEqual({
      id: "3",
      firstName: "Papa",
      lastName: "John",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["4"]).toEqual({
      id: "4",
      firstName: "Kamome",
      lastName: "Tanaka",
      performanceIds: [],
      feedbackIds: [],
    });
    expect(result.byId["5"]).toEqual({
      id: "5",
      firstName: "React",
      lastName: "Redux",
      performanceIds: [],
      feedbackIds: [],
    });
  });
});
