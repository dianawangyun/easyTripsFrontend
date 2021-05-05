import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import { useParams } from "react-router-dom";
import EasyTripsApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import AddActivityForm from "../activity/AddActivityForm";
import Map from "../map/Map";
import "./TripDetail.css";

function TripDetail() {
    const { currentUser } = useContext(UserContext);
    const { tripid } = useParams();

    const [trip, setTrip] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(
        function getActivitiesForTrip() {
            async function getActivities() {
                setTrip(await EasyTripsApi.getTrip(currentUser.userId, tripid));
            }
            getActivities();
        },
        [currentUser.userId, tripid]
    );
    console.log(trip);
    if (!trip) return <LoadingSpinner />;

    // let addActivityEndpoint = `/activity/${currentUser.username}/${tripid}`;

    return (
        <div className="trip-container">
            <div className="row">
                <div className="col-lg-5 mt-3 trip-detail text-center">
                    <div className="ml-3">
                        <h2>{trip.tripName}</h2>
                        <div>Start Date: {trip.startDate}</div>
                        <div>End Date: {trip.endDate}</div>
                        {isAdding ? (
                            <AddActivityForm
                                tripId={tripid}
                                setIsAdding={setIsAdding}
                            />
                        ) : (
                            <button
                                className="btn btn-success"
                                onClick={() => setIsAdding(true)}
                            >
                                + Add Activity
                                {/* <Link to={addActivityEndpoint}>+ Add Activity</Link> */}
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-lg-7 mt-1">
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default TripDetail;
