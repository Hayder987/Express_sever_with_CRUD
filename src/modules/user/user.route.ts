import { Router} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();



// post route
router.post("/", userController.createUser);

// get all user data
router.get("/", auth(), userController.getAllUser);

// get single user data
router.get("/:id", userController.getSingleUser);

// update user
router.put("/:id", userController.updateUser);

// Delete Api user
router.delete("/:id", userController.deleteUser);

const userRoute = router;

export default userRoute;