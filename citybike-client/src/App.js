import React, { Component, Fragment } from 'react';
import MapView from './Views/Home/Map';
import Footer from './Views/Layout/Footer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <MapView />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
