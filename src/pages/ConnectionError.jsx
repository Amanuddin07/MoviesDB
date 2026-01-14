import React from "react";
import "./connectionError.css";
import { useNavigate } from "react-router-dom";

export default function ConnectionError() {
    const navigate = useNavigate();
  return (
    <div className="connection-error">
      <div className="error-card">
        <h1>Connection Error</h1>
        <p>Please check your internet connection.</p>

        <button onClick={() => navigate(-1)}>
          Retry
        </button>
      </div>
    </div>
  );
}
