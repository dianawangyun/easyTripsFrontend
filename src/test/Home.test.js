import React from "react";
import { render } from "@testing-library/react";
import Home from "../home/Home";
import UserContext from "../auth/UserContext";

function renderHome(currentUser) {
    return render(
        <UserContext.Provider value={{ currentUser }}>
            <Home />
        </UserContext.Provider>
    );
}

const currentUser = null;

it("renders without crashing", function () {
    renderHome(currentUser);
});

it("matches snapshot", function () {
    const { asFragment } = renderHome(currentUser);
    expect(asFragment()).toMatchSnapshot();
});

it("should show the home page", function () {
    const { queryByText } = renderHome(currentUser);
    expect(queryByText("Welcome, Visitor!")).toBeInTheDocument();
});
