import React, { useState, useContext } from "react";
import EasyTripsApi from "../api/api";
import UserContext from "../auth/UserContext";

/* The form for updating the profile. */
function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
    });
    const [saved, setSaved] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let updateData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let newProfile;
        try {
            newProfile = await EasyTripsApi.updateProfile(
                currentUser.username,
                updateData
            );
            setFormErrors([]);
            setCurrentUser(newProfile);
            setSaved(true);
        } catch (e) {
            setFormErrors(e);
        }

        setFormData((data) => ({ ...data, password: "" }));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((data) => ({ ...data, [name]: value }));
        setSaved(false);
    }
    return (
        <div className="container">
            <h2 className="mt-5 mb-4 text-center">User Profile</h2>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="firstName"
                                id="firstname"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="lastName"
                                id="lastname"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {formErrors.length ? (
                            <ul>
                                {formErrors.map((e) => (
                                    <li className="text-danger">{e}</li>
                                ))}
                            </ul>
                        ) : null}
                        {saved ? (
                            <p className="text-success">Profile updated.</p>
                        ) : null}
                        <div className="text-center">
                            <button className="btn btn-success" type="submit">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;
