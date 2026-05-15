import type { Request, Response } from "express";
import { sendResponse } from "../../utility/send.response";
import { authService } from "./auth.service";

const loginUser = async (req:Request, res:Response)=>{
   try {
    
    const result = await authService.loginUserIntoDB(req.body);

    sendResponse(res, 201, true, "User login SuccessFully", result);
    
   } catch (error:any) {
    sendResponse(res, 500, false, error.message, error);
   }
}

export const authController = {
    loginUser,
}