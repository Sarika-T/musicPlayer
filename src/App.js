import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import MainPage from './components/MainPage.js/MainPage';
import useResponsive from './assests/useResponsive';
import MobileMainPage from './components/Header/MobileMainPage';
import PlayerBar from './components/common/PlayerBar';
import PlayerScreen from './components/Header/MediaPlayer';


function App() {
  const smUp = useResponsive("up", "sm");
  const [currentTab, setCurrentTab] = useState("home");
  const [bgGradient, setBgGradient] = useState('linear-gradient(to bottom, #000000, #222222)')
  
  
  return (
    <HashRouter>
    <div className='App'>
      <Routes>
      {smUp ? (
        <Route path= "/" element = {<MainPage currentTab={currentTab} setCurrentTab={setCurrentTab} setBgGradient={setBgGradient} bgGradient={bgGradient}/>} />
        ) : (
        <><Route path="/" element={<MobileMainPage currentTab={currentTab} setCurrentTab={setCurrentTab} setBgGradient={setBgGradient} bgGradient={bgGradient}/>} />
        <Route path="/song" element={<PlayerScreen setBgGradient={setBgGradient} bgGradient={bgGradient} />} />
        </>
        )
      }
      </Routes>
    </div>
    </HashRouter>
  );
}
export default App;