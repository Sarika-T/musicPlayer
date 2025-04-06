import React from "react";
import SongList from "../common/SongList";

export default function RecentlyPlayedTab (props) {
    const {recent, onPlay, searchText, setSearchText} = props;
    return (
        <SongList 
        songs={recent} 
        onPlay={onPlay}
        searchText={searchText}
        setSearchText={setSearchText}  
        onFavourite={() => {}} />
    );
};
