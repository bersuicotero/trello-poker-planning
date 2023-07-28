import express from "express";
import http from 'http';
import { Server as SocketServer } from "socket.io";

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors:{
        origin: '*'
    }
})

io.on('connection', socket =>{
    socket.on("cardSelected", card =>{
        socket.broadcast.emit("cardSelected", card)
    })
    socket.on("originListSelected", data =>{
        socket.broadcast.emit("originListSelected", data)
    })
    socket.on("roleBroadcast", role =>{
        socket.broadcast.emit("roleBroadcast", role)
    })
    socket.on("playerConnected", player =>{
        socket.broadcast.emit("playerConnected", player)
    })
    socket.on("vote", card =>{
        socket.broadcast.emit("vote", card)
    })
})
server.listen(3000)

