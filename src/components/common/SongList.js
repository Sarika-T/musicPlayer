import React from "react";
import { Card, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";

export default function SongList(props){

    const {songs, onPlay, onFavourite, searchText,setSearchText, currentTab } = props;
    const currentSong = JSON.parse(sessionStorage.getItem("currentSong"));
    const isPlaying = sessionStorage.getItem("isPlaying") === "true";


    return (
        <div className="song-list">
            <h3 className="searchbar-text">{currentTab === 'favourites' ? 'Your Favourites' : currentTab === 'recent' ? 'Recently Payed' : 'For You'}</h3>
            <SearchBar setSearchText={setSearchText} searchText={searchText} />
            {songs.length >0 ? songs.map((song) => (
                <Card key={song.id} className="mb-3" onClick={() => onPlay(song)}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            <img src={song.thumbnail} alt="thumb" width="60" height="60" />
                            <div className="d-flex flex-column justify-content-center align-items-start">
                                <h6 className="mb-0">{song.title}</h6>
                                <small>{song.artistName}</small>
                            </div>
                        </div>
                        <div>
                            {currentSong && isPlaying && currentSong?.id === song.id ? <img src="https://media1.tenor.com/m/WOQ4NaiPiRwAAAAC/beats-art.gif" alt="Playing" className="wave-animation" /> : 
                            <span className="song-list-duration">{song.duration}</span>}
                        </div>
                    </Card.Body>
                </Card>
            )): (
            <div className="no-results-message">
                {currentTab === 'favourites' ?
                <p>No favourites found. Try adding some!</p> : currentTab === 'recent' ?
                <p>No recently played songs found. Try playing some!</p> :
                <p>No songs found. Try a different search.</p>}
            </div>)}
        </div>
    );
};
