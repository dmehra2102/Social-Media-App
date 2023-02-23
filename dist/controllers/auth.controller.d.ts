import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from 'interfaces/auth.interface';
declare class AuthController {
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getDetail: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
export default AuthController;
