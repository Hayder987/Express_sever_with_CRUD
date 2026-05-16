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

       if(result.rows.length === 0){
        sendResponse(res, 404, false, "Profile Not Found", {}); 
       }
    
       sendResponse(res, 200, true, "Profile Get SuccessFully", result.rows[0]);
        
    } catch (error:any) {
      sendResponse(res, 500, false, error.message, error);  
    }
};


const updateProfile = async (req:Request, res:Response)=>{
   try {
    const body = req.body;
    const {id} = req.params;

    const result = await profileService.updateUserIntoDb(body, id as string);

    if(result.rows.length === 0){
        sendResponse(res, 404, false, "Profile Not Found", {}); 
       }
    
       sendResponse(res, 201, true, "Profile Update SuccessFully", result.rows[0]);
    
   } catch (error:any) {
    sendResponse(res, 500, false, error.message, error);  
   }
};

const deleteProfile = async (req:Request, res:Response)=>{
  try {
    const {id} = req.params;

    const result = await profileService.deleteUserFromDB(id as string);
    
    if(result.rowCount === 0){
      sendResponse(res, 404, false, "Profile Not Found", {});  
    }

    sendResponse(res, 201, true, "Profile Deleted SuccessFully", {});

  } catch (error:any) {
    sendResponse(res, 500, false, error.message, error);
  }
} 


export const profileController = {
    createProfile,
    getProfile,
    getSingleProfile,
    updateProfile,
    deleteProfile
}