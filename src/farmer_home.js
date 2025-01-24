import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Farmer() {
  const [user, setUser] = useState(null);


  return (
    <div style={styles.page}>

      <h2 style={styles.welcomeText}>Welcome Farmers</h2>

      <div style={styles.buttonContainer}>
        {/* Upload Product Button */}
        <Link to="/upload-product" style={styles.imageLink}>
          <img
            src="https://i.pinimg.com/736x/71/6a/ce/716ace88e00c56956f9a8a5bad08fbad.jpg"
            alt="Upload Product"
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
          <div style={styles.btnLabel}>Upload Product</div>
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

        {/* Product Details Button */}
        <Link to="/farmer-product-detail" style={styles.imageLink}>
          <img
            src="https://i.pinimg.com/564x/41/bc/0d/41bc0d85bf62fb82c1083bcda228df0f.jpg"
            alt="Product Details"
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
          <div style={styles.btnLabel}>Product Details and History</div>
        </Link>

        {/* Orders Button */}
        <Link to="/orders" style={styles.imageLink}>
          <img
            src="https://i.pinimg.com/564x/71/d9/fa/71d9fac900422f5454673bb5b0682b86.jpg"
            alt="Orders"
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
          <div style={styles.btnLabel}>Orders</div>
        </Link>
      </div>
    </div>
  );
}

// Styles
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#2b6217", // Dark green
    color: "white",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    justifyContent: "center"
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

export default Farmer;
