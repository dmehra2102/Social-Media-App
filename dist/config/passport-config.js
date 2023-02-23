"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const tslib_1 = require("tslib");
const passport_local_1 = require("passport-local");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const user_model_1 = require("models/user.model");
const passportConfig = (passport) => {
    passport.use(new passport_local_1.Strategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await user_model_1.UserModel.findOne({ email });
        if (!user) {
            return done('Email and Password is incorrect.', false);
        }
        if (bcrypt_1.default.compareSync(user.password, password) === false) {
            return done('Email and Password is incorrect.', false);
        }
        return done(null, user);
    }));
    passport.serializeUser(function (user, done) {
        return done(null, user._id);
    });
    passport.deserializeUser(async function (id, done) {
        try {
            const user = await user_model_1.UserModel.findOne({ _id: id });
            return done(null, user);
        }
        catch (error) {
            return done(error, false);
        }
    });
};
exports.passportConfig = passportConfig;
//# sourceMappingURL=passport-config.js.map