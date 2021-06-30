import React, { Component } from 'react';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.message = props.message || 'Loading';
  }
  render() {
    return (
      <div className="loading-container">
        <div className="loading-circle"></div>
        <p className="loading-message">{this.message}</p>
      </div>
    );
  }
}

export default LoadingScreen;