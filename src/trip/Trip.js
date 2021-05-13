import React from "react";
import "./Trip.css";
import TripList from "./TripList";

/* The container to hold tripList. */
function Trip() {
    return (
        <div className="trip mt-5 row">
            <div className="col-lg-8">
                <h1 className="text-center">My Trips List</h1>
                <div className="trip-list-box">
                    <TripList />
                </div>
            </div>
            <div className="trip-img-box col-lg-3">
                <img src="/plane.png" alt="" />
            </div>
        </div>
    );
}

export default Trip;
