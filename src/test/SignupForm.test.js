import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SignupForm from "../auth/SignupForm";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
    render(<SignupForm />);
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it("should show signup form", function () {
    const { queryByText } = render(<SignupForm />);
    expect(queryByText("First Name:")).toBeInTheDocument();
});
