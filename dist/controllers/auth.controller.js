"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_model_1 = require("models/user.model");
const passport_1 = tslib_1.__importDefault(require("passport"));
class AuthController {
    constructor() {
        this.register = async (req, res, next) => {
            try {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    res.status(401).json({ error: true, message: 'Please fill all the details.' });
                }
                const user = await user_model_1.UserModel.findOne({ email });
                if (user) {
                    res.status(401).send({ error: true, message: 'Email already exists.' });
                }
                await user_model_1.UserModel.create({ email, password, name });
                res.status(201).send({ error: false, message: 'Register successfull.' });
            }
            catch (error) {
                res.status(401).json({ error: true, message: error.message });
            }
        };
        this.login = async (req, res, next) => {
            try {
                passport_1.default.authenticate('local', function (err, user) {
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
            }
            catch (error) {
                res.status(401).json({ error: true, message: error });
            }
        };
        this.logout = async (req, res, next) => {
            req.logOut(function (err) {
                if (err)
                    return next(err);
                res.status(200).clearCookie('assess-user-session');
                req.session.destroy(function (err) {
                    if (err)
                        return next(err);
                    return res.status(200).json({ error: false, message: 'Logged out successfully.' });
                });
            });
        };
        this.getDetail = async (req, res, next) => {
            const { _id, name, email, createdAt } = req.user;
            return res.status(200).json({ error: false, message: { _id, name, email, createdAt } });
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map