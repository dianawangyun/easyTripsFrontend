import React from "react";
import { render } from "@testing-library/react";
import Map from "../map/Map";
import UserContext from "../auth/UserContext";

const trip = { activities: [] };
const currLocation = { lat: 30, lng: 10 };

function renderMap(currLocation, trip) {
    return render(
        <UserContext.Provider value={{ currLocation }}>
            <Map trip={trip} />
        </UserContext.Provider>
    );
}

it("renders without crashing", function () {
    renderMap(currLocation, trip);
});

it("matches snapshot", function () {
    const { asFragment } = renderMap(currLocation, trip);
    expect(asFragment()).toMatchSnapshot();
});
