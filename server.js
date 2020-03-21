const http  = require('http');
const fs    = require('fs');
const path  = require('path');

http.createServer((req, res) =>{
  
    if (res.method == 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('index.html', 'UTF-8').pipe(res);

    }else if(req.method == 'POST'){
        let body = '';

        req.on('data', chunk => {body = chunk});
    
        req.on ('end', ()=>{
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(`
                
                <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

    <title> RESPUESTA DEL POST</title>
</head>

<body>
    <h1>Datos a agregar</h1>
    <p>${body} </p>
</body>

</html>

                `);
        });
    }




    console.log(`${req.method} solicita ${req.url}`);

    if(req.url == '/'){
        fs.readFile('index.html', 'UTF-8', (err, html) =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    }else if(req.url.match(/.css$/)){
        const reqPath = path.join(__dirname, 'public', req.url);
        const fileStream = fs.createReadStream(reqPath, 'UTF-8');

        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }else if(req.url.match(/.js$/)){
        const reqPath = path.join(__dirname, 'public', req.url);
        const fileStream = fs.createReadStream(reqPath, 'UTF-8');

        res.writeHead(200, {'Content-Type': 'text/javascript'});
        fileStream.pipe(res);
    }else if(req.url.match(/.jpg$/)){
        const reqPath = path.join(__dirname, 'public', req.url);
        const fileStream = fs.createReadStream(reqPath);

        res.writeHead(200, {'Content-Type': 'image/jpg'});
        fileStream.pipe(res);
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 ERROR');
    }

}).listen(3000);

console.log('Servidor iniciado...!');