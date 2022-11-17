const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io")
const io = new Server(server)
const env = require('dotenv')
env.config()
const port = process.env.PORT

let game = Array(9)
for(let i = 0; i<9; i++){
    game[i] = Array(9).fill('EMPTY')
}

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    socket.emit('set', game)
    socket.on('change', (place, type) => {
        game[place[0]][place[1]] = type
        io.emit('set', game)
    })
})

server.listen(port)