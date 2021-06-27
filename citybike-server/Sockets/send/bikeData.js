const getMiamiAvailableBikes = require("../../API/CityBik/getMiamiAvailableBikes");

module.exports = async (socket, event) => {
  const response = await getMiamiAvailableBikes();

  console.log('miamiBikesData', response.data);

  if (response.success) {
    socket.emit(event, response.data)
  }
};
