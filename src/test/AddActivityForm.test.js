import React from "react";
import { render } from "@testing-library/react";
import AddActivityForm from "../activity/AddActivityForm";
import UserContext from "../auth/UserContext";

function renderAddActivityForm(currLocation) {
    return render(
        <UserContext.Provider value={currLocation}>
            <AddActivityForm />
        </UserContext.Provider>
    );
}

const currLocation = { lat: 30, lng: 100 };

it("renders without crashing", function () {
    renderAddActivityForm(currLocation);
});

it("matches snapshot", function () {
    const { asFragment } = renderAddActivityForm(currLocation);
    expect(asFragment()).toMatchSnapshot();
});

it("should show the form", function () {
    const { queryByText } = renderAddActivityForm(currLocation);
    expect(queryByText("*Activity Name:")).toBeInTheDocument();
});
