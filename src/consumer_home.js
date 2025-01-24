import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Consumer() {
  const [username, setUsername] = useState(null);

 

  return (
    <div style={styles.page}>
      

      <h2 style={styles.welcomeText}>Welcome Consumers</h2>

      <div style={styles.buttonContainer}>
        {/* Latest Uploads Button */}
        <Link to="/latest-product" style={styles.imageLink}>
          <img
            src="https://i.pinimg.com/564x/8a/53/e6/8a53e63193eba99df927eecf5dbeae90.jpg"
            alt="Latest Uploads"
            style={styles.image}
            onMouseEnter={e => (
              (e.currentTarget.style.transform = "scale(1.15)"),
              (e.currentTarget.style.boxShadow =
                "0px 8px 16px rgba(0, 0, 0, 0.3)")
            )}
            onMouseLeave={e => (
              (e.currentTarget.style.transform = "scale(1)"),
              (e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.2)")
            )}
          />
          <div style={styles.btnLabel}>Latest Uploads</div>
        </Link>

        {/* ChatBot Button */}
        <Link to="/chatbot" style={styles.imageLink}>
          <img
            src="https://i.pinimg.com/originals/40/ac/0e/40ac0e8c778d0cab1996800fc4bc26b0.gif"
            alt="ChatBot"
            style={styles.image}
            onMouseEnter={e => (
              (e.currentTarget.style.transform = "scale(1.15)"),
              (e.currentTarget.style.boxShadow =
                "0px 8px 16px rgba(0, 0, 0, 0.3)")
            )}
            onMouseLeave={e => (
              (e.currentTarget.style.transform = "scale(1)"),
              (e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.2)")
            )}
          />
          <div style={styles.btnLabel}>ChatBot</div>
        </Link>

        {/* History Button */}
        <Link to="/history" style={styles.imageLink}>
          <img
            src="https://i.pinimg.com/564x/ca/ce/ab/caceab1b1a4b6afbac9cb60e519d6e72.jpg"
            alt="History"
            style={styles.image}
            onMouseEnter={e => (
              (e.currentTarget.style.transform = "scale(1.15)"),
              (e.currentTarget.style.boxShadow =
                "0px 8px 16px rgba(0, 0, 0, 0.3)")
            )}
            onMouseLeave={e => (
              (e.currentTarget.style.transform = "scale(1)"),
              (e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.2)")
            )}
          />
          <div style={styles.btnLabel}>History</div>
        </Link>
      </div>
    </div>
  );
}

// Inline Styles for the Consumer Component
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#2b6217",
    color: "white",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    justifyContent: "center",
    position: "relative" // Added to make the logout button position relative to this container
  },
  header: {
    textAlign: "center",
    position: "absolute",
    top: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px",
    alignItems: "center"
  },
  logoText: {
    fontSize: "2.5rem",
    color: "lightgreen"
  },
  userInfo: {
    display: "flex",
    alignItems: "center"
  },
  username: {
    fontSize: "1.2rem",
    marginRight: "15px"
  },
  logoutButton: {
    backgroundColor: "#ff4747",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  welcomeText: {
    fontSize: "1.8rem",
    marginBottom: "40px"
  },
  buttonContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "center"
  },
  imageLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    color: "white"
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "10px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
  },
  btnLabel: {
    marginTop: "10px",
    fontSize: "1.2rem"
  }
};

export default Consumer;
