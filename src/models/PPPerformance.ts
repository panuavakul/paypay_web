// This is the model for the performance
class PPPerformance {
  constructor({
    id,
    employeeId,
    feedbackIds,
    updatedAt,
    createdAt,
  }: {
    id: string;
    employeeId: string;
    feedbackIds: string[];
    updatedAt: Date;
    createdAt: Date;
  }) {
    this.id = id;
    this.employeeId = employeeId;
    this.feedbackIds = feedbackIds;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  id: string;
  employeeId: string;
  feedbackIds: string[];
  updatedAt?: Date;
  createdAt?: Date;
}

export default PPPerformance;
