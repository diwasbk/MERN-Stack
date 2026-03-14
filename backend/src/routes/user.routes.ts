import express from "express";
import UserController from "../controllers/user.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { updateUserSchema } from "../types/user.types";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", userController.getAllUser);
userRouter.get("/:userId", userController.getUserById);
userRouter.put("/update/:userId", schemaValidateMiddleware(updateUserSchema), userController.updateUserById);
userRouter.delete("/delete/:userId", userController.deleteUserById);

export default userRouter;