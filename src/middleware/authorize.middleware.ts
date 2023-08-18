import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../exception/http.exception";

const Authorize =(acceptedRoles:Role[])=>async(req:RequestWithUser,res:Response,next:NextFunction)=>{
    try{
        const role = req.role;
        console.log(role);
        if (!(acceptedRoles.includes(role))){
            throw new HttpException(403,"You are not authorized to perform this action");
        }
        next();
    }catch(error){
        next(error);
    }
}

export default Authorize;