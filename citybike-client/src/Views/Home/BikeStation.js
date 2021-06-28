import React, { Component } from 'react';
import { Circle } from 'react-leaflet';
import { getStatusColor } from './enums'

class BikeStation extends Component {
  constructor(props) {
    super(props);

    this.position = props.position;
    this.status = props.status;
  }

  render() {   
    return (
      <Circle
        center={this.position}
        radius={30}
        color={getStatusColor(this.status)}
        fillColor={getStatusColor(this.status)}
        fillOpacity={1}
        
      />
    );
  }
};

export default BikeStation;