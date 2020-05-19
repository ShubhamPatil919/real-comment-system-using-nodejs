const express = require('express');
var app = express();

const port = process.env.PORT || 3000;

app.use(express.static("resources"))

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

let io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log(`new connection :${socket.id}`)
        //Recieve Event
    socket.on('comment', (data) => {
        console.log(data)
        data.time = Date()
        socket.broadcast.emit('comment', data)

    })
})