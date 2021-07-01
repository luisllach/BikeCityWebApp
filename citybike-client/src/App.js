import React, { Fragment } from 'react';
import MapView from './Views/Home/Map';
import Footer from './Views/Layout/Footer';

const App = () => {
  return (
    <Fragment>
      <MapView />
      <Footer />
    </Fragment>
  );
};

export default App;
