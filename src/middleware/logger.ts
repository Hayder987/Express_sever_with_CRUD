import  fs  from 'fs';
import type { NextFunction, Request, Response } from "express";

const logger = (req:Request, res:Response, next:NextFunction) => {
  const now = new Date();

  const date = now.toLocaleDateString("en-GB"); 
  
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const log = `\nMethod - ${req.method} ; URL - ${req.url} ; Time - ${date} - ${time}\n`;

  fs.appendFile("logger.txt", log, (error) => {
    if (error) {
      console.log(error);
    }
  });

  next();
};

export default logger;