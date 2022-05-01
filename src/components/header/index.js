import React from 'react';

function Header() {
  return (
    <div className="App-header">
      <div className="Banner">
        <a href="https://weatherinfos.herokuapp.com">
          <img src="/assets/images/logo.png" alt="weather info - Logo" />
        </a>
        <div className="Title">
          <h1>Weather Infos</h1>
          <h3>A real time Forecast weather services for the public </h3>
        </div>
      </div>
 
    </div>
  );
}

export default Header;


