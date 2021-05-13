import React, { useState } from "react";

/* The form for updating a trip. */
function EditTripForm({ trip, editTrip, setIsEditTrip }) {
    const [formData, setFormData] = useState({
        tripName: trip.tripName,
        startDate: trip.startDate,
        endDate: trip.endDate,
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await editTrip(formData);
        if (!res.success) {
            setFormErrors(res.errs);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    function handleCancel() {
        setIsEditTrip(false);
    }

    return (
        <div className="ml-3">
            <form
                onSubmit={handleSubmit}
                className="activity-add-form p-2 mt-3 ml-3 text-left"
            >
                <div className="form-group">
                    <label htmlFor="tripName">*Trip Name: </label>
                    <input
                        name="tripName"
                        id="tripName"
                        className="form-control"
                        value={formData.tripName}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        type="text"
                    ></input>
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
                    <button className="btn btn-success mb-3 mr-5" type="submit">
                        Save
                    </button>
                    <button
                        className="btn btn-danger btn-danger-trip mb-3"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <hr />
        </div>
    );
}

export default EditTripForm;
