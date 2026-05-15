
import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDb = async (payload:IUser)=>{
    const { name, email, password, age } = payload;

    const hashPassword = await bcrypt.hashSync(password, 10);

    const result = await pool.query(
      `
        INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
        RETURNING *
        `,
      [name, email, hashPassword, age],
    );
    return result;
};

const getAlluserFromDb = async () =>{
    const result = await pool.query(`
        SELECT * FROM users
        `);
    return result;
};

const getSingleUserFromDb = async (id:string)=>{
    console.log(typeof id)

    const result = await pool.query(
      `
          SELECT * FROM users
          WHERE id=$1
        `,
      [id],
    );
    return result
};

const updateUserFromDb = async (payload:IUser, id:string)=>{
   const { name, password, is_active, age } = payload;

    const result = await pool.query(
      `
        UPDATE users 
        SET name=COALESCE($1,name), 
            password=COALESCE($2,password), 
            is_active=COALESCE($3,is_active), 
            age=COALESCE($4,age)
            WHERE id=$5 RETURNING *
        `,
      [name, password, is_active, age, id],
    );
    return result
}

const deleteUserFromDb = async (id:string) => {
   const result = await pool.query(
      `
          DELETE FROM users
          WHERE id=$1
        `,
      [id],
    );
    return result
}

export const userServices = {
    createUserIntoDb,
    getAlluserFromDb,
    getSingleUserFromDb,
    updateUserFromDb,
    deleteUserFromDb
}