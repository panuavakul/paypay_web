import HttpService from "./HttpService";

export interface FeedbackPostBody {
  points: number;
  comment: string;
  userId: string;
  performanceId: string;
}

class FeedbackService {
  static path = "feedbacks";

  static async post(body: FeedbackPostBody) {
    await HttpService.post(this.path, body);
  }
}

export default FeedbackService;
