import express from "express"
import AuthController from "../controllers/auth.controller";
import schemaValidatewareMiddleware from "../middlewares/schema.validator.middleware";
import { userSchema } from "../types/user.types";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", schemaValidatewareMiddleware(userSchema), authController.signupUser);
authRouter.post("/login", authController.loginUser);

export default authRouter;