
import React from "react";
import "./appsStyle.css";
import { Link, useNavigate } from "react-router-dom";

const Apps = () => {


    const navigate = useNavigate();

    function toDoList() {
        navigate("/to-do-list");
    }

    function interestCalc() {
        navigate("/interest-calc");
    }

    return(
        <div id="tasks">
            <h1>Apps:</h1>
            <div onClick={toDoList}>
                <p className="task-p1">TO DO LIST</p>
                <p className="task-p2">App to create a list of tasks.</p>
            </div>
            <div onClick={interestCalc}>
                <p className="task-p1" id="interest-calc">INTEREST CALCULATOR</p>
                <p className="task-p2" id="interest-calc-detail">Calculate your investments profitability</p>
            </div>
            <div>
                <p className="task-p1">COMMING SOON</p>
                <p className="task-p2">...</p>
            </div>
        </div>
    );
}

export default Apps;