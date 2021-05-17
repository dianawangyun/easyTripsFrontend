import React from "react";
import { render } from "@testing-library/react";
import Locate from "../map/Locate";

it("renders without crashing", function () {
    render(<Locate />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<Locate />);
    expect(asFragment()).toMatchSnapshot();
});
