import React from "react";
import { render } from "@testing-library/react";
import ActivityCard from "../activity/ActivityCard";
import TripContext from "../trip/TripContext"


function renderActivityCard(setSelectLocation) {
    return render(<TripContext.Provider value={setSelectLocation}><ActivityCard />
        </TripContext.Provider>)
}

const setSelectLocation = () => {
    return;
}

it("renders without crashing", function () {
    renderActivityCard(setSelectLocation);
});

it("matches snapshot", function () {
    const { asFragment } = renderActivityCard(setSelectLocation);
    expect(asFragment()).toMatchSnapshot();
});

it("should show the activityCard", function () {
    const { queryByText } = renderActivityCard(setSelectLocation);
    expect(queryByText("Description:")).toBeInTheDocument();
});
