import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

// create profile
router.post("/", profileController.createProfile);


const profileRouter = router

export default profileRouter;