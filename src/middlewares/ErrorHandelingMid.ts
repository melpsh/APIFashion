import { Request , Response , NextFunction , ErrorRequestHandler } from 'express' ;
import ServerError from '../helper/serverError';
const ErrorHandelingMIdderware = (error : ErrorRequestHandler , req : Request , res :Response , next : NextFunction)=>{
    if (error instanceof ServerError){
        res.status(error.status).send({
            status : error.status,
            message : error.message
        })
    }else{
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}
export default ErrorHandelingMIdderware;