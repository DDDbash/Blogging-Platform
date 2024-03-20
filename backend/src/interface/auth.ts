import { Request } from "express";
import { User } from "../entities/User";

export interface AuthenticatedUserRequest extends Request {
  user?: User;
}
