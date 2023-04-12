import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React from "react";
import Axios from "axios";
import LoginPage from "../LoginPage";
import { Route, useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./registerStyle.css"
import { queryByTestId } from "@testing-library/react";

    const userSchema = yup.object({
        name: yup.string().required(" is required").min(3," must have at least 3 characteres."),
        lastName: yup.string().required(" is required").min(3," must have at least 3 characteres."),
        email: yup.string().required(" is required").matches(/\S+@\S+\.\S+/i, " - place a valid e-mail."),
        password: yup.string().required(" is required")
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i, " is invalid."),
        confirmPassword: yup.string().required(" is required")
    });

const RegisterPage = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema)
    });
    

    function postForm(data) {

        const toSend = {
            fullName: data.name + " " + data.lastName,
            email: data.email,
            password: data.password
        }

        reset();
        
        // alert("Sent req");
        // return navigate("/login");
        Axios.post("http://localhost:8080/register", JSON.stringify(toSend), { headers: {
            "Content-Type": "application/json"}
        }).then( res => {
            if(res.data === "New user registered") {
                alert("Confirm your email and Sign in!");
                return navigate("/login");
            } else if(res.data === "User already exists") {
                reset();
                alert("User already exists, try to Sign in or try a diferent e-mail!");
            }
        }).catch(e => {
            console.log(e.message)
        });
    }

    const onSubmit = (data) => {
        if(data.password != data.confirmPassword) {
            setMessage(" (Password doesn't match)");
            return;
        } else {
            setMessage("");
        }
        postForm(data);
    }

    return(
        <div id="register">
            <h1 className="title">Register Here</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div id="name">
                    <label htmlFor="username" id="form__name" >Name</label>
                    <span className="error">{errors?.name?.message}</span>
                    <input type="text" className="form-control" {...register("name")}/>
                </div>
                <div id="lastName">
                    <label htmlFor="username" id="form__name" >Last Name</label>
                    <span className="error">{errors?.lastName?.message}</span>
                    <input type="text" className="form-control" {...register("lastName")} />
                </div>
                <div id="email">
                    <label htmlFor="email" id="form__login" >Email</label>
                    <span className="error">{errors?.email?.message}</span>
                    <input type="email" className="form-control" {...register("email")}/>
                </div>
                <div id="password">
                    <label htmlFor="password" id="form__password">Password</label>
                    <span className="error">{errors?.password?.message}</span>
                    <span id="password-span" className="error">{message}</span>
                    <input id="password" type="password" className="form-control" {...register("password")}/>
                </div>
                <div id="confirmPassword">
                    <input id="confirmPassword" type="password" className="form-control" placeholder="Confirm your password" {...register("confirmPassword")} />
                    <p className="password-policy">"Your password must have at least 8 characteres, one digit, one uppercase letter, one lowercase letter, one special character(@$!%*#?&)"</p>
                </div>
                <button id="register-button">Register</button>
            </form>
            <Link to={"/login"} className="link">Login</Link>
        </div>
    );
}

export default RegisterPage;