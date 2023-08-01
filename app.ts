
//const http = require("http");
import express from "express";
//const express = ("express");
const server = express();

//'/' in get indicates request until / from localhost 3000 will be responsed. if any other data is provided after / prints error.
server.get('/',(req,res)=>{
    console.log(req.url);
    res.status(200).send("Helo world express,typescript")
})

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