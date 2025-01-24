// Success.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#00A000", // green background
      color: "white",
      fontFamily: "Arial, sans-serif"
    },
    message: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px"
    },
    iconContainer: {
      width: "80px",
      height: "80px",
      backgroundColor: "#00B0FF", // blue circle
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "30px"
    },
    checkmark: {
      fontSize: "2rem",
      color: "#00A000" // green checkmark color
    },
    button: {
      backgroundColor: "#00A000",
      color: "white",
      border: "none",
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "10px"
    },
    linkButton: {
      backgroundColor: "#ffffff",
      color: "#00A000",
      border: "2px solid #00A000",
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "5px",
      cursor: "pointer",
      textDecoration: "none"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.message}>Product Uploaded</div>
      <div style={styles.iconContainer}>
        <span style={styles.checkmark}>✔</span>
      </div>
      <button style={styles.button}>DONE</button>
      <button style={styles.linkButton} onClick={() => navigate("/farmer-home")}>
        Back to Home Page
      </button>
    </div>
  );
};

export default Success;
