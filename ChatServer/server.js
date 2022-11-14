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

let userDict = {}; // 유저가 들어간 방정보
let buskerDict = {}; // 현재 방에 있는 유저정보
let buskerTotalDict = {}; // 누적으로 들어온 인원

// 방에 있는 접속자 수
const fetchRoomCnt = (buskerId) => {
  let cnt = 0;
  if (Object.keys(buskerDict).includes(String(buskerId))) {
    cnt = buskerDict[buskerId].size;
  }
  io.to(buskerId).emit("fetch user", cnt);
};

// 유저에게 요청한 방의 인원수 보내주기
const fetchUserRoomCnt = (socket, buskerId) => {
  let cnt = 0;
  if (Object.keys(buskerDict).includes(String(buskerId))) {
    cnt = buskerDict[buskerId].size;
  }
  socket.emit("my room cnt", cnt);
};

// 유저 입장
const userIn = (socket, buskerId) => {
  const userId = socket.data.userId;
  // 유저의 방목록에 추가
  if (Object.keys(userDict).includes(String(userId))) {
    userDict[userId].add(buskerId);
  } else {
    userDict[userId] = new Set([buskerId]);
  }
  // 버스커 방에 유저 추가
  if (Object.keys(buskerDict).includes(String(buskerId))) {
    buskerDict[buskerId].add(userId);
  } else {
    buskerDict[buskerId] = new Set([userId]);
  }
  // 버스커 방 누적 인원 추가
  if (Object.keys(buskerTotalDict).includes(String(buskerId))) {
    buskerTotalDict[buskerId].add(userId);
  } else {
    buskerTotalDict[buskerId] = new Set([userId]);
  }
  fetchRoomCnt(buskerId);
};

// 유저가 접속한 방 알려주기
const fetchUserRooms = (socket) => {
  const userId = socket.data.userId;
  let buskerRooms = [];
  if (Object.keys(userDict).includes(String(userId))) {
    buskerRooms = Array.from(userDict[userId]);
  }
  buskerRooms.forEach((id, idx) => {
    let cnt = 0;
    if (Object.keys(buskerDict).includes(String(id))) {
      cnt = buskerDict[id].size;
    }
    buskerRooms[idx] = { buskerId: id, userCnt: cnt };
  });
  buskerRooms.sort(function (a, b) {
    return b.cnt - a.cnt;
  });
  // 유저가 접속한 방들 보내기
  socket.emit("user rooms", buskerRooms);
};

// 유저 나가기
const userOut = (socket, buskerId) => {
  const userId = socket.data.userId;
  // 유저의 방목록에서 제거
  if (Object.keys(userDict).includes(String(userId))) {
    userDict[userId].delete(buskerId);
  }
  // 버스커 방에서 유저 제거
  if (Object.keys(buskerDict).includes(String(buskerId))) {
    buskerDict[buskerId].delete(userId);
  }

  fetchRoomCnt(buskerId);
};

// 유저 모두 내보내기
const userAllOut = async (buskerId) => {
  const sockets = await io.in(buskerId).fetchSockets();
  for (socket of sockets) {
    const userId = socket.data.userId;
    if (Object.keys(userDict).includes(String(userId))) {
      userDict[userId].delete(buskerId);
    }
  }
  delete buskerDict[buskerId];
  delete buskerTotalDict[buskerId];
};

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
    userIn(socket, buskerId);
  });

  // 유저가 들어간 방들 조회
  socket.on("user rooms", () => {
    fetchUserRooms(socket);
  });

  // 특정 방의 유저 수 보내주기
  socket.on("my room cnt", (buskerId) => {
    fetchUserRoomCnt(socket, buskerId);
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
    userOut(socket, buskerId);
  });

  // 버스커 방에서 모두 내보낸다.
  socket.on("room close", async (buskerId) => {
    if (buskerId === socket.data.userId) {
      io.to(buskerId).emit("end", buskerTotalDict[buskerId].size);
      await userAllOut(buskerId);
      io.in(buskerId).socketsLeave(buskerId);
    } else {
      console.log("방장이 아닙니다!");
    }
  });

  // 연결 끊어졌을 시!
  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
  });
});

server.listen(port, () => console.log(`포트번호 : ${port}`));
