// import the http module
// on request of cafe.html.... respond back with cafe.html 

var http = require('http');
var fs = require('fs');

function onRequest(request,response){
    // console.log("Request received", request);
    if(request.url=="/" || request.url=="/mainpage.html"){
        fs.readFile('./mainpage.html', function onReadComplete(error,data){
            console.log("onRead")
            if(error){
                console.log(error);
                response.writeHead(404);
                response.write("File not found");
            }else{
                response.write(data);
                
            }
            response.end();
        });
    } else if (request.url == '/style.css') {
        response.write(fs.readFileSync('./style.css'));
        response.end();
    } else {
        thing ='.'+request.url ;//== '/newspaperfootage.mp4'

        fs.readFile(thing, function onReadComplete(error,data){
            console.log("onRead")
            if(error){
                console.log(error);
                response.writeHead(404);
                response.write("File not found");
            }else{
                response.write(data);
            }
            response.end();
        });
    }
    console.log("onRequest method");
}

http.createServer(onRequest).listen(8080);
console.log("Server created");
//lsof -i:4000
//4000-4020. 3000-3020 are free... 7050-8000..9000-9020.. are free
// Command to execute
//node app.js

// closures