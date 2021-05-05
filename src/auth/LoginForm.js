import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ login }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await login(formData);
        if (res.success) {
            history.push("/home");
        } else {
            setFormErrors(res.errs);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    return (
        <div className="container">
            <h2 className="mt-5 mb-4 text-center">Log In</h2>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username: </label>
                            <input
                                name="username"
                                id="login-username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
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
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
