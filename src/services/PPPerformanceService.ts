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

    const rawFeedbacks: any[] = data.feedbacks;
    let feedbackUsers: User[] = [];
    for (let index in rawFeedbacks) {
      feedbackUsers.push(UserHelper.fromJson(rawFeedbacks[index].user));
    }

    const feedbacks: Feedback[] = FeedbackHelper.fromJsonArray(rawFeedbacks);
    const users: User[] = [user, ...feedbackUsers];

    return {
      performance: result,
      users: users,
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
  users: User[];
  feedbacks: Feedback[];
}

export default PPPerformanceService;
