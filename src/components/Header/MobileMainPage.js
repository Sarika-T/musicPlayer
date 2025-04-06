import { useEffect, useState } from "react";
import MainPage from "../MainPage.js/MainPage";
import Header from "./Header";



export default function MobileMainPage(props) {
    const {currentTab, setCurrentTab, setBgGradient, bgGradient} = props;
    const [song, setSong] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const storedSong = JSON.parse(sessionStorage.getItem("currentSong"));
        const storedIndex = parseInt(sessionStorage.getItem("currentIndex"), 10);
        if (storedSong) {
        setSong(storedSong);
        setIndex(storedIndex || 0);
        }
    }, []);

    return(
        <div className="mobilemain">
            <div className="mobilemain-content">
                <div className="mobilemain-content-header">
                    <Header currentTab={currentTab} setCurrentTab={setCurrentTab} bgGradient={bgGradient}/>
                </div>
                <div className="mobilemain-content-body">
                    <MainPage currentTab={currentTab} setCurrentTab={setCurrentTab} setBgGradient={setBgGradient} bgGradient={bgGradient}/>
                </div>
            </div>
        </div>
    )
}