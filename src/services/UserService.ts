import HttpService from "./HttpService";
import User from "../models/User";
import PPPerformance from "../models/PPPerformance";

class UserService {
  static path = "users/";

  static async get(): Promise<User[]> {
    const data: any[] = await HttpService.get(this.path);
    const result: User[] = [];
    for (let index in data) {
      const value = data[index];
      result.push(User.fromJson(value));
    }
    return result;
  }

  static async getWithId(id: string): Promise<UserServiceDetailsResult> {
    const data = await HttpService.get(this.path, id);
    const result = User.fromJson(data);

    const performances: PPPerformance[] = PPPerformance.fromJsonArray(
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
