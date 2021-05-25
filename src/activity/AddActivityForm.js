import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { TextField } from "@material-ui/core";
import "@reach/combobox/styles.css";

function AddActivityForm({
    tripId,
    setIsAdding,
    addActivity,
    setSelectLocation,
}) {
    const { currLocation } = useContext(UserContext);
    const [formData, setFormData] = useState({
        tripId: tripId,
        activityName: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        // some preference for search, totally optional
        requestOptions: {
            location: {
                lat: () => currLocation.lat,
                lng: () => currLocation.lng,
            },
            radius: 200 * 1000,
        },
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await addActivity(formData);
        if (res.success) {
            setIsAdding(false);
        } else {
            setFormErrors(res.errs);
        }
    }

    function handleCancel() {
        setIsAdding(false);
        setSelectLocation(null);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="activity-add-form ml-3 mb-3 p-3 text-left"
        >
            <div className="form-group">
                <label htmlFor="activityName">*Activity Name: </label>
                <input
                    name="activityName"
                    id="activityName"
                    className="form-control"
                    value={formData.activityName}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    type="text"
                ></input>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description: </label>
                <input
                    name="description"
                    id="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    autoComplete="off"
                    type="text"
                ></input>
            </div>

            <div className="form-group">
                <label htmlFor="location">Location: </label>
                <Combobox
                    onSelect={async (address) => {
                        setValue(address, false);
                        clearSuggestions();
                        try {
                            const results = await getGeocode({ address });
                            const { lat, lng } = await getLatLng(results[0]);
                            setFormData((data) => ({
                                ...data,
                                location: address,
                                latitude: lat,
                                longitude: lng,
                            }));
                            setSelectLocation({ lat: lat, lng: lng });
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    <ComboboxInput
                        value={value}
                        className="form-control"
                        name="location"
                        id="location"
                        onChange={(e) => {
                            setValue(e.target.value);
                            handleChange(e);
                        }}
                        disabled={!ready}
                        type="text"
                        placeholder="Enter an address"
                        autoComplete="off"
                        required
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === "OK" &&
                                data.map(({ id, description }) => (
                                    <ComboboxOption
                                        key={id}
                                        value={description}
                                    ></ComboboxOption>
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>

            <div className="form-group">
                <label htmlFor="startTime">Start Time: </label>
                <br />
                <TextField
                    id="startTime"
                    name="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="endTime">End Time: </label>
                <br />
                <TextField
                    id="endTime"
                    name="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="comment">Comment: </label>
                <input
                    name="comment"
                    id="comment"
                    className="form-control"
                    value={formData.comment}
                    onChange={handleChange}
                    type="text"
                ></input>
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
    );
}

export default AddActivityForm;
