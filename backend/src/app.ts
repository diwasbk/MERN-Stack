import express, { Application } from "express";
import authRouter from "./routes/auth.routes";
import schemaValidatewareMiddleware from "./middlewares/schema.validator.middleware";
import { userSchema } from "./types/user.types";

const app: Application = express();
app.use(express.json());

app.use("/api/auth",schemaValidatewareMiddleware(userSchema), authRouter);

export default app;