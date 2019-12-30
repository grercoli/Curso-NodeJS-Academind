const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url; //voy a recibir algo como / , /test ,/etc
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end(); //return para no continuar con el codigo que esta abajo
    }
    if (url === '/message' && method === 'POST') {
        const requestBody = [];
        //before writing to the file we want to get our request data
        req.on('data', (chunk) => {
            requestBody.push(chunk);
        }); //es un evento como el createServer. "On" allow us to listen to certain events and the event I want to listen here is the data event. The data event will be fired whenever a new chunk is ready to be read (what is called buffer). As a second argument a function that should be executed for every data event or data piece.
        return req.on('end', () => {
            //aca hay que trabajar con la data, es la parada de autobus
            //this will create a new buffer and add all the chunks from inside my body to it.
            const parsedBody = Buffer.concat(requestBody).toString(); //es toString() porque se que viene texto sino seria otra cosa
            const message = parsedBody.split('=')[1]; // porque parsedBody me devuelve "message=tumensaje"
            fs.writeFile('message.txt', message, (error) => {
                //this response should only be sent if we are done working with writeFile
                res.statusCode = 302; //302 que es para redireccion
                res.setHeader('Location', '/');
                return res.end();
            }); //estoy creando un archivo con el mensaje escrito por el usuario, en la misma carpeta que app.js
        }); // will be fired once it's done parsing the incoming requests data or the incoming requests in general
    }
    res.setHeader('Content-Type', 'text/html'); //le estoy diciendo que adjunte un header a la response, donde le pasamos meta information diciendo que el tipo del contenido va a ser html.
    res.write('<html>'); //nos permite escribir informacion en la response y funciona escribiendolo en varios pedazos.
    res.write('<head><title>My first Page</title></head>');
    res.write('<body><h1>Hello from my NodeJs server!</h1></body>');
    res.write('</html>');
    res.end(); //necesitamos decirle cuando termina, va a ser la parte que le decimos "send it back to the client"
}

module.exports = requestHandler;