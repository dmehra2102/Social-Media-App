import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/auth.interface";

export function checkIsAdmin(req:AuthRequest,res:Response,next:NextFunction){
    if(req.user.isAdmin===false){
        return res.status(401).json({ error: true, message: "You don't have Admin access." })
    }

    next();
}