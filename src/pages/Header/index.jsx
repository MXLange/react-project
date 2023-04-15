import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./headerStyle.css"
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';

const Header = () => {


    const navigate = useNavigate();
    const [logoutIn, setLogoutIn] = useState("Login");

    function logout() {
        if(localStorage.getItem("user")) {
            localStorage.clear();
            setLogoutIn("Login")
        } else {
            if(localStorage.getItem("user"))
                setLogoutIn("Logout");
            return navigate("/login");
        }
    }

    return(
        <header>
            <div id="header-content">
                <div className="header-name">
                    <h1>Murillo Lange</h1>
                    <p>Full-Stack Developer</p>
                </div>
                <div className="header-link">
                    <ul>
                        <Link to={"/"} >Home  </Link>
                        <Link to={"/apps"} >App</Link>
                    </ul>
                </div>
                <div className="header-button">
                    <button type="button" onClick={logout}>{logoutIn}</button>
                </div>
            </div>
        </header>
    );
}

export default Header;