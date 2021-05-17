import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileForm from "../profile/ProfileForm";

import UserContext from "../auth/UserContext";

function renderProfileForm(currentUser, setCurrentUser) {
    return render(
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <ProfileForm />
        </UserContext.Provider>
    );
}

const currentUser = {
    username: "testUsername",
    firstName: "test",
    lastName: "test",
    email: "email",
};
const setCurrentUser = () => {
    return;
};

it("renders without crashing", function () {
    renderProfileForm(currentUser, setCurrentUser);
});

it("matches snapshot", function () {
    const { asFragment } = renderProfileForm(currentUser, setCurrentUser);
    expect(asFragment()).toMatchSnapshot();
});

it("shows the form with data", function () {
    const { getByLabelText } = renderProfileForm(currentUser, setCurrentUser);
    const userName = getByLabelText("Username:");
    expect(userName.value).toEqual("testUsername");
});
