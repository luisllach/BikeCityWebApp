module.exports = {
  port: process.env.PORT || 4001,
  cors: {
    whitelist: [
      'http://localhost:3000',
      'http://192.168.1.7:3000'
    ]
  },
  api: {
    cityBik: {
        url: 'http://api.citybik.es/v2/networks/citi-bike-nyc'
    }
  },
  socket: {
    intervalSeconds: 5
  }
};
