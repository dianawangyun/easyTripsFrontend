import React, { useState, useContext } from "react";
import EditActivityForm from "./EditActivityForm";
import TripContext from "../trip/TripContext";
import "./ActivityCard.css";

/* based on the props passed in render ActivityCard. */
function ActivityCard({
    activityId,
    activityName,
    location,
    latitude,
    longitude,
    description,
    startTime,
    endTime,
    comment,
    deleteActivity,
    isEditing,
    setIsEditing,
}) {
    const { setSelectLocation } = useContext(TripContext);
    /* if isUpdating, would render EditActivityForm for this activity. */
    const [isUpdating, setIsUpdating] = useState(false);
    const [deleteErrors, setDeleteErrors] = useState([]);

    async function handleDelete() {
        if (window.confirm("Are you sure to delete?")) {
            let res = await deleteActivity(activityId);
            if (!res.success) {
                setDeleteErrors(res.errs);
            }
        }
    }

    /* the function to setSelectLocation of this activity and interact with map. */
    function handleLocate() {
        if (latitude && longitude) {
            setSelectLocation({
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
            });
        }
    }

    const ShowActivityComp = (
        <li key={activityId} className="ml-3 mb-2 text-left list-group-item">
            <h5 className="card-title">{activityName}</h5>
            {description ? (
                <div>
                    <strong>Description: </strong>
                    {description}
                </div>
            ) : null}
            <div>
                <strong>Location: </strong>
                {location}
            </div>
            {startTime ? (
                <div>
                    <strong>Start Time: </strong>
                    {startTime}
                </div>
            ) : null}
            {endTime ? (
                <div>
                    <strong>End Time: </strong>
                    {endTime}
                </div>
            ) : null}
            {comment ? (
                <div>
                    <strong>Comment: </strong>
                    {comment}
                </div>
            ) : null}

            {isEditing ? null : (
                <div className="operations text-right">
                    {latitude && longitude ? (
                        <span className="mr-3" onClick={handleLocate}>
                            <i className="fas fa-search-location"></i>
                        </span>
                    ) : null}

                    <span
                        className="mr-3"
                        onClick={() => {
                            setIsEditing(true);
                            setIsUpdating(true);
                        }}
                    >
                        <i className="fas fa-edit"></i>
                    </span>
                    <span onClick={handleDelete}>
                        <i className="fas fa-trash-alt"></i>
                    </span>
                </div>
            )}

            {deleteErrors.length ? (
                <ul>
                    {deleteErrors.map((e) => (
                        <li className="text-danger">{e}</li>
                    ))}
                </ul>
            ) : null}
        </li>
    );

    return (
        <>
            {isUpdating ? (
                <EditActivityForm
                    activityId={activityId}
                    activityName={activityName}
                    location={location}
                    latitude={latitude}
                    longitude={longitude}
                    description={description}
                    startTime={startTime}
                    endTime={endTime}
                    comment={comment}
                    setIsEditing={setIsEditing}
                    setIsUpdating={setIsUpdating}
                />
            ) : (
                ShowActivityComp
            )}
        </>
    );
}
export default ActivityCard;
