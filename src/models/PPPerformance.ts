// This is the model for the performance

// PP is just project unique labelled (PayPay)
interface PPPerformance {
  id: string;
  date: string;
  userId: string;
  feedbackIds: string[];
  achievement: string;
  updatedAt?: string;
  createdAt?: string;
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
