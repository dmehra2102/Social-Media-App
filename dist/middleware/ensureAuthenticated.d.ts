import { NextFunction, Response } from 'express';
import { AuthRequest } from 'interfaces/auth.interface';
export declare function ensureAuthenticated(req: AuthRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
