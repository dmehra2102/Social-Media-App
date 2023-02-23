import { NextFunction, Response } from 'express';
import { AuthRequest } from '../interfaces/auth.interface';

export function ensureAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({ error: true, message: 'user is not authenticated.' });
}
