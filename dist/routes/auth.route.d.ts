import AuthController from "controllers/auth.controller";
declare class AuthRoute {
    path: string;
    router: import("express-serve-static-core").Router;
    authController: AuthController;
    constructor();
    private initializeRoutes;
}
export default AuthRoute;
