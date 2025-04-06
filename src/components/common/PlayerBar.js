import React, { useRef, useEffect, useState } from "react";
import { Button, Dropdown, ProgressBar } from "react-bootstrap";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  MoreHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ColorThief from "color-thief-browser";


export default function PlayerBar (props) {

    const {currentSong, filteredSongs, setCurrentIndex, currentIndex, handlePlay, handleFavourite, currentTab,setBgGradient, bgGradient, favouriteMessage} = props;
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [songs, setSongs] = useState(filteredSongs);
    const navigate = useNavigate();
 

    useEffect(() => {
        if (audioRef.current && currentSong) {
            const audio = audioRef.current;
            const storedTime = parseFloat(sessionStorage.getItem("currentTime") || "0");
            const wasPlaying = sessionStorage.getItem("isPlaying") === "true";
          
            audio.pause();
            audio.currentTime = storedTime;

            if (Math.abs(audio.currentTime - storedTime) > 0.5) {
            audio.currentTime = storedTime;
            }
            audio.volume = volume;
          
            if (wasPlaying) {
              audio.play()
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(err => {
                  console.warn("Autoplay blocked:", err.message);
                });
            }
          }
          
    }, [currentSong]);


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onLoadedMetadata = () => setDuration(audio.duration);
        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            sessionStorage.setItem("currentTime", audio.currentTime);
        };

        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("timeupdate", onTimeUpdate);

        return () => {
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("timeupdate", onTimeUpdate);
        };
    }, [currentSong]);


    useEffect(() => {
    if (currentSong?.thumbnail) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = currentSong.thumbnail;

        img.onload = () => {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        setBgGradient(`linear-gradient(to bottom, rgb(${color.join(',')}), #000000)`);
        };
    }
    }, [currentSong]);

    useEffect(() => {
        const playingStatus = sessionStorage.getItem("isPlaying") === "true";
        setIsPlaying(playingStatus);
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
        audioRef.current.pause();
        sessionStorage.setItem("isPlaying", "false");
        } else {
        audioRef.current.play();
        sessionStorage.setItem("isPlaying", "true");
        }
        setIsPlaying(!isPlaying);
    };
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;
      
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.volume = volume;
      
        const shouldPlay = sessionStorage.getItem("isPlaying") === "true";
      
        if (shouldPlay) {
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.warn("Autoplay blocked:", err.message));
        }
      }, [currentSong]);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSkipBack = () => {
        if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        handlePlay(songs[newIndex], newIndex);
        }
    };
  
    const handleSkipForward = () => {
        if (currentIndex < songs.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        handlePlay(songs[newIndex], newIndex);
        }
    };

    if (!currentSong) return null;


    return (
        currentSong ? (
            <div className="player-bar" style={{background: bgGradient}}>
                <div className="player-info">
                    <div className="player-info-text">
                        <h6 className="mb-0">{currentSong.title}</h6>
                        <small>{currentSong.artistName}</small>
                    </div>
                    <img className="player-info-image" src={currentSong.thumbnail} alt="thumb"  />
                    <div className="audio-slider-container">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={(e) => {
                            const seekTime = parseFloat(e.target.value);
                            audioRef.current.currentTime = seekTime;
                            setCurrentTime(seekTime);
                            }}
                            className="audio-slider"
                        />
                    </div>
                </div>
                <div className="player-controls-container">
                    <Dropdown align="end">
                        <Dropdown.Toggle as="div" className="custom-dropdown-toggle" >
                            <MoreHorizontal size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleFavourite(currentSong)}>{currentTab === 'favourites' ? 'Remove from Favourites': 'Add to Favourites'}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="player-controls">
                        <Button className="player-controls-button" variant="light" onClick={handleSkipBack} disabled={currentIndex === 0}>
                            <SkipBack size={20} />
                        </Button>
                        <Button className="player-controls-button" variant="light" onClick={togglePlay}>
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </Button>
                        <Button className="player-controls-button" variant="light" onClick={handleSkipForward} disabled={currentIndex === songs.length - 1}>
                            <SkipForward size={20} />
                        </Button>
                    </div>
                    <div className="player-right">
                        <div className="volume-container">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                            />
                            <Volume2 size={18} />
                        </div>
                    </div>
                </div>
                {favouriteMessage && (
                    <div className="favourite-toast">
                        {favouriteMessage}
                    </div>
                )}
                <audio ref={audioRef} src={currentSong.musicUrl} preload="auto" />
            </div>
        ) : null
    )
};

