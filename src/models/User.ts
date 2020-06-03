import DataModelBase from "./DataModelBase";

// This is the model for the User
class User extends DataModelBase {
  constructor({
    id,
    firstName,
    lastName,
    performanceIds,
    feedbackIds,
    updatedAt,
    createdAt,
  }: {
    id: string;
    firstName: string;
    lastName: string;
    performanceIds: string[];
    feedbackIds: string[];
    updatedAt?: Date;
    createdAt?: Date;
  }) {
    super({ id: id, updatedAt: updatedAt, createdAt: createdAt });
    this.firstName = firstName;
    this.lastName = lastName;
    this.feedbackIds = feedbackIds;
    this.performanceIds = performanceIds;
  }

  firstName: string;
  lastName: string;
  performanceIds: string[];
  feedbackIds: string[];

  static fromJson(data: any): User {
    const createdAt = new Date(data.createdAt);
    const updatedAt = new Date(data.updatedAt);
    return new User({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      performanceIds: data.performanceIds,
      feedbackIds: data.feedbackIds,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
  }
}

export default User;
