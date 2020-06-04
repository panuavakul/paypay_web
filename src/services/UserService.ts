import HttpService from "./HttpService";
import User, { UserHelper } from "../models/User";
import PPPerformance, { PPPerformanceHelper } from "../models/PPPerformance";

class UserService {
  static path = "users";

  static async get(): Promise<User[]> {
    const data: any[] = await HttpService.get(this.path);
    const result = UserHelper.fromJsonArray(data);
    return result;
  }

  static async getWithId(id: string): Promise<UserServiceDetailsResult> {
    const data = await HttpService.get(this.path, id);
    const result = UserHelper.fromJson(data);

    const performances: PPPerformance[] = PPPerformanceHelper.fromJsonArray(
      data.performances
    );

    return {
      user: result,
      performances: performances,
      // TODO
      feedback: [],
    };
  }
}

export interface UserServiceDetailsResult {
  user: User;
  performances: PPPerformance[];
  // TODO
  feedback: any[];
}

export default UserService;
