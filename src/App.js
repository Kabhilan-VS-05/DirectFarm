import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Fresher from "./Fresher_detail";
import Farmerhome from "./farmer_home";
import Uploadpro from "./upload_product";
import Success1 from "./success1";
import Chatbot from "./chatbot";
import Consumerhome from "./consumer_home";
import FarmerProductDetail from "./farmer_product_detail";
import LatestProduct from "./Latest_product";
import Orders from "./orders";
import History from "./history";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.logo}><h1 style={styles.logoText}>NEXUS.</h1></div>

      <div style={styles.leftSection}>
        <h2 style={styles.welcomeSubheading}>Welcome to DirectFarm</h2>
        <p style={styles.welcomeParagraph}>
          This platform fosters a direct connection between farmers and consumers.
          Enjoy fresh, high-quality produce from trusted local sources!
        </p>
      </div>

      <div style={styles.rightSection}>
        <h2 style={styles.loginHeading}>Let's Go</h2>
        <button style={styles.btn} onClick={() => navigate("/sign-up")}>
          Sign Up
        </button>
        <button style={styles.btn} onClick={() => navigate("/log-in")}>
          Log In
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", width: "100%", height: "100vh", backgroundColor: "#2b6217",
    padding: "20px", textAlign: "center"
  },
  logo: { position: "fixed", top: "20px", left: "20px", zIndex: 1000 },
  logoText: { color: "#a5e0a7", fontSize: "24px" },
  leftSection: {
    textAlign: "center", padding: "40px", maxWidth: "600px",
    animation: "fadeIn 1s ease-in-out"
  },
  welcomeSubheading: { fontSize: "40px", color: "#fff", fontFamily: "cursive" },
  welcomeParagraph: { fontSize: "14px", color: "#c5c5c5", lineHeight: 1.4 },
  rightSection: {
    display: "flex", flexDirection: "column", alignItems: "center", padding: "40px",
    backgroundColor: "#224c0a", borderLeft: "2px solid #173908", width: "90%",
    maxWidth: "400px", borderRadius: "15px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out"
  },
  loginHeading: { fontSize: "32px", marginBottom: "20px", color: "#fff", fontFamily: "cursive" },
  btn: {
    backgroundColor: "#000", color: "#ffffffd2", padding: "15px 30px", fontSize: "18px",
    marginBottom: "15px", cursor: "pointer", transition: "all 0.3s ease",
    borderRadius: "10px", border: "2px solid #00ff00",
    width: "100%", maxWidth: "250px"
  },
  '@media (max-width: 768px)': {
    page: {
      flexDirection: "column", textAlign: "center"
    },
    rightSection: {
      borderLeft: "none", borderTop: "2px solid #173908"
    }
  }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/fresher-detail" element={<Fresher/>} />
        <Route path="/farmer-home" element={<Farmerhome />} />
        <Route path="/upload-product" element={<Uploadpro />} />
        <Route path="/success1" element={<Success1 />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/consumer-home" element={<Consumerhome />} />
        <Route path="/farmer-product-detail" element={<FarmerProductDetail />} />
        <Route path="/latest-product" element={<LatestProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
