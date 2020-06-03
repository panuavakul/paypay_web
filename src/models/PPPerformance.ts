// This is the model for the performance

import DataModelBase from "./DataModelBase";

// PP is just project unique labelled (PayPay)
class PPPerformance extends DataModelBase {
  constructor({
    id,
    date,
    userId,
    feedbackIds,
    achievement,
    updatedAt,
    createdAt,
  }: {
    id: string;
    date: Date;
    userId: string;
    feedbackIds: string[];
    achievement: string;
    updatedAt?: Date;
    createdAt?: Date;
  }) {
    super({ id: id, updatedAt: updatedAt, createdAt: createdAt });
    this.date = date;
    this.userId = userId;
    this.feedbackIds = feedbackIds;
    this.achievement = achievement;
  }

  date: Date;
  userId: string;
  feedbackIds: string[];
  achievement: string;

  static fromJson(data: any): PPPerformance {
    const createdAt = new Date(data.createdAt);
    const updatedAt = new Date(data.updatedAt);
    return new PPPerformance({
      id: data.id,
      date: data.date,
      userId: data.userId,
      feedbackIds: data.feedbackIds,
      achievement: data.achievement,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
  }

  static fromJsonArray(data: any): PPPerformance[] {
    if (data?.length ?? 0 < 1) {
      return [];
    }
    const result: PPPerformance[] = [];
    for (let index in data) {
      const performance = this.fromJson(data[index]);
      result.push(performance);
    }
    return result;
  }
}

export default PPPerformance;
