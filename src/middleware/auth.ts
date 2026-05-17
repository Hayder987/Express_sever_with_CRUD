import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/send.response";

const auth = () =>{
    return async (req:Request, res:Response, next:NextFunction) =>{
     const token = req.headers.authorization;
     
     if(!token){
        sendResponse(res, 401, false, "You Are Unauthorized", {});
     }

    next();
}
};

export default auth;