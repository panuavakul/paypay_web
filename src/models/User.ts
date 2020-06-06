import BaseData from "./BaseData";
import { fromJsonArray } from "../helpers/fromJsonArray";

interface User extends BaseData {
  firstName: string;
  lastName: string;
  performanceIds: string[];
  feedbackIds: string[];
}

export interface UserPostBody {
  firstName: string;
  lastName: string;
}

// This is the model for the User
export class UserHelper {
  static fromJson(data: any): User {
    const user: User = {
      id: `${data.id}`,
      firstName: data.firstName,
      lastName: data.lastName,
      performanceIds: data.performanceIds?.map(String) ?? [],
      feedbackIds: data.feedbackIds?.map(String) ?? [],
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    return user;
  }

  static fromJsonArray(data: any): User[] {
    return fromJsonArray<User>(data, this.fromJson);
  }
}

export default User;
