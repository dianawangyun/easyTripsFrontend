import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "../auth/LoginForm";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
    render(<LoginForm />);
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it("should show login form", function () {
    const { queryByText } = render(<LoginForm />);
    expect(queryByText("Username:")).toBeInTheDocument();
});

it("can type in the input", function () {
    const login = () => {
        return { success: true };
    };
    const { getByTestId } = render(<LoginForm login={login} />);
    const userName = getByTestId("login-username");
    fireEvent.change(userName, { target: { value: "test" } });
    expect(userName.value).toEqual("test");
});
