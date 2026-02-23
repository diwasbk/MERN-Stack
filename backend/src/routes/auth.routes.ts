import express from "express"
import AuthController from "../controllers/auth.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { userSchema } from "../types/user.types";
import { jwtAuthMiddleware } from "../utils/jwt";
import { changePasswordSchema, loginSchema, sendPasswordResetEmailSchema } from "../types/auth.types";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", schemaValidateMiddleware(userSchema), authController.signupUser);
authRouter.post("/login", schemaValidateMiddleware(loginSchema), authController.loginUser);
authRouter.put("/update-password", schemaValidateMiddleware(changePasswordSchema), jwtAuthMiddleware, authController.updatePassword);
authRouter.post("/send-password-reset-email", schemaValidateMiddleware(sendPasswordResetEmailSchema), authController.sendPasswordResetEmail);

export default authRouter;