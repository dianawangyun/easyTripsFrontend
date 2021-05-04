import React from "react";

function Locate({ panTo }) {
    return navigator.geolocation ? (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img alt="locate me" src="compass.png" title="Locate me" />
        </button>
    ) : null;
}

export default Locate;
