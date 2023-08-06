
import * as dotenv from "dotenv"
dotenv.config({path:__dirname+'/.env'});


//const http = require("http");
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata"
import AppDataSource from "./db/postgres.db";
import loggerMiddleware from "./middleware/logger.middleWare";
import employeeRoute from "./route/employee.route";
import HttpException from "./exception/http.exception";
import errorMiddleWare from "./middleware/error.middleware";
import DepartmentController from "./controller/department.controller";
import departmentRoute from "./route/department.route";
import roleRoute from "./route/role.route";

import logger from "./logger/logger";



//const express = ("express");
const server = express();
server.use(express.json());
server.use(loggerMiddleware); //use loggerMidlleware before employeerouter.
server.use('/employees',employeeRoute); // any requests ending with /employees, then call employeeRouter
//error middleware should be used after the requests have gone to the route - takes 4th parameter - error object.

server.use('/departments',departmentRoute);
server.use('/roles',roleRoute);


//'/' in get indicates request until / from localhost 3000 will be responsed. if any other data is provided after / prints error.
server.get('/',(req,res)=>{
    console.log(req.url);
    res.status(200).send("Helo world express,typescript")
});

// server.use((error:Error,req:Request,res:Response,next:NextFunction)=>{ //error middleWare takes 4th parameter error.
//     console.log(error.stack);
//     if (error instanceof HttpException){
//         res.status(error.status).send({error:error.message});
//         return;
//     }
//     console.log(error);
//     res.status(500).send(error.message);
// });

server.use(errorMiddleWare);

// const server = http.createServer((req,res)=>{
//     res.writeHead(200);
//     res.end("Hello World");
// });
// frontend communicates to server using 3000 port.

(async ()=> {
    await AppDataSource.initialize(); 

    server.listen(3000,()=>{
    console.log("server is listening to 3000")});
    logger.info("Server-started");

})();
//package.json file
//scripts - name each scripts - use npm run scriptname
//gitignore - to exclude files that need not be committed. like node modules.
// gitignore should be added before git add.

//npx command used to directly initialise any module without installing it.
//tsc - typescript compiler

// const mycalcu = new calcu;
// mycalcu.add(2,3);
// mycalcu.sub(2,3);
// mycalcu.mul(3,4);
// mycalcu.div(10,6);
// mycalcu.power(2,3);
// mycalcu.fact(4);
// mycalcu.percentage(60);


//controller - takes in request
//service layer - processing of req - business lofic is implemented. needs repository
//repository - data persistence.

//different entities are implemented using the layered architecture. Dept repository cannot access Employee repositiry. Dept services can access Employee services.