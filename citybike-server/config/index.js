module.exports = {
  port: process.env.PORT || 4001,
  cors: {
    whitelist: [
      'http://localhost:3000'
    ]
  },
  api: {
    cityBik: {
        url: 'http://api.citybik.es/v2/networks/decobike-miami-beach'
    }
  },
  socket: {
    intervalSeconds: 30
  }
};
