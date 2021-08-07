// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.write('hello')
//     res.end()
// })

// server.listen(3000);

const express = require('express');
//const { SocketAddress } = require('net');
const path = require('path');

const app = express();

const staticMiddleware = express.static(path.join(__dirname, 'public'))

app.use(staticMiddleware)

const kittens = [
    {
        id: 1,
        name: 'socks',
        description: 'This was the clintons kitten'
    },
    {
        id: 3,
        name: 'felix',
        description: 'fleix is curious kitten'
    },
    {
        id: 5,
        name: 'garfield',
        description: 'the cat not the pres'
    },

]       ///this will be on a seperate file for us

const logger  = (req, res, next) => {
    console.log(req.url)
    next(); //without this the browser will keep spinning
}

//middleware
app.use(logger);

app.get('/', (req, res, next) => {
    res.send('<h1>Welcome</h1>')
})

app.get('/puppies', (req, res, next) => {
    res.send('<h1>Welcome to Puppies</h1>')
})

app.get('/kittens', (req, res, next) => {
    res.send(`
    <html>
        <head>
            <title>Kittens</title>
            <link rel='stylesheet' href='/styles.css' />
        </head>
        <body>
            <h1>Kittens</h1>
            <ul>
            ${
                kittens.map( kitten => {
                    return `
                    <li>
                        <a href='/kittens/${kitten.id}'>
                        ${ kitten.name }
                    </li>
                `;
                }).join('') 
            }
            </ul>
        </body>
    </html>
    `)
})

//need to set up a route for when you click on a kitten link like garfield
app.get('/kittens/:id', (req, res ) => {
    //console.log(req.params.id) //shows id of 5 for garfield
    const kitten = kittens.find(kitten => kitten.id === req.params.id*1)  //turns string to number
    console.log(kitten)
    res.send(`
        <html>
            <head>
            <title>Kitten</title>
            <link rel='stylesheet' href='/styles.css' />
            </head>
            <body>
            <a href='/kittens'>Back to kittens</a>
            <h1>${ kitten.name }</h1>
            <p>${ kitten.description }</p> 
            </body>
        </html>
    `)
})

app.listen(3000, () => console.log('listening on port 3000'))