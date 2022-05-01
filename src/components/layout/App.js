import React from 'react';

import Header from '../header';
import Body from '../body';
import { Footer } from '../footer';
import SmallCloud from "images/small-cloud"
import BigCloud from "images/big-cloud"

function App() {
  return (
    <div className="App">
      <SmallCloud/>
      <BigCloud/>
      <div className="app-container">
          <Header/>
          <Body/>
          <Footer/>
      </div>
    </div>
  );
}

export default App;


