import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    fetch("http://localhost/sign_up.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/fresher-detail", { state: { username: formData.username } });
        } else {
          alert(data.message || "An error occurred during registration.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputBox}>
            <label
              style={{
                ...styles.label,
                ...(formData.username && styles.inputFocus),
              }}
              htmlFor="username"
            >
              Username:
            </label>
            <input
              style={styles.input}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label
              style={{
                ...styles.label,
                ...(formData.email && styles.inputFocus),
              }}
              htmlFor="email"
            >
              Email:
            </label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label
              style={{
                ...styles.label,
                ...(formData.password && styles.inputFocus),
              }}
              htmlFor="password"
            >
              Password:
            </label>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label
              style={{
                ...styles.label,
                ...(formData.confirmPassword && styles.inputFocus),
              }}
              htmlFor="confirmPassword"
            >
              Re-enter Password:
            </label>
            <input
              style={styles.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Sign Up
          </button>
        </form>
        <p style={styles.subText}>
          Already have an account? <a href="/log-in">Log In</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#2b6217",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: "0",
    fontFamily: "cursive",
    padding: "20px",
  },
  container: {
    backgroundColor: "#fff",
    padding: "40px 20px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
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
  "@media(max-width: 400px)": {
    container: {
      padding: "20px 10px",
    },
    heading: {
      fontSize: "1.2em",
    },
    submitBtn: {
      fontSize: "14px",
    },
  },
};

export default SignUp;
