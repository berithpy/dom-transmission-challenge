const { Server } = require("socket.io");
const { createServer } = require("http");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const SESSIONS={};
io.on("connection", (socket) => {
  // console.log("connected", socket.id);

  socket.on("list-users", function() {
    io.emit("active-users", SESSIONS);
  })

  //Create and join a session instructed by client
  socket.on("new-user", function (session) {
    // console.log(session + " created...");
    SESSIONS[socket.id] = session;
    socket.join(session);
  });

  // join a session
  socket.on("join", function (session) {
    // console.log(session + " joined...");
    socket.join(session);
  });

  //Emit user event to send event session for replayer to receive
  socket.on("send-event", function (data) {
    // console.log("Send event from user in session " + JSON.stringify(data));
    io.to(data.session).emit("user-event", data.event);
  });

  socket.on("disconnect", () => {
    // console.log("disconnected", socket.id);
    delete SESSIONS[socket.id];
  });
});

io.listen(8888);
console.log("socket io server started......");