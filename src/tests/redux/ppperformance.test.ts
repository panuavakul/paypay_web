import PPPerformance from "../../models/PPPerformance";
import {
  ppperformanceReducer,
  mergeOneAction,
  mergeAllAction,
} from "../../redux/slices/ppperformanceSlice";

describe("ppperformanceReducer", () => {
  it("should return initial state", () => {
    expect(ppperformanceReducer(undefined, <any>{})).toEqual({
      byId: {},
      allIds: [],
    });
  });

  it("should merge one item", () => {
    const itemOne = new PPPerformance({
      id: "1",
      date: new Date(),
      employeeId: "a",
      feedbackIds: ["1", "2"],
      description: "great job",
    });

    const itemTwo = new PPPerformance({
      id: "2",
      date: new Date(),
      employeeId: "b",
      feedbackIds: ["3", "4"],
      description: "great job too",
    });

    const firstResult = ppperformanceReducer(
      undefined,
      mergeOneAction(itemOne)
    );

    expect(Object.keys(firstResult.byId).length).toEqual(1);
    expect(firstResult.allIds.length).toEqual(1);

    const secondResult = ppperformanceReducer(
      firstResult,
      mergeOneAction(itemTwo)
    );

    expect(Object.keys(secondResult.byId).length).toEqual(2);
    expect(secondResult.allIds.length).toEqual(2);
  });

  it("should replace one item", () => {
    const itemOne = new PPPerformance({
      id: "1",
      date: new Date(),
      employeeId: "a",
      feedbackIds: ["1", "2"],
      description: "great job",
    });

    const itemTwo = new PPPerformance({
      id: "1",
      date: new Date(),
      employeeId: "b",
      feedbackIds: ["3", "4"],
      description: "great job too",
    });

    const firstResult = ppperformanceReducer(
      undefined,
      mergeOneAction(itemOne)
    );

    const secondResult = ppperformanceReducer(
      firstResult,
      mergeOneAction(itemTwo)
    );

    expect(Object.keys(secondResult.byId).length).toEqual(1);
    expect(secondResult.allIds.length).toEqual(1);
    expect(secondResult.byId["1"].description).toEqual("great job too");
  });

  it("should merge  two item", () => {
    const itemOne = new PPPerformance({
      id: "1",
      date: new Date(),
      employeeId: "a",
      feedbackIds: ["1", "2"],
      description: "great job",
    });

    const itemTwo = new PPPerformance({
      id: "2",
      date: new Date(),
      employeeId: "b",
      feedbackIds: ["3", "4"],
      description: "great job too",
    });

    const itemThree = new PPPerformance({
      id: "3",
      date: new Date(),
      employeeId: "b",
      feedbackIds: ["3", "4"],
      description: "great job 3",
    });

    const itemFour = new PPPerformance({
      id: "4",
      date: new Date(),
      employeeId: "b",
      feedbackIds: ["3", "4"],
      description: "great job 4",
    });

    const firstResult = ppperformanceReducer(
      undefined,
      mergeAllAction([itemOne, itemTwo])
    );

    expect(Object.keys(firstResult.byId).length).toEqual(2);
    expect(firstResult.allIds.length).toEqual(2);
    expect(firstResult.byId["1"].description).toEqual("great job");
    expect(firstResult.byId["2"].description).toEqual("great job too");

    const secondResult = ppperformanceReducer(
      firstResult,
      mergeAllAction([itemThree, itemFour])
    );

    expect(Object.keys(secondResult.byId).length).toEqual(4);
    expect(secondResult.allIds.length).toEqual(4);
    expect(secondResult.byId["1"].description).toEqual("great job");
    expect(secondResult.byId["2"].description).toEqual("great job too");
    expect(secondResult.byId["3"].description).toEqual("great job 3");
    expect(secondResult.byId["4"].description).toEqual("great job 4");
  });

  it("should replace two item", () => {
    const itemOne = new PPPerformance({
      id: "1",
      date: new Date(),
      employeeId: "a",
      feedbackIds: ["1", "2"],
      description: "great job",
    });

    const itemTwo = new PPPerformance({
      id: "2",
      date: new Date(),
      employeeId: "b",
      feedbackIds: ["3", "4"],
      description: "great job too",
    });

    const itemThree = new PPPerformance({
      id: "1",
      date: new Date(),
      employeeId: "b",
      feedbackIds: ["3", "4"],
      description: "great job 3",
    });

    const itemFour = new PPPerformance({
      id: "2",
      date: new Date(),
      employeeId: "b",
      feedbackIds: ["3", "4"],
      description: "great job 4",
    });

    const firstResult = ppperformanceReducer(
      undefined,
      mergeAllAction([itemOne, itemTwo])
    );

    const secondResult = ppperformanceReducer(
      firstResult,
      mergeAllAction([itemThree, itemFour])
    );

    expect(Object.keys(secondResult.byId).length).toEqual(2);
    expect(secondResult.allIds.length).toEqual(2);
    expect(secondResult.byId["3"]).toBeUndefined();
    expect(secondResult.byId["4"]).toBeUndefined();
    expect(secondResult.byId["1"].description).toEqual("great job 3");
    expect(secondResult.byId["2"].description).toEqual("great job 4");
  });
});
