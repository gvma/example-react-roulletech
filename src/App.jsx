import React, { useState } from 'react';

import Home from './components/Home';

import './css/App.css';
import './assets/fonts/fonts.css';

function App() {
  return (
    <div className='main-container'>
      <div className="first-group">
        <Home/>
      </div>
    </div>
  );
}

export default App;
