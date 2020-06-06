import { withAuth } from "./withAuth";
import AuthType from "../../enums/AuthType";

export const withUser = withAuth(AuthType.User);
