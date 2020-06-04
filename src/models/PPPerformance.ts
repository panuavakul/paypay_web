import BaseData from "./BaseData";
import { fromJsonArray } from "../helpers/fromJsonArray";

// PP is just project unique labelled (PayPay)
interface PPPerformance extends BaseData {
  date: string;
  userId: string;
  feedbackIds: string[];
  achievement: string;
}

export class PPPerformanceHelper {
  static fromJson(data: any): PPPerformance {
    const ppperformance: PPPerformance = {
      id: data.id,
      date: data.date,
      userId: data.userId,
      feedbackIds: data.feedbackIds,
      achievement: data.achievement,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    return ppperformance;
  }

  static fromJsonArray(data: any): PPPerformance[] {
    return fromJsonArray<PPPerformance>(data, this.fromJson);
  }
}

export default PPPerformance;
