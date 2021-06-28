import React, { Component } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import { InitialValues, SocketEvent, MAP_LAYER_URL } from './enums';
import { getAvailableBikes } from '../../API/Socket/BikesAPI';
import MapTitle from './MapTitle';
import BikeStation from './BikeStation';

class MapView extends Component {
  constructor() {
    super();

    this.state = {
      stations: null,
      zoom: InitialValues.MapZoom
    };

    this.setLocationsData = this.setLocationsData.bind(this);
    this.setZoomLevel = this.setZoomLevel.bind(this);
  }

  setLocationsData(data) {
    if (data.highlights > 0 || !this.state.stations) {
      console.log('render', data);
      this.setState({ ...this.state, stations: data.stations });
    }
  }

  setZoomLevel(e) {
    this.setState({...this.state, zoom: e.target._zoom})
  }

  componentDidMount() {
    this.socket = getAvailableBikes;

    this.socket.on(SocketEvent.BikeData, this.setLocationsData);
  }

  componentWillUnmount() {
    this.socket.off(SocketEvent.BikeData);
  }

  render() {
    return (
      <div className="map">
        <MapTitle />
        {!this.state.stations && <p>Cargando datos</p>}
        {this.state.stations && (
          <Map
            center={InitialValues.Position}
            zoom={this.state.zoom}
            zoomControl={false}
            onzoomend={this.setZoomLevel}
          >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={MAP_LAYER_URL}
          />
          <ZoomControl position="bottomleft"/>
          {this.state.stations.map(({ position, status }, index) => (
            <BikeStation key={index} position={position} status={status}/>
          ))}
        </Map>
        )}
      </div>
    );
  }
}

export default MapView;
