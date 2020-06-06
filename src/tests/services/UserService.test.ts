import axios from "axios";
import UserService from "../../services/UserService";
import User, { UserHelper } from "../../models/User";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserService", () => {
  const mockApiResult = {
    data: [
      {
        id: 1,
        firstName: "Papa",
        lastName: "John",
        createdAt: "2020-06-06T13:05:46.812Z",
        updatedAt: "2020-06-06T13:05:46.812Z",
        performanceIds: [2, 3],
        feedbackIds: [1],
      },
      {
        id: 2,
        firstName: "asdasd",
        lastName: "asdsad",
        createdAt: "2020-06-06T14:19:17.356Z",
        updatedAt: "2020-06-06T14:19:17.356Z",
        performanceIds: [1],
        feedbackIds: [2, 3, 4],
      },
    ],
  };

  it("should getUser", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(mockApiResult)
    );

    const result = await UserService.get();

    const userOne: User = {
      id: "1",
      firstName: "Papa",
      lastName: "John",
      createdAt: "2020-06-06T13:05:46.812Z",
      updatedAt: "2020-06-06T13:05:46.812Z",
      performanceIds: ["2", "3"],
      feedbackIds: ["1"],
    };

    const userTwo: User = {
      id: "2",
      firstName: "asdasd",
      lastName: "asdsad",
      createdAt: "2020-06-06T14:19:17.356Z",
      updatedAt: "2020-06-06T14:19:17.356Z",
      performanceIds: ["1"],
      feedbackIds: ["2", "3", "4"],
    };

    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(userOne);
    expect(result[1]).toEqual(userTwo);
  });
});
