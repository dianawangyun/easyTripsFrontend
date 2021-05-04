import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

function NavBar({ logout }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        const username = currentUser.username;
        const myTripsEndpoint = `/${username}/trips`;
        return (
            <>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item mx-2">
                        <NavLink className="nav-link" to="/newtrip">
                            New Trip
                        </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                        <NavLink className="nav-link" to={myTripsEndpoint}>
                            My Trips
                        </NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-2">
                        <NavLink className="nav-link" to="/Profile">
                            Profile
                        </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                        <Link className="nav-link" to="/" onClick={logout}>
                            Log Out
                        </Link>
                    </li>
                </ul>
            </>
        );
    }

    function visitorNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">
                        Signup
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-expand-md">
            <Link className="nav-bar-brand mr-4" to="/">
                <img
                    className="mr-2"
                    src="/icon.png"
                    width="40"
                    height="40"
                    alt="brand"
                />
                Easy Trips
            </Link>
            <button
                class="custom-toggler navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapseNavbar"
                aria-controls="CollapseNavbar"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
            >
                <span class="navbar-toggler-icon">
                    <img src="/hamburger2.png" width="30" height="30" alt="" />
                </span>
            </button>

            <div
                class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
                id="collapseNavbar"
            >
                {currentUser ? loggedInNav() : visitorNav()}
            </div>
        </nav>
    );
}

export default NavBar;
