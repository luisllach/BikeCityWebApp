export const MAP_LAYER_URL = process.env.REACT_APP_TILE_LAYER_URL;

export const InitialValues = {
  // Miami Beach
  Position: { lat: 25.790654, lng: -80.1300455 },
  // New York
  // Position: { lat: 40.7143528, lng: -74.00597309999999 },
  MapZoom: 12
};

export const SocketEvent = {
  BikeData: 'bike data'
};

export const Status = {
  Empty: 'empty',
  Few: 'few',
  Nice: 'nice'
};

export const StatusColor = {
  [Status.Empty]: 'red',
  [Status.Few]: '#fab440',
  [Status.Nice]: 'forestgreen',
  Default: 'blue'
};

export const getStatusColor = status => {
  switch(status) {
    case Status.Empty: return StatusColor[Status.Empty];
    case Status.Few: return StatusColor[Status.Few];
    case Status.Nice: return StatusColor[Status.Nice];
    default: return StatusColor.Default;
  }
}



