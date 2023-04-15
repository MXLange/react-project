
import React from "react";
import "./appsStyle.css";
import { Link, useNavigate } from "react-router-dom";

const Apps = () => {


    const navigate = useNavigate();

    function teste() {
        navigate("/to-do-list");
    }

    return(
        <div id="tasks">
            <h1>Apps:</h1>
            <div onClick={teste}>
                <p id="task-p1">TO DO LIST</p>
                <p id="task-p2">App to create a list of tasks.</p>
            </div>
            <div>
                <p id="task-p1">COMMING SOON</p>
                <p id="task-p2">...</p>
            </div>
        </div>
    );
}

export default Apps;