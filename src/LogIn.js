import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [inputFocused, setInputFocused] = useState({
    email: false,
    username: false,
    password: false,
  });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const styles = {
    body: {
      backgroundColor: "#2b6217",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: "0",
      fontFamily: "'Poppins', sans-serif",
    },
    container: {
      backgroundColor: "#fff",
      padding: "50px",
      borderRadius: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      animation: "zoomIn 0.8s ease-out",
      textAlign: "center",
      transform: "scale(0.8)",
      maxWidth: "400px",
      width: "100%",
    },
    heading: {
      color: "#2b6217",
      fontSize: "2em",
      marginBottom: "40px",
      fontFamily: "cursive",
    },
    inputBox: {
      position: "relative",
      marginBottom: "30px",
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
    },
    submitBtnHover: {
      backgroundColor: "#3c7c29",
      transform: "scale(1.05)",
    },
    subText: {
      margin: "10px 0",
      fontSize: "19px",
      color: "#555",
      fontFamily: "cursive",
    },
    "@keyframes zoomIn": {
      from: { opacity: 0, transform: "scale(0.8)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    "@media (max-width: 768px)": {
      container: {
        padding: "30px",
        transform: "scale(1)",
      },
      heading: {
        fontSize: "1.5em",
      },
      input: {
        fontSize: "16px",
      },
      submitBtn: {
        fontSize: "16px",
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

  const handleLogin = e => {
    e.preventDefault();

    const loginData = { action: "login", email, username, password };

    fetch("http://localhost/start.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("username", username);

          if (data.role === "admin") {
            navigate("/admin");
          } else if (data.role === "farmer") {
            navigate("/farmer-home");
          } else if (data.role === "consumer") {
            navigate("/consumer-home");
          } else {
            navigate("/fresher-detail");
          }
        } else {
          alert(data.message || "Login failed. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputBox}>
            <input
              type="email"
              required={!inputFocused.username}
              style={styles.input}
              onFocus={() => handleFocus("email")}
              onBlur={(e) => handleBlur("email", e)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              style={inputFocused.email ? styles.inputFocus : styles.label}
            >
              Enter Email
            </label>
          </div>

          <p style={styles.subText}>or</p>

          <div style={styles.inputBox}>
            <input
              type="text"
              required={!inputFocused.email}
              style={styles.input}
              onFocus={() => handleFocus("username")}
              onBlur={(e) => handleBlur("username", e)}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              style={inputFocused.username ? styles.inputFocus : styles.label}
            >
              Enter Username
            </label>
          </div>

          <div style={styles.inputBox}>
            <input
              type="password"
              required
              style={styles.input}
              onFocus={() => handleFocus("password")}
              onBlur={(e) => handleBlur("password", e)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              style={inputFocused.password ? styles.inputFocus : styles.label}
            >
              Password
            </label>
          </div>

          <button type="submit" style={styles.submitBtn} className="submit-btn">
            Login
          </button>
        </form>
        <style>
          {`
            .submit-btn:hover {
              background-color: ${styles.submitBtnHover.backgroundColor};
              transform: ${styles.submitBtnHover.transform};
            }
            @media (max-width: 768px) {
              .container {
                padding: ${styles["@media (max-width: 768px)"].container.padding};
                transform: ${styles["@media (max-width: 768px)"].container.transform};
              }
              .heading {
                font-size: ${styles["@media (max-width: 768px)"].heading.fontSize};
              }
              .input {
                font-size: ${styles["@media (max-width: 768px)"].input.fontSize};
              }
              .submit-btn {
                font-size: ${styles["@media (max-width: 768px)"].submitBtn.fontSize};
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default LogIn;
