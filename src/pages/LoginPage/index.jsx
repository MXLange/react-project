import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./loginStyle.css"
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const LoginPage = () => {
    return(
        <div id="login">
            <h1 className="title">Login</h1>
            <form className="form">
                <label htmlFor="email" id="form__login" >Login</label>
                <input type="email" className="form-control" placeholder="e-mail" />
                <label htmlFor="password" id="form__password">Password</label>
                <input type="password" className="form-control" />
            </form>
            <button className="btn btn-primary" id="submit-button" type="submit">Sign in</button>
            <Link to={"/register"} className="link">Register</Link>
        </div>
    );
}

export default LoginPage;