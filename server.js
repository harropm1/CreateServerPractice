const http = require('http');
const url = require('url');
const fs = require('fs');

const connect = require('connect');

const publicPath = './public/';
const dataPath = './data/';

const host = '127.0.0.1';
const port = 3000;

let app = connect();

app.use((request, response) =>
{
    let clientURL = request.url;
    let parsedURL = url.parse(clientURL);
    let href = parsedURL.href;

    if (href === '/') 
    {
        response.end(fs.readFileSync(publicPath + 'index.html'));
    }
    else if (href === '/leagues')
    {
        response.end(fs.readFileSync(dataPath + 'leagues.json'));
    }
    else if (href === '/teams')
    {
        response.end(fs.readFileSync(dataPath + 'teams.json'));
    }
    else 
    {
        response.end('404: Error');
    }

});   
http.createServer(app).listen(port, host);

console.log(`http://${host}:${port}`);