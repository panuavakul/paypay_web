import { withAuth } from "./withAuth";
import AuthType from "../../enums/AuthType";

export const withAdmin = withAuth(AuthType.Admin);
