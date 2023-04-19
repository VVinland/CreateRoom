import path from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { generateMessage, generateLocationMessage } from './utils/message.js';
import { isRealString } from './utils/isRealString.js';
import {User} from './utils/users.js';

const users = new User();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, 'public')))

io.on('connection', function (socket) {

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) { 
           return callback('Name and root are required.')
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage',generateMessage('Admin',`Hello, ${params.name}`));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} joined the room`));
        callback();
    })

    socket.on('createMessage', function (message, callback) {
        const user = users.getUser(socket.id);
        if(user&&isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
    })

    socket.on('createLocationMessage', function (coords) {
        const user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,
            coords.lat, coords.lng))
        }
       
    })

    socket.on('disconnect', function () {
        const user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} disconnect`));
        }
    })
})

server.listen(PORT);