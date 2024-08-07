import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmail } from "../Store/Provider";
import { CreateDBSpace, generateToken } from "./Constants/Functions/function";

const Login = () => {
    const { email, setEmail } = useEmail();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (password === "Admin@123") {
            navigate("/dashboard");
            sessionStorage.setItem("token",generateToken(email))
            CreateDBSpace(email)
        } else {
            alert("Invalid email or password");
        }

    };


    const handleKeyDown = (e:any) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    return (
        <div className="flex justify-center m-20 animate-fade">
            <div className="login-container justify-center">
                <div className="flex justify-center">
                    <img
                        src="https://companieslogo.com/img/orig/RWS.L-f2a2bc55.png?t=1720244493"
                        alt="logo"
                    />
                </div>
                <h1>Sign in to System</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="apple-id"
                            placeholder=" "
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <label htmlFor="id">Email ID</label>
                        <button type="button" className="arrow-button" onClick={handleSubmit}>
                            &#x2192;
                        </button>
                    </div>
                    <div className="form-group" id="password-group">
                        <input
                            type="password"
                            id="password"
                            placeholder=" "
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <label>Password</label>
                    </div>
                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>
                <a href="/" className="forgot-password">
                    Forgot ID or password?
                </a>
            </div>
        </div>
    );
};

export default Login;
