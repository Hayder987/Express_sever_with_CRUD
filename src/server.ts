
import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg";
const app : Application = express();
const PORT = 5000;

// middleware
app.use(express.json());

// connected neon db
const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_lJ2aGNLsv5qF@ep-summer-mud-ap9m1juz-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

// create user Table
const initDB =async () =>{
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) NOT NULL,
        password VARCHAR(15) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)
        console.log("DataBase Connected SuccessFully");
  } catch (error) {
    console.log(error)
  }
}

initDB()

app.get("/", (req:Request, res:Response)=>{
   res.status(200).json({
    status:true,
    message:"This Is Root Route",
    server_info: `This Server Running At port : ${PORT}`
   })
});


// Root Route
app.post("/post", (req:Request, res:Response)=>{
    const {id, name} = req.body;

   res.status(200).json({
    status:true,
    message:"SuccessFully",
    data: {
        id,
        name
    }
   })
})

app.listen(PORT, ()=>{
    console.log(`This Server Run At PORT:${PORT}`);
});