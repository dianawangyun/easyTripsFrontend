import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import { useHistory, useParams } from "react-router-dom";
import EasyTripsApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import AddActivityForm from "../activity/AddActivityForm";
import Map from "../map/Map";
import ActivityList from "../activity/ActivityList";
import TripContext from "../trip/TripContext";
import EditTripForm from "./EditTripForm";

import "./TripDetail.css";

/* A component containing an activity List and a map. */
function TripDetail() {
    const history = useHistory();
    const { currentUser, setTrips } = useContext(UserContext);
    const { tripid } = useParams();

    const [trip, setTrip] = useState(null);
    /* the boolean to control whether showing the trip information or EditTripForm. */
    const [isEditTrip, setIsEditTrip] = useState(false);
    /* the boolean to control whether showing the AddActivityForm. */
    const [isAdding, setIsAdding] = useState(false);
    const [selectLocation, setSelectLocation] = useState(null);

    /* set the trip (and activity) information */
    useEffect(
        function getActivitiesForTrip() {
            async function getActivities() {
                setTrip(await EasyTripsApi.getTrip(currentUser.userId, tripid));
            }
            getActivities();
        },
        [currentUser.userId, tripid, isAdding]
    );

    async function editTrip(tripData) {
        try {
            await EasyTripsApi.updateTrip(
                currentUser.username,
                tripid,
                tripData
            );
            setIsEditTrip(false);
            setTrip(await EasyTripsApi.getTrip(currentUser.userId, tripid));
            let currUser = await EasyTripsApi.getCurrentUser(
                currentUser.username
            );
            setTrips(currUser.trips);
            return { success: true };
        } catch (errs) {
            return { success: false, errs };
        }
    }

    async function addActivity(activityData) {
        try {
            await EasyTripsApi.addActivity(
                currentUser.username,
                tripid,
                activityData
            );
            setIsAdding(false);
            setSelectLocation(null);
            setTrip(await EasyTripsApi.getTrip(currentUser.userId, tripid));
            return { success: true };
        } catch (errs) {
            return { success: false, errs };
        }
    }

    async function editActivity(activityId, updateData) {
        try {
            await EasyTripsApi.updateActivity(
                currentUser.username,
                activityId,
                updateData
            );
            setTrip(await EasyTripsApi.getTrip(currentUser.userId, tripid));
            setSelectLocation(null);
            return { success: true };
        } catch (errs) {
            return { success: false, errs };
        }
    }

    async function deleteActivity(activityId) {
        try {
            await EasyTripsApi.deleteActivity(currentUser.username, activityId);
            setTrip(await EasyTripsApi.getTrip(currentUser.userId, tripid));
            return { success: true };
        } catch (errs) {
            return { success: false, errs };
        }
    }

    async function deleteTrip() {
        if (window.confirm("Are you sure to delete?")) {
            try {
                await EasyTripsApi.deleteTrip(currentUser.username, tripid);
                let currUser = await EasyTripsApi.getCurrentUser(
                    currentUser.username
                );
                setTrips(currUser.trips);
                history.push("/");
            } catch (errs) {
                console.log(errs);
            }
        }
    }

    if (!trip)
        return (
            <div className="container d-flex justify-content-center mt-5">
                <LoadingSpinner />
            </div>
        );

    return (
        <TripContext.Provider
            value={{ selectLocation, setSelectLocation, editActivity }}
        >
            <div className="trip-container">
                <div className="d-lg-flex flex-lg-row">
                    <div className="col-lg-5 mt-3 trip-detail text-center">
                        {isEditTrip ? (
                            <EditTripForm
                                trip={trip}
                                editTrip={editTrip}
                                setIsEditTrip={setIsEditTrip}
                            />
                        ) : (
                            <div className="trip-info">
                                <span
                                    className="trip-edit-btn"
                                    onClick={() => {
                                        setIsEditTrip(true);
                                    }}
                                >
                                    <i className="fas fa-edit"></i>
                                </span>
                                <h1>{trip.tripName}</h1>
                                <div className="lead">
                                    Start Date: {trip.startDate}
                                </div>
                                <div className="lead">
                                    End Date: {trip.endDate}
                                </div>
                                <hr className="ml-3" />
                                {isAdding ? (
                                    <AddActivityForm
                                        tripId={tripid}
                                        setIsAdding={setIsAdding}
                                        addActivity={addActivity}
                                        setSelectLocation={setSelectLocation}
                                    />
                                ) : (
                                    <button
                                        className="btn btn-success mb-3"
                                        onClick={() => setIsAdding(true)}
                                    >
                                        + Add Activity
                                    </button>
                                )}
                            </div>
                        )}

                        <ActivityList
                            trip={trip}
                            deleteActivity={deleteActivity}
                        />
                        <hr className="ml-3" />
                        <div className="mt-3">
                            <button
                                className="btn btn-outline-danger mb-4"
                                onClick={deleteTrip}
                            >
                                Delete This Trip
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-7 mt-1 px-0 ml-lg-0">
                        <Map selectLocation={selectLocation} trip={trip} />
                    </div>
                </div>
            </div>
        </TripContext.Provider>
    );
}

export default TripDetail;
