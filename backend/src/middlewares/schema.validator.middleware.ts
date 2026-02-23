import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const schemaValidateMiddleware = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err: any) {
        res.status(400).send({
            message: err.issues[0].message,
            success: false
        });
    };
};

export default schemaValidateMiddleware;