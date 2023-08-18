import { NextFunction, Request, Response } from "express"

const loggerMiddleware = (req: Request,res: Response,next: NextFunction)=>{
    console.log(`${new Date()}:${req.url}: ${req.method}`);
    next();//called when the middleware is succesful. else next() is not called. points to the next middeware.
}

// const loggerMiddleware = (req: Request,res: Response)=>{
//     console.log(`${new Date()}:${req.url}: ${req.method}`);
//     //next();//called when the middleware is succesful. else next() is not called. points to the next middeware.
// }

export default loggerMiddleware;

