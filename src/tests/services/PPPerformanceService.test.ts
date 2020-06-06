import axios from "axios";
import UserService from "../../services/UserService";
import User, { UserHelper } from "../../models/User";
import PPPerformanceService from "../../services/PPPerformanceService";
import PPPerformance from "../../models/PPPerformance";
import Feedback from "../../models/Feedback";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("PPPerformance", () => {
  const getAllMockApiResult = {
    data: [
      {
        id: 1,
        achievement: "zxcxzcxzcxz",
        date: "2020-08-31T15:00:00.000Z",
        userId: 2,
        createdAt: "2020-06-06T14:22:36.358Z",
        updatedAt: "2020-06-06T14:22:36.358Z",
        user: {
          id: 2,
          firstName: "asdasd",
          lastName: "asdsad",
          createdAt: "2020-06-06T14:19:17.356Z",
          updatedAt: "2020-06-06T14:19:17.356Z",
          performanceIds: [1, 4],
          feedbackIds: [2, 3, 4],
        },
        feedbacks: [
          {
            id: 1,
            points: 5,
            comment: "sasdsadad",
            userId: 1,
            performanceId: 1,
            createdAt: "2020-06-06T14:29:13.474Z",
            updatedAt: "2020-06-06T14:29:13.474Z",
          },
        ],
        feedbackIds: [1],
      },
      {
        id: 2,
        achievement: "asdsadsadsadas",
        date: "2020-05-31T15:00:00.000Z",
        userId: 1,
        createdAt: "2020-06-06T14:29:45.379Z",
        updatedAt: "2020-06-06T14:29:45.379Z",
        user: {
          id: 1,
          firstName: "Papa",
          lastName: "John",
          createdAt: "2020-06-06T13:05:46.812Z",
          updatedAt: "2020-06-06T13:05:46.812Z",
          performanceIds: [2, 3],
          feedbackIds: [1, 6],
        },
      },
    ],
  };

  it("should getPPPerformance", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(getAllMockApiResult)
    );

    const result = await PPPerformanceService.get();

    const performanceOne: PPPerformance = {
      id: "1",
      achievement: "zxcxzcxzcxz",
      date: "2020-08-31T15:00:00.000Z",
      userId: "2",
      createdAt: "2020-06-06T14:22:36.358Z",
      updatedAt: "2020-06-06T14:22:36.358Z",
      feedbackIds: ["1"],
      reviewerIds: [],
    };

    const performanceTwo: PPPerformance = {
      id: "2",
      achievement: "asdsadsadsadas",
      date: "2020-05-31T15:00:00.000Z",
      userId: "1",
      createdAt: "2020-06-06T14:29:45.379Z",
      updatedAt: "2020-06-06T14:29:45.379Z",
      reviewerIds: [],
      feedbackIds: [],
    };

    const userOne: User = {
      id: "1",
      firstName: "Papa",
      lastName: "John",
      createdAt: "2020-06-06T13:05:46.812Z",
      updatedAt: "2020-06-06T13:05:46.812Z",
      performanceIds: ["2", "3"],
      feedbackIds: ["1", "6"],
    };

    const userTwo: User = {
      id: "2",
      firstName: "asdasd",
      lastName: "asdsad",
      createdAt: "2020-06-06T14:19:17.356Z",
      updatedAt: "2020-06-06T14:19:17.356Z",
      performanceIds: ["1", "4"],
      feedbackIds: ["2", "3", "4"],
    };

    expect(result.performances.length).toEqual(2);
    expect(result.users.length).toEqual(2);

    expect(result.performances[0]).toEqual(performanceOne);
    expect(result.performances[1]).toEqual(performanceTwo);

    expect(result.users[0]).toEqual(userTwo);
    expect(result.users[1]).toEqual(userOne);
  });

  const getOneMockApiResult = {
    data: {
      id: 1,
      achievement: "zxcxzcxzcxz",
      date: "2020-08-31T15:00:00.000Z",
      userId: 2,
      createdAt: "2020-06-06T14:22:36.358Z",
      updatedAt: "2020-06-06T14:22:36.358Z",
      user: {
        id: 2,
        firstName: "asdasd",
        lastName: "asdsad",
        createdAt: "2020-06-06T14:19:17.356Z",
        updatedAt: "2020-06-06T14:19:17.356Z",
        performanceIds: [1, 4],
        feedbackIds: [2, 3, 4],
      },
      feedbacks: [
        {
          id: 1,
          points: 5,
          comment: "sasdsadad",
          userId: 1,
          performanceId: 1,
          createdAt: "2020-06-06T14:29:13.474Z",
          updatedAt: "2020-06-06T14:29:13.474Z",
          user: {
            id: 1,
            firstName: "Papa",
            lastName: "John",
            createdAt: "2020-06-06T13:05:46.812Z",
            updatedAt: "2020-06-06T13:05:46.812Z",
            performanceIds: [2, 3],
            feedbackIds: [1, 6],
          },
        },
      ],
      feedbackIds: [1],
    },
  };

  it("should getWithId PPPerformance", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(getOneMockApiResult)
    );

    const result = await PPPerformanceService.getWithId("1");

    const performanceOne: PPPerformance = {
      id: "1",
      achievement: "zxcxzcxzcxz",
      date: "2020-08-31T15:00:00.000Z",
      userId: "2",
      createdAt: "2020-06-06T14:22:36.358Z",
      updatedAt: "2020-06-06T14:22:36.358Z",
      feedbackIds: ["1"],
      reviewerIds: [],
    };

    const userOne: User = {
      id: "1",
      firstName: "Papa",
      lastName: "John",
      createdAt: "2020-06-06T13:05:46.812Z",
      updatedAt: "2020-06-06T13:05:46.812Z",
      performanceIds: ["2", "3"],
      feedbackIds: ["1", "6"],
    };

    const userTwo: User = {
      id: "2",
      firstName: "asdasd",
      lastName: "asdsad",
      createdAt: "2020-06-06T14:19:17.356Z",
      updatedAt: "2020-06-06T14:19:17.356Z",
      performanceIds: ["1", "4"],
      feedbackIds: ["2", "3", "4"],
    };

    const feedback: Feedback = {
      id: "1",
      points: 5,
      comment: "sasdsadad",
      userId: "1",
      performanceId: "1",
      createdAt: "2020-06-06T14:29:13.474Z",
      updatedAt: "2020-06-06T14:29:13.474Z",
    };

    expect(result.performance).toEqual(performanceOne);
    expect(result.users.length).toEqual(2);
    expect(result.users[0]).toEqual(userTwo);
    expect(result.users[1]).toEqual(userOne);
    expect(result.feedbacks[0]).toEqual(feedback);
  });

  const getAssignedMockApiResult = {
    data: [
      {
        id: 5,
        achievement: "Did something cool",
        date: "2020-09-30T15:00:00.000Z",
        userId: 2,
        createdAt: "2020-06-06T17:11:22.151Z",
        updatedAt: "2020-06-06T17:11:22.151Z",
        user: {
          id: 2,
          firstName: "asdasd",
          lastName: "asdsad",
          createdAt: "2020-06-06T14:19:17.356Z",
          updatedAt: "2020-06-06T14:19:17.356Z",
          performanceIds: [1, 4, 5],
          feedbackIds: [2, 3, 4],
        },
        feedbackIds: [],
      },
    ],
  };

  it("should getAssigned PPPerformance", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(getAssignedMockApiResult)
    );

    const result = await PPPerformanceService.getAssigned("1");

    const performance: PPPerformance = {
      id: "5",
      achievement: "Did something cool",
      date: "2020-09-30T15:00:00.000Z",
      userId: "2",
      createdAt: "2020-06-06T17:11:22.151Z",
      updatedAt: "2020-06-06T17:11:22.151Z",
      feedbackIds: [],
      reviewerIds: [],
    };

    const user: User = {
      id: "2",
      firstName: "asdasd",
      lastName: "asdsad",
      createdAt: "2020-06-06T14:19:17.356Z",
      updatedAt: "2020-06-06T14:19:17.356Z",
      performanceIds: ["1", "4", "5"],
      feedbackIds: ["2", "3", "4"],
    };

    expect(result.performances[0]).toEqual(performance);
    expect(result.users[0]).toEqual(user);
  });
});
