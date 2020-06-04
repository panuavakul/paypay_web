import { fromJsonArray } from "../helpers/fromJsonArray";
import BaseData from "./BaseData";

interface Feedback extends BaseData {
  points: number;
  comment: string;
  userId: string;
  performanceId: string;
}

export class FeedbackHelper {
  static fromJson(data: any): Feedback {
    const feedback: Feedback = {
      id: data.id,
      points: data.points,
      comment: data.comment,
      userId: data.userId,
      performanceId: data.performanceId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    return feedback;
  }

  static fromJsonArray(data: any): Feedback[] {
    return fromJsonArray<Feedback>(data, this.fromJson);
  }
}

export default Feedback;
