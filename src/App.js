import React, { useState, useEffect } from 'react';
import Home from './containers/Home';
import NavBar from './components/NavBar';

export function App() {
  return (
    <div className="w-screen pb-32">
      <NavBar />
      <div className="max-w-lg flex mx-auto">
        <Home />
      </div>
    </div>
  );
}
