import React from "react";
import { Nav } from "react-bootstrap";
import { House, Heart, Clock } from "lucide-react";
import "./common.scss";

export default function Sidebar (props) {
    const {currentTab, setCurrentTab, bgGradient } = props;

    return (
        <div className="sidebar" style={{ background: bgGradient }}>
            <div className="sidebar-logo">
                <img alt="Logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE0AScSsM0sCBm9htVa07RiriDqZY219pTpw&s"/>
                <h3 className="sidebar-logo-title">Spotify</h3>
            </div>
            <Nav className="flex-column nav-links">
                <Nav.Link
                onClick={() => setCurrentTab("home")}
                active={currentTab === "home"}
                >
                    <House size={20} className="icon" /> For You
                </Nav.Link>

                <Nav.Link
                onClick={() => setCurrentTab("toptracks")}
                active={currentTab === "toptracks"}
                >
                    <House size={20} className="icon" /> Top Tracks
                </Nav.Link>

                <Nav.Link
                onClick={() => setCurrentTab("favourites")}
                active={currentTab === "favourites"}
                >
                    <Heart size={20} className="icon" /> Favourites
                </Nav.Link>

                <Nav.Link
                onClick={() => setCurrentTab("recent")}
                active={currentTab === "recent"}
                >
                    <Clock size={20} className="icon" /> Recently Played
                </Nav.Link>
            </Nav>
        </div>
    );
};
