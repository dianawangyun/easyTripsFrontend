import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Home.css";
import TripList from "../trip/TripList";

function Home({ login }) {
    /* if currentUser is null, renders visitor page. Otherwise, renders user page. */
    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    function goSignup() {
        history.push("/signup");
    }

    async function handleGuest(e) {
        e.preventDefault();
        const userData = { username: "Guest", password: "123456" };
        debugger;
        let res = await login(userData);
        if (res.success) {
            history.push("/home");
        } else {
            console.log(res.errs);
        }
    }

    function visitorHome() {
        return (
            <div className="home pt-5">
                <div className="jumbotron text-center">
                    <h1 className="display-5">Welcome, Visitor!</h1>
                    <p className="lead mt-3">
                        This website is designed for planning your trips
                        conveniently.
                    </p>
                    <hr className="my-4" />
                    <p className="lead font-weight-bold text-success">
                        Here is what this App can do:
                    </p>
                    <div className="home-list">
                        <ul className="text-left mx-auto">
                            <li>
                                <i className="far fa-clipboard mr-2"></i>Create
                                your trip plans
                            </li>
                            <li>
                                <i className="fab fa-telegram-plane mr-2"></i>
                                Add activities to your trip
                            </li>
                            <li>
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                Markers on real map for easy reference
                            </li>
                            <li>
                                <i className="fas fa-book mr-2"></i>View your
                                saved trips
                            </li>
                        </ul>
                    </div>
                    <button
                        className="btn btn-success btn-lg mt-3 mr-5"
                        onClick={goSignup}
                    >
                        Sign Up
                    </button>
                    <button
                        className="btn btn-outline-primary btn-lg mt-3"
                        onClick={handleGuest}
                    >
                        Try As Guest
                    </button>
                </div>
            </div>
        );
    }
    function loggedInHome() {
        return (
            <div className="container">
                <h2 className="text-center my-4">
                    Welcome back, {currentUser.username}!
                </h2>
                <div className="text-center mt-5">
                    <div className="btn btn-add">
                        <Link to="/newtrip">+ Plan New Trip</Link>
                    </div>
                    <div className="trip-list my-5">
                        <h3>My Latest Trips</h3>
                        <TripList isRecent="true" />
                    </div>
                </div>
            </div>
        );
    }

    return <div>{currentUser ? loggedInHome() : visitorHome()}</div>;
}

export default Home;
