import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Home.css";
import TripList from "../trip/TripList";

function Home() {
    /* if currentUser is null, renders visitor page. Otherwise, renders user page. */
    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    function goSignup() {
        history.push("/signup");
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
                    <p className="lead">Here is what this App can do:</p>
                    <div className="home-list">
                        <ul className="text-left mx-auto">
                            <li>Create your trip plans</li>
                            <li>Add activities for your trip</li>
                            <li>Markers on real map for easy reference</li>
                            <li>View your saved trips</li>
                        </ul>
                    </div>
                    <button
                        className="btn btn-outline-success btn-lg mt-3"
                        onClick={goSignup}
                    >
                        Sign Up
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
