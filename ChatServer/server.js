const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// const cors = require("cors");
const app = express();
// app.use(cors);
const port = 4002;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);

  socket.on("enter_room", (buskerId) => {
    socket.join(buskerId);
    socket.to(buskerId).emit("participate");
  });
  // to는 해당 방만!!
  socket.on("enter_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("hiMessage");
  });

  socket.on("send message", (item, roomName) => {
    socket.to(item.receiver).to(item.sender).emit("receive message", {
      sender: item.sender,
      receiver: item.receiver,
      message: item.message,
      createdDate: item.createdDate,
      roomName: roomName,
    });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
  });
});

server.listen(port, () => console.log(`포트번호 : ${port}`));
