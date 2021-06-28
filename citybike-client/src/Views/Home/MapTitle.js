import React, { Component } from 'react';

class MapTitle extends Component {
  render() {
    return (
      <div className="map-title-container">
        <h1 className="map-title">
          City Bikes in Miami
        </h1>
        <p className="author">
          by <a href="https://github.com/luisllach" rel="noopener noreferrer" target="_blank">luisllach</a>
        </p>
      </div>
      
    );
  }
}

export default MapTitle;
