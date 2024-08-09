import { Request, Response, NextFunction } from "express";
import ServerError from "../helper/serverError";
import { decodeToken } from "../helper/tokenTolls";

const validationUserMiddlware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization
    if (!token) throw new ServerError(401, 'Unauthorized ')
    try {
        token = token.split(" ")[1];
        const decodedToken: any = decodeToken(token);
            req['userID'] = decodedToken.id;
        next();
    } catch (error) {
        console.log(`token.expiredAt`,error.expiredAt)
        throw new ServerError(401,'Expired Token')
    }
}
export default validationUserMiddlware;

