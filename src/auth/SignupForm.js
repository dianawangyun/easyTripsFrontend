import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignupForm({ signup }) {
    const INIT_VALUES = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };

    const history = useHistory();
    const [formData, setFormData] = useState(INIT_VALUES);
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await signup(formData);
        if (res.success) {
            history.push("/home");
        } else {
            console.log(res.errs);
            setFormErrors(res.errs.map((e) => e.replace("instance.", "")));
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    return (
        <div className="container">
            <h2 className="mt-5 mb-4 text-center">Sign Up</h2>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username" className="mr-2">
                                Username:
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="form-control"
                                value={formData.username}
                                placeholder="<25 characters"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="mr-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="6-20 characters"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname" className="mr-2">
                                First Name:
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstname"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" className="mr-2">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastname"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="mr-2">
                                Email:
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
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
                        <div className="text-center">
                            <button
                                className="btn btn-success mb-5"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
