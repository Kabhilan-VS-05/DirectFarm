import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputFocused, setInputFocused] = useState({
    username: false,
    email: false,
    password: false,
    reEnterPassword: false,
  });

  // Styles object for inline styling
  const styles = {
    body: {
      backgroundColor: "#2b6217",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: "0",
      fontFamily: "cursive",
      padding: "20px", // Ensure padding for small screens
    },
    container: {
      backgroundColor: "#fff",
      padding: "40px 20px",
      borderRadius: "20px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      width: "100%",
      maxWidth: "400px", // Constrain width for larger screens
      animation: "zoomIn 0.8s ease-out",
    },
    heading: {
      color: "#2b6217",
      fontSize: "2em",
      marginBottom: "20px",
      fontFamily: "cursive",
    },
    inputBox: {
      position: "relative",
      marginBottom: "25px",
    },
    input: {
      width: "100%",
      padding: "10px",
      background: "none",
      border: "none",
      borderBottom: "2px solid #2b6217",
      outline: "none",
      color: "#333",
      fontSize: "18px",
      transition: "0.2s",
      fontFamily: "inherit",
    },
    label: {
      position: "absolute",
      top: "0",
      left: "0",
      pointerEvents: "none",
      transition: "0.2s",
      color: "#999",
    },
    inputFocus: {
      top: "-20px",
      fontSize: "14px",
      color: "#2b6217",
    },
    submitBtn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#2b6217",
      border: "none",
      borderRadius: "30px",
      color: "white",
      fontSize: "18px",
      cursor: "pointer",
      transition: "transform 0.3s ease, background-color 0.3s ease",
      fontFamily: "cursive",
      marginTop: "10px",
    },
    subText: {
      margin: "10px 0",
      fontSize: "15px",
      color: "#555",
      fontFamily: "cursive",
    },
    "@keyframes zoomIn": {
      from: { opacity: 0, transform: "scale(0.8)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    // Media queries for responsiveness
    mediaQueries: {
      "@media(max-width: 600px)": {
        container: {
          padding: "30px 15px",
        },
        heading: {
          fontSize: "1.5em",
        },
        submitBtn: {
          fontSize: "16px",
        },
      },
    },
  };

  const handleFocus = (field) => {
    setInputFocused({ ...inputFocused, [field]: true });
  };

  const handleBlur = (field, event) => {
    if (!event.target.value) {
      setInputFocused({ ...inputFocused, [field]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect data from input fields
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Data to be sent to the server
    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/start.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Ensure this is JSON
      });

      const result = await response.json();
      console.log(result); // Log the response from PHP

      if (result.success) {
        navigate("/fresher-detail"); // Navigate after successful signup
      } else {
        alert(result.message); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={styles.inputBox}>
            <input
              type="text"
              name="username"
              required
              aria-label="Enter Username"
              style={styles.input}
              onFocus={() => handleFocus("username")}
              onBlur={(e) => handleBlur("username", e)}
            />
            <label style={inputFocused.username ? styles.inputFocus : styles.label}>
              Enter Username
            </label>
          </div>

          {/* Email Field */}
          <div style={styles.inputBox}>
            <input
              type="email"
              name="email"
              required
              aria-label="Enter Email"
              style={styles.input}
              onFocus={() => handleFocus("email")}
              onBlur={(e) => handleBlur("email", e)}
            />
            <label style={inputFocused.email ? styles.inputFocus : styles.label}>
              Enter Email
            </label>
          </div>

          {/* Password Field */}
          <div style={styles.inputBox}>
            <input
              type="password"
              name="password"
              required
              aria-label="Enter Password"
              style={styles.input}
              onFocus={() => handleFocus("password")}
              onBlur={(e) => handleBlur("password", e)}
            />
            <label style={inputFocused.password ? styles.inputFocus : styles.label}>
              Enter Password
            </label>
          </div>

          {/* Re-enter Password Field */}
          <div style={styles.inputBox}>
            <input
              type="password"
              name="reEnterPassword"
              required
              aria-label="Re-enter Password"
              style={styles.input}
              onFocus={() => handleFocus("reEnterPassword")}
              onBlur={(e) => handleBlur("reEnterPassword", e)}
            />
            <label style={inputFocused.reEnterPassword ? styles.inputFocus : styles.label}>
              Re-enter Password
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.submitBtn} className="submit-btn">
            Sign Up
          </button>
        </form>

        {/* Submit button hover styles */}
        <style>
          {`
          .submit-btn:hover {
            background-color: ${styles.submitBtn.backgroundColor};
            transform: scale(1.05);
          }
          @media(max-width: 600px) {
            .submit-btn {
              font-size: 16px;
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default SignUp;
