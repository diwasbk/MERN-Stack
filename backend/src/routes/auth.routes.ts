import express from "express"
import AuthController from "../controllers/auth.controller";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", authController.signupUser);
authRouter.post("/login", authController.loginUser);

export default authRouter;