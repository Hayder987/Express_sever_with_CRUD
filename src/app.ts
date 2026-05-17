import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config/env.config";
import userRoute from "./modules/user/user.route";
import profileRouter from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
const app: Application = express();
const PORT = config.port;
import logger from "./middleware/logger";

// middleware
app.use(express.json());

// logger middleware
app.use(logger);


app.use("/api/users", userRoute);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);


// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "This Is Root Route",
    server_info: `This Server Running At port : ${PORT}`,
  });
});


export default app;