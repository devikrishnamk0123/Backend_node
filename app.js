
const http = require("http");

const server = http.createServer((req,res)=>{
    res.writeHead(200);
    res.end("Hello World");
});
// frontend communicates to server using 3000 port.

server.listen(3000,()=>{
    console.log("server is listening to 3000")
});
//package.json file
//scripts - name each scripts - use npm run scriptname
//gitignore - to exclude files that need not be committed. like node modules.
// gitignore should be added before git add.