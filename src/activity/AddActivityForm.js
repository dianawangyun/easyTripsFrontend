import React, { useState } from "react"
import "./AddActivityForm.css"

function AddActivityForm({tripId, setIsAdding}) {
  const [formData, setFormData] = useState({
    tripId: tripId,
    activityName: ""
  })
  const [formErrors, setFormErrors] = useState([])
  
  async function handleSubmit(e) {
    e.preventDefault()
    // let res = await AddActivity(formData);
    // if (res.success) {
    //   setIsAdding(false)
    // } else {
    //   setFormErrors(res.errs)
    // }
  }

  function handleChange(evt) {
    const { name, value } = evt.target
    setFormData((data)=>({...data,[name]:value}))
  }

  return (
    <form onSubmit={handleSubmit} className="activity-add-form mt-3 text-left">
      <div className="form-group">
        <label htmlFor="activityName">*Activity Name: </label>
        <input
          name="activityName"
          id="activityName"
          className="form-control"
          value={formData.tripName}
          onChange={handleChange}
          autoComplete="off"
          required
        type="text"></input>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location: </label>
        <input
          name="activityName"
          id="activityName"
          className="form-control"
          value={formData.activityName}
          onChange={handleChange}
          autoComplete="off"
        type="text"></input>
      </div>

      {/* <div className="form-group">
        <label htmlFor="startTime">Start Time: </label>
        <input
          name="startTime"
          id="startTime"
          className="form-control timepicker"
          value={formData.startTime}
          onChange={handleChange}
        type="time"></input>
      </div>

      <div className="form-group">
        <label htmlFor="endTime">End Time: </label>
        <input
          name="endTime"
          id="endTime"
          className="form-control timepicker"
          value={formData.endTime}
          onChange={handleChange}
        type="time"></input>
      </div> */}

      <div className="form-group">
        <label htmlFor="location">Notes: </label>
        <input
          name="comment"
          id="comment"
          className="form-control"
          value={formData.comment}
          onChange={handleChange}
        type="textarea"></input>
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
            Submit
            </button>
        </div>
      </form>
    )
}

export default AddActivityForm