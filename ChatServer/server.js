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
const fetchUser = (io, buskerId) => {
  io.to(buskerId).emit(
    "fetch user",
    io.sockets.adapter.rooms.get(buskerId).size
  );
};
let userSet = new Set([]);

// 해당 유저 연결
io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);

  // 버스커 방에 연결한다.
  socket.on("enter_room", async (buskerId) => {
    await socket.join(buskerId);

    fetchUser(io, buskerId);
  });

  // 전송된 메세지 받기
  socket.on("send message", (item, buskerId) => {
    // 해당 방 사람들에게 보내기
    io.to(buskerId).emit("receive message", {
      _id: item._id,
      text: item.text,
      createdAt: item.createdAt,
      user: item.user,
      donation: item.donation,
    });
    // 나를 제외한 그룹 전체에게 메세지 보내기
    // socket.broadcast.to(방의 아이디).emit('이벤트명', 데이터);
  });

  // 버스커 방에서 나간다.
  socket.on("leave_room", async (buskerId) => {
    await socket.leave(buskerId);
    fetchUser(io, buskerId);
  });

  // 연결 끊어졌을 시!
  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
  });

  // 버스커 방에서 모두 내보낸다.
  socket.on("room_close", async (buskerId) => {
    io.in(buskerId).socketsLeave(buskerId);
  });
});

server.listen(port, () => console.log(`포트번호 : ${port}`));
