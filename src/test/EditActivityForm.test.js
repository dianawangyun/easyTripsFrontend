import React from "react";
import { render } from "@testing-library/react";
import EditActivityForm from "../activity/EditActivityForm";
import UserContext from "../auth/UserContext";
import TripContext from "../trip/TripContext";

function renderEditActivityForm(editActivity, setSelectLocation, currLocation) {
    return render(
        <UserContext.Provider value={currLocation}>
            <TripContext.Provider value={{ editActivity, setSelectLocation }}>
                <EditActivityForm />
            </TripContext.Provider>
        </UserContext.Provider>
    );
}

const currLocation = { lat: 30, lng: 100 };
const setSelectLocation = () => {
    return;
};
const editActivity = () => {
    return;
};

it("renders without crashing", function () {
    renderEditActivityForm(editActivity, setSelectLocation, currLocation);
});

it("matches snapshot", function () {
    const { asFragment } = renderEditActivityForm(
        editActivity,
        setSelectLocation,
        currLocation
    );
    expect(asFragment()).toMatchSnapshot();
});

it("should show the form", function () {
    const { queryByText } = renderEditActivityForm(
        editActivity,
        setSelectLocation,
        currLocation
    );
    expect(queryByText("*Activity Name:")).toBeInTheDocument();
});
