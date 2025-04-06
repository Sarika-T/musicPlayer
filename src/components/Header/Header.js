import { useState } from "react";
import { MenuIcon } from "../../assests/icon";
import TemporaryDrawer from "../common/Drawer";
import './Header.scss';


export default function Header(props){

    const {currentTab, setCurrentTab, bgGradient} = props;

    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };
    return(
        <div className="header" style={{ background: bgGradient }}>
            <div className="header-page">
                <div className="header-page-left" >
                    <span onClick={handleOpen}><MenuIcon  /></span>
                    <TemporaryDrawer open={open} setOpen={setOpen} currentTab={currentTab} setCurrentTab={setCurrentTab} bgGradient={bgGradient} />
                </div>
                <div className="header-page-right">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE0AScSsM0sCBm9htVa07RiriDqZY219pTpw&s" alt="logo"/>
                    <h1 className="header-page-right-text">Spotify</h1>
                </div>
            </div>
        </div>
    )
}