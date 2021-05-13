import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useContext,
} from "react";
import UserContext from "../auth/UserContext";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";
import LoadingSpinner from "../common/LoadingSpinner";

import Locate from "./Locate";

const libraries = ["places"];
const mapContainerStyle = {
    height: "92vh",
    width: "58vw",
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

function Map({ selectLocation, trip }) {
    const { currLocation } = useContext(UserContext);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCMbvToHaCbVpD7-YgWCFUg61QwxN9rla4",
        libraries,
    });
    const activityMarkers = trip.activities.filter(
        (a) => a.latitude && a.longitude
    );

    const [center, setCenter] = useState({});

    /* set the center of map */
    useEffect(() => {
        if (currLocation) {
            setCenter({
                lat: currLocation.lat,
                lng: currLocation.lng,
            });
        } else {
            setCenter({
                lat: 30.4,
                lng: -97.7,
            });
        }
    }, [setCenter, currLocation]);

    /* if there is a selected location, panTo this location */
    useEffect(() => {
        if (selectLocation) {
            panTo({
                lat: parseFloat(selectLocation.lat),
                lng: parseFloat(selectLocation.lng),
            });
        }
    });

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(12);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return <LoadingSpinner />;

    return (
        <div>
            <Locate panTo={panTo} />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                {activityMarkers.map((marker) => (
                    <Marker
                        key={marker.activityId}
                        position={{
                            lat: parseFloat(marker.latitude),
                            lng: parseFloat(marker.longitude),
                        }}
                    />
                ))}

                {selectLocation ? (
                    <Marker
                        position={{
                            lat: parseFloat(selectLocation.lat),
                            lng: parseFloat(selectLocation.lng),
                        }}
                        label={{ text: "✔", color: "white" }}
                        z-index="10"
                    />
                ) : null}
            </GoogleMap>
        </div>
    );
}

export default React.memo(Map);
