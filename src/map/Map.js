import React, { useState, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import "./Map.css";
import { formatRelative } from "date-fns";

import Search from "./Search";
import Locate from "./Locate";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCMbvToHaCbVpD7-YgWCFUg61QwxN9rla4",
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState({});

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                let { latitude, longitude } = pos.coords;
                setCenter({ lat: latitude, lng: longitude });
            });
        }
    }, [setCenter]);

    const onMapClick = useCallback((e) => {
        setMarkers((curr) => [
            ...curr,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <div>
            <Search panTo={panTo} />
            <Locate panTo={panTo} />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: "mark.png",
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>Spotted</h2>
                            <p>
                                Spotted{" "}
                                {formatRelative(selected.time, new Date())}
                            </p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
}

export default Map;
