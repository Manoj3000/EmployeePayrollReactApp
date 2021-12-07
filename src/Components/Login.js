import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import PropTypes from 'prop-types';


function Login({ setLoginToken }) {

    const [usernameField, setUsernameField] = useState("")
    const [passwordField, setPasswordField] = useState("")

    const loginHandler = e => {
        e.preventDefault();

        axios.get('http://localhost:8085/login', {
            headers: {
                'username': usernameField,
                'password': passwordField
            }
        })
            .then((res) => {
                sessionStorage.setItem("loginToken", res.data.token);
                setLoginToken(res.data.token)
                toast.success('Login Successfully!');
            })
            .catch(err => {
                toast.error("Something Went Wrong!")
                console.log(err);
            })
    }
    
    return (
        <div className="login_box">
            <h2>LOGIN</h2>
            <hr />
            <form onSubmit={(e) => loginHandler(e)} autoComplete="off">
                <div className="input_box">
                    <label htmlFor="username">Username : </label>
                    <input type="text" name="username" id="username" className="input" value={usernameField} onChange={(e) => setUsernameField(e.target.value)} required />
                </div>
                <div className="input_box">
                    <label htmlFor="password">Password : </label>
                    <input type="password" name="password" id="password" className="input" value={passwordField} onChange={(e) => setPasswordField(e.target.value)} required />
                </div>
                <div>
                    <input type="submit" value="Login" className="login_btn" />
                </div>
            </form>
        </div>
    );
}

export default Login;