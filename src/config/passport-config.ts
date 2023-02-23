import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

export const passportConfig = (passport: PassportStatic) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            const user = await UserModel.findOne({ email });

            if (!user) {
                return done('Email and Password is incorrect.', false);
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                return done('Email and Password is incorrect.', false);
            }

            return done(null, user);
        })
    );

    passport.serializeUser(function (user: any, done) {
        return done(null, user._id);
    });

    passport.deserializeUser(async function (id: string, done) {
        try {
            const user = await UserModel.findOne({ _id: id });
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    });
};
