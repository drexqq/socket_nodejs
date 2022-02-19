// "JOIN_ROOM": 유저가 방에 참가했을 때 발생
// "UPDATE_NICKNAME": 유저가 닉네임을 변경했을 때 발생
// "SEND_MESSAGE": 유저가 메시지를 전송했을 때 발생
// "RECEIVE_MESSAGE": 유저가 메시지를 받을 때 발생

const SOCKET_EVENT = {
  JOIN: "JOIN",
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
  SEND: "SEND",
  RECEIVE: "RECEIVE",
};

module.exports = function (socketIo) {
    socketIo.on("connection", function (socket) {
        console.log("socket is connected");
    })
    const roomName = 'room1';
    socket.on(SOCKET_EVENT.JOIN, req => {
        socket.join(roomName); // join시 room을 입장
        const res = {
            ...req,
            type: SOCKET_EVENT.JOIN,
            time: new Date()
        }
        socket.to(roomName).emit("RECEIVE_MESSAGE", res);
        console.log(`Some one ${SOCKET_EVENT.JOIN} with data ${JSON.stringfy(res)}`)
    })

    socket.on("UPDATE_NICKNAME", req => {
        const res = {
            ...req,
            type: "UPDATE_NICKNAME",
            time: new Date(),
        }
        socket.to(roomName).emit("UPDATE_NICKNAME", res);
        console.log(`Some one UPDATE_NICKNAME with data ${JSON.stringfy(res)}`)
    })

    socket.on("SEND_MESSAGE", req => {
        const res = {
            ...req,
            type: "SEND_MESSAGE",
            time: new Date(),
        }
        socket.to(roomName).emit("SEND_MESSAGE", res);
        console.log(`Some one SEND_MESSAGE with data ${JSON.stringfy(res)}`)
    })

    socketIo.on("disconnected", reason => {
        console.log(`disconnected : ${reason}`)
    })
}