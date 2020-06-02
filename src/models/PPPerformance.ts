// This is the model for the performance
// PP is just project unique labelled (PayPay)
class PPPerformance {
  constructor({
    id,
    date,
    employeeId,
    feedbackIds,
    description,
    updatedAt,
    createdAt,
  }: {
    id: string;
    date: Date;
    employeeId: string;
    feedbackIds: string[];
    description: string;
    updatedAt?: Date;
    createdAt?: Date;
  }) {
    this.id = id;
    this.date = date;
    this.employeeId = employeeId;
    this.feedbackIds = feedbackIds;
    this.description = description;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  id: string;
  date: Date;
  employeeId: string;
  feedbackIds: string[];
  description: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export default PPPerformance;
