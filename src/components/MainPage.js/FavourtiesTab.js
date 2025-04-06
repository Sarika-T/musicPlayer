import React from "react";
import SongList from "../common/SongList";


export default function FavouritesTab (props) {
  const {favourites, onPlay, currentTab,searchText,setSearchText} = props;
  return (
    <SongList 
      songs={favourites} 
      onPlay={onPlay} 
      currentTab={currentTab}
      searchText={searchText}
      setSearchText={setSearchText} 
      onFavourite={() => {}} />
  );
};


