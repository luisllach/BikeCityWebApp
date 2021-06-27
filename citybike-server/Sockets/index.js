const config = require('../config');
const onDisconnect = require('./get/disconnect');
const sendBikeData = require('./send/bikeData');

const Event = {
  Disconnect: 'disconnect',
  BikeData: 'bike data'
};

const EventHandler = {
  [Event.Disconnect]: onDisconnect, 
  [Event.BikeData]: sendBikeData
};

const BIKE_FETCH_SECONDS = config.socket.intervalSeconds * 1000;
let interval;

module.exports = socket => {
  const socketId = socket.id;
  const clientIp = socket.request.connection.remoteAddress;
  console.log('New connection ' + socketId + ' from ' + clientIp);

  if (interval) {
    clearInterval(interval);
  }

  // send bike data
  interval = setInterval(
    () => 
      EventHandler[Event.BikeData](socket, Event.BikeData)
    , BIKE_FETCH_SECONDS
  );

  // disconnect
  socket.on(Event.Disconnect, () => EventHandler[Event.Disconnect](interval));
};
