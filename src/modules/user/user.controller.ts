import type { Request, Response } from "express";
import { userServices } from "./user.service";
import { sendResponse } from "../../utility/send.response";


// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUserIntoDb(req.body);

    delete result.rows[0].password;

    sendResponse(res, 201, true, "User Create SuccessFully", result.rows[0]);

  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
};

// get all user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAlluserFromDb();

    const withOutPassWord = result.rows.map(({password, ...rest})=> rest);

    sendResponse(res, 201, true, "All User Get SuccessFully", withOutPassWord);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
}


// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {

    const id = req.params? req.params.id : "";

    const result = await userServices.getSingleUserFromDb(id as string);

     if (result.rows.length === 0) {
      sendResponse(res, 404, false, "User Not found", {});
    };

    delete result.rows[0].password
    
    sendResponse(res, 201, true, "User Get SuccessFully", result.rows[0]);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
}

// update user 
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await userServices.updateUserFromDb(req.body, id as string)

    if (result.rows.length === 0) {
      sendResponse(res, 404, false, "User Not found", {});
    }

   sendResponse(res, 201, true, "User Update SuccessFully", result.rows[0]);
  } catch (error: any) {
   sendResponse(res, 500, false, error.message, error);
  }
}

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userServices.deleteUserFromDb(id as string);

    if (result.rowCount === 0) {
      sendResponse(res, 404, false, "User Not found", {});
    };
   
    sendResponse(res, 201, true, "User deleted SuccessFully", {});

  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
}

export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser 
}