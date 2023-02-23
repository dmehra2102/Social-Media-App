import AuthController from "../controllers/auth.controller";
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

class AuthRoute {
    public path = '/user';
    public router = Router();
    public authController = new AuthController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/register`, this.authController.register);

        this.router.post(`${this.path}/login`, this.authController.login);

        this.router.post(`${this.path}/logout`, this.authController.logout);

        this.router.get(`${this.path}/detail`, ensureAuthenticated, this.authController.getDetail);
    }
}

export default AuthRoute;