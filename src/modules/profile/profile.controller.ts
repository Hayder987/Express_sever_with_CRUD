import type { Request, Response } from "express";
import { sendResponse } from "../../utility/send.response";
import { profileService } from "./profile.service";

// post profile
const createProfile = async (req:Request, res:Response)=>{
   try {
    const result = await profileService.createProfileIntoDB(req.body);

     sendResponse(res, 201, true, "Profile Create SuccessFully", result.rows[0]);
    
   } catch (error:any) {
    sendResponse(res, 500, false, error.message, error);
   }
};

// get profile
const getProfile = async (req:Request, res:Response)=>{
     try {
      const result = await profileService.getProfileFromDB();

      sendResponse(res, 200, true, "All Profile Get SuccessFully", result.rows);
        
     } catch (error: any) {
        sendResponse(res, 500, false, error.message, error);
     }
};

const getSingleProfile =async (req:Request, res:Response)=>{
    try {
       const {id} = req.params;

       const result = await profileService.getSingleUserFromDB(id as string);
    
       sendResponse(res, 200, true, "Profile Get SuccessFully", result.rows[0]);
        
    } catch (error:any) {
      sendResponse(res, 500, false, error.message, error);  
    }
}


export const profileController = {
    createProfile,
    getProfile,
    getSingleProfile
}