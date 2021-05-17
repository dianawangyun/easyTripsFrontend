import React, { useState, useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";
import "./EditActivityForm.css";

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
import TripContext from "../trip/TripContext";

function EditActivityForm({
    activityId,
    activityName,
    description,
    location,
    latitude,
    longitude,
    startTime,
    endTime,
    comment,
    setIsEditing,
    setIsUpdating,
}) {
    const { editActivity, setSelectLocation } = useContext(TripContext);
    const { currLocation } = useContext(UserContext);

    const [formData, setFormData] = useState({
        activityName,
        description: description || "",
        location: location || "",
        startTime: startTime ? startTime.replace(" ", "T") : "",
        endTime: endTime ? endTime.replace(" ", "T") : "",
        comment: comment || "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const {
        ready,
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

    useEffect(() => {
        if (latitude && longitude) {
            setSelectLocation({
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
            });
        } else {
            setSelectLocation(null);
        }
    }, [latitude, longitude, setSelectLocation]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.startTime) {
            formData.startTime = formData.startTime.replace("T", " ");
        }
        if (formData.endTime) {
            formData.endTime = formData.endTime.replace("T", " ");
        }
        let res = await editActivity(activityId, formData);
        if (res.success) {
            setIsEditing(false);
            setIsUpdating(false);
            setSelectLocation(null);
        } else {
            setFormErrors(res.errs);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    function handleCancel() {
        setIsEditing(false);
        setIsUpdating(false);
        setSelectLocation(null);
    }

    return (
        <div className="mb-3">
            <form
                onSubmit={handleSubmit}
                className="activity-add-form p-2 mt-3 ml-3 text-left"
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
                    <label htmlFor="location">Location: </label>
                    <Combobox
                        onSelect={async (address) => {
                            setValue(address, false);
                            clearSuggestions();
                            try {
                                const results = await getGeocode({ address });
                                const { lat, lng } = await getLatLng(
                                    results[0]
                                );
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
                            value={formData.location}
                            className="form-control"
                            name="location"
                            id="location"
                            onChange={(e) => {
                                setValue(e.target.value);
                                handleChange(e);
                            }}
                            disabled={!ready}
                            type="search"
                            placeholder="Enter an address"
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
                <div className="row ml-1">
                    <div className="form-group mr-5">
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
                </div>

                <div className="form-group">
                    <label htmlFor="location">Description: </label>
                    <input
                        name="description"
                        id="description"
                        className="form-control"
                        value={formData.description}
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
        </div>
    );
}

export default EditActivityForm;
