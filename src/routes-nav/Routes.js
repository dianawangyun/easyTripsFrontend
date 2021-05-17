import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../home/Home";
import ProfileForm from "../profile/ProfileForm";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import NewTripForm from "../trip/NewTripForm";
import Trip from "../trip/Trip";
import TripDetail from "../trip/TripDetail";

const Routes = ({ login, signup, addTrip }) => {
    return (
        <Switch>
            <Route exact path="/home">
                <Home login={login} />
            </Route>
            <Route exact path="/newtrip">
                <NewTripForm addTrip={addTrip} />
            </Route>
            <Route exact path="/trip">
                <Trip />
            </Route>
            <Route exact path="/trip/:tripid">
                <TripDetail />
            </Route>
            <Route exact path="/profile">
                <ProfileForm />
            </Route>

            <Route exact path="/login">
                <LoginForm login={login} />
            </Route>

            <Route exact path="/signup">
                <SignupForm signup={signup} />
            </Route>
            <Redirect to="/home" />
        </Switch>
    );
};

export default Routes;
