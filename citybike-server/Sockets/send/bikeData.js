const config = require('../../config');
const getMiamiAvailableBikes = require("../../API/CityBik/getMiamiAvailableBikes");

const CACHE_SIZE = config.api.cityBik.cacheSize;

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

const getUTCDate = () => {
  const date = new Date(); 
  const to_utc =  Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  return new Date(to_utc).toISOString();
};

const addItemToRecentUpdatesQueue = (recentUpdates, newResponse) => {
  const date = getUTCDate();

  if (recentUpdates.length === CACHE_SIZE) {
    recentUpdates.shift();
  }

  recentUpdates.push({
    date,
    data: newResponse.slice()
  });
};

module.exports = async (io, event, lastResponse) => {
  const response = await getMiamiAvailableBikes();

  if (response.success) {
    const newResponse = processBikesData(response.data, lastResponse.data);
    
    const arrayResponse = Object.values(newResponse);

    if (!lastResponse.data) {
      lastResponse.data = newResponse;

      addItemToRecentUpdatesQueue(lastResponse.recentUpdates, arrayResponse);

      io.emit(event, {
        recentUpdates: lastResponse.recentUpdates,
        highlights: arrayResponse.length
      });
    } else {
      lastResponse.data = newResponse;

      const highlightValues = arrayResponse.filter(value => value.highlight)
      console.log(new Date(), highlightValues.length);

      if (highlightValues.length > 0) {
        addItemToRecentUpdatesQueue(lastResponse.recentUpdates, arrayResponse);
      }

      io.emit(event, {
        recentUpdates: lastResponse.recentUpdates,
        highlights: highlightValues.length
      });
    }
  }
};
