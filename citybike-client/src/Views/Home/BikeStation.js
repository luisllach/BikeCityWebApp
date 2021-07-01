import React from 'react';
import { Circle } from 'react-leaflet';
import { getStatusColor } from './enums'

const BikeStation = props => {
  const { position, status } = props;

  return (
    <Circle
      center={position}
      radius={30}
      color={getStatusColor(status)}
      fillColor={getStatusColor(status)}
      fillOpacity={1}
    />
  );
};

export default BikeStation;