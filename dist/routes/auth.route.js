"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_controller_1 = tslib_1.__importDefault(require("controllers/auth.controller"));
const express_1 = require("express");
const ensureAuthenticated_1 = require("middleware/ensureAuthenticated");
class AuthRoute {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.authController.register);
        this.router.post(`${this.path}/login`, this.authController.login);
        this.router.post(`${this.path}/logout`, this.authController.logout);
        this.router.get(`${this.path}/detail`, ensureAuthenticated_1.ensureAuthenticated, this.authController.getDetail);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map