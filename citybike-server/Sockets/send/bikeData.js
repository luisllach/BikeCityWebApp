const getMiamiAvailableBikes = require("../../API/CityBik/getMiamiAvailableBikes");

const Status = {
  Empty: 'empty',
  Few: 'few',
  Nice: 'nice'
};

const getStatus = freeBikes => {
  if (!freeBikes) {
    return Status.Empty
  }

  if (freeBikes > 5) {
    return Status.Nice
  }

  return Status.Few
};

const processBikesData = (data, oldData) => {
  const bikesData = {};

  for (const station of data) {
    const { 
      id,
      empty_slots: emptySlots,
      free_bikes: freeBikes,
      latitude: lat,
      longitude: lng
    } = station;

    const status = getStatus(freeBikes);

    let highlight = null;

    if (oldData) {
      const result = oldData[id].freeBikes - freeBikes;

      if (result < 0) {
        highlight = 'green'
      }
      else if (result > 0) {
        highlight = 'red'
      }
    }

    bikesData[id] = {
      position: { lat, lng },
      emptySlots,
      freeBikes,
      status,
      highlight
    };
  }

  return bikesData;
};

module.exports = async (io, event, lastResponse) => {
  const response = await getMiamiAvailableBikes();

  if (response.success) {
    const newResponse = processBikesData(response.data, lastResponse.data);
    
    const arrayResponse = Object.values(newResponse);

    if (!lastResponse.data) {
      lastResponse.data = newResponse;

      io.emit(event, {
        stations: arrayResponse,
        highlights: arrayResponse.length
      });
    } else {
      lastResponse.data = newResponse;

      const highlightValues = arrayResponse.filter(value => value.highlight)
      console.log(new Date(), highlightValues.length);

      io.emit(event, {
        stations: arrayResponse,
        highlights: highlightValues.length
      });
    }
  }
};
