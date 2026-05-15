import type { Request, Response } from "express";
import { sendResponse } from "../../utility/send.response";
import { profileService } from "./profile.service";

const createProfile = async (req:Request, res:Response)=>{
   try {
    const result = await profileService.createProfileIntoDB(req.body);

     sendResponse(res, 201, true, "Profile Create SuccessFully", result.rows[0]);
    
   } catch (error:any) {
    sendResponse(res, 500, false, error.message, error);
   }
};



export const profileController = {
    createProfile,
}