import BaseData from "./BaseData";
import { fromJsonArray } from "../helpers/fromJsonArray";

// PP is just project unique labelled (PayPay)
interface PPPerformance extends BaseData {
  date: string;
  userId: string;
  feedbackIds: string[];
  reviewerIds: string[];
  achievement: string;
}

export interface PPPerformancePostBody {
  date: string;
  userId: string;
  achievement: string;
  reviewerIds: string[];
}

export class PPPerformanceHelper {
  static fromJson(data: any): PPPerformance {
    const ppperformance: PPPerformance = {
      id: `${data.id}`,
      date: data.date,
      userId: `${data.userId}`,
      feedbackIds: data.feedbackIds?.map(String) ?? [],
      achievement: data.achievement,
      reviewerIds: data.reviewerIds?.map(String) ?? [],
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
