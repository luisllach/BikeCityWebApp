const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const config = require('./config');
const { 
  BIKE_FETCH_SECONDS,
  Event,
  EventHandler,
  connectionSocket
} = require('./Sockets');

const port = config.port;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  origins: config.cors.whitelist
});

io.on("connection", connectionSocket);

const lastResponse = { data: null };
setInterval(() => 
  EventHandler[Event.BikeData](io, Event.BikeData, lastResponse),
  BIKE_FETCH_SECONDS
);

// io.to('bike data room').emit('current date', new Date());

server.listen(port, () => console.log(`Listening on port ${port}`));
