import DataModelBase from "./DataModelBase";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  performanceIds: string[];
  feedbackIds: string[];
  updatedAt?: String;
  createdAt?: String;
}

// This is the model for the User
export class UserHelper extends DataModelBase {
  static fromJson(data: any): User {
    const user: User = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      performanceIds: data.performanceIds,
      feedbackIds: data.feedbackIds,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    return user;
  }
}

export default User;
