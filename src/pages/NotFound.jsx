import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f10, #1d1d1f)",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px 50px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
          width: "100%",
          maxWidth: "480px",
        }}
      >
        <h1 style={{ fontSize: "90px", margin: 0, fontWeight: 700 }}>404</h1>
        <p style={{ fontSize: "20px", margin: "10px 0 20px" }}>
          Page Not Found
        </p>

        <button
          style={{
            marginTop: "10px",
            padding: "12px 24px",
            borderRadius: "50px",
            background: "#ff004f",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
