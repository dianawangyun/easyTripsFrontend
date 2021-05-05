import React from "react"
import { Link } from "react-router-dom"
import "./TripCard.css"

function TripCard({ tripId, tripName, startDate, endDate }) {
  return (
    <div className="card trip-card my-4">
      <div className="card-body">
        <Link to={`/trip/${tripId}`}>
        <h6 className="card-title">
          {tripName}
          </h6>
        </Link>
        <span className="mr-3">Start Date: {startDate}</span>
        <span>End Date: {endDate}</span>
      </div>
      </div>
  )
}

export default TripCard;