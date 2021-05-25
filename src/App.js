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

/* store the token in local storage for api calls */
export const TOKEN_STORAGE_ID = "easy-trips-token";

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [trips, setTrips] = useState([]);
    const [currLocation, setCurrLocation] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    /* based on whether logged in, call this function to get and set information */
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
                        setTrips(currUser.trips);
                    } catch (e) {
                        setCurrentUser(null);
                    }
                }
                setInfoLoaded(true);
            }
            setInfoLoaded(false);
            getCurrentUser();
            /* set user current location */
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    let { latitude, longitude } = pos.coords;
                    setCurrLocation({ lat: latitude, lng: longitude });
                });
            }
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
            setTrips(currUser.trips);
            return { success: true };
        } catch (errs) {
            return { success: false, errs };
        }
    }

    if (!infoLoaded)
        return (
            <div className="container d-flex justify-content-center mt-5">
                <LoadingSpinner />
            </div>
        );

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{
                    currentUser,
                    setCurrentUser,
                    currLocation,
                    trips,
                    setTrips,
                }}
            >
                <div className="App">
                    <NavBar logout={logout} />
                    <Routes addTrip={addTrip} login={login} signup={signup} />
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
