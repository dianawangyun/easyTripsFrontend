import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
    return (
        <div className="lds-spinner mx-auto mt-5">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingSpinner;
