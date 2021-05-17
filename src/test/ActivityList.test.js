import React from "react";
import { render } from "@testing-library/react";
import ActivityList from "../activity/ActivityList";

it("renders without crashing", function () {
    render(<ActivityList />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<ActivityList trip={{ activities: [] }} />);
    expect(asFragment()).toMatchSnapshot();
});

it("should show no activity", function () {
    const { queryByText } = render(<ActivityList trip={{ activities: [] }} />);
    expect(
        queryByText("No Activities in this trip. Let's Add some!")
    ).toBeInTheDocument();
});
