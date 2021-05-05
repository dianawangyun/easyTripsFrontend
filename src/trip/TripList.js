import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import TripCard from "./TripCard";

function TripList({ isRecent = false }) {
    const { trips } = useContext(UserContext);
    if (!trips.length) return <p>No trip so far, let's make a plan.</p>;

    let showTrips = trips;

    if (isRecent) {
        showTrips = trips.slice(0, 3);
    }

    return (
        <div className="TripList col-md-8 offset-md-2">
            <div className="mt-3">
                {showTrips.map((t) => (
                    <TripCard
                        key={t.tripId}
                        tripId={t.tripId}
                        tripName={t.tripName}
                        startDate={t.startDate}
                        endDate={t.endDate}
                    />
                ))}
            </div>
        </div>
    );
}

export default TripList;
