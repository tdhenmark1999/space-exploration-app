import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AstronomyPictureOfTheDay from './AstronomyPictureOfTheDay';
import MarsRoverPhotos from './MarsRoverPhotos';
import NearEarthObjects from './NearEarthObjects';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AstronomyPictureOfTheDay />} />
        <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
        <Route path="/near-earth-objects" element={<NearEarthObjects />} />
      </Routes>
    </div>
  );
}

export default App;
