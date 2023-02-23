import express from "express";
import { Routes } from "interfaces/route.interface";
declare class App {
    app: express.Application;
    port: number | string;
    store: any;
    constructor(routes: Routes[]);
    listen(): void;
    private connectToDB;
    private initializeMiddlewares;
    private initializeRoutes;
}
export default App;
