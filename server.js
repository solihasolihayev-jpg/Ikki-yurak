const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;
const rooms = new Map();

app.get("/", (_req, res) => res.sendFile(require("path").join(__dirname, "index.html")));
app.get("/health", (_req, res) => res.json({ ok: true, service: "Ikki Yurak" }));

io.on("connection", (socket) => {
  socket.data.room = null;
  socket.data.displayName = "Mehmon";
  socket.on("join-room", ({ room, name, avatar } = {}) => {
    if (typeof room !== "string") return;
    room = room.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 16);
    if (!room) return;
    if (socket.data.room) {
      socket.leave(socket.data.room);
      emitRoomState(socket.data.room);
    }
    socket.data.room = room;
    socket.data.displayName = clean(name, "Mehmon");
    socket.data.avatar = clean(avatar, "🧑🏻‍❤️‍💋‍👩🏻");
    socket.join(room);
    emitRoomState(room);
    socket.to(room).emit("chat-message", {
      name: "Ikki Yurak", text: `${socket.data.displayName} xonaga qo‘shildi 💗`, kind: "system"
    });
  });
  socket.on("chat-message", (data = {}) => {
    const room = socket.data.room;
    if (!room || data.room !== room) return;
    const text = clean(data.text, "").slice(0, 1000);
    if (!text) return;
    socket.to(room).emit("chat-message", {
      name: socket.data.displayName, text, kind: "text"
    });
  });
  socket.on("sticker-message", (data = {}) => {
    const room = socket.data.room;
    if (!room || data.room !== room) return;
    const sticker = clean(data.sticker, "💗").slice(0, 24);
    socket.to(room).emit("sticker-message", {
      name: socket.data.displayName, sticker
    });
  });
  socket.on("avatar-change", (data = {}) => {
    const room = socket.data.room;
    if (!room || data.room !== room) return;
    socket.data.avatar = clean(data.avatar, "💑");
    socket.to(room).emit("avatar-change", {
      name: socket.data.displayName, avatar: socket.data.avatar
    });
    emitRoomState(room);
  });
  socket.on("disconnect", () => {
    if (socket.data.room) {
      const room = socket.data.room;
      socket.to(room).emit("chat-message", {
        name: "Ikki Yurak", text: `${socket.data.displayName} aloqadan chiqdi.`, kind: "system"
      });
      emitRoomState(room);
    }
  });
});

function clean(value, fallback) {
  if (typeof value !== "string") return fallback;
  return value.replace(/[<>]/g, "").trim().slice(0, 80) || fallback;
}
function emitRoomState(room) {
  const members = [...(io.sockets.adapter.rooms.get(room) || [])]
    .map(id => io.sockets.sockets.get(id))
    .filter(Boolean);
  io.to(room).emit("room-state", {
    count: members.length,
    avatar: members.length ? members[members.length - 1].data.avatar : null
  });
}
server.listen(PORT, () => console.log(`Ikki Yurak ishlayapti: http://localhost:${PORT}`));
