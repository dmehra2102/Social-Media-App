import { Request } from "express";
import { RegisteredUser } from "./user.interface";

export interface AuthRequest extends Request {
    user: RegisteredUser;
    isAuthenticated: () => {};
}
