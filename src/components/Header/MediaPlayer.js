import React, { useEffect, useRef, useState } from "react";
import PlayerBar from "../common/PlayerBar";
import musicData from "../../utils/MockData";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../../assests/icon";

const PlayerScreen = (props) => {
    const {setBgGradient, bgGradient} = props;
    const [song, setSong] = useState(null);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const storedSong = JSON.parse(sessionStorage.getItem("currentSong"));
        const storedIndex = parseInt(sessionStorage.getItem("currentIndex"), 10);

        if (storedSong) {
        setSong(storedSong);
        setIndex(storedIndex || 0);
        }
    }, []);

  return (
    <div className="fullscreen-player" style={{ background: bgGradient }}>
        <button className="button-player" onClick={() => navigate("/")}><ArrowBack /></button>
        {song ? (
        <PlayerBar
          currentSong={song}
          filteredSongs={musicData}
          songs={musicData}
          currentIndex={index}
          setCurrentIndex={setIndex}
          autoPlay={true}
          setBgGradient={setBgGradient}
          bgGradient={bgGradient}
          handlePlay={(s, i) => {  
            sessionStorage.setItem("currentSong", JSON.stringify(s));
            sessionStorage.setItem("currentIndex", i);
            setSong(s); 
            setIndex(i);
          }}
          handleFavourite={(s) => { 
            let fav = JSON.parse(localStorage.getItem("favourites")) || [];
            const isFav = fav.find(item => item.id === s.id);
            if (isFav) {
              fav = fav.filter(item => item.id !== s.id);
            } else {
              fav.push(s); 
            } 
            localStorage.setItem("favourites", JSON.stringify(fav));
          }} 
        />
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
};

export default PlayerScreen;

