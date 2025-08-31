import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "48px 36px",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "320px",
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            fontSize: "2rem",
            color: "#2563eb",
            marginBottom: "32px",
            letterSpacing: "0.03em",
          }}
        >
          Welcome to Arjangarh Complaint Portal
        </h1>
        <Link
          to="/admin"
          style={{
            background: "#2563eb",
            color: "white",
            fontWeight: 600,
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            padding: "16px 32px",
            marginBottom: "18px",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(37,99,235,0.10)",
            transition: "background 0.2s",
            textAlign: "center",
            width: "100%",
          }}
        >
          Admin Login
        </Link>
        <Link
          to="/complaint"
          style={{
            background: "#059669",
            color: "white",
            fontWeight: 600,
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            padding: "16px 32px",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(5,150,105,0.10)",
            transition: "background 0.2s",
            textAlign: "center",
            width: "100%",
          }}
        >
          Register Complaint
        </Link>
      </div>
    </div>
  );
};

export default Home;
