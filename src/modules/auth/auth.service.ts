import config from "../../config/env.config";
import { pool } from "../../db";
import type { IAuth } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async(payload:IAuth)=>{
    const {email, password} = payload;
    
    // step -1 find user
    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email]);

    if(userData.rows.length === 0){
        throw new Error("Invalid Credential")
    }
    const user = userData.rows[0];

    // step - 2 check password correct
    const matchPassword = await bcrypt.compare(password, user.password); 
    
    if(!matchPassword){
        throw new Error("Invalid Credential")
    }

    // step -3 generate token

    const jwtPayload = {
        id: user.id,
        name:user.name,
        is_active : user.is_active,
        email : user.email
    }
   const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, {expiresIn: "1d"});
   return {accessToken}
}


export const authService = {
    loginUserIntoDB
}