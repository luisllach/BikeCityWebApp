import React, { Component, Fragment } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import { InitialValues, SocketEvent, MAP_LAYER_URL } from './enums';
import { getAvailableBikes } from '../../API/Socket/BikesAPI';
import BikeStation from './BikeStation';
import LoadingScreen from './LoadingScreen';

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
      <Fragment>
        {!this.state.stations && <LoadingScreen message="Loading data"/>}
        {this.state.stations && (
          <Map
            center={InitialValues.Position}
            zoom={this.state.zoom}
            zoomControl={false}
            onzoomend={this.setZoomLevel}
            className="map-container"
          >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={MAP_LAYER_URL}
          />
          <ZoomControl position="bottomright"/>
          {this.state.stations.map(({ position, status }, index) => (
            <BikeStation key={index} position={position} status={status}/>
          ))}
        </Map>
        )}
      </Fragment>  
    );
  }
}

export default MapView;
