import { calcu } from "./calculator";
//const http = require("http");
import express from "express";

import employeeRouter from "./employee_router";
import { Employee } from "./employee";
import loggerMiddleware from "./loggerMiddleWare";


//const express = ("express");
const server = express();
server.use(express.json());
server.use(loggerMiddleware); //use loggerMidlleware before employeerouter.
server.use('/employees',employeeRouter); // any requests ending with /employees, then call employeeRouter



//'/' in get indicates request until / from localhost 3000 will be responsed. if any other data is provided after / prints error.
server.get('/',(req,res)=>{
    console.log(req.url);
    res.status(200).send("Helo world express,typescript")
});


// const server = http.createServer((req,res)=>{
//     res.writeHead(200);
//     res.end("Hello World");
// });
// frontend communicates to server using 3000 port.

server.listen(3000,()=>{
    console.log("server is listening to 3000")
});
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
