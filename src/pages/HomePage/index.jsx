import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import Header from "../Header";
import Footer from "../Footer";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const HomePage = () => {
    return(
        <div>
            <Header></Header>
            <Link to={"/login"} className="link">Login</Link> <br/>
            <Link to={"/register"} className="link">Register</Link>
            <Footer></Footer>
        </div>
    );
}

export default HomePage;