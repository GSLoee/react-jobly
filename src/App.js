import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './routes/auth/UserContext';
import RoutesList from './routes/nav/Routes';
import JoblyApi from './api/api';
import {jwtDecode} from "jwt-decode";
import NavBar from './routes/nav/NavBar';
import './App.css'

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jobly-token"));

    useEffect(() => {
        async function loadUserInfo() {
            if (token) {
                try {
                    JoblyApi.token = token;
                    const { username } = jwtDecode(token);
                    const user = await JoblyApi.getCurrentUser(username);
                    console.log('-------------------------')
                    console.log(user)
                    console.log('=============================')
                    setCurrentUser(user);
                } catch (err) {
                    console.error("Error loading user info:", err);
                    setCurrentUser(null);
                }
            }
        }
        loadUserInfo();
    }, [token]);

    const login = async (loginData) => {
        try {
            const token = await JoblyApi.login(loginData);
            setToken(token);
            localStorage.setItem("jobly-token", token);
            const { username } = jwtDecode(token);
            const user = await JoblyApi.getCurrentUser(username);
            setCurrentUser(user);
            return { success: true };
        } catch (errors) {
            console.error("Login failed:", errors);
            return { success: false, errors };
        }
    };

    const signup = async (signupData) => {
        try {
            const token = await JoblyApi.signup(signupData);
            setToken(token);
            localStorage.setItem("jobly-token", token);
            const { username } = jwtDecode(token);
            const user = await JoblyApi.getCurrentUser(username);
            setCurrentUser(user);
            return { success: true };
        } catch (errors) {
            console.error("Signup failed:", errors);
            return { success: false, errors };
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem("jobly-token");
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
            <BrowserRouter>
                <NavBar logout={logout} />
                <RoutesList login={login} signup={signup} />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
