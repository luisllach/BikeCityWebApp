import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';


import BikeStation from './BikeStation';
import LoadingScreen from './LoadingScreen';
import TimeLine from './TimeLine';

import { InitialValues, SocketEvent, MAP_LAYER_URL } from './enums';
import { getAvailableBikes } from '../../API/Socket/BikesAPI';

const MapView = () => {
  // * STATES
  const [recentUpdates, setRecentUpdates] = useState(null);
  const [zoom, setZoom] = useState(InitialValues.MapZoom);
  const [selected, setSelected] = useState(0);

  const socket = getAvailableBikes;

  useEffect(() => {
    socket.on(SocketEvent.BikeData, data => {
      if (data.highlights > 0 || !recentUpdates) {
        setRecentUpdates(data.recentUpdates);
        setSelected(data.recentUpdates.length - 1);
      }
    });

    return () => socket.off(SocketEvent.BikeData);
  }, [socket, recentUpdates]);

  const setZoomLevel = e => setZoom(e.target._zoom);

  const handleLeftClick = useCallback(() => {
    setSelected(previousValue => {
      if(previousValue > 0) {
        return previousValue - 1;
      }
    })
  }, []);

  const handleRightClick = useCallback(() => {
    setSelected(previousValue => {
      if(previousValue < recentUpdates.length - 1) {
        return previousValue + 1;
      }
    })
  }, [recentUpdates]);

  return (
    <Fragment>
        {!recentUpdates && <LoadingScreen message="Loading data"/>}
        {recentUpdates && (
          <TimeLine
            dateTime={recentUpdates[selected].date}
            onLeftClick={handleLeftClick}
            onRightClick={handleRightClick}
            selected={selected}
            size={recentUpdates.length - 1}
          />)}
        {recentUpdates && (
          <Map
            center={InitialValues.Position}
            zoom={zoom}
            zoomControl={false}
            onzoomend={setZoomLevel}
            className="map-container"
          >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={MAP_LAYER_URL}
          />
          <ZoomControl position="bottomright"/>
          {recentUpdates[selected].data.map(({ position, status }, index) => (
            <BikeStation key={`${index}-${status}`} position={position} status={status}/>
          ))}
        </Map>
        )}
      </Fragment>  
  );
};

export default MapView;
