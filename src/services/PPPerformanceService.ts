import HttpService from "./HttpService";
import PPPerformance, { PPPerformanceHelper } from "../models/PPPerformance";
import User, { UserHelper } from "../models/User";
import Feedback, { FeedbackHelper } from "../models/Feedback";

class PPPerformanceService {
  static path = "performances";

  static async get(): Promise<PPPerformanceGetResult> {
    const data: any[] = await HttpService.get(this.path);
    const performances: PPPerformance[] = [];
    const users: User[] = [];
    for (let index in data) {
      const value = data[index];
      performances.push(PPPerformanceHelper.fromJson(value));
      users.push(UserHelper.fromJson(value.user));
    }

    return {
      performances: performances,
      users: users,
    };
  }

  static async getWithId(id: string): Promise<PPPerformanceGetWithIdResult> {
    const data = await HttpService.get(this.path, id);
    const result = PPPerformanceHelper.fromJson(data);

    const user: User = UserHelper.fromJson(data.user);

    const feedbacks: Feedback[] = FeedbackHelper.fromJsonArray(data.feedbacks);

    return {
      performance: result,
      user: user,
      feedbacks: feedbacks,
    };
  }
}

export interface PPPerformanceGetResult {
  performances: PPPerformance[];
  users: User[];
}

export interface PPPerformanceGetWithIdResult {
  performance: PPPerformance;
  user: User;
  feedbacks: Feedback[];
}

export default PPPerformanceService;
