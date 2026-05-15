import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config/env.config";
import userRoute from "./modules/user/user.route";
const app: Application = express();
const PORT = config.port;

// middleware
app.use(express.json());


app.use("/api/users", userRoute);


// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "This Is Root Route",
    server_info: `This Server Running At port : ${PORT}`,
  });
});


export default app;