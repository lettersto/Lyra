const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const port = 4002;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let userDict = {}; // 유저가 들어간 방
let buskerTotalDict = {}; // 누적으로 들어온 인원
let buskerMaxCnt = {}; // 최대 동접자 수
let buskerLiveDict = {}; // 진행중인 버스킹 방

// 방에 있는 유저 수
const fetchRoomCnt = async (io, buskerId) => {
  const sockets = await io.in(buskerId).fetchSockets();
  console.log(sockets);
  // io.to(buskerId).emit("fetch user", buskerDict[buskerId].size);
};

// 유저 입장
const userIn = (userId, buskerId) => {
  // 유저가 들어간 방 add
  if (Object.keys(userDict).includes(String(userId))) {
    userDict[userId].add(buskerId);
  } else {
    userDict[userId] = new Set([buskerId]);
  }
  // 버스커 방에 현재 들어온 인원 add
  // if (Object.keys(buskerDict).includes(String(buskerId))) {
  //   buskerDict[buskerId].add(userId);
  // } else {
  //   buskerDict[buskerId] = new Set([userId]);
  // }
  // 버스커 방 누적 인원 add
  if (Object.keys(buskerTotalDict).includes(String(buskerId))) {
    buskerTotalDict[buskerId] = 1;
  } else {
    buskerTotalDict[buskerId] = new Set([userId]);
    // 유저 정보 보내주기
    buskerLiveDict[buskerId] = setInterval(() => {
      fetchRoomCnt(io, buskerId);
    }, 10000);
  }
};

// 유저가 접속한 방 알려주기
const fetchUserRooms = (userId) => {};

// 유저 나가기
const userOut = (userId, buskerId) => {};

// 해당 유저 연결
io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);

  // 유저 연결
  socket.on("user connect", (userId) => {
    socket.data.userId = userId; // 소켓에 userId를 매핑
  });

  // 버스커 방에 연결한다.
  socket.on("enter room", async (buskerId) => {
    await socket.join(buskerId);
    userIn(socket.data.userId, buskerId);
    fetchRoomCnt(io, buskerId);
  });

  // 유저가 들어간 방들 조회
  socket.on("user rooms", (socket) => {
    fetchUserRooms(io, socket.data.userId);
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
  socket.on("leave room", async (buskerId) => {
    await socket.leave(buskerId);
    userOut(socket.data.userId, buskerId);
  });

  // 연결 끊어졌을 시!
  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
  });

  // 버스커 방에서 모두 내보낸다.
  socket.on("room close", async (buskerId) => {
    io.in(buskerId).socketsLeave(buskerId);
    clearInterval(buskerLiveDict[buskerId]);
    delete buskerLiveDict[buskerId];
    socket.emit("total cnt", buskerTotalDict[buskerId].size);
    delete buskerTotalDict[buskerId];
  });
});

server.listen(port, () => console.log(`포트번호 : ${port}`));
