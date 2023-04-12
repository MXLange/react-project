import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./homeStyle.css"
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const HomePage = () => {
    return(
        <div id="home">
            <div className="first">
                <h2><span>Murillo</span> Lange</h2>
                <p className="description">Hi, nice to meet you.</p> <br />
                <p className="description">Here is my page created with React.js, this page was made to show my capabilities as Full-Stack Developer, and will be integrated with a Java API available <a href="https://github.com/MXLange/API-Java" target="__blank">Here</a>. </p>
                <p className="description">In the app section at the top of the page you will find some cool tools I developed, you can use all them for free and if you want to save data for further use just simply register yourself and sign in (Comming soon).</p>
            </div>
            <div className="second">
                <h2>Stack</h2>
                <p className="description">Java - SpringBoot, Maven, Hibernate, JPA, JDBC</p> <br />
                <p className="description">Front-end - React.js, JavaScript, HTML, CSS, Angular</p> <br />
                <p className="description">Database – MySQL, PostgreSQL, H2</p> <br />
                <p className="description">Version Control - Git, GitHub</p> <br />
                <p className="description">API Rest, CRUD</p> <br />

            </div>
        </div>
    );
}

export default HomePage;