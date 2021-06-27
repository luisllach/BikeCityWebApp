const { default: Axios } = require('axios');
const config = require('../../config')

module.exports = async () => {
  try {
    const response = await Axios.get(config.api.cityBik.url)
    const { location, stations } = response.data.network;

    return {success: true, data: {location, stations}};
  }
  catch (error) {
    return { success: false, error }
  }
};
