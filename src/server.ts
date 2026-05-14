
import express, { type Application, type Request, type Response } from "express";

const app : Application = express();
const PORT = 5000;

app.get("/", (req:Request, res:Response)=>{
   res.status(200).json({
    status:true,
    message:"This Is Root Route",
    server_info: `This Server Running At port : ${PORT}`
   })
});

app.listen(PORT, ()=>{
    console.log(`This Server Run At PORT:${PORT}`);
});