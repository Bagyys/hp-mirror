const socket_io = require("socket.io");
const io = socket_io();

let Socket = {
    emit: (event, data) => {
        // console.log("socket.js emit console log")
        console.log(event, data);
        io.sockets.emit(event, data);
    },
};

io.on("connection", (socket) => {
    console.log("A user connected");
});

exports.socketConnection = { io: io, socket: Socket };