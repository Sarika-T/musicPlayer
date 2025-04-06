
import { useEffect, useState } from 'react';
import Sidebar from '../common/Sidebar';
import './MainPage.scss';
import musicData from '../../utils/MockData';
import HomeTab from './HomeTab';
import FavouritesTab from './FavourtiesTab';
import RecentlyPlayedTab from './PlayedTab';
import PlayerBar from '../common/PlayerBar';
import TopTracks from './TopTracks';
import useResponsive from '../../assests/useResponsive';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";


export default function MainPage(props) {
    const {currentTab, setCurrentTab, setBgGradient, bgGradient} = props;
    const [searchText, setSearchText] = useState("");
    const [currentSong, setCurrentSong] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [songs] = useState(musicData);
    const [currentIndex, setCurrentIndex] = useState(musicData.findIndex(s => s.id === currentSong?.id) || 0);
    const smUp = useResponsive("up", "sm");
    const [favouriteMessage, setFavouriteMessage] = useState("");

    const navigate = useNavigate();


    const handlePlay = (song,index) => {
        setCurrentSong(song);
        const updated = [song, ...recentlyPlayed.filter(s => s.id !== song.id)].slice(0, 10);
        setRecentlyPlayed(updated);
        sessionStorage.setItem("recentlyPlayed", JSON.stringify(updated));
        const realIndex = index !== undefined ? index : songs.findIndex(s => s.id === song.id);
        setCurrentIndex(realIndex);
        sessionStorage.setItem("currentSong", JSON.stringify(song));
        sessionStorage.setItem("currentIndex", realIndex);
        if (!smUp) {
            localStorage.setItem("currentSong", JSON.stringify(song));
            navigate("/song");
        }
    };

    const handleFavourite = (song) => {
        const isAlreadyFavourite = favourites.find(s => s.id === song.id);
        let updated;
        if (isAlreadyFavourite) {
        updated = favourites.filter(s => s.id !== song.id);
        setFavouriteMessage("❌ Removed from favourites");
        } else {
        updated = [...favourites, song];
        setFavouriteMessage("✅ Added to favourites");
        }
        setFavourites(updated);
        localStorage.setItem("favourites", JSON.stringify(updated));
        setTimeout(() => setFavouriteMessage(""), 5000);
    };
  

    useEffect(() => {
        const fav = JSON.parse(localStorage.getItem("favourites")) || [];
        const recent = JSON.parse(sessionStorage.getItem("recentlyPlayed")) || [];
        setFavourites(fav);
        setRecentlyPlayed(recent);
        const storedSong = JSON.parse(sessionStorage.getItem("currentSong"));
        const storedIndex = parseInt(sessionStorage.getItem("currentIndex"), 10);

        if (storedSong) {
            setCurrentSong(storedSong);
            setCurrentIndex(storedIndex || 0);
        }
    }, []);

    const filteredSongs = musicData.filter((song) =>
        song.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredFavourites = favourites.filter((song) =>
        song.title.toLowerCase().includes(searchText.toLowerCase())
    );
      
    const filteredRecentlyPlayed = recentlyPlayed.filter((song) =>
        song.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (<AnimatePresence mode="wait">
        <motion.div>
        <div className="mainpage" style={{background: bgGradient}}>
        {smUp && <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} bgGradient={bgGradient} />}
        <div className="song-list-panel">
            {currentTab === "home" && (
            <HomeTab
                songs={filteredSongs}
                onPlay={handlePlay}
                onFavourite={handleFavourite}
                searchText={searchText}
                setSearchText={setSearchText}
            />
            )}
            {currentTab === "toptracks" && (
            <TopTracks />
            )}
            {currentTab === "favourites" && (
            <FavouritesTab favourites={filteredFavourites} onPlay={handlePlay} currentTab={currentTab} searchText={searchText}
            setSearchText={setSearchText} />
            )}
            {currentTab === "recent" && (
            <RecentlyPlayedTab recent={filteredRecentlyPlayed} onPlay={handlePlay} currentTab={currentTab} searchText={searchText}
            setSearchText={setSearchText} />
            )}
        </div>

        {smUp && <div className="player-panel">
            {currentSong ? 
            <PlayerBar 
            currentSong={currentSong} 
            filteredSongs={filteredSongs} 
            songs={songs}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex} 
            handlePlay={handlePlay}
            currentTab={currentTab} 
            setBgGradient={setBgGradient}
            bgGradient={bgGradient}
            favouriteMessage={favouriteMessage}
            handleFavourite={handleFavourite}/> : null
            // <p>Select a song</p>
            }
        </div>}
    </div>
    </motion.div>
    </AnimatePresence>
  );
}
