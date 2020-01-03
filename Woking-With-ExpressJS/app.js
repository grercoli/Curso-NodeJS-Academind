const http = require('http');

const express = require('express');

//create an express application
const app = express();

//using a middleware (after creating express application but before creating the server)
app.use((req, res, next) => {
    console.log('In the middleware!');
    next();
}); //allow us to add a new middleware function, the function that you pass as an argument will be executed for every incoming request and will receive 3 arguments: request and response are what we know but with some extra features, next is a function that will be passed to this function by expressJS, this function has to be executed to allow the request to travel on to the next middleware

app.use((req, res, next) => {
    console.log('In another middleware!');
    //if we dont call next we should actually send back a response because otherwise the request cant continue it's journey so it will never reach a place where we might send a response
    res.send(); //send a response, lo hace automaticamente con content-type: text-html pero lo puedo sobreescribir si antes uso un setHeader como hacia antes
});

const server = http.createServer(app);

server.listen(3000);