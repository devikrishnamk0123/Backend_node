import express from "express";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation-exception";


const errorMiddleWare = (
    error:Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction

)=>{
    try{
        console.error(error.stack);
        if (error instanceof ValidationException){
            res.status(error.status).send({error: error.handleValidationError(error.error)})
        }
        if (error instanceof HttpException){
            res.status(error.status).send({error:error.message});
            return;
        }
        else{
            res.status(500).send({error:error.message});
        }
        
    }catch(error){
        next(error);
    }
}

export default errorMiddleWare;