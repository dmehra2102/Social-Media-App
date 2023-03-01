import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../interfaces/auth.interface';
import { UserModel } from '../models/user.model';
import passport from 'passport';

class AuthController {
    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                res.status(401).json({ error: true, message: 'Please fill all the details.' });
            }

            const user = await UserModel.findOne({ email });
            if (user) {
                return res.status(401).send({ error: true, message: 'Email already exists.' });
            }

            await UserModel.create({ email, password, name });

            return res.status(201).send({ error: false, message: 'Register successfull.' });
        } catch (error) {
            res.status(401).json({ error: true, message: error.message });
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            passport.authenticate('local', function (err, user) {
                if (err || !user) {
                    return res.status(401).json({ error: true, message: err });
                }

                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }

                    return res.status(200).json({ error: false, message: 'Sign up successfull.' });
                });
            })(req, res, next);
        } catch (error) {
            res.status(401).json({ error: true, message: error });
        }
    };

    public logout = async (req: Request, res: Response, next: NextFunction)=>{
        req.logOut(function (err) {
            if (err) return next(err);

            res.status(200).clearCookie('assess-user-session');
            req.session.destroy(function (err) {
                if (err) return next(err);

                return res.status(200).json({ error: false, message: 'Logged out successfully.' });
            });
        });
    }

    public getDetail = async (req: AuthRequest, res: Response, next: NextFunction)=>{
        const { _id, name, email, createdAt } = req.user;
        return res.status(200).json({ error: false, message: { _id, name, email, createdAt } });
    }
}

export default AuthController;
