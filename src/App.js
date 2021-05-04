import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import EasyTripsApi from "./api/api";

export const TOKEN_STORAGE_ID = "easy-trips-token";

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    useEffect(
        function loadUserInfo() {
            async function getCurrentUser() {
                if (token) {
                    try {
                        let { username } = jwt.decode(token);
                        EasyTripsApi.token = token;
                        let currUser = await EasyTripsApi.getCurrentUser(
                            username
                        );
                        setCurrentUser(currUser);
                    } catch (e) {
                        setCurrentUser(null);
                    }
                }
                setInfoLoaded(true);
            }
            setInfoLoaded(false);
            getCurrentUser();
        },
        [token]
    );

    function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    async function login(loginData) {
        try {
            let token = await EasyTripsApi.login(loginData);
            setToken(token);
            return { success: true };
        } catch (errs) {
            return { success: false, errs };
        }
    }

    async function signup(signupData) {
        try {
            let token = await EasyTripsApi.signup(signupData);
            setToken(token);
            return { success: true };
        } catch (errs) {
            return { success: false, errs };
        }
    }

    async function addTrip(tripData) {
        try {
            await EasyTripsApi.addTrip(currentUser.username, tripData);
            let currUser = await EasyTripsApi.getCurrentUser(
                currentUser.username
            );
            setCurrentUser(currUser);
            return { success: true };
        } catch (errs) {
            return { success: false, errs };
        }
    }

    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                <div className="App">
                    <NavBar logout={logout} />
                    <Routes addTrip={addTrip} login={login} signup={signup} />
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
