import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/* The form for creating a new trip. */
function NewTripForm({ addTrip }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        tripName: "",
        startDate: "",
        endDate: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await addTrip(formData);
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
            <h2 className="mt-5 mb-4 text-center">Add New Trip</h2>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="tripName">Trip Name: </label>
                            <input
                                name="tripName"
                                id="tripName"
                                className="form-control"
                                value={formData.tripName}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date: </label>
                            <input
                                type="date"
                                name="startDate"
                                className="form-control"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date: </label>
                            <input
                                type="date"
                                name="endDate"
                                className="form-control"
                                min={formData.startDate || null}
                                value={formData.endDate}
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
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewTripForm;
