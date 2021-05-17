import React, { useState } from "react";
import ActivityCard from "./ActivityCard";
import LoadingSpinner from "../common/LoadingSpinner";

/* map activities and render ActivityCard. */
function ActivityList({ trip, deleteActivity }) {
    /* If isEditing, then operations buttons would hide. */
    const [isEditing, setIsEditing] = useState(false);

    if (!trip) return <LoadingSpinner />;

    return (
        <div>
            {trip.activities.length ? (
                <ul className="list-group">
                    {trip.activities.map((a) => (
                        <ActivityCard
                            key={a.activityId}
                            activityId={a.activityId}
                            activityName={a.activityName}
                            description={a.description}
                            location={a.location}
                            latitude={a.latitude}
                            longitude={a.longitude}
                            startTime={a.startTime}
                            endTime={a.endTime}
                            comment={a.comment}
                            deleteActivity={deleteActivity}
                            setIsEditing={setIsEditing}
                            isEditing={isEditing}
                        />
                    ))}
                </ul>
            ) : (
                <p className="lead">
                    No Activities in this trip. Let's Add some!
                </p>
            )}
        </div>
    );
}
export default ActivityList;
