import { withAuth } from "./withAuth";
import AuthType from "../../enums/AuthType";

export const withAdminOrUser = withAuth(AuthType.Either);
