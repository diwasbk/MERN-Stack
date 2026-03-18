import express, { Application } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import { jwtAuthMiddleware } from "./utils/jwt";
import cors from "cors";
import { CLIENT_URL } from "./config/config";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/user", jwtAuthMiddleware, userRouter);

export default app;