const config = require('../config');
const onDisconnect = require('./get/disconnect');
const sendBikeData = require('./send/bikeData');

const BIKE_FETCH_SECONDS = config.socket.intervalSeconds * 1000;

const Event = {
  Disconnect: 'disconnect',
  BikeData: 'bike data'
};

const EventHandler = {
  [Event.Disconnect]: onDisconnect, 
  [Event.BikeData]: sendBikeData
};

const connectionSocket = socket => {
  const socketId = socket.id;
  const clientIp = socket.request.connection.remoteAddress;
  console.log('New connection ' + socketId + ' from ' + clientIp);

  // disconnect
  socket.on(Event.Disconnect, () => 
    EventHandler[Event.Disconnect](socket)
  );
};

module.exports.BIKE_FETCH_SECONDS = BIKE_FETCH_SECONDS;
module.exports.Event = Event;
module.exports.EventHandler = EventHandler;
module.exports.connectionSocket = connectionSocket;
