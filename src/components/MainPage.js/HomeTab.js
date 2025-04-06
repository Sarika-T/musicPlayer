// pages/HomeTab.js
import React from "react";
import SongList from "../common/SongList";

export default function HomeTab (props) {
    const {songs, onPlay, onFavourite, searchText,setSearchText } = props;
    return (
        <SongList 
        songs={songs}   
        onPlay={onPlay}
        onFavourite={onFavourite}
        searchText={searchText}
        setSearchText={setSearchText} />
    );
};

