import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
// import Map from "../map/Map"
import "./Home.css";

function Home() {
    const { currentUser, trips } = useContext(UserContext);
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
                            <li>Build your trip plans</li>
                            <li>Create activities for your trip</li>
                            <li>Mark on the map for easy reference</li>
                            <li>View your saved trips</li>
                        </ul>
                    </div>
                    <button
                        className="btn btn-outline-success btn-lg"
                        onClick={goSignup}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }
    function loggedInHome() {
        let newTripEndpoint = `/newtrip`;
        return (
            <div className="container">
                <h2 className="text-center my-4">
                    Welcome back, {currentUser.username}!
                </h2>
                <div className="text-center mt-5">
                    <div className="btn btn-add">
                        <Link to={newTripEndpoint}>+ Plan New Trip</Link>
                    </div>
                    <div className="trip-list mt-5">
                        <h3>My Trips</h3>
                    </div>
                </div>
            </div>
        );
    }

    return <div>{currentUser ? loggedInHome() : visitorHome()}</div>;
}

export default Home;
