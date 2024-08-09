import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const validationMiddlware = (validationSchema: any) => {
return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
        const validationClass = plainToInstance(validationSchema, body);
        validate(validationClass, {}).then((errors) => {
            if (errors.length > 0) {
                const err = errors.map((error: any) => {
                    return { [error.property]: Object.values(error.constraints) }
                });
                res.status(400).json(err);
            } else {
                next()
            }
        }

        )
    }
};
export default validationMiddlware;