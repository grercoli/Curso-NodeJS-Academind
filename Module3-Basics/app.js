//este archivo puede ser nombrado server.js o app.js vendria a ser el root

//core modules de nodeJs: http, https, fs, path, os
//http: launch a server, send requests (tambien a otros servers, podemos tener multiples servers comunicandose, por ejemplo podria mandar una request a Google Maps API para mandar algunas cordenadas y obtener una direccion)
//https: launch a SSL server (all the data that is transferred is encrypted)

const http = require('http');

const routes = require('./routes');

// const server = http.createServer((req, res) => { //toma como parametro una funcion que se va a ejecutar por cada incoming request. In this case if a request comes, please execute this function. CreateServer callback function is called whenever a request reaches our server.
    
// });

const server = http.createServer(routes); //please execute the function that is stored in "routes" for incoming requests

server.listen(3000); // starts a process where nodeJs will not immediately exits our script but where nodeJs will instead keep this running to listen for incoming requests.