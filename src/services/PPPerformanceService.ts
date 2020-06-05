import HttpService from "./HttpService";
import PPPerformance, {
  PPPerformanceHelper,
  PPPerformancePostBody,
} from "../models/PPPerformance";
import User, { UserHelper } from "../models/User";
import Feedback, { FeedbackHelper } from "../models/Feedback";
import UserService from "./UserService";

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
    const data = await HttpService.get(`${this.path}/${id}`);
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

  static async getAssigned(userId: string): Promise<PPPerformanceGetResult> {
    const path = `${UserService.path}/${userId}/${this.path}`;
    const data: any[] = await HttpService.get(path);
    const performances = PPPerformanceHelper.fromJsonArray(data);

    const users: User[] = [];
    for (let index in data) {
      users.push(UserHelper.fromJson(data[index].user));
    }

    return { performances: performances, users: users };
  }

  static async post(body: PPPerformancePostBody) {
    await HttpService.post(this.path, body);
    // The backend will send back the model that was created
    // and we should parse it and put it in the store
    // but for simplicity just ignore it for now
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
