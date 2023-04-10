import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./loginStyle.css"
import { useNavigate, Link } from 'react-router-dom';
import Axios from "axios";

const userSchema = yup.object({
    email: yup.string().required(" is required").matches(/\S+@\S+\.\S+/i, " - place a valid e-mail."),
    password: yup.string().required(" is required")
});

const LoginPage = () => {

    const navigate = useNavigate();

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema)
    });

    
    function onSubmit(data) {

        console.log("data");
        const toSend = {
            email: data.email,
            password: data.password
        }

        console.log(toSend);

        Axios.post("http://localhost:8080/login", JSON.stringify(toSend), { headers: {
            "Content-Type": "application/json"}
        }).then( res => {
            reset();
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/")
        }).catch(e => {
            console.log(e.message)
        });
    }

    return(
        <div id="login">
            <h1 className="title">Login</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" id="form__login" >Login</label>
                <span>{errors?.email?.message}</span>
                <input type="email" className="form-control" placeholder="e-mail" {...register("email")} />
                <label htmlFor="password" id="form__password">Password</label>
                <span>{errors?.password?.message}</span>
                <input type="password" className="form-control" {...register("password")} />
                <button className="btn btn-primary" id="submit-button__login" type="submit">Sign in</button>
            </form>
            <Link to={"/register"} className="link">Register</Link>
        </div>
    );
}

export default LoginPage;